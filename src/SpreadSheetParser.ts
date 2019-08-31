import { DataColumn, HeaderColumn, Table } from "./Table";
import * as token from "./Token";

export function parse(tokenBlocks: token.Token[][]): Table {
  const table = new Table();

  table.headerColumns = parseHeader(tokenBlocks[0]);
  table.rows = parseRows(tokenBlocks.slice(1));

  return table;
}

export function toString(table: Table): string {
  const lines: string[] = [];

  const headerTexts = table.headerColumns.map(c => c.text).join("\t");
  lines.push(headerTexts);

  table.rows.forEach(row => lines.push(row.map(cell => cell.text).join("\t")));

  return lines.join("\n");
}

function parseHeader(headerTokens: token.Token[]): HeaderColumn[] {
  if (headerTokens.length < 2) {
    throw new Error("SpreadSheet must have more than 1 column for header");
  }

  const cols: HeaderColumn[] = [];

  for (let headerToken of headerTokens) {
    const matches = /(.+)/.exec(headerToken.literal);
    if (matches) {
      const headerText = matches[0];
      const col = new HeaderColumn(headerText);
      cols.push(col);
    }
  }
  return cols;
}

function parseRows(tokenBlocks: token.Token[][]): DataColumn[][] {
  if (tokenBlocks.length === 0) {
    throw new Error("SpreadSheet has no rows");
  }

  const rows: DataColumn[][] = [];

  for (let rowTokens of tokenBlocks) {
    const row: DataColumn[] = [];

    for (let cellToken of rowTokens) {
      row.push(new DataColumn(cellToken.literal));
    }

    rows.push(row);
  }

  return rows;
}
