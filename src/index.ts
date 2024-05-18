import { initState } from "./agentState";
import initLoop from "./main-loop";
import { initCamera } from "./utils/camera-handler";
import { initMemoryManager } from "./utils/memory-manager";

const initialize = async () => {
  await initMemoryManager();
  await initState();
  await initCamera();

  console.log("Agent Loaded!");
  //Main Agent Loop
  initLoop();
};
initialize();
