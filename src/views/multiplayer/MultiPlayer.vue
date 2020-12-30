/* eslint-disable */
<template>
  <div>
    <GameStartNotifier />
    <v-dialog v-model="gameOver" max-width="600px">
      <v-card :color="'#fff'">
        <div class="d-flex-column justify-space-between">
          <div>
            <v-card-title class="headline">Winner is {{ winner }}</v-card-title>
          </div>
          <div>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="success" @click="restartGame()">Try again</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="error" @click="goBack()">Exit</v-btn>
            </v-card-actions>
          </div>
        </div>
      </v-card>
    </v-dialog>

    <v-container fluid>
      <div v-if="gameStarted">
        <CurrentPlayerTurnLabel />
      </div>
      <div v-else>
        <p class="text-center Roboto px-4 pt-4 pb-3">
          <span class="purple--text">Press startGame when you are ready</span>
        </p>
      </div>

      <v-row dense>
        <v-col v-for="card in cards" :key="card.id" :cols="card.flex">
          <v-card v-if="!defaultImages" @click="toggleCard(card)">
            <v-img
              v-if="!card.isFlipped || card.isMatched"
              :src="card.avatar"
              class="white--text align-end"
              v-bind:class="{ 'match-overlay': card.isMatched }"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="8rem"
            ></v-img>
            <v-img
              v-else
              :src="flippedSource"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="8rem"
            ></v-img>
          </v-card>

          <v-card v-else @click="toggleCard(card)">
            <v-img
              v-if="!card.isFlipped || card.isMatched"
              :src="cardImage(card)"
              class="white--text align-end"
              v-bind:class="{ 'match-overlay': card.isMatched }"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="8rem"
            ></v-img>
            <v-img
              v-else
              :src="flippedSource"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="8rem"
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
      @click="onStartButtonClick()"
      >Start Game</v-btn
    >
    <div v-if="gameStarted">
      <PlayerScores />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Card } from "../../models";
import { State } from "vuex-class";
import store from "../../store";
import { FirebaseDataHandler } from "@/services/FirebaseDataHandler";
import CurrentPlayerTurnLabel from "./CurrentPlayerTurnLabel.vue";
import GameStartNotifier from "./GameStartNotifier.vue";
import PlayerScores from "./PlayerScores.vue";

@Component({
  components: { CurrentPlayerTurnLabel, PlayerScores, GameStartNotifier },
})
export default class MultiPlayer extends Vue {
  @State defaultImages!: boolean;
  @State boardContent!: any;
  @State user!: any;
  @State gameGuest!: any;
  @State requestToStartGame!: any;
  @State gameHost!: any;
  @State currentTurn!: any;
  @State boardId!: any;

  public cards: Card[] = [];
  public count = 0;
  public flippedSource = "https://cdn.vuetifyjs.com/images/cards/plane.jpg";
  public gameStarted = false;
  public gameOver = false;

  public matched = false;

  public guestScore = 0;
  public hostScore = 0;
  public myInterval: any;
  public winner = "";

  private audioToPlay = "https://www.fesliyanstudios.com/play-mp3/3518";

  created() {
    this.createBoard();
    new FirebaseDataHandler().getBoardContent(this.boardId);
  }

  createBoard() {
    this.cards = this.boardContent;
    console.log(this.cards);
    new FirebaseDataHandler().updateCards(this.cards, this.boardId);
  }

