<template>
  <v-container fluid justify="end" class="test1">
    <v-img
      class="test2"
      lazy-src="https://www.fluentu.com/blog/wp-content/uploads/2016/09/thinking-in-a-foreign-language-e1479154410182.png"
      src="https://www.fluentu.com/blog/wp-content/uploads/2016/09/thinking-in-a-foreign-language-e1479154410182.png"
    ></v-img>
    <v-form fill-height v-model="valid" class="test1">
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
        <v-col>
          <v-btn
            block
            depressed
            elevation="2"
            rounded
            color="primary"
            text
            sm
            @click="onButtonClick()"
          >Start</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import store from "../store";
@Component({})
export default class SignUp extends Vue {
  valid = true;
  firstname = "";
  nameRules = [
    v => !!v || "Name is required",
    v => v.length <= 10 || "Name must be less than 10 characters"
  ];
  onButtonClick() {
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
  object-fit: cover;
}

.test1 {
  height: 100%;
  overflow: hidden;
}

.test2 {
  height: 65%;
}
</style>