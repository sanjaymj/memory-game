<template>
<div>
  <nav>
    <v-toolbar flat app>
        <v-toolbar-side-icon @click="goBack()">
            <v-icon>keyboard_arrow_left</v-icon>
        </v-toolbar-side-icon>
      <v-spacer></v-spacer>
      <v-btn flat color="primary" @click="onSignOutClick()">
        <span>Sign Out</span>
       <v-icon right>exit_to_app</v-icon>
      </v-btn>
    </v-toolbar>

    <v-navigation-drawer v-model="drawer" app class="indigo">
      <v-list>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="white--text">Dashboard</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </nav>
</div>
  
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import store from "../store";
@Component({})
export default class SignUp extends Vue{
  drawer = false;

  goBack() {
      this.$router.back();
  }

  onSignOutClick() {
        this.$router.push('/');
  }
}
</script>
