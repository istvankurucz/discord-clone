import React from "react";
import "./Conversation.css";
import { useStateValue } from "../../Context API/StateProvider";
import { useHistory } from "react-router-dom";
import db from "../../firebase";
import firebase from "firebase";

import { Avatar } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

function Conversation({ photo, name, friendId }) {
	const [{ userId }] = useStateValue();
	const history = useHistory();

	const activeConv = (target) => {
		const conversations = document.querySelectorAll(".conversation");

		conversations.forEach((conv) => conv.classList.remove("active"));

		if (target.className === "MuiAvatar-img active")
			target.parentElement.parentElement.parentElement.classList.add("active");
		if (target.className === "") target.parentElement.parentElement.classList.add("active");
		if (target.className === "conversation") target.classList.add("active");
		if (target.className === "conversation__user active") target.parentElement.classList.add("active");
	};

	const deleteChat = () => {
		db.doc(`users/${userId}`).update({
			friends: firebase.firestore.FieldValue.arrayRemove(name),
		});

		db.collection(`users/${userId}/messages`)
			.where("to", "==", name)
			.onSnapshot((snapshot) => {
				snapshot.forEach((doc) => {
					console.log(doc.id);
					db.doc(`users/${userId}/messages/${doc.id}`)
						.delete()
						.then(() => console.log("The message has been successfully deleted."))
						.catch((err) => console.log("Error deleting the message: ", err));
				});
			});

		history.push("/");
	};

	return (
		<div
			className="conversation"
			onClick={(e) => {
				activeConv(e.target);
				history.push(`/home/${userId}/friends/chats/${friendId}`);
			}}>
			<div className="conversation__user">
				<Avatar src={photo} alt={name} />
				<p>{name}</p>
			</div>
			<CloseIcon onClick={deleteChat} />
		</div>
	);
}

export default Conversation;
