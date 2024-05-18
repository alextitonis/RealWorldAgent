import dotenv from "dotenv";
import { TConfig } from "../types";

dotenv.config();
const config: TConfig = {
  OPENAI_KEY: process.env.OPENAI_API_KEY as string,
};
export default config;
