<template>
  <div>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">join game</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Enter game code"
                    v-model="gameCode"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="onclick()">Save</v-btn>
          </v-card-actions>
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