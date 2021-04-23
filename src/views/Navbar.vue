<template>
  <div>
    <nav>
      <!-- <v-toolbar flat app>
        <v-toolbar-side-icon @click="goBack()">
          <v-icon>keyboard_arrow_left</v-icon>
        </v-toolbar-side-icon>

        <v-spacer></v-spacer>
       
        <v-btn flat color="primary" @click="onSignOutClick()">
          <span>Sign Out</span>
          <v-icon right>exit_to_app</v-icon>
        </v-btn>
      </v-toolbar> -->

      <v-toolbar color="indigo darken-2" :dark="true">
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Memory Game</v-toolbar-title>
      </v-toolbar>

      <!-- <v-navigation-drawer class="deep-purple accent-4" dark v-model="drawer">
        <v-list>
          <v-list-item v-for="item in items" :key="item.title" link>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <template v-slot:append>
          <div class="pa-2">
            <v-btn block> Logout </v-btn>
          </div>
        </template>
      </v-navigation-drawer> -->
      <v-navigation-drawer
        v-model="drawer"
        app
        class="deep-purple accent-4"
        dark
      >
        <v-list>
          <v-list-item v-for="item in items" :key="item.title" link>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content @click="goTo(item.route)">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <template v-slot:append>
          <div class="pa-2">
            <v-btn block @click="onSignOutClick()"> Logout </v-btn>
          </div>
        </template>
      </v-navigation-drawer>
    </nav>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import store from "../store";
@Component({})
export default class SignUp extends Vue {
  drawer = false;

  items = [
    { title: "Home", icon: "mdi-view-dashboard", route: "home" },
    { title: "About", icon: "mdi-information", route: "about" },
  ];

  onSignOutClick() {
    store.commit("updateMultiPlayerBoardCreationState", false);
    this.$router.push("/");
  }

  goTo(route) {
    this.drawer = false;
    store.commit("updateMultiPlayerBoardCreationState", false);
    this.$router.push("/" + route);
  }
}
</script>
