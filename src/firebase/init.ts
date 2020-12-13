import firebase from 'firebase';
import firestore from 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyCB0NZinOdJaNoVCMsck9ZWeg5nQIYa9zo",
    authDomain: "sanjay-memory-game.firebaseapp.com",
    databaseURL: "https://sanjay-memory-game.firebaseio.com",
    projectId: "sanjay-memory-game",
    storageBucket: "sanjay-memory-game.appspot.com",
    messagingSenderId: "550949227640",
    appId: "1:550949227640:web:67dbcb333cf7bc217cf18d",
    measurementId: "G-5T7CM2SGTX"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebaseApp.firestore();