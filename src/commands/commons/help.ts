import { Command, CommandContext } from "../../types";

export class HelpCommand implements Command {
  name = "help";
  alias = [];

  public execute(ctx: CommandContext) {}
}
