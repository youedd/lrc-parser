export type LyricLine = {
  type: "LyricLine";
  times: number[];
  lyric: string;
};

export type TitleInfoLine = {
  type: "TitleInfoLine";
  value: string;
};

export type InfoLine = TitleInfoLine;

export type Line = LyricLine | InfoLine;

export type Lyrics = {
  type: "Lyrics";
  content: Line[];
};
