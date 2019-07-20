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
  const mdTable = Table.fromSpreadSheet(input);
  clipboardy.writeSync(mdTable.toMarkdown());
} else {
  if (process.stdin.isTTY || process.env.STDIN === "0") {
    console.error("please give SpreadSheet text via STDIN");
    process.exit(1);
  }
  let inputText = "";
  process.stdin.on("data", function(chunk) {
    inputText += chunk;
  });

  process.stdin.on("end", function() {
    const ssTable = Table.fromSpreadSheet(inputText);
    process.stdout.write(ssTable.toMarkdown());
    process.stdout.write("\n");
  });
}
