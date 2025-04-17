import { parse } from "cookie";
import { NextFunction } from "express";
import { IncomingMessage } from "http";
import { WebSocket } from "ws";
import jwt from 'jsonwebtoken'
export default function wsMiddleware(ws:WebSocket,request:IncomingMessage,next:NextFunction){
    const cookies = parse(request.headers.cookie || '');  
    const authToken = cookies.token || cookies.Authorization;
    const sessionId = cookies['connect.sid']|| cookies.Authorization;
    console.log(cookies)
  if (!cookies || !authToken || !sessionId) {
            ws.close();
            return;
    };
    try {
      jwt.verify(
        authToken ,
        process.env.SECRET_KEY as string,
        (err: Error | null, decoded: any) => {
          if (err) {
            ws.close();
            return;
          };
          request.user=decoded
          next();
        }
      );
      
    } catch (error) {
      console.log(error);
    }
}