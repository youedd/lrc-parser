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

  it("should parse a title info line", () => {
    const input = "[ti:Hello]";
    const output = parser.parse(input);
    const expected = {
      type: "Lyrics",
      content: [
        {
          type: "InfoLine",
          tag: "ti",
          value: "Hello",
        },
      ],
    };
    expect(output).toEqual(expected);
  });

  it("should parse artist info line", () => {
    const input = "[ar:John Doe]";
    const output = parser.parse(input);
    const expected = {
      type: "Lyrics",
      content: [
        {
          type: "InfoLine",
          tag: "ar",
          value: "John Doe",
        },
      ],
    };
    expect(output).toEqual(expected);
  });

  it("should parse album info line", () => {
    const input = "[al:Name]";
    const output = parser.parse(input);
    const expected = {
      type: "Lyrics",
      content: [
        {
          type: "InfoLine",
          tag: "al",
          value: "Name",
        },
      ],
    };
    expect(output).toEqual(expected);
  });

  it("should parse author info line", () => {
    const input = "[au:John Doe]";
    const output = parser.parse(input);
    const expected = {
      type: "Lyrics",
      content: [
        {
          type: "InfoLine",
          tag: "au",
          value: "John Doe",
        },
      ],
    };
    expect(output).toEqual(expected);
  });

  it("should parse lyric author info line", () => {
    const input = "[by:John Doe]";
    const output = parser.parse(input);
    const expected = {
      type: "Lyrics",
      content: [
        {
          type: "InfoLine",
          tag: "by",
          value: "John Doe",
        },
      ],
    };
    expect(output).toEqual(expected);
  });

  it("should parse lyric editor info line with re tag", () => {
    const input = "[re:editor]";
    const output = parser.parse(input);
    const expected = {
      type: "Lyrics",
      content: [
        {
          type: "InfoLine",
          tag: "re",
          value: "editor",
        },
      ],
    };
    expect(output).toEqual(expected);
  });

  it("should parse lyric editor info line with tool tag", () => {
    const input = "[tool:editor]";
    const output = parser.parse(input);
    const expected = {
      type: "Lyrics",
      content: [
        {
          type: "InfoLine",
          tag: "tool",
          value: "editor",
        },
      ],
    };
    expect(output).toEqual(expected);
  });

  it("should parse lyric editor version info line", () => {
    const input = "[ve:version]";
    const output = parser.parse(input);
    const expected = {
      type: "Lyrics",
      content: [
        {
          type: "InfoLine",
          tag: "ve",
          value: "version",
        },
      ],
    };
    expect(output).toEqual(expected);
  });

  it("should parse comments info line", () => {
    const input = "[#:comments]";
    const output = parser.parse(input);
    const expected = {
      type: "Lyrics",
      content: [
        {
          type: "InfoLine",
          tag: "#",
          value: "comments",
        },
      ],
    };
    expect(output).toEqual(expected);
  });
});
