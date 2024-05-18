import { TAgentState, Emotion } from "./types";
import getLocation from "./utils/location-finder";

export const agentState: TAgentState = {
  current_action: "",
  location: {
    longitude: 0,
    latitude: 0,
    name: "",
  },
  emotion: Emotion.Neutral,
};

export const initState = async () => {
  agentState.location = await getLocation();
};
