<template>
  <div v-if="multiPlayerBoardCreated">
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
      <v-dialog max-width="600px" :value="!updateHostStatus" persistent>
        <v-card :color="'#fff'" class="mx-auto" :loading="true" elevation="2">
          <template slot="progress">
            <v-progress-linear color="red" indeterminate></v-progress-linear>
          </template>
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
  @State updateHostStatus;

  @Watch("$store.state.gameGuest")
  onValueChanged() {
    store.commit("updateHostStatus", true);
    store.commit("updateMultiPlayerBoardCreationState", false);
    this.$router.push("/multiplayer");
  }
}
</script>