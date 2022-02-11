import { Command } from "../../manager/Command";
import { CommandInterface, CommandContext } from "../../types";

export class HelpCommand extends Command implements CommandInterface {
  name = "help";
  alias = [];

  public execute(ctx: CommandContext) {
    this.bot.sendMessage(ctx.message.chat.id, "hallo");
  }
}
