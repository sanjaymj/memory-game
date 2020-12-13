import Vue from 'vue'
import Vuex from 'vuex'
import { User } from '../models';
Vue.use(Vuex)

const currentuser: User = {
  id: '',
  name: ''
};

const state = {
  images: [],
  stored: true,
  hideNavbar: false,
  defaultImages: true,
  user: currentuser,
  multiPlayerBoardCreated: false,
  joinMultiPlayerBoardAsGuest: false,
  boardId: '2134'
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
    state.currentUser = payload;
  },

  updateMultiPlayerBoardCreationState(state: any, payload: string) {
    state.multiPlayerBoardCreated = true;
    state.boardId = payload;
  },

  updateGuestStatus(state: any, payload: boolean) {
    state.joinMultiPlayerBoardAsGuest = payload;
  }
}

export default new Vuex.Store({
  state,
  mutations
});