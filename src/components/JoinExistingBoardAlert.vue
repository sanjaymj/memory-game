<template>
  <div>
    <v-row justify="center">
      <v-dialog v-model="dialog" max-width="600px">
        <v-card :color="'#fff'">
          <div class="">
            <div>
              <v-card-title
                class="headline"
                v-text="'Join Game'"
              ></v-card-title>
              <v-card-text>
                <v-text-field
                  label="Enter game code"
                  v-model="gameCode"
                  required
                ></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" @click="onclick()">Join</v-btn>
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
import store from "../store";
@Component({})
export default class JoinExistingBoardAlert extends Vue {
  @Prop() dialog!: boolean;
  gameCode = "";

  @State joinMultiPlayerBoardAsGuest!: boolean;

  onclick() {
    this.$emit("clicked", this.gameCode);
  }
}
</script>