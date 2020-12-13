
<template>
  <div>
    <v-dialog v-model="gameOver" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2"
          >All cards matched in {{ totalTurns }} attems</v-card-title
        >
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" text @click="restartGame()">Try again</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="goBack()">Exit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-container fluid>
      <div v-if="gameStarted">
        <v-chip class="ma-2" color="warning" label
          >attempts {{ totalTurns }}</v-chip
        >
        <v-chip class="ma-2 float-right" color="success" label>
          <v-icon left>av_timer</v-icon>
          {{ timeToRender }}
        </v-chip>
      </div>
      <v-row dense>
        <v-col v-for="card in cards" :key="card.id" :cols="card.flex">
          <v-card v-if="!defaultImages" @click="toggleCard(card)">
            <v-img
              v-if="!card.isFlipped || card.isMatched"
              :src="card.avatar"
              class="white--text align-end match-overlay"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            ></v-img>
            <v-img
              v-else
              :src="flippedSource"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            ></v-img>
          </v-card>

          <v-card v-else @click="toggleCard(card)">
            <v-img
              v-if="!card.isFlipped || card.isMatched"
              :src="cardImage(card)"
              class="white--text align-end"
              v-bind:class="{ 'match-overlay': card.isMatched }"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            ></v-img>
            <v-img
              v-else
              :src="flippedSource"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            ></v-img>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-btn
      class="pa-10"
      block
      depressed
      elevation="2"
      rounded
      color="success"
      text
      sm
      @click="startGame()"
      >Start Game</v-btn
    >
    <div class="text-center pa-6">
      <v-progress-circular
        :rotate="360"
        :size="200"
        :width="15"
        :value="progressValue"
        color="teal"
        >{{ progressValue }}</v-progress-circular
      >
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Card } from "../models";
import { State } from "vuex-class";
import store from "../store";
import { FirebaseDataHandler } from "@/services/FirebaseDataHandler";
@Component({})
export default class MultiPlayer extends Vue {
  @State stored!: boolean;
  @State images!: Array<string>;
  @State defaultImages!: boolean;
  public cards: Card[] = [];
  public count = 0;
  flippedSource = "https://cdn.vuetifyjs.com/images/cards/plane.jpg";
  gameStarted = false;
  matchedCardCount = 0;
  public totalTurns = 0;
  public gameOver = false;

  myInterval: any;
  hours = 0;
  minutes = 0;
  seconds = 0;
  timeToRender = "00:00";
  progressValue = 0;
  public cardOriginal: Card = {
    id: 0,
    pairCardId: 0,
    isMatched: false,
    isFlipped: false,
    avatar: "",
  };

  public cardPair: Card = {
    id: 0,
    pairCardId: 0,
    isMatched: false,
    isFlipped: false,
    avatar: "",
  };

  toggleCard(card: any) {
    this.count++;

    if (this.count < 2) {
      card.isFlipped = !card.isFlipped;
      this.cardOriginal = this.cards.find((e) => e.id === card.id);
      this.cardOriginal.isFlipped = false;
      console.log("flipped first card");
      console.log(this.cardOriginal);
    } else if (this.count == 2) {
      console.log("flipped second card");
      card.isFlipped = !card.isFlipped;

      this.cardPair = this.cards.find((e) => e.id === card.id);
      if (this.cardPair && this.cardOriginal) {
        this.cardPair.isFlipped = false;
        console.log(this.cardPair);
        if (
          this.cardPair.id === this.cardOriginal.pairCardId &&
          this.cardOriginal.isFlipped === this.cardPair.isFlipped
        ) {
          console.log("here");
          this.cardPair.isMatched = true;
          this.cardOriginal.isMatched = true;
          this.matchedCardCount++;
          this.progressValue = (this.matchedCardCount / 16) * 200;
          card.isMatched = true;
        }

        setTimeout(() => {
          this.count = 0;
          this.totalTurns++;
          this.cards.forEach((card) => (card.isFlipped = true));
          this.findWinner();
        }, 1000);
      }
    }
  }

  findWinner() {
    const card = this.cards.find((card) => !card.isMatched);
    console.log(!!card);
    this.gameOver = !card;
    if (this.gameOver) {
      clearInterval(this.myInterval);
    }
  }
  created() {
    this.createBoard();
  }

  createBoard() {
    const totalCardCount = 16;
    this.cards = [];
    for (let i = 0; i < totalCardCount; i++) {
      if (this.defaultImages) {
        console.log("here");
        const card: Card = {
          id: i,
          pairCardId: totalCardCount - i - 1,
          isMatched: false,
          isFlipped: false,
          avatar:
            i <= 7
              ? "img_" + (i + 1) + ".jpeg"
              : "img_" + (totalCardCount - i) + ".jpeg",
          flex: 3,
        };
        this.cards.push(card);
      } else {
        const card: Card = {
          id: i,
          pairCardId: totalCardCount - i - 1,
          isMatched: false,
          isFlipped: false,
          avatar: i <= 7 ? this.images[i] : this.images[totalCardCount - i - 1],
          flex: 3,
        };
        this.cards.push(card);
      }
    }
    console.log(this.cards);
    //new FirebaseDataHandler().updateCards(this.cards);
    //this.shuffle();
  }
  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
    console.log(this.cards);
  }

  restartGame() {
    this.gameOver = false;
    this.totalTurns = 0;
    this.minutes = 0;
    this.seconds = 0;
    this.timeToRender = "00:00";
    this.createBoard();
    this.startGame();
  }

  goBack() {
    this.$router.back();
  }

  startGame() {
    this.cards.forEach((card) => {
      card.isFlipped = true;
    });
    this.gameStarted = true;
    this.myInterval = setInterval(() => {
      if (this.seconds == 59) {
        this.seconds = 0;
        this.minutes = this.minutes + 1;
      } else {
        this.seconds = this.seconds + 1;
      }
      this.timeToRender =
        ("0" + this.minutes).slice(-2) + ":" + ("0" + this.seconds).slice(-2);
    }, 1000);
  }

  cardImage(card: Card) {
    const fileName = card.avatar;
    return require(`./../assets/${fileName}`);
  }
}
</script>

<style scoped>
.flip-enter-active {
  transition: all 0.4s ease;
}

.flip-leave-active {
  display: none;
}

.flip-enter,
.flip-leave {
  transform: rotateY(180deg);
  opacity: 0;
}

.match-overlay {
  transition-delay: 0.75s;
  opacity: 0.7;
  background-image: url("../assets/check-solid.svg");
  background-repeat: no-repeat;
  background-position: center;
  border: 5px solid black;
}

.match-overlay {
  opacity: 0.5;
  background-image: url("../assets/check-solid.svg");
  background-repeat: no-repeat;
  background-position: center;
}
</style>