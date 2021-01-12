<template>
  <div class="center-align">
    <v-dialog v-model="showDialog">
      <v-progress-circular
        :rotate="360"
        :size="200"
        :width="15"
        :value="progressValue"
        color="teal"
      ></v-progress-circular>
    </v-dialog>
    <v-row justify="center">
      <v-dialog max-width="600px" :value="waiting" persistent>
        <v-card
          :color="'#fff'"
          class="mx-auto"
          :loading="true"
          elevation="2"
          min-height="100px"
        >
          <template slot="progress">
            <v-progress-linear color="red" indeterminate></v-progress-linear>
          </template>
          <v-list-item three-line>
            <v-list-item-content align="center">
              <v-list-item-title class="headline mb-1"
                >Waiting for other player to start game</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { State } from "vuex-class";
import store from "../../store";
@Component({})
export default class GameStartNotifier extends Vue {
  @State requestToStartGame!: any;
  @State user!: any;
  @State gameHost!: any;
  @State gameGuest!: any;
  @State hostRequestToStartGame!: boolean;
  @State guestRequestToStartGame!: boolean;
  showDialog = false;
  progressValue = 20;
  waiting = false;

  //@Watch("$store.state.requestToStartGame")
  onValueChanged4() {
    this.showDialog = true;
    const interval = setInterval(() => {
      this.progressValue = this.progressValue + 20;
      if (this.progressValue === 100) {
        clearInterval(interval);
        this.showDialog = false;
        store.commit("updateBothPlayersReady", true);
      }
    }, 1000);
  }

  @Watch("$store.state.hostRequestToStartGame")
  onValueChanged5() {
    if (this.gameHost["name"] == this.user["name"]) {
      this.waiting = !this.waiting;
    }

    if (this.guestRequestToStartGame) {
      this.waiting = false;
      this.onValueChanged4();
    }
  }

  @Watch("$store.state.guestRequestToStartGame")
  onValueChanged6() {
    if (this.gameGuest["name"] == this.user["name"]) {
      this.waiting = !this.waiting;
    }
    if (this.hostRequestToStartGame) {
      this.waiting = false;
      this.onValueChanged4();
    }
  }
}
</script>

<style>
.v-dialog {
  display: flex;
  justify-content: center;
}
</style>