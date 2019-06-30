import * as token from "./Token";

export class MarkdownLexer {
  public lex(input: string): token.Token[][] {
    return input.split("\n").map(line => {
      const splited = line.split(/ ?\| ?/);
      return splited
        .filter(t => t.length !== 0)
        .map(t => t.trim())
        .filter(t => t !== "|")
        .map(t => {
          if (t.match(/:\-{3,}:/)) {
            return { literal: t, type: token.Type.CALIGN };
          }
          if (t.match(/-{3,}:/)) {
            return { literal: t, type: token.Type.RALIGN };
          }
          if (t.match(/:?\-{3,}/)) {
            return { literal: t, type: token.Type.LALIGN };
          }
          return { literal: t, type: token.Type.TEXT };
        });
    });
  }
}
