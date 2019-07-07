import * as token from "./Token";

export class SpreadSheetLexer {
  public lex(input: string): token.Token[][] {
    return input
      .split("\n")
      .map(line => line.trim())
      .filter(line => line.length !== 0)
      .map(this.lexLine);
  }

  private lexLine(line: string): token.Token[] {
    const splited = line.split(/\t/);
    return splited
      .filter(t => t.length !== 0)
      .map(t => t.trim())
      .map(t => {
        return { literal: t, type: token.Type.TEXT };
      });
  }
}
