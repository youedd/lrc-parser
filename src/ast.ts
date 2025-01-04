export type LyricLine = {
  type: "LyricLine";
  times: number[];
  lyric: string;
};

export type Line = LyricLine;

export type Lyrics = {
  type: "Lyrics";
  content: Line[];
};
