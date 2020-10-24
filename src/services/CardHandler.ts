import { Card, CardCategory } from '@/models';

export class CardHandler {
    private _cards: Card[] = [];

    public get cards() {
        return this._cards;
    }

    public createCardDeck(category: CardCategory) {

    }
}