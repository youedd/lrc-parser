import { InfoLine, Line, LyricLine, Lyrics, TitleInfoLine } from "./ast";
import { Token, Tokenizer, TokenType } from "./tokenizer";

export class Parser {
  private input: string;
  private tokenizer: Tokenizer;
  private lookaheadToken: Token | null;

  constructor() {
    this.input = "";
    this.tokenizer = new Tokenizer("");
    this.lookaheadToken = null;
  }

  /**
   * Parse the input string and return the AST
   * @param input
   */
  parse(input: string) {
    this.input = input;
    this.tokenizer = new Tokenizer(input);
    this.lookaheadToken = this.tokenizer.next();
    return this.Lyrics();
  }

  /**
   * Lyrics
   *   : Line
   *   | Line "\n" Lyrics
   *   | "\n"
   *   | EOF
   *   ;
   * @param input
   * @returns
   */
  private Lyrics(): Lyrics {
    const content: Line[] = [];

    while (this.lookaheadToken !== null) {
      switch (this.lookaheadToken.type) {
        case "NEWLINE":
          this.eat("NEWLINE");
          continue;
        case "[":
          content.push(this.Line());
          continue;
        default:
          throw new Error(`Unexpected token: ${this.lookaheadToken}`);
      }
    }

    return {
      type: "Lyrics",
      content,
    };
  }
  /**
   * Line
   *   : InfoLine
   *   | LyricLine
   *   ;
   */
  private Line(): Line {
    this.eat("[");
    if (this.lookaheadToken?.type === "NUMBER") {
      return this.LyricLine();
    }

    return this.InfoLine();
  }

  private LyricLine(): LyricLine {
    const times: number[] = [];
    do {
      if (this.lookaheadToken?.type === "[") {
        this.eat("[");
      }
      const minutes = this.eat("NUMBER");
      const minutesValue = parseInt(minutes.value, 10);

      this.eat(":");

      const seconds = this.eat("NUMBER");
      const secondsValue = parseInt(seconds.value, 10);

      if (secondsValue >= 60) {
        throw new Error(`Invalid seconds value: ${secondsValue}`);
      }

      this.eat(".");
      const hundredths = this.eat("NUMBER");
      const hundredthsValue = parseInt(hundredths.value, 10);

      if (hundredthsValue >= 100) {
        throw new Error(`Invalid hundredths value: ${hundredthsValue}`);
      }

      times.push(
        minutesValue * 60 * 1000 + secondsValue * 1000 + hundredthsValue * 10,
      );
      this.eat("]");
    } while (this.lookaheadToken?.type === "[");

    return {
      type: "LyricLine",
      times,
      lyric: this.Lyric(),
    };
  }

  private Lyric(): string {
    let value = "";
    while (this.lookaheadToken?.type === "CHAR") {
      value += this.eat("CHAR").value;
    }
    return value;
  }

  private InfoLine(): InfoLine {
    let infoTag = "";

    do {
      infoTag += this.eat("CHAR").value;
    } while (this.lookaheadToken?.type === "CHAR");

    switch (infoTag) {
      case "ti":
        return this.TitleInfoLine();

      default: {
        throw new Error(`Unexpected token: ${this.lookaheadToken}`);
      }
    }
  }

  private TitleInfoLine(): TitleInfoLine {
    this.eat(":");
    let value = "";

    while (
      !["]", "NEWLINE", null].includes(this.lookaheadToken?.type ?? null)
    ) {
      value += this.lookaheadToken?.value;
      this.lookaheadToken = this.tokenizer.next();
    }

    this.eat("]");

    return {
      type: "TitleInfoLine",
      value,
    };
  }

  private eat(token: TokenType) {
    if (this.lookaheadToken?.type === token) {
      const prevToken = this.lookaheadToken;
      this.lookaheadToken = this.tokenizer.next();
      return prevToken;
    }

    throw new Error(`Unexpected token: ${this.lookaheadToken}`);
  }
}
