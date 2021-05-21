import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyDKeJddc-Jdu4RlIUIJ0ITBXGZferbdiKw',
  authDomain: 'mega-demo-5426b.firebaseapp.com',
  databaseURL: 'https://mega-demo-5426b-default-rtdb.firebaseio.com',
  projectId: 'mega-demo-5426b',
  storageBucket: 'mega-demo-5426b.appspot.com',
  messagingSenderId: '158070119807',
  appId: '1:158070119807:web:41716f2c6708ed26c7ce4a',
  measurementId: 'G-DL2HE69ZLY',
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const analytics = firebase.analytics();

const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => auth.signInWithPopup(provider);
