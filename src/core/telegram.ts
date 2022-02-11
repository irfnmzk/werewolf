import TelegramBot from "node-telegram-bot-api";
import { Service } from "typedi";

@Service()
export class TelegramService {
  public bot: TelegramBot;

  constructor() {
    const polling = process.env.NODE_ENV !== "production";
    this.bot = new TelegramBot(process.env.TELEGRAM_TOKEN!, { polling });
  }

  public setup() {
    this._setupHandler();
  }

  private _setupHandler() {
    this.bot.on("text", (ctx) => {
      this.bot.sendMessage(ctx.chat.id, "hello");
    });
  }
}
