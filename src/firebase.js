import firebase from "firebase";

const firebaseConfig = {
	apiKey: "AIzaSyCJy0oE9vjimiagjBBR1R-6POVicglYfYo",
	authDomain: "discord-clone-ed9b6.firebaseapp.com",
	projectId: "discord-clone-ed9b6",
	storageBucket: "discord-clone-ed9b6.appspot.com",
	messagingSenderId: "1009420001473",
	appId: "1:1009420001473:web:a681cb02d7aafe65def440",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
