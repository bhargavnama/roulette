import { WebSocket, WebSocketServer } from "ws";
import { UserManager } from "./UserManage";

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws, request) {
    const url = request.url;
    const queryParams = new URLSearchParams(url.split('?')[1]);
    const name = queryParams.get('name');
    UserManager.getInstance().addUser(ws, name);
    

    wss.on('message', function message(data){
        console.log('Recieved : %s', data);
    })

    ws.send('something');
})