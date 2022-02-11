export interface CommandContext {
  [key: string]: any;
}

export interface Command {
  name: string;
  alias?: string[];

  execute: (ctx: CommandContext) => void;
}
