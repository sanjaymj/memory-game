<template>
<div>
    <div id="flashcard-app" class="container">
      <h1 v-if="isPlayerOneChance">{{playerOneChanceString}}</h1>
      <h1 v-if="!isPlayerOneChance">{{playerTwoChanceString}}</h1>
    <ul>
      <li v-on:click="toggleCard(card)" v-for="card in cards" :key="card.id">
        <transition name="flip">
          <p v-bind:key="!card.isFlipped" class="card">
              <img class="image" v-if="!card.isFlipped || card.isMatched" v-bind:src="card.avatar" />
          </p>
        </transition>
      </li>
    </ul>
    <div>
      <h1>Player one score {{playerOneScore}}</h1>
      <h1>Player two score {{playerTwoScore}}</h1>
      <h1 v-if=gameOver>{{winner}} wins!!!!!</h1>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {Card} from "../models";
import { State } from "vuex-class";
import store  from "../store";
@Component({})
export default class SinglePlayer extends Vue {
  public playerOneChanceString = "Player One Chance";
  public playerTwoChanceString = "Player Two Chance";
  public playerOneScore = 0;
  public playerTwoScore = 0;
  public repeatTurn = false;
  public gameOver = false;
  public winner="PlayerOne"
  public isPlayerOneChance = true;
  public count = 0;
  @State stored!: boolean;
  @State images!: Array<string>;
  public cards: Card[] = [
  ];

  public cardOriginal: Card = {
    id: 0,
    pairCardId: 0,
    isMatched: false,
    isFlipped: false,
    avatar: ''
  };

  public cardPair: Card = {
    id: 0,
    pairCardId: 0,
    isMatched: false,
    isFlipped: false,
    avatar: ''
  };

  created() {
      const totalCardCount = 16;
      for(let i=0; i < totalCardCount; i++) {
          const card: Card = {
            id: i,
            pairCardId: totalCardCount - i - 1,
            isMatched: false,
            isFlipped: true,
            avatar: i <= 7 ? this.images[i] : this.images[totalCardCount - i - 1],
          };
          this.cards.push(card);
      }
      
      this.shuffle();
    }

  toggleCard(card: any) {
    this.count++;

    if(this.count < 2 ) {
      card.isFlipped = !card.isFlipped;
      this.cardOriginal = this.cards.find(e => e.id === card.id);
      this.cardOriginal.isFlipped = false;
      console.log("flipped first card");
      console.log(this.cardOriginal);
    } else {
      this.count = 0;
      console.log("flipped second card");
      card.isFlipped = !card.isFlipped;
      
      this.cardPair = this.cards.find(e => e.id === card.id);
      if (this.cardPair && this.cardOriginal) {
        this.cardPair.isFlipped = false;
      console.log(this.cardPair);
      if (this.cardPair.id === this.cardOriginal.pairCardId && this.cardOriginal.isFlipped ===  this.cardPair.isFlipped) {
        console.log("here");
        this.cardPair.isMatched = true;
        this.cardOriginal.isMatched = true;
        card.isMatched = true;
        this.repeatTurn = true;
        if(this.isPlayerOneChance) {
          this.playerOneScore++;
        } else {
          this.playerTwoScore++;
        }
      } else {
        this.repeatTurn = false;
      }
      }
      

      setTimeout(()=>{
        this.cards.forEach(card => card.isFlipped = true);
        this.findWinner();
        if(!this.repeatTurn) {
          this.isPlayerOneChance = !this.isPlayerOneChance;
        }
      }, 3000);
    }
  }

  findWinner() {
    const card = this.cards.find(card => !card.isMatched);
    console.log("!!!");
    console.log(card);
    if (card) {
      this.gameOver = false;
    } else {
      this.gameOver = true;
      if (this.playerOneScore > this.playerTwoScore) {
          this.winner = "PlayerOne";
        } else {
          this.winner = "PlayerTwo";
        }
    }
  }

  cardImage(card: Card) {
    const fileName = card.avatar;
    return require(`./../assets/test/${fileName}`);

    //return "data:image/jpeg;base64,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"
  }


  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
    console.log(this.cards);
  }
}
</script>

<style>
body {
    font-family: 'Montserrat', sans-serif;
    text-align: center;
  }
  
  ul {
    padding-left: 0;
    display: flex;
    flex-flow: row wrap;
  }
  
  li {
    list-style-type: none;
    padding: 10px 10px;
    transition: all 0.3s ease;
  }
  
  .container {
    max-width: 100%;
  }
  
  .card {
    display: block;
    width: 50px;
    height: 50px;
    background-color: #51aae5;
    border-radius: 7px;
    margin: 5px;
    text-align: center;
    line-height: 27px;
    cursor: pointer;
    position: relative;
    color: #fff;
    font-weight: 600;
    font-size: 20px;
    -webkit-box-shadow: 9px 10px 22px -8px rgba(209,193,209,.5);
    -moz-box-shadow: 9px 10px 22px -8px rgba(209,193,209,.5);
    box-shadow: 9px 10px 22px -8px rgba(209,193,209,.5);
    will-change: transform;
  }
  
  .flip-enter-active {
    transition: all 0.4s ease;
  }
  
  .flip-leave-active {
    display: none;
  }
  
  .flip-enter, .flip-leave {
    transform: rotateY(180deg);
    opacity: 0;
  
  }
  
  /* Form */
  .flashcard-form{
    position: relative;
  }

  .image {
    height: 50px;
    width: 50px;
  }
  
</style>
