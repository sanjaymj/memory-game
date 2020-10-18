export interface Card {
    id: number;
    pairCardId: number;
    isMatched: boolean;
    isFlipped: boolean;
    avatar: String;
    flex?: number;
}