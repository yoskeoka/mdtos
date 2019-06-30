import { parse } from "../MarkdownParser";
import { ColumnAlign, DataColumn, HeaderColumn, Table } from "../Table";
import * as token from "../Token";

describe("MarkdownParser class", () => {
  describe("parse Markdown Table", () => {
    it("parse table", () => {
      const input: token.Token[][] = [
        [
          { type: token.Type.TEXT, literal: "hoge" },
          { type: token.Type.TEXT, literal: "fuga" },
        ],
        [
          { type: token.Type.LALIGN, literal: "---" },
          { type: token.Type.LALIGN, literal: "---" },
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
  });
});
