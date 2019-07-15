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
  const rows: DataColumn[][] = [];

  for (let rowTokens of tokenBlocks) {
    const row: DataColumn[] = [];

    for (let cellToken of rowTokens) {
      const matches = /(.+)/.exec(cellToken.literal);
      if (matches) {
        const cellText = matches[0];
        row.push(new DataColumn(cellText));
      }
    }

    rows.push(row);
  }

  return rows;
}
