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
