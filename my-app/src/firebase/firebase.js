import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAX-hvjUkvd2ff9lGhcRvkCpezUkCxfpCs",
  authDomain: "freelance-beach-cleanup.firebaseapp.com",
  projectId: "freelance-beach-cleanup",
  storageBucket: "freelance-beach-cleanup.appspot.com",
  messagingSenderId: "261461764075",
  appId: "1:261461764075:web:b2d17843d4e5b19a711bae",
  measurementId: "G-5SVG8C4Z65"
};

firebase.initializeApp(firebaseConfig);

export default firebase;