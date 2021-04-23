<template>
  <div>
    <JoinExistingBoardAlert
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
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import * as firebase from "firebase";
import store from "../store";
import { db } from "../main";
import { State } from "vuex-class";
import { User } from "../models";
import { FirebaseDataHandler } from "../services/FirebaseDataHandler";
import NewBoardCreatedAlert from "../components/NewBoardCreatedAlert.vue";
import JoinExistingBoardAlert from "../components/JoinExistingBoardAlert.vue";

@Component({
  components: { NewBoardCreatedAlert, JoinExistingBoardAlert },
})
export default class SignUp extends Vue {
  @State user!: User;
  @State joinMultiPlayerBoardAsGuest!: boolean;
  @State boardContent;
  drawer = false;
  modal = false;
  items1 = ["huccha", "test", "superhero"];
  items = [
    {
      color: "#1F7087",
      title: "Single player",
    },
    {
      color: "#952175",
      title: "Multi player",
    },
  ];
  isShowDropDown = false;
  isSinglePlayerDropDown = false;
  isMultiPlayerDropDown = false;
  isCustomImages = false;
  uploadedCustomImages: any = [];
  imagesToUpload = 8;
  images: any = [];
  category = "";

  selectFile() {
    console.log("in here");
    this.isCustomImages = true;
    //const fileInputElement: any = this.$refs.file;
    //fileInputElement.click();
  }

  testChange(val) {
    console.log("in change", val);
    this.uploadedCustomImages.push(val);
  }

  testClick(val) {
    console.log("in click", val);
  }

  createBoard() {
    this.$router.push("/singleplayer");
  }

  startNow() {
    if (this.isSinglePlayerDropDown) {
      store.commit("setDefaultMode", true);
      store.commit("updateImageCategory", this.category);
      this.createBoard();
    } else if (this.isMultiPlayerDropDown) {
      store.commit("setBoardContent", this.category);
      this.createMultiPlayerBoard();
    }
  }

  onChange(val) {
    this.category = val;
  }

  closeDialog() {
    this.isMultiPlayerDropDown = false;
    this.isSinglePlayerDropDown = false;
    this.isShowDropDown = false;
  }

  showMultiPlayerDropDown() {
    this.isMultiPlayerDropDown = true;
    this.isShowDropDown = true;
  }
  createMultiPlayerBoard() {
    new FirebaseDataHandler().createMultiPlayerBoard(
      this.user,
      this.boardContent,
      false
    );
    //this.$router.push("/multiplayer");
  }

  joinMultiPlayerBoard() {
    this.modal = !this.modal;
    store.commit("updateGuestStatus", true);
  }

  test(val: string) {
    console.log("val is ", val);
    new FirebaseDataHandler().joinBoard(val, this.user);
    store.commit("setDefaultMode", true);

    this.$router.push("/multiplayer");
    this.modal = false;
  }

  showSinglePlayerDropDown() {
    this.isSinglePlayerDropDown = true;
    this.isShowDropDown = true;
  }

  loadDefaultImages() {
    /* this.images = [];
    for (let index = 1; index <=8; index++) {

        const fileName = index + '.jpeg';
        const imageUrl = require(`./../assets/img_${fileName}`);
        this.images.push(imageUrl);
    }
    const payload = {
          images: this.images
        };
        store.commit('updateImages', payload);
        this.createBoard(); */
    console.log("test");
    store.commit("setDefaultMode", true);
    this.createBoard();
  }

  processImages() {
    const payload = {
      images: this.images,
    };
    store.commit("updateImages", payload);

    this.createBoard();
  }
  onFileChange(e) {
    console.log("again here");
    store.commit("setDefaultMode", false);
    const files = e.target.files || e.dataTransfer.files;
    if (!files.length) return;
    for (let index = 0; index < files.length; index++) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target!.result;
        this.images.push(imageUrl);
      };

      reader.readAsDataURL(files[index]);
    }
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
