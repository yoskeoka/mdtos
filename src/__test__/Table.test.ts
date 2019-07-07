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
});
