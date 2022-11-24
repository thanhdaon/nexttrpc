import ws from "ws";
import { applyWSSHandler } from "@trpc/server/adapters/ws";
import { routers } from "~/server/routers";
import { createContext } from "~/server/context";

const wss = new ws.Server({ port: 3001 });
const handler = applyWSSHandler({ wss, router: routers, createContext });

wss.on("connection", (ws) => {
  console.log(`[info] Connection (${wss.clients.size})`);

  ws.once("close", () => {
    console.log(`[info] Connection (${wss.clients.size})`);
  });
});

console.log("✅ WebSocket Server listening on ws://localhost:3001");

process.on("SIGTERM", () => {
  console.log("SIGTERM");
  handler.broadcastReconnectNotification();
  wss.close();
});
