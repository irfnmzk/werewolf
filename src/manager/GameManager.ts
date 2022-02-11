import { Service } from "typedi";
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

    const game = new Game({ id: groupId });
    this.games.set(groupId, game);

    return game;
  }

  private _runTick = () => {
    this.games.forEach((game) => {
      try {
        console.log(game);
      } catch (err) {
        console.error(err);
      }
    });
  };
}
