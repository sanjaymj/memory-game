import { db } from "../main";
import firebase from 'firebase';
import { User, Board, Player } from '@/models';
import store from '@/store';

export class FirebaseDataHandler {
    public createMultiPlayerBoard(user: User, boardContent) {
        const boardId = Math.floor(1000 + Math.random() * 9000).toString();
        const newBoard: Board = {
            id: boardId,
            hostUser: user,
            currentTurn: user.name,
            boardItems: boardContent
        };
        console.dir(newBoard);
        db.collection("locations")
            .doc(boardId)
            .set(newBoard)
            .then(val => {
                store.commit('updateMultiPlayerBoardCreationState', boardId);
                store.commit("setDefaultMode", true);

                this.getBoardContent(boardId);
            }
            );
    }

    public updateCards(cards, boardId) {
        db.collection("locations")
            .doc(boardId.toString())
            .update({ boardItems: cards })
    }

    public updateScore(param: string, cards: any, boardId) {

        if (param == "guestUser") {
            db.collection("locations")
                .doc(boardId.toString())
                .update({ guestUser: cards })
        } else {
            db.collection("locations")
                .doc(boardId.toString())
                .update({ hostUser: cards })
        }

    }

    public joinBoard(boardId, guest: User) {
        console.log(boardId);
        db.collection("locations")
            .doc(boardId.toString())
            .update({ guestUser: guest })
            .then(val => {
                console.log("here1!!!!!!!!!");
                store.commit('updateMultiPlayerBoardCreationState', boardId);
                this.getBoardContent(boardId);
            }
            );

    }

    public signInAnonymously(userName: string) {
        firebase
            .auth()
            .signInAnonymously()
            .then(user => {
                user.user?.updateProfile({ displayName: userName });
                const createdUser: User = {
                    name: userName,
                    id: user.user ? user.user.uid : '',
                    score: 0
                };
                console.log(createdUser);
                store.commit("updateCurrentUser", createdUser);
            });
    }

    public getBoardContent(boardId) {
        console.log("getting board content ", boardId);
        db.collection("locations").doc(boardId.toString()).onSnapshot((val) => {

            if (val.data()!["boardItems"] != undefined) {
                store.commit("updateBoardContent", val.data()!["boardItems"]);
            }
            if (val.data()!["guestUser"] != undefined) {
                store.commit("updateGuestUser", val.data()!["guestUser"]);
            }
            if (val.data()!["hostUser"] != undefined) {
                store.commit("updateHostUser", val.data()!["hostUser"]);
            }
            if (val.data()!["currentTurn"] != undefined) {
                store.commit("updateCurrentTurn", val.data()!["currentTurn"]);
            }
        });
    }

    public updateUser(userName: string, boardId) {
        console.log('empty');
        db.collection("locations")
            .doc(boardId.toString())
            .update({ currentTurn: userName })
    }

}