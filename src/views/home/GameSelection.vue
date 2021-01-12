<template>
  <div>
    <GameRuleInfoAlert />
    <v-container class="my-10">
      <v-row dense>
        <v-col cols="12" class="pa-6">
          <SinglePlayerSelection />
        </v-col>
        <v-col cols="12" class="pa-6">
          <MultiPlayerSelection />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import SinglePlayerSelection from "./SinglePlayerSelection.vue";
import MultiPlayerSelection from "./MultiPlayerSelection.vue";
import GameRuleInfoAlert from "./GameRuleInfoAlert.vue";
import store from "../../store";
@Component({
  components: {
    GameRuleInfoAlert,
    SinglePlayerSelection,
    MultiPlayerSelection,
  },
})
export default class GameSelection extends Vue {
  created() {
    store.commit("reset", true);
  }
}
</script>

<style scoped>
.input-file__input {
  visibility: hidden;
}
.input-file__button {
  background-color: red;
  width: 200px;
  padding: 10px;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
  visibility: hidden;
}
.input-file__button:hover {
  background-color: #000;
  color: #fff;
}
</style>
