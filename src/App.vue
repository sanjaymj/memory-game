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
  metaInfo() {
    return {
      title: "Memory game for kids. Online multiplayer memory game",
      meta: [
        {
          name: "description",
          content:
            "choose among various categories of flash cards to improve your memory. You can also upload custom pictures. Challenge your friends in online multiplayer game mode",
        },
      ],
    };
  },
  components: {
    Navbar,
  },
})
export default class App extends Vue {
  @State hideNavbar!: boolean;
}
</script>
