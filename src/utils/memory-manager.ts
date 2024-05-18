import { TMessage } from "../types";
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { OpenAIEmbeddings } from "@langchain/openai";
import { Document, type DocumentInput } from "@langchain/core/documents";
import config from "./config";

const messages: TMessage[] = [];
const embedder = new OpenAIEmbeddings({ apiKey: config.OPENAI_KEY });
const vectorStore = new FaissStore(embedder, {});

export const initMemoryManager = async () => {};

export const addMessage = async (sender: string, content: string) => {
  const messageString = `${sender}: ${content}`;
  const vector = await embedder.embedQuery(messageString);
  const timestamp = Date.now();
  const baseMesage = { sender, content, timestamp };
  messages.push({ ...baseMesage, vector });
  vectorStore.addVectors(
    [vector],
    [
      new Document({
        pageContent: messageString,
        metadata: {
          type: "Chat Message",
        },
      } as DocumentInput),
    ]
  );
};

export const search = async (query: string, k = 1) => {
  const docs = await vectorStore.similaritySearch(query, k);
  return docs;
};
