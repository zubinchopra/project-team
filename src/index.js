import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDBZDYSkOPvsifMITdeUc5Lym4yGkvaxvc",
    authDomain: "info340b-au18-pairs.firebaseapp.com",
    databaseURL: "https://info340b-au18-pairs.firebaseio.com",
    projectId: "info340b-au18-pairs",
    storageBucket: "info340b-au18-pairs.appspot.com",
    messagingSenderId: "825759164719"
};
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
