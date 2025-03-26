export type OutgoingMessages = {
    type: 'bet'
}

export type GameState = "people-can-bet" | "people-cant-bet" | "game-over";

export type COINS = 1 | 5 | 10 | 25 | 50 | 100 | 250 | 500 | 1000; 