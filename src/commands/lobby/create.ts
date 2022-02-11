import { Command } from "../../manager/Command";
import { CommandInterface, CommandContext } from "../../types";

export class CreateGameCommand extends Command implements CommandInterface {
  name = "creategame";
  alias = ["create"];

  public execute(ctx: CommandContext) {
    const { chat } = ctx.message;
    const ONLY_GROUPS = ["group", "supergroup"];

    if (!ONLY_GROUPS.includes(chat.type)) {
      return this.bot.sendMessage(
        chat.id,
        "perintah hanya bisa di lakukan di group"
      );
    }

    const game = this.gameManager.createGame(chat.id);

    if (!game) {
      return this.bot.sendMessage(chat.id, "Tidak dapat membuat game kembali");
    }

    this.bot.sendMessage(chat.id, "Game berhasil di buat");
  }
}
