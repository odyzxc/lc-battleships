import { Agent } from "@livechat/lc-sdk-js";

const { IncomingEvent, IncomingChat } = Agent.Objects.Pushes;
const agentAPI = new Agent.RTM();

(async () => {
  try {
    await agentAPI.connect();
  } catch (error) {
    console.log({ error1: error });
  }

  try {
    await agentAPI.login("Bearer dal:Zu-g9LxLbW2dD8X6rfhW3A_2a-4");
  } catch (error) {
    console.log({ error2: error });
  }

  agentAPI.on(IncomingEvent, (payload) => {
    console.log({ payload });
    const { chat_id } = payload as any;
    console.log({ chat_id });
    agentAPI.sendEvent(chat_id, {
      author_id: "",
      created_at: "",
      id: "",
      recipients: "",
      type: "message",
      text: "bot resp",
    });
  });

  //await agentAPI.logout();
})();
