import { Tokenizer } from "../tokenizer";

describe("tokenizer", () => {
  it("should return null for empty string", () => {
    const tokenizer = new Tokenizer("");
    expect(tokenizer.next()).toBe(null);
  });

  it("should tokenize a string", () => {
    const tokenizer = new Tokenizer("abc");
    expect(tokenizer.next()).toBe("a");
    expect(tokenizer.next()).toBe("b");
    expect(tokenizer.next()).toBe("c");
    expect(tokenizer.next()).toBe(null);
  });
});
