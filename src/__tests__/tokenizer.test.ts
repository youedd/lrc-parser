import { Tokenizer } from "../tokenizer";

describe("tokenizer", () => {
  it("should return EOF for empty string", () => {
    const tokenizer = new Tokenizer("");
    expect(tokenizer.next()).toEqual({ type: "EOF", value: "" });
  });

  it("should tokenize a string", () => {
    const tokenizer = new Tokenizer("[a:b]\n\n\n[c:d]");
    expect(tokenizer.next()).toEqual({ type: "[", value: "[" });
    expect(tokenizer.next()).toEqual({ type: "CHAR", value: "a" });
    expect(tokenizer.next()).toEqual({ type: ":", value: ":" });
    expect(tokenizer.next()).toEqual({ type: "CHAR", value: "b" });
    expect(tokenizer.next()).toEqual({ type: "]", value: "]" });
    expect(tokenizer.next()).toEqual({ type: "NEWLINE", value: "\n\n\n" });
    expect(tokenizer.next()).toEqual({ type: "[", value: "[" });
    expect(tokenizer.next()).toEqual({ type: "CHAR", value: "c" });
    expect(tokenizer.next()).toEqual({ type: ":", value: ":" });
    expect(tokenizer.next()).toEqual({ type: "CHAR", value: "d" });
    expect(tokenizer.next()).toEqual({ type: "]", value: "]" });
    expect(tokenizer.next()).toEqual({ type: "EOF", value: "" });
  });
});
