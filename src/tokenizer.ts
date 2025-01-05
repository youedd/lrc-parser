const specs = [
  { type: "NUMBER", pattern: /^\d+/ },
  { type: "NEWLINE", pattern: /^\n+/ },
  { type: "[", pattern: /^\[/ },
  { type: "]", pattern: /^]/ },
  { type: ":", pattern: /^:/ },
  { type: ".", pattern: /^\./ },
  { type: "CHAR", pattern: /^./ },
  { type: "EOF", pattern: /^$/ },
] as const;

export type TokenType = (typeof specs)[number]["type"];

export type Token = {
  type: TokenType;
  value: string;
};

export class Tokenizer {
  pos: number;

  constructor(private readonly input: string) {
    this.pos = 0;
  }

  next(): Token {
    const str = this.input.slice(this.pos);

    for (const { pattern, type } of specs) {
      const match = str.match(pattern);
      if (match) {
        this.pos += match[0].length;
        return {
          type: type,
          value: match[0],
        };
      }
    }

    throw new Error(`Unexpected token at position ${this.pos}`);
  }
}
