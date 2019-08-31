import { parse, toString } from "../SpreadSheetParser";
import { ColumnAlign, DataColumn, HeaderColumn, Table } from "../Table";
import * as token from "../Token";

describe("SpreadSheetParser class", () => {
  describe("parse SpreadSheet Table", () => {
    it("parse table", () => {
      const input: token.Token[][] = [
        [
          { type: token.Type.TEXT, literal: "hoge" },
          { type: token.Type.TEXT, literal: "fuga" },
        ],
        [
          { type: token.Type.TEXT, literal: "ほげ" },
          { type: token.Type.TEXT, literal: "ふが" },
        ],
      ];

      const want = new Table();
      want.headerColumns = [
        new HeaderColumn("hoge", ColumnAlign.Left),
        new HeaderColumn("fuga", ColumnAlign.Left),
      ];
      want.rows = [[new DataColumn("ほげ"), new DataColumn("ふが")]];

      expect(parse(input)).toEqual(want);
    });

    it("cannot parse 1 line table", () => {
      const input: token.Token[][] = [
        [
          { type: token.Type.TEXT, literal: "hoge" },
          { type: token.Type.TEXT, literal: "fuga" },
        ],
      ];

      expect(() => parse(input)).toThrow();
    });

    it("cannot parse 1 column table", () => {
      const input: token.Token[][] = [
        [{ type: token.Type.TEXT, literal: "hoge" }],
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
        new HeaderColumn("fuga", ColumnAlign.Left),
      ];
      input.rows = [[new DataColumn("ほげ"), new DataColumn("ふが")]];

      const want = `hoge\tfuga
ほげ\tふが`;

      expect(toString(input)).toEqual(want);
    });
  });
});
