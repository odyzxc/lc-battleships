import { Agent } from "@livechat/lc-sdk-js";
import dotenv from "dotenv";
import { isValidPosition } from "./utils/utils";
import GameManager from "./game/GameManager";
import MockBoardGenerator from "./game/MockBoardGenerator";
import UrlBoardEncoder from "./game/UrlBoardEncoder";

dotenv.config();

const { IncomingEvent, IncomingChat } = Agent.Objects.Pushes;
const agentAPI = new Agent.RTM();

(async () => {
  try {
    await agentAPI.connect();
  } catch (error) {
    console.log({ error1: error });
  }

  try {
    await agentAPI.login(`Bearer ${process.env.ACCESS_TOKEN}`);
  } catch (error) {
    console.log({ error2: error });
  }

  const mockBoardGenerator = new MockBoardGenerator();
  const boardTransformer = new UrlBoardEncoder();
  const gameManager = new GameManager(mockBoardGenerator, boardTransformer);

  agentAPI.on(IncomingEvent, (payload) => {
    console.log({ payload });
    const { chat_id, thread_id, event } = payload as any;
    const customerMessage = event.text;
    if (isValidPosition(customerMessage)) {
      const gameResponse = gameManager.playTurn(thread_id, customerMessage);
      const message = `${gameResponse.events.join(" ")} Current game board: ${
        gameResponse.boardState
      }`;
      agentAPI.sendEvent(chat_id, {
        author_id: "",
        created_at: "",
        id: "",
        recipients: "",
        type: "message",
        text: message,
      });
    }
  });

  process.on("SIGTERM", async () => {
    await agentAPI.logout();
  });
})();
