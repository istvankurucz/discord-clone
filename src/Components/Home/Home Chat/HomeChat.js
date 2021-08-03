import React, { useEffect, useState } from "react";
import "./HomeChat.css";
import { useParams } from "react-router-dom";
import { useStateValue } from "../../../Context API/StateProvider";
import db from "../../../firebase";
import ChatHeader from "../../ChatHeader";
import Message from "../../Message";
import MessageInput from "../../MessageInput";

function HomeChat() {
	const [{ user, userId }] = useStateValue();
	const { chatId } = useParams();
	const [friend, setFriend] = useState({});
	const [myMessages, setMyMessages] = useState([]);
	const [friendMessages, setFriendMessages] = useState([]);
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		db.collection("users")
			.doc(chatId)
			.onSnapshot((snapshot) => {
				setFriend({
					name: snapshot.data().name,
					photo: snapshot.data().imgUrl,
				});
			});
	}, [chatId]);

	useEffect(() => {
		if (friend.name) {
			db.collection(`users/${userId}/messages`)
				.where("to", "==", friend.name)
				.onSnapshot((snapshot) => {
					setMyMessages(
						snapshot.docs.map((doc) => ({
							id: doc.id,
							name: user.displayName,
							timestamp: doc.data().timestamp,
							content: doc.data().content,
						}))
					);
				});
		}
	}, [friend.name, user.displayName, userId, chatId]);

	useEffect(() => {
		if (friend.name) {
			db.collection(`users/${chatId}/messages`)
				.where("to", "==", user.displayName)
				.onSnapshot((snapshot) => {
					setFriendMessages(
						snapshot.docs.map((doc) => ({
							id: doc.id,
							name: friend.name,
							timestamp: doc.data().timestamp,
							content: doc.data().content,
						}))
					);
				});
		}
	}, [friend.name, user.displayName, chatId]);

	useEffect(() => {
		if (myMessages && friendMessages) {
			let m = myMessages;
			friendMessages.forEach((message) => {
				m.push(message);
			});
			if (m) setMessages(m);
		}
	}, [myMessages, friendMessages]);

	/*console.log("My Messages: ", myMessages);
	console.log("Friend Messages: ", friendMessages);
	console.log("Messages: ", messages);*/

	return (
		<div className="homeChat">
			<ChatHeader name={friend.name} />
			<div className="homeChat__inner">
				<div className="homeChat__info">
					<img src={friend.photo} alt={friend.name} />
					<p className="homeChat__info__name">{friend.name}</p>
					<p>
						This is the beginning of your message history with @<span>{friend.name}</span>
					</p>
				</div>

				<div className="homeChat__messages">
					{myMessages.map((message) => (
						<Message
							key={message.id}
							photo={user.displayName === message.name ? user.photoURL : friend.photo}
							name={message.name}
							content={message.content}
							timestamp={message.timestamp}
						/>
					))}
				</div>

				<MessageInput name={friend.name} />
			</div>
		</div>
	);
}

export default HomeChat;
