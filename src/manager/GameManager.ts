import { Service } from "typedi";

const TICK_INTERVAL = 1000; // 1 seconds

@Service()
export class GameManager {
  public games: any[] = [];

  private _tickInterval?: NodeJS.Timer;

  constructor() {}

  public start() {
    this._tickInterval = setInterval(this._runTick, TICK_INTERVAL);
  }

  public stop() {
    clearInterval(this._tickInterval!);
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
