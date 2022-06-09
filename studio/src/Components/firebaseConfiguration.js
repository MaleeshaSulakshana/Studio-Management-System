import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAhY4tCEOCROLcjQlXLyXxTBdsuldyQoy4",
    authDomain: "hk-wewalage-photograpy.firebaseapp.com",
    projectId: "hk-wewalage-photograpy",
    storageBucket: "hk-wewalage-photograpy.appspot.com",
    messagingSenderId: "1025909959693",
    appId: "1:1025909959693:web:8f93c0ea40bd8cd902f944",
    measurementId: "G-MERW1QFQZB"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export default firebase;