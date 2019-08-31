import commander from "commander";

export interface MdToSSCommand extends commander.Command {
  [key: string]: any;
  clipboard: boolean;
}

export interface SSToMdCommand extends commander.Command {
  [key: string]: any;
  clipboard: boolean;
}

export interface TConvCommand extends commander.Command {
  [key: string]: any;
  silent: boolean;
}
