import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import firebase from 'firebase';
import firestore from 'firebase/firestore';
import Meta from 'vue-meta';
import 'material-design-icons-iconfont/dist/material-design-icons.css'
Vue.config.productionTip = false

Vue.use(Meta);

const firebaseConfig = {
  apiKey: "AIzaSyCB0NZinOdJaNoVCMsck9ZWeg5nQIYa9zo",
  authDomain: "sanjay-memory-game.firebaseapp.com",
  databaseURL: "https://sanjay-memory-game.firebaseio.com",
  projectId: "sanjay-memory-game",
  storageBucket: "sanjay-memory-game.appspot.com",
  messagingSenderId: "550949227640",
  appId: "1:550949227640:web:67dbcb333cf7bc217cf18d",
  measurementId: "G-5T7CM2SGTX"
};

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
    firebase.initializeApp(firebaseConfig)
    firebase.analytics();
  }
}).$mount('#app')

export const db = firebase.firestore();