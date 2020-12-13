import { db } from "../main";
import firebase from 'firebase';
import { User, Board, Player } from '@/models';
import store from '@/store';
export class FirebaseDataHandler {

    public createMultiPlayerBoard(user: User) {
        const boardId = Math.floor(1000 + Math.random() * 9000).toString();
        const newBoard: Board = {
            id: boardId,
            hostUser: user,
            currentTurn: Player.HOST,
        };
        db.collection("locations")
            .doc(boardId)
            .set(newBoard)
            .then(val => store.commit('updateMultiPlayerBoardCreationState', boardId));
    }

    public updateCards(cards) {
        const boardId = 8796;
        db.collection("locations")
            .doc(boardId.toString())
            .update({ boardItems: cards })
    }

    public joinBoard(boardId, guest: User) {
        console.log('empty');
        db.collection("locations")
            .doc(boardId.toString())
            .update({ guestUser: guest })
    }

    public signInAnonymously(userName: string) {
        firebase
            .auth()
            .signInAnonymously()
            .then(user => {
                user.user?.updateProfile({ displayName: userName });
                const createdUser: User = {
                    name: userName,
                    id: user.user ? user.user.uid : ''
                };
                store.commit("updateCurrentUser", createdUser);
            });
    }

}