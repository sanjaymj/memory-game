<template>
  <div>
    <JoinExistingBoardAlert
      v-bind:dialog="modal"
      @clicked="test($event)"
    ></JoinExistingBoardAlert>
    <NewBoardCreatedAlert />
    <v-card :color="'#952175'" dark height="200px">
      <div class="d-flex flex-no-wrap justify-space-between">
        <div>
          <v-card-title class="headline" v-text="'Multi Player'"></v-card-title>
          <v-card-actions>
            <v-btn
              class="ml-2 mt-5"
              outlined
              rounded
              small
              @click="showSinglePlayerDropDown"
              >Create Game</v-btn
            >
            <v-btn
              class="ml-2 mt-5"
              outlined
              rounded
              small
              multiple
              @click="joinMultiPlayerBoard()"
              >Join Game</v-btn
            >
          </v-card-actions>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NewBoardCreatedAlert from "../../components/NewBoardCreatedAlert.vue";
import JoinExistingBoardAlert from "../../components/JoinExistingBoardAlert.vue";
import UploadImageFromDeviceDialog from "./UploadImageFromDeviceDialog.vue";

import store from "../../store";
import { State } from "vuex-class";
import { GameMode, User } from "../../models";
import { FirebaseDataHandler } from "@/services/FirebaseDataHandler";

@Component({
  components: {
    NewBoardCreatedAlert,
    JoinExistingBoardAlert,
    UploadImageFromDeviceDialog,
  },
})
export default class MultiPlayerSelection extends Vue {
  modal = false;
  @State user!: User;

  showSinglePlayerDropDown() {
    store.commit("updateGameMode", GameMode.MULTIPLAYER);
  }

  joinMultiPlayerBoard() {
    this.modal = !this.modal;
    store.commit("updateGuestStatus", true);
  }

  test(val: string) {
    new FirebaseDataHandler().joinBoard(val, this.user);
    //store.commit("setDefaultMode", true);

    this.$router.push("/multiplayer");
    this.modal = false;
  }
}
</script>

<style>
</style>