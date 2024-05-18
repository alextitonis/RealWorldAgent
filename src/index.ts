import { initState } from "./agentState";
import initLoop from "./main-loop";
import { initCamera } from "./utils/camera-handler";
import { initLlm } from "./utils/llm-handler";
import { initMemoryManager } from "./utils/memory-manager";

const initialize = async () => {
  await initMemoryManager();
  await initLlm();
  await initState();
  await initCamera();

  console.log("Agent Loaded!");
  //Main Agent Loop
  initLoop();
};
initialize();
