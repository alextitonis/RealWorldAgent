import dotenv from "dotenv";
import { TConfig } from "../types";

dotenv.config();
const config: TConfig = {
  OPENAI_KEY: process.env.OPENAI_API_KEY as string,
  HF_API_KEY: process.env.HF_API_KEY as string,
  DEFAULT_LLM: process.env.DEFAULT_LLM as string,
  CHATGPT_MODEL: process.env.CHATGPT_MODEL as string,
  CHATGPT_LLM_KEY: "chatgpt",
  MISTRAL_LLM_KEY: "mistral",
};
export default config;
