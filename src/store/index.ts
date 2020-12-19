import Vue from 'vue'
import Vuex from 'vuex'
import { Card, User } from '../models';
Vue.use(Vuex)

const currentuser: User = {
  id: '',
  name: '',
  score: 0,
};

function createBoard() {
  const totalCardCount = 16;
  const cards: any = [];
  for (let i = 0; i < totalCardCount; i++) {

    console.log("here");
    const card: Card = {
      id: i,
      pairCardId: totalCardCount - i - 1,
      isMatched: false,
      isFlipped: false,
      avatar:
        i <= 7
          ? "img_" + (i + 1) + ".jpeg"
          : "img_" + (totalCardCount - i) + ".jpeg",
      flex: 3,
    };
    cards.push(card);

  }
  console.log(cards);
  return cards;
  //new FirebaseDataHandler().updateCards(this.cards);
  //this.shuffle();
}

const state = {
  images: [],
  stored: true,
  hideNavbar: false,
  defaultImages: true,
  user: currentuser,
  multiPlayerBoardCreated: false,
  joinMultiPlayerBoardAsGuest: false,
  boardId: '9164',
  boardContent: createBoard(),
  gameHost: currentuser,
  gameGuest: currentuser,
  currentTurn: ''
};

const mutations = {
  updateImages(state: any, payload: any) {
    console.log('update!!!!!');
    state.images = payload.images;
  },

  setNavbarState(state: any, payload: boolean) {
    state.hideNavbar = payload;
  },

  setDefaultMode(state: any, payload: boolean) {
    state.defaultImages = payload;
  },

  updateCurrentUser(state: any, payload: User) {
    state.user = payload;
  },

  updateMultiPlayerBoardCreationState(state: any, payload: string) {
    state.multiPlayerBoardCreated = true;
    state.boardId = payload;
  },

  updateGuestStatus(state: any, payload: boolean) {
    state.joinMultiPlayerBoardAsGuest = payload;
  },

  updateBoardContent(state: any, payload: any) {
    console.log("updating content");
    state.boardContent = payload;
  },

  updateGuestUser(state: any, payload: boolean) {
    state.gameGuest = payload;
  },

  updateHostUser(state: any, payload: boolean) {
    state.gameHost = payload;
  },

  updateCurrentTurn(state: any, payload: boolean) {
    state.currentTurn = payload;
  },
}

export default new Vuex.Store({
  state,
  mutations
});



