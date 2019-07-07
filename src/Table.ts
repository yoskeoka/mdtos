import { MarkdownLexer } from "./MarkdownLexer";
import * as MarkdownParser from "./MarkdownParser";
export enum ColumnAlign {
  Left,
  Right,
  Center,
}

export class HeaderColumn {
  text: string;
  align: ColumnAlign;

  constructor(text: string, align?: ColumnAlign) {
    this.text = text;
    this.align = align ? align : ColumnAlign.Left;
  }
}

export class DataColumn {
  text: string;

  constructor(text: string) {
    this.text = text;
  }
}

export class Table {
  headerColumns: HeaderColumn[];
  rows: DataColumn[][];

  constructor() {
    this.headerColumns = [];
    this.rows = [[]];
  }

  public static fromMarkdown(input: string): Table {
    const lexer = new MarkdownLexer();
    const tokens = lexer.lex(input);
    const table = MarkdownParser.parse(tokens);
    return table;
  }

  public toMarkdown(): string {
    return MarkdownParser.toString(this);
  }
}
