import { Message } from "node-telegram-bot-api";

export interface CommandContext {
  [key: string]: any;
  message: Message;
}

export interface CommandInterface {
  name: string;
  alias?: string[];

  execute: (ctx: CommandContext) => void;
}
