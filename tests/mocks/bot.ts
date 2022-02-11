import { mock } from "jest-mock-extended";
import TelegramBot from "node-telegram-bot-api";

export function mockBot() {
  const bot = mock<TelegramBot>();

  return bot;
}
