import React, { useState } from "react";
import "./MessageInput.css";
import { useStateValue } from "../Context API/StateProvider";
import db from "../firebase";
import firebase from "firebase";

import AddCircleIcon from "@material-ui/icons/AddCircle";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import GifIcon from "@material-ui/icons/Gif";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";

function MessageInput({ name, serverId, channelId }) {
	const [{ user, userId }] = useStateValue();
	const [input, setInput] = useState("");

	const sendMessage = (e) => {
		e.preventDefault();
		if (serverId) {
			db.collection(`servers/${serverId}/channels/${channelId}/messages`).add({
				content: input,
				timestamp: firebase.firestore.FieldValue.serverTimestamp(),
				name: user.displayName,
				photo: user.photoURL,
			});
		} else {
			db.collection(`users/${userId}/messages`).add({
				content: input,
				timestamp: firebase.firestore.FieldValue.serverTimestamp(),
				to: name,
			});
		}

		setInput("");
	};

	return (
		<div className="messageInput">
			<form className="messageInput__inner">
				<AddCircleIcon />
				<input
					type="text"
					placeholder={`Message ${serverId ? "#" : "@"}${name}`}
					onChange={(e) => setInput(e.target.value)}
					value={input}
				/>
				<button type="submit" onClick={sendMessage}></button>
				<CardGiftcardIcon />
				<GifIcon />
				<EmojiEmotionsIcon />
			</form>
		</div>
	);
}

export default MessageInput;
