import Container, { Service } from "typedi";
import { TelegramService } from "../core/telegram";
import { Game } from "../game/structures/Game";

const TICK_INTERVAL = 1000; // 1 seconds

@Service()
export class GameManager {
  public games: Map<number, Game> = new Map();

  private _tickInterval?: NodeJS.Timer;

  constructor() {}

  public start() {
    this._tickInterval = setInterval(this._runTick, TICK_INTERVAL);
  }

  public stop() {
    clearInterval(this._tickInterval!);
  }

  public createGame(groupId: number): Game | undefined {
    if (this.games.has(groupId)) return;

    const telegram = Container.get(TelegramService);

    const game = new Game({ id: groupId }, telegram.bot);
    this.games.set(groupId, game);

    return game;
  }

  private _runTick = () => {
    this.games.forEach((game) => {
      try {
        console.log("update game");
        game.update();
      } catch (err) {
        console.error(err);
      }
    });
  };
}
