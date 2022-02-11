import "reflect-metadata";
import * as dotenv from "dotenv";
import Container from "typedi";

import { Werewolf } from "./core/werewolf";

dotenv.config();

async function bootstrap() {
  console.log("starting application");
  const werewolf = Container.get(Werewolf);
  werewolf.start();
}

bootstrap();
