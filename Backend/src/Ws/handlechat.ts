import { IncomingMessage } from "http";
import WebSocket, { RawData } from "ws";
import { DbConnect } from "../db";
import { parse } from "url";
type ClientInfo = {
  userId: number;
  ws: WebSocket;
};

const conversationClients = new Map<number, Array<ClientInfo>>();
export async function handleChat(ws: WebSocket, request: IncomingMessage) {
  await DbConnect();
  const { query } = parse(request.url!, true);
  const conversationId = query.conversationId;
  const userId = Number.parseInt(request.user?.id as string);
  const user = await prisma?.user.findUnique({
    where: {
      id: Number.parseInt(request.user?.id as string),
    },
  });
  
  const conversation = await prisma?.conversation.findUnique({
    where: {
      id: Number(conversationId),
    },
  });

  if (!conversation || !user) {
    ws.close();
    return;
  }

  if (!conversationClients.has(conversation.id)) {
    if (
      !(conversationClients.get(conversation.id)?.length == 2) ||
      conversation.isGroup
    )
      conversationClients.set(conversation.id, []);
  }
  conversationClients.get(conversation.id)?.push({userId,ws});

  ws.on("message", (msg) => {
    if (msg instanceof Buffer) msg.toString();
    broadcastToRoom(msg);
  });

  const broadcastToRoom = async (msg: RawData) => {
    const clients = conversationClients.get(conversation.id);

    if (!clients) return;
    const sender = clients.find((c) => c.ws === ws);
    try {
      await prisma?.message.create({
        data: {
          conversationId: conversation.id,
          senderId: Number(sender?.userId),
          content: msg.toString(),
        },
      });
    } catch (error) {}

    clients.forEach((element) => {
      element.ws.send(msg.toString());
    });
  };
}
