import React from "react";
import "./ServerSettings.css";
import db from "../../firebase";
import firebase from "firebase";
import { useStateValue } from "../../Context API/StateProvider";

import PersonAddIcon from "@material-ui/icons/PersonAdd";
import SettingsIcon from "@material-ui/icons/Settings";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import NotificationsIcon from "@material-ui/icons/Notifications";
import PolicyIcon from "@material-ui/icons/Policy";
import EditIcon from "@material-ui/icons/Edit";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

function ServerSettings({ serverId, own }) {
	const [{ user, userId }] = useStateValue();

	const createChannel = () => {
		const channelName = prompt("The name of the new channel: ");
		const channelDescription = prompt("Here you can add a short description to the new channel: ");
		if (channelName) {
			db.collection(`servers/${serverId}/channels`)
				.add({
					name: channelName,
					description: channelDescription,
				})
				.then(() => console.log("The new channel has been successfully added."))
				.catch((err) => console.log("Error adding the new channel: ", err));
		}
	};

	const addMember = () => {
		const memberName = prompt("Invite a friend");
		if (memberName) {
			db.collection("users")
				.where("name", "==", memberName)
				.onSnapshot((snapshot) => {
					if (snapshot.docs.length) {
						snapshot.forEach((doc) => {
							db.collection("servers")
								.doc(serverId)
								.onSnapshot((snapshot) => {
									db.collection("users")
										.doc(doc.id)
										.update({
											serverNames: firebase.firestore.FieldValue.arrayUnion(snapshot.data().name),
										});
								});

							db.collection(`servers/${serverId}/members`).add({
								name: doc.data().name,
								nickname: doc.data().name,
								photo: doc.data().imgUrl,
							});
						});
					} else console.log("There is no user with the given name.");
				});
		}
	};

	const changeNickname = () => {
		const nickname = prompt("Nickname: ");
		db.collection(`servers/${serverId}/members`)
			.where("name", "==", user.displayName)
			.onSnapshot((snapshot) => {
				snapshot.forEach((doc) => {
					db.doc(`servers/${serverId}/members/${doc.id}`)
						.update({
							nickname: nickname,
						})
						.then(() => console.log("Document successfully updated!"))
						.catch((err) => console.log("Erro updating the document: ", err));
				});
			});
	};

	const leaveServer = () => {
		db.collection(`servers/${serverId}/members`)
			.where("name", "==", user.displayName)
			.onSnapshot((snapshot) => {
				snapshot.forEach((doc) => {
					console.log(doc.id);
					db.doc(`servers/${serverId}/members/${doc.id}`)
						.delete()
						.then(() => console.log("Member has been deleted from the server"))
						.catch((err) => console.log("Error deleting the member ", err));
				});
			});

		db.doc(`servers/${serverId}`).onSnapshot((snapshot) => {
			console.log(snapshot.data().name);
			db.doc(`users/${userId}`).update({
				serverNames: firebase.firestore.FieldValue.arrayRemove(snapshot.data().name),
			});
		});
	};

	return (
		<div className="serverSettings">
			<div className="serverSettings__row">
				<p>Server Boost</p>
				<img
					src="https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/185949638/original/9b2d7767c64f3a3409255d80de0c6aa3c419b5e5/give-you-nitro-boost-cheap-5dollars.jpg"
					alt="Boost icon"
				/>
			</div>
			<hr />
			<div className="serverSettings__row invite" onClick={addMember}>
				<p>Invite People</p>
				<PersonAddIcon />
			</div>
			{own ? (
				<>
					<div className="serverSettings__row">
						<p>Server Settings</p>
						<SettingsIcon />
					</div>
					<div className="serverSettings__row" onClick={createChannel}>
						<p>Create Channel</p>
						<AddCircleIcon />
					</div>
					<div className="serverSettings__row">
						<p>Create Category</p>
						<LibraryAddIcon />
					</div>
				</>
			) : (
				""
			)}
			<div className="serverSettings__row">
				<p>Notification Settings</p>
				<NotificationsIcon />
			</div>
			<div className="serverSettings__row">
				<p>Privacy Settings</p>
				<PolicyIcon />
			</div>
			<hr />
			<div className="serverSettings__row" onClick={changeNickname}>
				<p>Change Nickname</p>
				<EditIcon />
			</div>
			<div className="serverSettings__row">
				<p>Hide Muted Channels</p>
				<input type="checkbox" name="muted" id="muted" />
			</div>
			{own ? (
				""
			) : (
				<>
					<hr />
					<a href="/" className="serverSettings__row leave" onClick={leaveServer}>
						<p>Leave Server</p>
						<ExitToAppIcon />
					</a>
				</>
			)}
		</div>
	);
}

export default ServerSettings;
