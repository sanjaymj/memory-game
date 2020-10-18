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
  updateImages(state, payload) {
    console.log('update!!!!!');
    state.images = payload.images;
  },

  setNavbarState(state, payload) {
    state.hideNavbar = payload;
  },

  setDefaultMode(state,payload) {
    state.defaultImages = payload;
  }
}

export default new Vuex.Store({
  state,
  mutations
});