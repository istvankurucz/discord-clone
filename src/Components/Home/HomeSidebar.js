import React, { useState, useEffect } from "react";
import "./HomeSidebar.css";
import Conversation from "./Conversation";
import { useStateValue } from "../../Context API/StateProvider";
import { useHistory } from "react-router-dom";
import firebase from "firebase";
import db from "../../firebase";
import Me from "../Me";

import PersonIcon from "@material-ui/icons/Person";
import TrackChangesIcon from "@material-ui/icons/TrackChanges";
import ShopIcon from "@material-ui/icons/Shop";
import AddIcon from "@material-ui/icons/Add";

function Sidebar() {
	const [{ userId }] = useStateValue();
	const [friends, setFriends] = useState();
	const [newFriend, setNewFriend] = useState({});
	const history = useHistory();

	useEffect(() => {
		db.collection("users")
			.doc(userId)
			.onSnapshot((doc) => {
				db.collection("users")
					.where("name", "in", doc.data().friends)
					.onSnapshot((snapshot) => {
						setFriends(
							snapshot.docs.map((doc) => ({
								id: doc.id,
								name: doc.data().name,
								imgUrl: doc.data().imgUrl,
							}))
						);
					});
			});
	}, [userId]);

	//console.log("Friends: ", friends);

	const addChat = () => {
		let newChat = true;
		const chatName = prompt("Start conversation with: ");
		if (chatName) {
			db.collection("users")
				.doc(userId)
				.onSnapshot((snapshot) => {
					snapshot.data().friends.forEach((friend) => {
						if (friend === chatName) {
							db.collection("users")
								.where("name", "==", chatName)
								.onSnapshot((snapshot) => {
									snapshot.forEach((doc) => history.push(`/home/${userId}/friends/chats/${doc.id}`));
								});
							newChat = false;
						}
					});
				});

			if (newChat) {
				db.collection("users")
					.where("name", "==", chatName)
					.onSnapshot((snapshot) => {
						if (snapshot.docs.length) {
							setNewFriend(
								snapshot.docs.map((doc) => ({
									id: doc.id,
									name: doc.data().name,
									imgUrl: doc.data().imgUrl,
								}))
							);
						} else console.log(`There is no user with the given name ${chatName}.`);
					});

				if (newFriend) {
					db.collection("users")
						.doc(userId)
						.update({
							friends: firebase.firestore.FieldValue.arrayUnion(chatName),
						});
				}
			}
		}
	};

	const activeItem = (num) => {
		const friends = document.querySelector(".homeSidebar__menu__item:first-child");
		const discovery = document.querySelector(".homeSidebar__menu__item:nth-child(2)");
		const nitro = document.querySelector(".homeSidebar__menu__item:last-child");

		friends.classList.remove("active");
		discovery.classList.remove("active");
		nitro.classList.remove("active");

		if (num === 1) friends.classList.add("active");
		if (num === 2) discovery.classList.add("active");
		if (num === 3) nitro.classList.add("active");
	};

	return (
		<div className="homeSidebar">
			<div className="homeSidebar__search">
				<input type="text" placeholder="Find or start a conversation" />
			</div>

			<div className="homeSidebar__menu">
				<div
					className="homeSidebar__menu__item active"
					onClick={() => {
						activeItem(1);
						history.push(`/home/${userId}/friends`);
					}}>
					<PersonIcon />
					<p>Friends</p>
				</div>
				<div
					className="homeSidebar__menu__item"
					onClick={() => {
						activeItem(2);
						history.push("/discovery");
					}}>
					<TrackChangesIcon />
					<p>Stage Discovery</p>
				</div>
				<div
					className="homeSidebar__menu__item"
					onClick={() => {
						activeItem(3);
						history.push("/store");
					}}>
					<ShopIcon />
					<p>Nitro</p>
				</div>
			</div>

			<div className="homeSidebar__chats">
				<div className="homeSidebar__chats__title">
					<p>Direct messages</p>
					<AddIcon onClick={addChat} />
				</div>
				<div className="homeSidebar__chats__conversations">
					{friends?.map((friend) => (
						<Conversation key={friend.id} photo={friend.imgUrl} name={friend.name} friendId={friend.id} />
					))}
				</div>
			</div>

			<Me />
		</div>
	);
}

export default Sidebar;
