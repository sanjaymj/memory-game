<template>
  <div>
    <p class="text-center Roboto px-4 pt-4 pb-3">
      <span class="purple--text"
        >{{ currentTurn }}: flip and match the next pair</span
      >
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { State } from "vuex-class";
import store from "../../store";
@Component({})
export default class CurrentPlayerTurnLabel extends Vue {
  @State currentTurn!: any;
}
</script>

<style>
</style>