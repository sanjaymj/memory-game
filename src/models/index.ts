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
    currentTurn: String;
    winner?: Player;
    boardItems: [];
}