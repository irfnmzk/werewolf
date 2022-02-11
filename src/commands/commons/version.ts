import { Command, CommandContext } from "../../types";

export class VersionCommand implements Command {
  name = "version";
  alias = ["v", "ver"];

  public execute(ctx: CommandContext) {}
}
