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
  .option("-s, --silent", "do not show messages", false)
  .parse(process.argv) as commanderex.TConvCommand;

const showMessage = (msg: string) => {
  if (command.silent) return;
  console.info(msg);
};

// check STDIN first
if (!process.stdin.isTTY && process.env.STDIN !== "0") {
  let inputText = "";
  process.stdin.on("data", function(chunk) {
    inputText += chunk;
  });

  process.stdin.on("end", function() {
    if (Table.isMarkdown(inputText)) {
      const mdTable = Table.fromMarkdown(inputText);
      showMessage("read Markdown Table from STDIN");
      showMessage("write SpreadSheet Table to STDOUT");
      process.stdout.write(mdTable.toSpreadSheet());
      process.stdout.write("\n");
      process.exit(0);
    }

    if (Table.isSpreadSheet(inputText)) {
      const ssTable = Table.fromSpreadSheet(inputText);
      showMessage("read SpreadSheet Table from STDIN");
      showMessage("write Markdown Table to STDOUT");
      process.stdout.write(ssTable.toMarkdown());
      process.stdout.write("\n");
      process.exit(0);
    }

    showMessage("tconv did not find any supported table format on STDIN");
  });

  process.exit(0);
}

// try read clipboard
const input = clipboardy.readSync();

if (Table.isMarkdown(input)) {
  const mdTable = Table.fromMarkdown(input);
  showMessage("read Markdown Table from Clipboard");
  showMessage("write SpreadSheet Table to Clipboard");
  clipboardy.writeSync(mdTable.toSpreadSheet());
  process.exit(0);
}

if (Table.isSpreadSheet(input)) {
  const ssTable = Table.fromSpreadSheet(input);
  showMessage("read SpreadSheet Table from Clipboard");
  showMessage("write Markdown Table to Clipboard");
  clipboardy.writeSync(ssTable.toMarkdown());
  process.exit(0);
}

showMessage("tconv did not find any supported table format on Clipboard");
