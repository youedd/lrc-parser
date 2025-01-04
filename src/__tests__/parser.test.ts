import { Parser } from "../parser";

const parser = new Parser();
describe("parser", () => {
  it("should parse empty file", () => {
    const input = "";
    const output = parser.parse(input);
    const expected = {
      type: "Lyric",
      content: [],
    };
    expect(output).toEqual(expected);
  });

  it("should parse file with new lines", () => {
    const input = "\n\n\n";
    const output = parser.parse(input);
    const expected = {
      type: "Lyric",
      content: [],
    };
    expect(output).toEqual(expected);
  });
});
