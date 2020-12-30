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
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { State } from "vuex-class";
import store from "../../store";
@Component({})
export default class GameStartNotifier extends Vue {
  @State requestToStartGame!: any;
  showDialog = false;
  progressValue = 20;

  @Watch("$store.state.requestToStartGame")
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
}
</script>

<style>
.v-dialog {
  display: flex;
  justify-content: center;
}
</style>