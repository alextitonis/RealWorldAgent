export type TAgentState = {
  current_action: TAgentAction;
  location: TLocation;
  emotion: Emotion;
};

export type TAgentAction = string;
export type TLocation = {
  longitude: number;
  latitude: number;
  name: string;
};

export type TCameraFrame = {
  buffer: Buffer;
  width: number;
  height: number;
};

export type TMessage = {
  sender: string;
  content: string;
  timestamp: number;
  vector: number[];
};

export enum Emotion {
  Neutral = 0,
  Happy = 1,
  Sad = 2,
}

export type TConfig = {
  OPENAI_KEY: string;
};
