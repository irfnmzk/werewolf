import TelegramBot from "node-telegram-bot-api";
import Container from "typedi";
import { TelegramService } from "../../core/telegram";

export type GamePhase = "lobby" | "night" | "day" | "dusk";

export interface GameSetting {
  phaseDuration: number; // in seconds
  lobbyTime: number; // in seconds
}

export interface GroupChat {
  id: string;
}

export const DefaultGameSetting: GameSetting = {
  lobbyTime: 10,
  phaseDuration: 10, // in seconds
};

export class Game {
  public phase: GamePhase = "lobby";

  public started: boolean = false;

  // create all necessary data
  public gameCreated: number = Date.now();
  public gameStarted: number = Date.now();
  public phaseStarted: number = Date.now();

  private bot: TelegramBot;

  constructor(
    public readonly group: GroupChat,
    public readonly setting: GameSetting = DefaultGameSetting
  ) {
    const telgram = Container.get(TelegramService);

    this.bot = telgram.bot;
  }

  public update() {
    const phase = this.phase;

    if (phase === "lobby") return this._updateLobby();
  }

  private _updateLobby() {
    if (this.started) return;

    const diff = Math.floor((Date.now() - this.gameCreated) / 1000);
    const secondRemain = this.setting.lobbyTime - diff;

    const timeStamp = [60, 30, 10, 5, 3, 2, 1];
    if (timeStamp.includes(secondRemain)) {
      this.bot.sendMessage(
        this.group.id,
        `Game akan di mulai dalam ${secondRemain} detik`
      );
    }
  }
}
