import commander from "commander";

export interface MdToSSCommand extends commander.Command {
  [key: string]: any;
  clipboard?: true;
}

export interface SSToMdCommand extends commander.Command {
  [key: string]: any;
  clipboard?: true;
}
