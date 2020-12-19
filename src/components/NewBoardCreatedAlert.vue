<template>
  <div class="" v-if="multiPlayerBoardCreated">
    <!--  <v-card class="mx-auto" max-width="344" outlined loading elevation="20">
      <v-list-item :key="boardId" three-line>
        <v-list-item-content align="center">
          <div class="overline mb-4">Created a new board</div>
          <v-list-item-title class="headline mb-1">{{
            boardId
          }}</v-list-item-title>
          <v-list-item-subtitle
            >Waiting for players to join</v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>
    </v-card>
 -->
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card class="mx-auto" max-width="344" outlined loading elevation="20">
          <v-list-item :key="boardId" three-line>
            <v-list-item-content align="center">
              <div class="overline mb-4">Created a new board</div>
              <v-list-item-title class="headline mb-1">{{
                boardId
              }}</v-list-item-title>
              <v-list-item-subtitle
                >Waiting for players to join</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- <v-progress-circular
      justify="center"
      align="center"
      :size="70"
      :width="7"
      color="purple"
      indeterminate
    ></v-progress-circular> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { State } from "vuex-class";
import store from "../store";
@Component({})
export default class NewBoardCreatedAlert extends Vue {
  @State multiPlayerBoardCreated!: boolean;
  @State boardId!: string;
  @State gameGuest;
  dialog = true;

  @Watch("$store.state.gameGuest")
  onValueChanged() {
    console.log("ma hehe e###");
    console.log(this.gameGuest);
    this.dialog = false;
    this.$router.push("/multiplayer");
  }
}
</script>