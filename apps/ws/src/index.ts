require("dotenv").config();
import { WebSocket, WebSocketServer } from "ws";
import { UserManager } from "./UserManager";

const wss = new WebSocketServer({ port: 8080 });
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

wss.on('connection', function connection(ws, request) {
    const url = request.url;
    if(!url){
        return;
    }
    const queryParams = new URLSearchParams(url.split('?')[1]);
    const name = queryParams.get('name');
    console.log(name);
    UserManager.getInstance().addUser(ws, name || "Anonymous", name === ADMIN_PASSWORD);

})