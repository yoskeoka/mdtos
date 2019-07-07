import { SpreadSheetLexer } from "../SpreadSheetLexer";
import * as token from "../Token";
describe("SpreadSheetLexer class", () => {
  let ssl: SpreadSheetLexer;

  beforeAll(async () => {
    const { SpreadSheetLexer } = await import("../SpreadSheetLexer");
    ssl = new SpreadSheetLexer();
  });

  describe("lex SpreadSheet Table", () => {
    it("lex table", () => {
      const input = `
      hoge	fuga
      ほげ	ふが
      `;
      const want: token.Token[][] = [
        [
          { type: token.Type.TEXT, literal: "hoge" },
          { type: token.Type.TEXT, literal: "fuga" },
        ],
        [
          { type: token.Type.TEXT, literal: "ほげ" },
          { type: token.Type.TEXT, literal: "ふが" },
        ],
      ];

      expect(ssl.lex(input)).toEqual(want);
    });
  });
});
