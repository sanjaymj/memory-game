import Vue from 'vue'
import Vuex from 'vuex'
import { Card, GameMode, User } from '../models';
Vue.use(Vuex)
const cachedUser = localStorage.getItem('mem-user');
const cachedUserInfo = localStorage.getItem('mem-user-user-info');

const cachedInfoScreenSettings = cachedUserInfo !== null ? JSON.parse(cachedUserInfo)["info-screen"] === 'true' : true;

const currentuser: User = {
  id: cachedUser !== null ? JSON.parse(cachedUser)["id"] : '',
  name: cachedUser !== null ? JSON.parse(cachedUser)["name"] : '',
  score: 0,
};

function createBoard(category: string) {
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
          ? category + "/img_" + (i + 1) + ".jpeg"
          : category + "/img_" + (totalCardCount - i) + ".jpeg",
      flex: 3,
    };
    cards.push(card);

  }
  return cards;
  //new FirebaseDataHandler().updateCards(this.cards);
  //this.shuffle();
}

const state = {
  images: [],
  hideNavbar: false,
  defaultImages: false,
  imageCategory: '',
  user: currentuser,
  multiPlayerBoardCreated: false,
  joinMultiPlayerBoardAsGuest: false,
  joinMultiPlayerBoardAsHost: false,
  boardId: '9956',
  boardContent: createBoard("huccha"),
  gameHost: currentuser,
  gameGuest: currentuser,
  currentTurn: '',
  showUploadImageDialog: false,
  gameMode: GameMode.NONE,
  requestToStartGame: false,
  hostRequestToStartGame: false,
  guestRequestToStartGame: false,
  deleteBoard: false,
  bothPlayersReady: false,
  showInfoScreen: cachedInfoScreenSettings
};

const mutations = {
  updateImages(state: any, payload: any) {
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

  updateMultiPlayerBoardCreationState(state: any, payload: boolean) {
    state.multiPlayerBoardCreated = payload;
  },

  updateMultiPlayerBoardId(state: any, payload: string) {
    state.boardId = payload;
  },

  updateGuestStatus(state: any, payload: boolean) {
    state.joinMultiPlayerBoardAsGuest = payload;
  },

  updateHostStatus(state: any, payload: boolean) {
    state.joinMultiPlayerBoardAsHost = payload;
  },

  updateImageCategory(state: any, payload: boolean) {
    state.imageCategory = payload;
  },

  setBoardContent(state: any, payload: any) {
    state.boardContent = createBoard(payload);
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

  updateUploadImageDialog(state: any, payload: boolean) {
    state.showUploadImageDialog = payload;
  },

  updateGameMode(state: any, payload: any) {
    state.gameMode = payload;
  },

  updateRequestToStartGame(state: any, payload: any) {
    if (payload !== state.requestToStartGame) {
      state.requestToStartGame = payload;
    }

  },

  updateGuestRequestToStartGame(state: any, payload: any) {
    if (payload !== state.guestRequestToStartGame) {
      state.guestRequestToStartGame = payload;
    }
  },

  updateHostRequestToStartGame(state: any, payload: any) {
    if (payload !== state.hostRequestToStartGame) {
      state.hostRequestToStartGame = payload;
    }
  },

  markBoardForDeletion(state: any, payload: any) {

    state.deleteBoard = payload;

  },

  updateBothPlayersReady(state: any, payload: any) {
    if (payload !== state.bothPlayersReady) {
      state.bothPlayersReady = payload;
    }

  },

  updateInfoScreenStatus(state: any, payload: any) {

    state.showInfoScreen = payload;


  },

  reset(state: any, payload) {
    state.images = [];
    state.defaultImages = false,
      state.imageCategory = '',
      state.multiPlayerBoardCreated = false,
      state.joinMultiPlayerBoardAsGuest = false,
      state.joinMultiPlayerBoardAsHost = false,
      state.boardId = '9956',
      state.gameMode = GameMode.NONE,
      state.requestToStartGame = false,
      state.hostRequestToStartGame = false,
      state.guestRequestToStartGame = false,
      state.deleteBoard = false,
      state.bothPlayersReady = false
  }
}

export default new Vuex.Store({
  state,
  mutations
});



