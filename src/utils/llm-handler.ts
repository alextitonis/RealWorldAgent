import OpenAI from "openai";
import type { TLlm, TLlmResponse } from "../types";
import { HfInference } from "@huggingface/inference";
import config from "./config";
import { ChatCompletionToolChoiceOption } from "openai/resources";

let llm: TLlm = null;
const usedLlm = config.DEFAULT_LLM;

export const initLlm = () => {
  if (usedLlm === config.CHATGPT_LLM_KEY) {
    llm = new OpenAI({
      apiKey: config.OPENAI_KEY,
    });
  } else if (usedLlm === config.MISTRAL_LLM_KEY) {
    llm = new HfInference(config.HF_API_KEY);
  } else {
    throw "Unsuported LLM!";
  }
};
export const doCompletion = async (
  messages: string[],
  tools?: any[],
  tool_choice = "none",
  maxTokens = 10000,
  repetitionPenalty = 1.2
): Promise<TLlmResponse> => {
  if (!llm) {
    initLlm();
  }

  const response: TLlmResponse = {
    content: "",
    tools_calls: [],
  };

  if (usedLlm === config.CHATGPT_LLM_KEY) {
    const chatGptResp = await (llm as OpenAI)?.chat.completions.create({
      model: config.CHATGPT_MODEL,
      messages: messages as any,
      tools,
      tool_choice: tool_choice as ChatCompletionToolChoiceOption,
    });
    response.content = chatGptResp.choices[0].message.content;
    response.tools_calls = chatGptResp.choices[0].message.tool_calls;
  } else if (usedLlm === config.MISTRAL_LLM_KEY) {
    const hfResp = await (llm as HfInference).textGeneration({
      model: "mistralai/Mistral-7B-Instruct-v0.1",
      inputs: messages[0],
      parameters: {
        max_new_tokens: maxTokens,
        return_full_text: false,
        repe: repetitionPenalty,
      },
    });
    response.content = hfResp.generated_text;
  }

  return response;
};
