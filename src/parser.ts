import { Lyric } from "./ast";
import { Tokenizer } from "./tokenizer";

export class Parser {
  private input: string;
  private tokenizer: Tokenizer;
  private lookaheadToken: string | null;

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
    return this.lyric();
  }

  /**
   * Lyric
   *   : Line
   *   | Line "\n" Lyric
   *   | "\n"
   *   | EOF
   *   ;
   * @param input
   * @returns
   */
  private lyric(): Lyric {
    if (this.lookaheadToken === null) {
      return {
        type: "Lyric",
        content: [],
      };
    }

    if (this.lookaheadToken === "\n") {
      this.eat("\n");
      return this.lyric();
    }

    throw new Error(`Unexpected token: ${this.lookaheadToken}`);
  }

  private eat(token: string) {
    if (this.lookaheadToken === token) {
      this.lookaheadToken = this.tokenizer.next();
      return;
    }

    throw new Error(`Unexpected token: ${this.lookaheadToken}`);
  }
}
