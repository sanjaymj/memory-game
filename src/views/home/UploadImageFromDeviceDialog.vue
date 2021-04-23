<template>
  <div>
    <!-- <v-dialog
      :value="showUploadImageDialog"
      width="500"
      @click:outside="handlClickOutside"
    >
      <v-card :color="'#000'" dark height="250px">
        <div class="d-flex flex-no-wrap justify-space-between">
          <div>
            <v-card-title
              class="headline"
              v-text="'Upload custom images'"
            ></v-card-title>
            <v-divider></v-divider>
            <div>
              <input multiple @change="onFileChange" ref="file" type="file" />
            </div>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="success" @click="createBoard">Go Ahead</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="error" @click="closeDialog()">Exit</v-btn>
            </v-card-actions>
          </div>
        </div>
      </v-card>
    </v-dialog> -->
    <input multiple @change="onFileChange" ref="file" type="file" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import store from "../../store";
import { State } from "vuex-class";
import { FirebaseDataHandler } from "@/services/FirebaseDataHandler";
import { GameMode, User } from "@/models";

@Component({
  components: {},
})
export default class UploadImageFromDeviceDialog extends Vue {
  @State showUploadImageDialog!: boolean;
  @State user!: User;
  @State boardContent;
  @State gameMode!: GameMode;
  images: any = [];

  createBoard() {
    console.log("game mode is ", this.gameMode);
    store.commit("updateUploadImageDialog", false);
    const payload = {
      images: this.images,
    };
    store.commit("updateImages", payload);
    if (this.gameMode === GameMode.SINGLEPLAYER) {
      this.$router.push("/singleplayer");
      store.commit("updateGameMode", GameMode.NONE);
    } else if (this.gameMode === GameMode.MULTIPLAYER) {
      new FirebaseDataHandler().createMultiPlayerBoard(
        this.user,
        payload.images,
        false
      );
      store.commit("updateGameMode", GameMode.NONE);
    }
  }

  onFileChange(e) {
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

  closeDialog() {
    store.commit("updateUploadImageDialog", false);
  }

  handlClickOutside() {
    store.commit("updateUploadImageDialog", false);
  }
}
</script>

<style>
</style>