<template>
  <v-container fluid justify="end" class="test1 container">
    <!-- <v-img
      class="test2"
      lazy-src="https://www.fluentu.com/blog/wp-content/uploads/2016/09/thinking-in-a-foreign-language-e1479154410182.png"
      src="https://www.fluentu.com/blog/wp-content/uploads/2016/09/thinking-in-a-foreign-language-e1479154410182.png"
    ></v-img> -->
    <div class="test2">
      <img src="../assets/my-logo.png" />
    </div>
    <v-form fill-height v-model="valid" class="">
      <v-row align="center" justify="center">
        <v-col cols="12" md="4">
          <v-text-field
            v-model="firstname"
            :rules="nameRules"
            :counter="10"
            label="Guest User Name"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <v-col cols="12" md="4">
          <v-btn
            block
            depressed
            elevation="2"
            rounded
            color="success"
            sm
            :disabled="!valid"
            @click="onButtonClick()"
            >Start</v-btn
          >
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import * as firebase from "firebase";
import { FirebaseDataHandler } from "../services/FirebaseDataHandler";
import store from "../store";
@Component({})
export default class SignUp extends Vue {
  valid = true;
  firstname = "";
  nameRules = [
    (v) => !!v || "Name is required",
    (v) => v.length <= 10 || "Name must be less than 10 characters",
  ];
  onButtonClick() {
    new FirebaseDataHandler().signInAnonymously(this.firstname);
    this.$router.push("/home");
    store.commit("setNavbarState", false);
  }

  created() {
    store.commit("setNavbarState", true);
  }
}
</script>

<style scoped>
.test {
  background: url("https://www.fluentu.com/blog/wp-content/uploads/2016/09/thinking-in-a-foreign-language-e1479154410182.png");

  background-repeat: no-repeat;
}

.test1 {
  height: 100%;
  overflow: hidden;
}

.test2 {
  background: #3a3a3a;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.v-image__image--cover {
  background-size: auto;
}
</style>