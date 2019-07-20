import clipboardy from "clipboardy";
import program from "commander";
import * as fs from "fs";
import { Table } from "../Table";
import commanderex from "./commanderex";

const packageJson = JSON.parse(
  fs.readFileSync(__dirname + "/../../package.json").toString()
);

const command = program
  .version(packageJson.version)
  .option("-c, --clipboard", "convert clipboard", false)
  .parse(process.argv) as commanderex.MdToSSCommand;

if (command.clipboard) {
  const input = clipboardy.readSync();
  const mdTable = Table.fromMarkdown(input);
  clipboardy.writeSync(mdTable.toSpreadSheet());
} else {
  if (process.stdin.isTTY || process.env.STDIN === "0") {
    console.error("please give Markdown Table text via STDIN");
    process.exit(1);
  }

  let inputText = "";
  process.stdin.on("data", function(chunk) {
    inputText += chunk;
  });

  process.stdin.on("end", function() {
    const mdTable = Table.fromMarkdown(inputText);
    process.stdout.write(mdTable.toSpreadSheet());
    process.stdout.write("\n");
  });
}
