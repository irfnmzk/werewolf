import { Service } from "typedi";
import express, { Application, Request, Response } from "express";
import { TelegramService } from "./telegram";

@Service()
export class Server {
  public app: Application;

  constructor(private readonly telegram: TelegramService) {
    this.app = express();
    this.app.use(express.json);

    this.setupRouter();
  }

  public start() {
    const PORT = process.env.PORT || 3000;
    this.app.listen(PORT, () => {
      console.log("server listening on port ", PORT);
    });
  }

  private setupRouter() {
    this.app.post("/webhook", this.handleWebhook);
  }

  private handleWebhook = async (req: Request, res: Response) => {
    const { body } = req;

    this.telegram.bot.processUpdate(body);
    return res.send("success");
  };
}
