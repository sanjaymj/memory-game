
<template>
  <div>
    <v-dialog v-model="gameOver" max-width="600px">
      <v-card :color="'#fff'">
        <v-card-title
          class="headline"
          v-text="'All cards successfully matched !!'"
        >
        </v-card-title>

        <v-card-text>
          You matched all cards in {{ totalTurns }} attemps. Do you want to try
          again?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" @click="restartGame()">
            Try Again
          </v-btn>

          <v-btn color="red darken-1" @click="goBack()"> Go BAck </v-btn>
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
              alt="online memory game images"
              class="white--text align-end"
              v-bind:class="{ 'match-overlay': card.isMatched }"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="10rem"
            ></v-img>
            <v-img
              v-else
              :src="flippedSource"
              alt="online memory game images"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="10rem"
            ></v-img>
          </v-card>

          <v-card v-else @click="toggleCard(card)">
            <v-img
              v-if="!card.isFlipped || card.isMatched"
              :src="cardImage(card)"
              alt="online memory game images"
              class="white--text align-end"
              v-bind:class="{ 'match-overlay': card.isMatched }"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="10rem"
            ></v-img>
            <v-img
              v-else
              :src="flippedSource"
              alt="online memory game images"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="10rem"
            ></v-img>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-btn
      v-if="!gameStarted"
      class="pa-10"
      block
      depressed
      elevation="2"
      rounded
      color="success"
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
@Component({})
export default class SinglePlayer extends Vue {
  @State stored!: boolean;
  @State images;
  @State defaultImages!: boolean;
  @State imageCategory!: string;
  public cards: Card[] = [];
  public count = 0;
  flippedSource = "https://cdn.vuetifyjs.com/images/cards/plane.jpg";
  gameStarted = false;
  matchedCardCount = 0;
  public totalTurns = 0;
  public gameOver = false;
  private audioToPlay = "https://www.fesliyanstudios.com/play-mp3/3518";

  myInterval: any;
  hours = 0;
  minutes = 0;
  seconds = 0;
  timeToRender = "00:00";
  progressValue = 0;
  public cardOriginal: Card | undefined = {
    id: 0,
    pairCardId: 0,
    isMatched: false,
    isFlipped: false,
    avatar: "",
  };

  public cardPair: Card | undefined = {
    id: 0,
    pairCardId: 0,
    isMatched: false,
    isFlipped: false,
    avatar: "",
  };

  toggleCard(card: any) {
    if (card.isFlipped) {
      this.count++;

      if (this.count < 2) {
        card.isFlipped = !card.isFlipped;
        this.cardOriginal = this.cards.find((e) => e.id === card.id);
        this.cardOriginal!.isFlipped = false;
      } else if (this.count == 2) {
        card.isFlipped = !card.isFlipped;

        this.cardPair = this.cards.find((e) => e.id === card.id);
        if (this.cardPair && this.cardOriginal) {
          this.cardPair.isFlipped = false;
          if (
            this.cardPair.id === this.cardOriginal.pairCardId &&
            this.cardOriginal.isFlipped === this.cardPair.isFlipped
          ) {
            this.cardPair.isMatched = true;
            this.cardOriginal.isMatched = true;
            this.matchedCardCount++;
            this.progressValue =
              (this.matchedCardCount / this.cards.length) * 200;
            card.isMatched = true;
            this.audioToPlay = "https://www.fesliyanstudios.com/play-mp3/5744";
            new Audio(this.audioToPlay).play();
          } else {
            new Audio(this.audioToPlay).play();
          }

          setTimeout(() => {
            this.count = 0;
            this.totalTurns++;
            this.audioToPlay = "https://www.fesliyanstudios.com/play-mp3/3518";
            this.cards.forEach((card) => (card.isFlipped = true));
            this.findWinner();
          }, 1000);
        }
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
    if (this.defaultImages) {
      for (let i = 0; i < totalCardCount; i++) {
        const card: Card = {
          id: i,
          pairCardId: totalCardCount - i - 1,
          isMatched: false,
          isFlipped: false,
          avatar:
            i <= 7
              ? this.imageCategory + "/img_" + (i + 1) + ".jpeg"
              : this.imageCategory + "/img_" + (totalCardCount - i) + ".jpeg",
          flex: 3,
        };
        this.cards.push(card);
      }
    } else {
      this.cards = this.images;
    }

    this.shuffle();
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  restartGame() {
    this.gameOver = false;
    this.matchedCardCount = 0;
    this.progressValue = 0;
    this.totalTurns = 0;
    this.minutes = 0;
    this.seconds = 0;
    this.timeToRender = "00:00";
    this.createBoard();
    this.startGame();
  }

  goBack() {
    store.commit("reset", true);
    this.$router.back();
  }

  startGame() {
    this.cards.forEach((card) => {
      card.isFlipped = true;
      card.isMatched = false;
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
    this.shuffle();
  }

  cardImage(card: Card) {
    const fileName = card.avatar;
    return require(`./../assets/${fileName}`);
  }

  preventNav(event) {
    event.preventDefault();
    event.returnValue = "";
  }

  beforeMount() {
    window.addEventListener("beforeunload", this.preventNav);
  }

  beforeDestroy() {
    window.removeEventListener("beforeunload", this.preventNav);
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