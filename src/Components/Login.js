import React from "react";
import "./Login.css";
import { auth, provider } from "../firebase";
import { useStateValue } from "../Context API/StateProvider";
import { actionTypes } from "../Context API/reducer";
import db from "../firebase";

function Login() {
	const [{ user, userId }, dispatch] = useStateValue();

	const signIn = () => {
		auth
			.signInWithPopup(provider)
			.then((result) => {
				dispatch({
					type: actionTypes.SET_USER,
					user: result.user,
					userId: result.additionalUserInfo.profile.id,
				});
				if (db.collection("users").doc(`${result.additionalUserInfo.profile.id}`).exists) {
					db.collection("users").doc(`${result.additionalUserInfo.profile.id}`).set({
						imgUrl: result.user.photoURL,
						name: result.user.displayName,
						friends: [],
						serverNames: [],
					});
				}
			})
			.catch((err) => console.log("Auth: ", err));
	};

	return (
		<div className="login">
			<div className="login__discord">
				<img src="https://discord.com/assets/3437c10597c1526c3dbd98c737c2bcae.svg" alt="Discord Logo" />
				<p>Welcome to my Discord-Clone</p>
			</div>
			<button onClick={signIn} className="login__button">
				<img
					src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
					alt="Google Logo"
				/>
				<p>Sign In with Google</p>
			</button>
		</div>
	);
}

export default Login;
