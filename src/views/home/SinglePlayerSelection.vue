<template>
  <div>
    <CardCategoryDialog></CardCategoryDialog>
    <v-card :color="'#1F7087'" dark height="200px">
      <div class="d-flex flex-no-wrap justify-space-between">
        <div>
          <v-card-title
            class="headline"
            v-text="'Single Player'"
          ></v-card-title>
          <v-card-actions>
            <v-btn
              class="ml-2 mt-5"
              outlined
              rounded
              small
              @click="showSinglePlayerDropDown"
              >Create Game</v-btn
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
import CardCategoryDialog from "./CardCategoryDialog.vue";
import UploadImageFromDeviceDialog from "./UploadImageFromDeviceDialog.vue";
import store from "../../store";
import { State } from "vuex-class";
import { GameMode } from "@/models";

@Component({
  components: {
    NewBoardCreatedAlert,
    JoinExistingBoardAlert,
    UploadImageFromDeviceDialog,
    CardCategoryDialog,
  },
})
export default class SinglePlayerSelection extends Vue {
  showSinglePlayerDropDown() {
    store.commit("updateGameMode", GameMode.SINGLEPLAYER);
  }
}
</script>

<style>
</style>