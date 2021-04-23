export interface Card {
    id: number;
    pairCardId: number;
    isMatched: boolean;
    isFlipped: boolean;
    avatar: string;
    flex?: number;
}

export enum CardCategory {
    HUCCHA,
    CAR,
    CUSTOM
}

export interface User {
    id: string;
    name: string;
    score: number;
}

export enum Player {
    HOST,
    GUEST
}

export interface Board {
    id: string;
    hostUser: User;
    guestUser?: User;
    currentTurn: string;
    winner?: Player;
    boardItems: [];
    defaultCategory: boolean;
    requestToStartGame: boolean;
    hostRequestToStartGame: boolean;
    guestRequestToStartGame: boolean;
    deleteBoard: boolean;
}

export enum GameMode {
    NONE,
    SINGLEPLAYER,
    MULTIPLAYER
}