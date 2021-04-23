import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import GameSelection from '../views/home/GameSelection.vue'
import SignUp from '../views/SignUp.vue'
import SinglePlayer from '../views/SinglePlayer.vue'
//import MultiPlayer from '../views/MultiPlayer.vue'
import MultiPlayer from '../views/multiplayer/MultiPlayer.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/home',
    name: 'Home',
    component: GameSelection
  },
  /* {
    path: '/home',
    name: 'Home',
    component: Home
  }, */
  {
    path: '/singleplayer',
    name: 'SinglePlayer',
    component: SinglePlayer
  },
  {
    path: '/multiplayer',
    name: 'MultiPlayer',
    component: MultiPlayer
  },

  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
