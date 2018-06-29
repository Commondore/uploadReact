import firebase from "firebase";

const config = {
  apiKey: "AIzaSyBSEf5-ceUnRG-39Fwqq7kcqpHZr_7fHFg",
  authDomain: "testing-ab2f8.firebaseapp.com",
  databaseURL: "https://testing-ab2f8.firebaseio.com",
  projectId: "testing-ab2f8",
  storageBucket: "testing-ab2f8.appspot.com",
  messagingSenderId: "1023385928272"
};
firebase.initializeApp(config);

export default firebase;