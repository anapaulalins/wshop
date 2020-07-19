var firebaseConfig = {
    apiKey: "AIzaSyArPKkxpUmOdYrwPxD0ZJeauuc2_N2FeFI",
    authDomain: "womanshop-8adba.firebaseapp.com",
    databaseURL: "https://womanshop-8adba.firebaseio.com",
    projectId: "womanshop-8adba",
    storageBucket: "womanshop-8adba.appspot.com",
    messagingSenderId: "225264666313",
    appId: "1:225264666313:web:6cd3abca83275284f32f18"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();