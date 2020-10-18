import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  images: [],
  stored: true,
  hideNavbar: false,
  defaultImages: true
};

const mutations = {
  updateImages(state: any, payload: any) {
    console.log('update!!!!!');
    state.images = payload.images;
  },

  setNavbarState(state: any, payload: boolean) {
    state.hideNavbar = payload;
  },

  setDefaultMode(state: any,payload: boolean) {
    state.defaultImages = payload;
  }
}

export default new Vuex.Store({
  state,
  mutations
});