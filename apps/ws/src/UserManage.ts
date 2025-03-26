import { WebSocket } from "ws";
import { OutgoingMessages } from "./types";
import { User } from "./User";

let ID = 1;

export class UserManager {
  private _users: User[] = [];
  private static _instance: UserManager;

  private constructor() {}

  public static getInstance() {
    if (!this._instance) {
      this._instance = new UserManager();
    }
    return this._instance;
  }

  addUser(ws: WebSocket, name: string) {
    let id = ID;
    this._users.push(new User(
      id,
      name,
      ws
    ));

    ws.on("close", () => this.removeUser(id));
    ID++;
  }

  removeUser(id: number) {
    this._users.filter((user) => user.id !== id);
  }

  /*
   * Broadcast message to everyone who has joined
   * If userId is an input don;t send message to them
   */
  broadcast(message: OutgoingMessages, userId: number) {
    this._users.forEach(({ id, ws }) => {
      if (userId != id) {
        ws.send(JSON.stringify(message));
      }
    });
  }
}
