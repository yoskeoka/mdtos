export enum Type {
  Illegal = "ILLEGAL",
  EOF = "EOF",

  TEXT = "TEXT",
  CALIGN = "CALIGN",
  LALIGN = "LALIGN",
  RALIGN = "RALIGN",
  DASH = "DASH",
  ESCAPE = "ESCAPE",
}

export type Token = {
  type: Type;
  literal: string;
};
