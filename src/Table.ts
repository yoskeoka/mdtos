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
}
