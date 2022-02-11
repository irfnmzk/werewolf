import { Service } from "typedi";
import { Server } from "./server";
import { TelegramService } from "./telegram";
import { GameManager } from "../structure/GameManager";
import { CommandManager } from "../structure/CommandManager";

@Service()
export class Werewolf {
  constructor(
    private readonly server: Server,
    private readonly telegram: TelegramService,
    private readonly commandManager: CommandManager,
    private readonly gameManager: GameManager
  ) {}

  public start() {
    this.telegram.setup();
    this.commandManager.setup();

    this.server.start();
    this.gameManager.start();
  }
}
