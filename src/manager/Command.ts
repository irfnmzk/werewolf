import TelegramBot from "node-telegram-bot-api";
import Container from "typedi";
import { TelegramService } from "../core/telegram";
import { GameManager } from "./GameManager";

export abstract class Command {
  protected bot: TelegramBot;
  protected gameManager: GameManager;

  constructor() {
    const { bot } = Container.get(TelegramService);

    this.bot = bot;
    this.gameManager = Container.get(GameManager);
  }
}
