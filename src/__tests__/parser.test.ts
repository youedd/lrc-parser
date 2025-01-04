import { Parser } from "../parser";

const parser = new Parser();
describe("parser", () => {
  it("should parse empty file", () => {
    const input = "";
    const output = parser.parse(input);
    const expected = {
      type: "Lyrics",
      content: [],
    };
    expect(output).toEqual(expected);
  });

  it("should parse file with new lines", () => {
    const input = "\n\n\n";
    const output = parser.parse(input);
    const expected = {
      type: "Lyrics",
      content: [],
    };
    expect(output).toEqual(expected);
  });

  it("should parse a lyric line with single time tag", () => {
    const input = "[00:01.00]Hello\n";
    const output = parser.parse(input);
    const expected = {
      type: "Lyrics",
      content: [
        {
          type: "LyricLine",
          times: [1000],
          lyric: "Hello",
        },
      ],
    };
    expect(output).toEqual(expected);
  });

  it("should parse a lyric line with multiple time tag", () => {
    const input = "[00:01.00][00:03.00]Hello\n";
    const output = parser.parse(input);
    const expected = {
      type: "Lyrics",
      content: [
        {
          type: "LyricLine",
          times: [1000, 3000],
          lyric: "Hello",
        },
      ],
    };
    expect(output).toEqual(expected);
  });

  it("should parse multiple lyric lines", () => {
    const input = "[00:01.00]Hello\n\n\n[00:03.00]World\n";
    const output = parser.parse(input);
    const expected = {
      type: "Lyrics",
      content: [
        {
          type: "LyricLine",
          times: [1000],
          lyric: "Hello",
        },
        {
          type: "LyricLine",
          times: [3000],
          lyric: "World",
        },
      ],
    };
    expect(output).toEqual(expected);
  });

  it("should throw error if seconds is greater than 59", () => {
    const input = "[00:60.00]Hello\n";
    expect(() => parser.parse(input)).toThrow("Invalid seconds value: 60");
  });

  it("should throw error if hundredths is greater than 99", () => {
    const input = "[00:01.100]Hello\n";
    expect(() => parser.parse(input)).toThrow("Invalid hundredths value: 100");
  });
});
