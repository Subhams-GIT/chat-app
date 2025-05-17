import { WebSocketServer } from "ws";
import { handleChat } from "./handlechat";
import wsMiddleware from "../wsMiddleware";
import http from "http";

const PORT=8080
const server = http.createServer();
const wss = new WebSocketServer({ server });

wss.on("connection", (ws, request) => {
  wsMiddleware(ws, request, () => {
    handleChat(ws, request);
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
})