import { parse, toString } from "../MarkdownParser";
import { ColumnAlign, DataColumn, HeaderColumn, Table } from "../Table";
import * as token from "../Token";

describe("MarkdownParser class", () => {
  describe("parse Markdown Table", () => {
    it("parse table", () => {
      const input: token.Token[][] = [
        [
          { type: token.Type.TEXT, literal: "hoge" },
          { type: token.Type.TEXT, literal: "fuga" },
          { type: token.Type.TEXT, literal: "piyo" },
          { type: token.Type.TEXT, literal: "moko" },
        ],
        [
          { type: token.Type.LALIGN, literal: "---" },
          { type: token.Type.LALIGN, literal: ":---" },
          { type: token.Type.RALIGN, literal: "---:" },
          { type: token.Type.CALIGN, literal: ":---:" },
        ],
        [
          { type: token.Type.TEXT, literal: "ほげ" },
          { type: token.Type.TEXT, literal: "ふが" },
          { type: token.Type.TEXT, literal: "ぴよ" },
          { type: token.Type.TEXT, literal: "もこ" },
        ],
      ];

      const want = new Table();
      want.headerColumns = [
        new HeaderColumn("hoge", ColumnAlign.Left),
        new HeaderColumn("fuga", ColumnAlign.Left),
        new HeaderColumn("piyo", ColumnAlign.Right),
        new HeaderColumn("moko", ColumnAlign.Center),
      ];
      want.rows = [
        [
          new DataColumn("ほげ"),
          new DataColumn("ふが"),
          new DataColumn("ぴよ"),
          new DataColumn("もこ"),
        ],
      ];

      expect(parse(input)).toEqual(want);
    });

    it("cannot parse 1 column table", () => {
      const input: token.Token[][] = [
        [{ type: token.Type.TEXT, literal: "hoge" }],
        [{ type: token.Type.LALIGN, literal: "---" }],
        [{ type: token.Type.TEXT, literal: "ほげ" }],
      ];

      expect(() => parse(input)).toThrow();
    });

    it("cannot parse 1 line header", () => {
      const input: token.Token[][] = [
        [
          { type: token.Type.TEXT, literal: "hoge" },
          { type: token.Type.TEXT, literal: "fuga" },
        ],
      ];

      expect(() => parse(input)).toThrow();
    });

    it("cannot parse no rows table", () => {
      const input: token.Token[][] = [
        [
          { type: token.Type.TEXT, literal: "hoge" },
          { type: token.Type.TEXT, literal: "fuga" },
        ],
        [
          { type: token.Type.LALIGN, literal: "---" },
          { type: token.Type.LALIGN, literal: "---" },
        ],
      ];

      expect(() => parse(input)).toThrow();
    });

    it("cannot parse zigzag table", () => {
      const input: token.Token[][] = [
        [
          { type: token.Type.TEXT, literal: "hoge" },
          { type: token.Type.TEXT, literal: "fuga" },
        ],
        [{ type: token.Type.LALIGN, literal: "---" }],
        [{ type: token.Type.TEXT, literal: "ほげ" }],
      ];

      expect(() => parse(input)).toThrow();
    });
  });

  describe("table.toString()", () => {
    it("converts table to string", () => {
      const input = new Table();
      input.headerColumns = [
        new HeaderColumn("hoge", ColumnAlign.Left),
        new HeaderColumn("fuga", ColumnAlign.Right),
        new HeaderColumn("piyo", ColumnAlign.Center),
      ];
      input.rows = [
        [
          new DataColumn("ほげ"),
          new DataColumn("ふが"),
          new DataColumn("ぴよ"),
        ],
      ];

      const want = `| hoge | fuga | piyo |
| :--- | ---: | :---: |
| ほげ | ふが | ぴよ |`;

      expect(toString(input)).toEqual(want);
    });
  });
});
