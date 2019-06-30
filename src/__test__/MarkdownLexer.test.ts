import { MarkdownLexer } from "../MarkdownLexer";
import * as token from "../Token";
describe("MarkdownLexer class", () => {
  let ml: MarkdownLexer;

  beforeAll(async () => {
    const { MarkdownLexer } = await import("../MarkdownLexer");
    ml = new MarkdownLexer();
  });

  describe("lex Markdown Table", () => {
    it("lex texts row", () => {
      const input = "| hoge | fuga | ";
      const want: token.Token[][] = [
        [
          { type: token.Type.TEXT, literal: "hoge" },
          { type: token.Type.TEXT, literal: "fuga" },
        ],
      ];
      expect(ml.lex(input)).toEqual(want);
    });

    it("lex align row", () => {
      const input = "| :--- | :---: | ---: | --- |";
      const want: token.Token[][] = [
        [
          { type: token.Type.LALIGN, literal: ":---" },
          { type: token.Type.CALIGN, literal: ":---:" },
          { type: token.Type.RALIGN, literal: "---:" },
          { type: token.Type.LALIGN, literal: "---" },
        ],
      ];
      expect(ml.lex(input)).toEqual(want);
    });

    it("lex table", () => {
      const input = `
      | hoge | fuga |
      | --- | --- |
      | ほげ | ふが |
      `;
      const want: token.Token[][] = [
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

      expect(ml.lex(input)).toEqual(want);
    });
  });
});
