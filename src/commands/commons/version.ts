import { version } from "../../../package.json";

import { Command } from "../../manager/Command";
import { CommandInterface, CommandContext } from "../../types";

export class VersionCommand extends Command implements CommandInterface {
  name = "version";
  alias = ["v", "ver"];

  public execute(ctx: CommandContext) {
    const { chat } = ctx.message;
    const message = `version ${version}`;

    this.bot.sendMessage(chat.id, message);
  }
}
