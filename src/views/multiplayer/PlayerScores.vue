
<template>
  <div class="pa-10">
    <v-progress-linear
      v-model="guestScore"
      color="amber"
      height="25"
      v-bind:class="{ blinking: currentTurn == gameGuest['name'] }"
    >
      <template>
        <strong>{{ gameGuest["name"] }}</strong>
      </template>
    </v-progress-linear>
    <br />
    <v-progress-linear
      v-model="hostScore"
      color="green"
      height="25"
      v-bind:class="{ blinking: currentTurn == gameHost['name'] }"
    >
      <template>
        <strong>{{ gameHost["name"] }}</strong>
      </template>
    </v-progress-linear>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { State } from "vuex-class";
import store from "../../store";
@Component({})
export default class PlayerScores extends Vue {
  @State gameGuest!: any;
  @State gameHost!: any;
  @State currentTurn!: any;
  guestScore = 0;
  hostScore = 0;

  @Watch("$store.state.gameHost")
  onValueChanged1() {
    this.hostScore = (this.gameHost["score"] / 16) * 200;
  }

  @Watch("$store.state.gameGuest")
  onValueChanged2() {
    this.guestScore = (this.gameGuest["score"] / 16) * 200;
  }
}
</script>

<style>
.blinking {
  font-size: 1.8rem;
  animation: blinkingText 1.2s infinite;
}
@keyframes blinkingText {
  0% {
    color: red;
  }
  49% {
    color: #000;
  }
  60% {
    color: transparent;
  }

  100% {
    color: purple;
  }
}
</style>