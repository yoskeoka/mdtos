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
    const ssTable = Table.fromSpreadSheet(inputText);
    process.stdout.write(ssTable.toMarkdown());
    process.stdout.write("\n");
  });
}
