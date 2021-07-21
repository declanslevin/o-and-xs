import { MessageToFrontEnd } from "../lib/message";
import { store } from "./store";

export const handleMessage = (message: MessageEvent): void => {
  const msg: MessageToFrontEnd = JSON.parse(message.data);
  store.dispatch(msg);
  console.log("STATE = ", store.getState());
  console.log(msg);
};
