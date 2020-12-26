<template>
  <div>
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
    <!-- <JoinExistingBoardAlert
      v-bind:dialog="modal"
      @clicked="test($event)"
    ></JoinExistingBoardAlert>
    <NewBoardCreatedAlert />
    <v-container class="my-10">
      <v-row dense>
        <v-col cols="12" class="pa-6">
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
                    @click="showSinglePlayerDropDown()"
                    >Default Images</v-btn
                  >
                  <v-dialog v-model="isShowDropDown" width="500">
                    <v-card>
                      <v-card-title class="headline grey lighten-2"
                        >Select game category
                      </v-card-title>
                      <v-divider></v-divider>
                      <v-select
                        class="ml-2 mt-5"
                        label="select category"
                        :items="items1"
                        @change="onChange"
                      ></v-select>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="success" @click="startNow()"
                          >Go Ahead</v-btn
                        >
                        <v-spacer></v-spacer>
                        <v-btn color="error" @click="closeDialog()">Exit</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <v-btn
                    class="ml-2 mt-5"
                    outlined
                    rounded
                    small
                    @click="selectFile()"
                    multiple
                    >Custom Images</v-btn
                  >
                </v-card-actions>
              </div>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" class="pa-6">
          <v-card :color="'#952175'" dark height="200px">
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title
                  class="headline"
                  v-text="'Multi Player'"
                ></v-card-title>
                <v-card-actions>
                  <v-btn
                    class="ml-2 mt-5"
                    outlined
                    rounded
                    small
                    @click="showMultiPlayerDropDown()"
                    >Create Game</v-btn
                  >
                  <v-btn
                    class="ml-2 mt-5"
                    outlined
                    rounded
                    small
                    @click="joinMultiPlayerBoard()"
                    multiple
                    @change="onFileChange"
                    >Join Game</v-btn
                  >
                </v-card-actions>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <div class="input-file">
      <input
        class="input-file__input"
        multiple
        @change="onFileChange"
        ref="file"
        type="file"
      />

      <div class="input-file__button" multiple @click="selectFile()">
        click to select a file
      </div>
    </div>

    <v-dialog v-model="isCustomImages" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2"
          >Upload custom images
        </v-card-title>
        <v-card-subtitle class="headline grey lighten-2"
          >8 images are needed
        </v-card-subtitle>
        <v-divider></v-divider>
        <div>
          <input multiple @change="onFileChange" ref="file" type="file" />
          <div class="input-file__button" multiple @click="selectFile()">
            click to select a file
          </div>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" @click="processImages">Go Ahead</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="closeDialog()">Exit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import NewBoardCreatedAlert from "../../components/NewBoardCreatedAlert.vue";
import JoinExistingBoardAlert from "../../components/JoinExistingBoardAlert.vue";
import SinglePlayerSelection from "./SinglePlayerSelection.vue";
import MultiPlayerSelection from "./MultiPlayerSelection.vue";

@Component({
  components: {
    NewBoardCreatedAlert,
    JoinExistingBoardAlert,
    SinglePlayerSelection,
    MultiPlayerSelection,
  },
})
export default class GameSelection extends Vue {}
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
