<template>
  <div>
    <v-card max-width="400" class="mx-auto">
      <v-container>
        <v-row dense>
          <v-col v-for="(item, i) in items" :key="i" cols="12" class="pa-6">
            <v-card :color="item.color" dark height="200px">
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <v-card-title class="headline" v-text="item.title"></v-card-title>
                  <v-card-actions>
                    <v-btn
                      class="ml-2 mt-5"
                      outlined
                      rounded
                      small
                      @click="loadDefaultImages()"
                      to="/singleplayer"
                    >Default Images</v-btn>
                    <v-btn
                      class="ml-2 mt-5"
                      outlined
                      rounded
                      small
                      @click="selectFile()"
                      multiple
                      @change="onFileChange"
                    >Custom Images</v-btn>
                  </v-card-actions>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>

    <div class="input-file">
      <input class="input-file__input" multiple @change="onFileChange" ref="file" type="file" />
      <div class="input-file__button" multiple @click="selectFile()">click to select a file</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import store from "../store";
@Component({})
export default class SignUp extends Vue {
  drawer = false;
  items = [
    {
      color: "#1F7087",
      title: "Single player"
    },
    {
      color: "#952175",
      title: "Multi player"
    }
  ];
  images = [];

  selectFile() {
    const fileInputElement = this.$refs.file;
    fileInputElement.click();
  }

  createBoard() {
    this.$router.push("/singleplayer");
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
  }
  onFileChange(e) {
    const files = e.target.files || e.dataTransfer.files;
    if (!files.length) return;
    for (let index = 0; index < files.length; index++) {
      const reader = new FileReader();
      reader.onload = event => {
        const imageUrl = event.target.result;
        this.images.push(imageUrl);

        const payload = {
          images: this.images
        };
        store.commit("updateImages", payload);
        if (index === files.length - 1) {
          console.log(payload);
          this.createBoard();
        }
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