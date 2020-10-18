<template>
  <v-app>
    <v-content>
      <Navbar v-if="!hideNavbar"></Navbar>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Navbar from "./views/Navbar.vue";
import { State } from "vuex-class";
import store from "./store";
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {
    Navbar
  }
})
export default class App extends Vue {
  @State hideNavbar!: boolean;
}
</script>
