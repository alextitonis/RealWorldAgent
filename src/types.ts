import type { HfInference } from "@huggingface/inference";
import type OpenAI from "openai";
import type { ChatCompletionMessageToolCall } from "openai/resources";

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
  HF_API_KEY: string;
  DEFAULT_LLM: string;
  CHATGPT_MODEL: string;
  CHATGPT_LLM_KEY: string;
  MISTRAL_LLM_KEY: string;
};

export type TLlm = OpenAI | HfInference | null;
export type TLlmResponse = {
  content: string | null;
  tools_calls: ChatCompletionMessageToolCall[] | undefined;
};