  shuffle() {
    console.log("in shuffle");
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  toggleCard(card: any) {
    if (this.currentTurn == this.user["name"]) {
      this.count++;

      if (this.count === 1) {
        this.toggleFirstCard(card);
      } else if (this.count === 2) {
        this.toggleSecondCard(card);
      }
    }
  }

  toggleFirstCard(card: Card) {
    card.isFlipped = !card.isFlipped;
    new FirebaseDataHandler().updateCards(this.cards, this.boardId);
  }

  toggleSecondCard(card: Card) {
    card.isFlipped = !card.isFlipped;
    this.matched = this.isPairCardFlipped(card);
    new FirebaseDataHandler().updateCards(this.cards, this.boardId);
    if (this.matched) {
      this.updateUserScore();
      this.audioToPlay = "https://www.fesliyanstudios.com/play-mp3/5744";
      new Audio(this.audioToPlay).play();
    } else {
      new Audio(this.audioToPlay).play();
    }

    setTimeout(() => {
      this.flipOpenCardsWithoutPairs();
      this.audioToPlay = "https://www.fesliyanstudios.com/play-mp3/3518";
    }, 3000);
  }

  isPairCardFlipped(card: Card) {
    let pairFlipped = false;
    this.cards.forEach((e) => {
      if (e.id == card.pairCardId) {
        if (e.isFlipped == false && e.isMatched == false) {
          e.isMatched = true;
          card.isMatched = true;
          pairFlipped = true;
          return;
        }
      }
    });
    return pairFlipped;
  }

  updateUserScore() {
    if (this.gameHost["name"] == this.currentTurn) {
      this.updateHostScore();
    } else {
      this.updateGuestScore();
    }
  }

  updateGuestScore() {
    this.gameGuest["score"] = this.gameGuest["score"] + 1;

    new FirebaseDataHandler().updateScore(
      "guestUser",
      this.gameGuest,
      this.boardId
    );
  }

  updateHostScore() {
    this.gameHost["score"] = this.gameHost["score"] + 1;

    new FirebaseDataHandler().updateScore(
      "hostUser",
      this.gameHost,
      this.boardId
    );
  }

  resetGuestScore() {
    this.gameGuest["score"] = 0;

    new FirebaseDataHandler().updateScore(
      "guestUser",
      this.gameGuest,
      this.boardId
    );
  }

  resetHostScore() {
    this.gameHost["score"] = 0;

    new FirebaseDataHandler().updateScore(
      "hostUser",
      this.gameHost,
      this.boardId
    );
  }

  flipOpenCardsWithoutPairs() {
    this.count = 0;
    this.cards.forEach((card) => (card.isFlipped = true));
    new FirebaseDataHandler().updateCards(this.cards, this.boardId);

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

  @Watch("$store.state.boardContent")
  onValueChanged() {
    this.cards = this.boardContent;
  }

  @Watch("$store.state.gameHost")
  onValueChanged1() {
    this.hostScore = (this.gameHost["score"] / 16) * 200;
    this.findWinner();
  }

  @Watch("$store.state.currentTurn")
  onValueChanged3() {
    console.log(this.currentTurn);
  }

  @Watch("$store.state.bothPlayersReady")
  onValueChanged4() {
    console.log("starting game");
    this.startGame();
  }

  @Watch("$store.state.gameGuest")
  onValueChanged2() {
    this.guestScore = (this.gameGuest["score"] / 16) * 200;
    this.findWinner();
  }

  restartGame() {
    this.gameOver = false;
    this.cards.forEach((card) => {
      card.isFlipped = true;
      card.isMatched = false;
    });

    new FirebaseDataHandler().updateCards(this.cards, this.boardId);
    this.resetGuestScore();
    this.resetHostScore();

    this.createBoard();
    this.startGame();
  }

  goBack() {
    store.commit("updateMultiPlayerBoardCreationState", false);

    this.$router.back();
  }

  onStartButtonClick() {
    new FirebaseDataHandler().requestToStartGame(this.boardId);
  }

  startGame() {
    this.cards.forEach((card) => {
      card.isFlipped = true;
    });
    this.shuffle();
    new FirebaseDataHandler().updateCards(this.cards, this.boardId);
    this.gameStarted = true;
  }

  cardImage(card: Card) {
    const fileName = card.avatar;
    return require(`./../../assets/${fileName}`);
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
  background-image: url("../../assets/check-solid.svg");
  background-repeat: no-repeat;
  background-position: center;
  border: 5px solid black;
}

.match-overlay {
  opacity: 0.5;
  background-image: url("../../assets/check-solid.svg");
  background-repeat: no-repeat;
  background-position: center;
}
</style>