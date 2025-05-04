import "express-session";

// types/ws.d.ts or a global.d.ts file
import type * as IncomingMessage from 'node:http';
import WebSocket = require("ws");
declare module "express-session" {
  interface SessionData {
    user: {
      id: string;
      username: string;
      email: string;
      verifycode:Number;
      Verified:boolean

    };
  }
}


declare module 'node:http' {
  interface  IncomingMessage{
    user?: {
      id: string;
    },
    conversationId:number
  }
}

/// <reference types="@clerk/express/env" />
