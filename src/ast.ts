export type LyricLine = {
  type: "LyricLine";
  times: number[];
  lyric: string;
};

export type InfoLine =
  | {
      type: "InfoLine";
      tag: "ti" | "ar" | "al" | "au" | "by" | "re" | "tool" | "ve" | "#";
      value: string;
    }
  | {
      type: "InfoLine";
      tag: "offset" | "length";
      value: number;
    };
export type Line = LyricLine | InfoLine;

export type Lyrics = {
  type: "Lyrics";
  content: Line[];
};
