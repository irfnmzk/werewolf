import { Game } from "../src/game/structures/Game";
import { mockBot } from "./mocks/bot";

describe("Game", () => {
  const bot = mockBot();

  test("constructor", () => {
    const game = new Game({ id: 0 }, bot, { lobbyTime: 0, phaseDuration: 0 });

    expect(game.phase).toBe("lobby");
  });
});
