import { Table } from "../Table";
describe("Table class", () => {
  describe("write Markdown Table", () => {
    it("converts to markdown table string", () => {
      const t = Table.fromMarkdown(`
      | hoge | fuga |
      | :--- | :--- |
      | ほげ | ふが |
      `);

      expect(t.toMarkdown()).toEqual(`| hoge | fuga |
| :--- | :--- |
| ほげ | ふが |`);
    });
  });

  describe("convert each", () => {
    it("reads markdown, writes spread sheet", () => {
      const t = Table.fromMarkdown(`
      | hoge | fuga |
      | :--- | :--- |
      | ほげ | ふが |
      `);

      const want = `hoge\tfuga
ほげ\tふが`;

      expect(t.toSpreadSheet()).toEqual(want);
    });

    it("reads spread sheet, writes markdown", () => {
      const t = Table.fromSpreadSheet(`
      hoge\tfuga
      ほげ\tふが
      `);

      const want = `| hoge | fuga |
| :--- | :--- |
| ほげ | ふが |`;

      expect(t.toMarkdown()).toEqual(want);
    });
  });
});
