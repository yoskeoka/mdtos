import { ColumnAlign, DataColumn, HeaderColumn, Table } from "./Table";
import * as token from "./Token";

export function parse(tokenBlocks: token.Token[][]): Table {
  const table = new Table();

  table.headerColumns = parseHeader(tokenBlocks);
  table.rows = parseRows(tokenBlocks.slice(2));

  return table;
}

function parseHeader(tokenBlocks: token.Token[][]): HeaderColumn[] {
  const headerTexts = tokenBlocks[0];
  const headerAligns = tokenBlocks[1];
  const colLen = headerTexts.length;

  const cols: HeaderColumn[] = [];
  for (let i = 0; i < colLen; i++) {
    const col = new HeaderColumn(headerTexts[i].literal);
    switch (headerAligns[i].type) {
      case token.Type.LALIGN:
        col.align = ColumnAlign.Left;
        break;
      case token.Type.CALIGN:
        col.align = ColumnAlign.Center;
        break;
      case token.Type.RALIGN:
        col.align = ColumnAlign.Right;
        break;
    }
    cols.push(col);
  }
  return cols;
}

function parseRows(tokenBlocks: token.Token[][]): DataColumn[][] {
  const rows: DataColumn[][] = [];

  for (let ri = 0; ri < tokenBlocks.length; ri++) {
    const row: DataColumn[] = [];

    for (let ci = 0; ci < tokenBlocks[ri].length; ci++) {
      row.push(new DataColumn(tokenBlocks[ri][ci].literal));
    }

    rows.push(row);
  }

  return rows;
}
