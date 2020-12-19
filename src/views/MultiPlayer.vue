
<template>
  <div>
    <v-dialog v-model="gameOver" width="500">
      <p>{{ count }}</p>
      <v-card>
        <v-card-title class="headline grey lighten-2"
          >Winner is {{ winner }}</v-card-title
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
          >attempts {{ currentTurn }}</v-chip
        >
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
    <div class="pa-10">
      <v-progress-linear v-model="guestScore" color="amber" height="25">
        <template>
          <strong>{{ gameGuest["name"] }}</strong>
        </template>
      </v-progress-linear>
      <br />
      <v-progress-linear v-model="hostScore" color="green" height="25">
        <template>
          <strong>{{ gameHost["name"] }}</strong>
        </template>
      </v-progress-linear>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Card } from "../models";
import { State } from "vuex-class";
import store from "../store";
import { FirebaseDataHandler } from "@/services/FirebaseDataHandler";
@Component({})
export default class MultiPlayer extends Vue {
  @State stored!: boolean;
  @State images!: Array<string>;
  @State defaultImages!: boolean;
  @State boardContent!: any;
  @State user!: any;
  @State gameGuest!: any;
  @State gameHost!: any;
  @State currentTurn!: any;
  @State boardId!: any;
  public cards: Card[] = [];
  public count = 0;
  flippedSource = "https://cdn.vuetifyjs.com/images/cards/plane.jpg";
  gameStarted = false;
  matchedCardCount = 0;
  public totalTurns = 0;
  public gameOver = false;

  public matched = false;

  guestScore = 0;
  hostScore = 0;
  myInterval: any;
  winner = "";
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
    if (this.currentTurn == this.user["name"]) {
      //if (true) {
      this.count++;
      console.log(this.gameGuest);
      console.log(this.gameHost);
      if (this.count < 2) {
        card.isFlipped = !card.isFlipped;

        new FirebaseDataHandler().updateCards(this.cards, this.boardId);
        this.cardOriginal = this.cards.find((e) => e.id === card.id);
        this.cardOriginal!.isFlipped = false;
      } else if (this.count == 2) {
        card.isFlipped = !card.isFlipped;
        new FirebaseDataHandler().updateCards(this.cards, this.boardId);
        //new FirebaseDataHandler().updateCards(this.cards);
        this.cardPair = this.cards.find((e) => e.id === card.id);
        if (this.cardPair && this.cardOriginal) {
          this.cardPair.isFlipped = false;

          if (
            this.cardPair.id === this.cardOriginal.pairCardId &&
            this.cardOriginal.isFlipped === this.cardPair.isFlipped
          ) {
            this.cardPair.isMatched = true;
            this.cardOriginal.isMatched = true;
            console.log("matching");
            this.matched = true;
            this.matchedCardCount++;
            this.progressValue = (this.matchedCardCount / 16) * 200;
            card.isMatched = true;
            this.cards.forEach((e) => {
              if (e.id == card.pairCardId) {
                e.isMatched = true;
              }
            });
            new FirebaseDataHandler().updateCards(this.cards, this.boardId);

            if (this.gameHost["name"] == this.currentTurn) {
              this.gameHost["score"] = this.gameHost["score"] + 1;

              new FirebaseDataHandler().updateScore(
                "hostUser",
                this.gameHost,
                this.boardId
              );
            } else {
              this.gameGuest["score"] = this.gameGuest["score"] + 1;

              new FirebaseDataHandler().updateScore(
                "guestUser",
                this.gameGuest,
                this.boardId
              );
            }
          }

          setTimeout(() => {
            this.count = 0;
            this.totalTurns++;
            this.cards.forEach((card) => (card.isFlipped = true));
            new FirebaseDataHandler().updateCards(this.cards, this.boardId);
            console.log("here");
            console.log(this.matched);
            if (!this.matched) {
              if (this.gameHost["name"] == this.currentTurn) {
                new FirebaseDataHandler().updateUser(
                  this.gameGuest["name"],
                  this.boardId
                );
              } else {
                new FirebaseDataHandler().updateUser(
                  this.gameHost["name"],
                  this.boardId
                );
              }
            }
            this.matched = false;
            this.findWinner();
          }, 1000);
        }
      }
    }
  }

  findWinner() {
    const card = this.cards.find((card) => !card.isMatched);
    this.gameOver = !card;
    if (this.gameOver) {
      if (this.guestScore < this.hostScore) {
        this.winner = this.gameHost["name"];
      } else {
        this.winner = this.gameGuest["name"];
      }
      clearInterval(this.myInterval);
    }
  }
  created() {
    this.createBoard();
    new FirebaseDataHandler().getBoardContent(this.boardId);
  }

  @Watch("$store.state.boardContent")
  onValueChanged() {
    this.cards = this.boardContent;
  }

  @Watch("$store.state.gameHost")
  onValueChanged1() {
    this.hostScore = (this.gameHost["score"] / 16) * 200;
  }

  @Watch("$store.state.currentTurn")
  onValueChanged3() {
    console.log("!!!changed");
    console.log(this.currentTurn);
  }

  @Watch("$store.state.gameGuest")
  onValueChanged2() {
    this.guestScore = (this.gameGuest["score"] / 16) * 200;
  }

  createBoard() {
    this.cards = this.boardContent;
    this.shuffle();
    new FirebaseDataHandler().updateCards(this.cards, this.boardId);
    //this.shuffle();
  }
  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  restartGame() {
    this.gameOver = false;
    this.totalTurns = 0;
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