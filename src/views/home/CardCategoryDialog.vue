<template>
  <v-dialog
    max-width="600px"
    width="auto"
    :value="!!gameMode"
    @click:outside="handlClickOutside"
  >
    <v-card :color="'#fff'">
      <div>
        <div>
          <v-card-title
            class="headline"
            v-text="'Select game category'"
          ></v-card-title>
          <v-select
            class="ml-2 mt-5"
            label="select category"
            :items="items"
            @change="onChange"
          ></v-select>
          <div v-if="customImages" :key="customImages">
            <input multiple @change="onFileChange" ref="file" type="file" />
          </div>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" @click="closeDialog()">Exit</v-btn>
            <v-btn
              :disabled="
                this.customImages && this.avatarCollection.length === 0
              "
              color="success"
              @click="startNow()"
              >Go Ahead</v-btn
            >
          </v-card-actions>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "../../store";
import { State } from "vuex-class";
import { Card, GameMode, User } from "@/models";
import { FirebaseDataHandler } from "@/services/FirebaseDataHandler";
import UploadImageFromDeviceDialog from "./UploadImageFromDeviceDialog.vue";
import firebase from "firebase";
@Component({
  components: { UploadImageFromDeviceDialog },
})
export default class CardCategoryDialog extends Vue {
  @State gameMode!: GameMode;
  @State user!: User;
  @State joinMultiPlayerBoardAsGuest!: boolean;
  @State boardContent;
  @State defaultImages!: boolean;
  public customImages = false;
  private avatarCollection: any = [];
  items = [
    "huccha",
    "cartoons",
    "vehicles",
    "superhero",
    "use images from my device",
  ];
  category = "";
  images: any = [];

  startNow() {
    console.log("cat is ", this.category);
    if (this.category === this.items[this.items.length - 1]) {
      this.customImages = true;
      store.commit("setDefaultMode", false);
      store.commit("updateUploadImageDialog", true);
      this.createBoard();
    } else {
      if (this.gameMode == GameMode.SINGLEPLAYER) {
        store.commit("setDefaultMode", true);
        store.commit("updateImageCategory", this.category);
        store.commit("updateGameMode", GameMode.NONE);
        this.$router.push("/singleplayer");
      } else {
        store.commit("setDefaultMode", true);
        store.commit("updateImageCategory", this.category);
        store.commit("updateGameMode", GameMode.NONE);
        store.commit("setBoardContent", this.category);
        new FirebaseDataHandler().createMultiPlayerBoard(
          this.user,
          this.boardContent,
          true
        );
        //this.$router.push("/singleplayer");
      }
    }
  }

  closeDialog() {
    store.commit("updateGameMode", GameMode.NONE);
  }

  handlClickOutside() {
    store.commit("updateGameMode", GameMode.NONE);
  }

  onChange(val) {
    console.log(val);
    this.category = val;
    if (this.category === this.items[this.items.length - 1]) {
      store.commit("setDefaultMode", true);
      store.commit("updateUploadImageDialog", true);
      this.customImages = true;
    } else {
      this.customImages = false;
    }
  }

  uploadToStorage(val, index) {
    const storageRef = firebase
      .storage()
      .ref(this.user.name)
      .child(index.toString())
      .put(val);
    storageRef.on(
      `state_changed`,
      (snapshot) => {
        const uploadValue =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error.message);
      },
      () => {
        const uploadValue = 100;
        storageRef.snapshot.ref.getDownloadURL().then((url) => {
          console.log(url);
          this.avatarCollection.push(url);
        });
      }
    );
  }

  createBoard() {
    console.log("game mode is ", this.gameMode);
    console.log(this.images);
    store.commit("updateUploadImageDialog", false);
    const cards: Card[] = [];

    for (let i = 0; i < this.images.length * 2; i++) {
      const card: Card = {
        id: i,
        pairCardId: this.images.length * 2 - i - 1,
        isMatched: false,
        isFlipped: false,
        avatar:
          i <= this.avatarCollection.length - 1
            ? this.avatarCollection[i]
            : this.avatarCollection[this.avatarCollection.length * 2 - i - 1],
        flex: 3,
      };
      cards.push(card);
    }

    const payload = {
      images: cards,
    };

    store.commit("updateImages", payload);
    if (this.gameMode === GameMode.SINGLEPLAYER) {
      console.log("create singleplayer game");
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
      this.uploadToStorage(files[index], index);
      reader.readAsDataURL(files[index]);
    }
  }
}
</script>

<style>
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
</style>