import { Service } from "typedi";
import { Server } from "./server";
import { TelegramService } from "./telegram";
import { Command } from "../types";

@Service()
export class Werewolf {
  private commands: Map<string, Command> = new Map();

  constructor(
    private readonly server: Server,
    private readonly telegram: TelegramService
  ) {
    this._loadCommands();
  }

  public start() {
    this.telegram.setup();
    this.server.start();
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

    console.log(this.commands.size);
  }
}
