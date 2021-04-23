<template>
  <div>
    <v-row justify="center">
      <v-dialog v-model="dialog" max-width="600px" persistent>
        <v-card :color="'#fff'">
          <div class="">
            <div>
              <v-card-text
                class="headline text-alignment"
                v-text="
                  'I see that you are a first time visitor. Have a look at our game rules!'
                "
              ></v-card-text>
              <v-checkbox
                class="ml-4"
                v-model="val"
                @click="toggle"
                :label="'Dont show this stupid popup again'"
              ></v-checkbox>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" @click="cancel()">Cancel</v-btn>
                <v-btn color="green darken-1" @click="viewGameRules()"
                  >See Game Rules</v-btn
                >
              </v-card-actions>
            </div>
          </div>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { State } from "vuex-class";
import store from "../../store";
@Component({})
export default class GameRuleInfoAlert extends Vue {
  dialog = true;
  val = false;
  @State showInfoScreen;

  created() {
    this.dialog = this.showInfoScreen;
  }
  cancel() {
    this.dialog = false;
  }

  toggle(val) {
    //
  }

  viewGameRules() {
    localStorage.setItem("mem-user-user-info", JSON.stringify(!this.val));

    store.commit("updateInfoScreenStatus", !this.val);
    this.$router.push("/about");
  }
}
</script>

<style scoped>
.text-alignment {
  word-wrap: break-word;
}
</style>