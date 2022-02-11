import { Message } from "node-telegram-bot-api";
import { Service } from "typedi";
import { CommandInterface } from "../types";

@Service()
export class CommandManager {
  private commands: Map<string, CommandInterface> = new Map();

  public setup() {
    this._loadCommands();
  }

  public parse(text: string): { name: string; args: string[] } | null {
    if (!text.startsWith("/")) return null;

    const [name, ...args] = text.toLowerCase().split(" ");

    return {
      name: name.slice(1),
      args,
    };
  }

  public has(command: string) {
    return this.commands.has(command);
  }

  public execute(command: string, message: Message) {
    return this.commands.get(command)?.execute({ message });
  }

  private async _loadCommands() {
    const COMMANDS = await import("../commands");

    for (const CommandClass of Object.values(COMMANDS)) {
      const command = new CommandClass();

      this.commands.set(command.name, command);

      command.alias.forEach((item) => {
        this.commands.set(item, command);
      });
    }
  }
}
