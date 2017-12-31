var firebase = require('firebase');
firebase.initializeApp({
    "appName": "Quiver Two Node Client Demo",
    "serviceAccount": "./service-account.json",
    "authDomain": "houseapidemo.firebaseapp.com",
    "databaseURL": "https://houseapidemo.firebaseio.com",
    "storageBucket": "houseapidemo.appspot.com"
});
var ref = firebase.app().database().ref();
ref.once('value')
    .then(function (snap) {
    console.log('snap.val()', snap.val());
 });