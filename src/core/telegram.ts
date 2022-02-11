import TelegramBot, { Message } from "node-telegram-bot-api";
import { Service } from "typedi";
import { CommandManager } from "../manager/CommandManager";

@Service()
export class TelegramService {
  public bot: TelegramBot;

  constructor(private readonly commands: CommandManager) {
    const polling = process.env.NODE_ENV !== "production";
    this.bot = new TelegramBot(process.env.TELEGRAM_TOKEN!, { polling });
  }

  public setup() {
    this._setupHandler();
  }

  private _setupHandler() {
    this.bot.on("text", this._handleText);
  }

  private _handleText = (msg: Message) => {
    if (!msg.text || !msg.text.startsWith("/")) return;

    const command = this.commands.parse(msg.text);
    if (!command) return;

    console.log(msg);

    this.commands.execute(command.name, msg);
  };
}
