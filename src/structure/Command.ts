import TelegramBot from "node-telegram-bot-api";
import Container from "typedi";
import { TelegramService } from "../core/telegram";

export abstract class Command {
  protected bot: TelegramBot;

  constructor() {
    const { bot } = Container.get(TelegramService);

    this.bot = bot;
  }
}
