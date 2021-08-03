import React, { useState, useEffect } from "react";
import firebase from "firebase";
import "./ServerBubble.css";
import { useStateValue } from "../../Context API/StateProvider";
import { useHistory } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import db from "../../firebase";

function ServerBubble({ imgUrl, alt, Icon, serverId, discord }) {
	const [{ user, userId }] = useStateValue();
	const history = useHistory();
	const [generalId, setGeneralId] = useState("");

	useEffect(() => {
		db.collection(`servers/${serverId}/channels`)
			.where("name", "==", "general")
			.onSnapshot((snapshot) => {
				snapshot.forEach((doc) => setGeneralId(doc.id));
			});
	}, [serverId]);

	const addServer = () => {
		const serverName = prompt("Please enter the server name");
		if (serverName) {
			db.collection("servers")
				.add({
					name: serverName,
					backgroundImgUrl: "",
				})
				.then((serverRef) => {
					console.log("Document written with ID: ", serverRef.id);

					db.collection(`servers/${serverRef.id}/channels`)
						.add({
							name: "general",
							description: "General channel",
						})
						.then((channelRef) => {
							console.log("General channel has been added with ID: ", channelRef.id);
						})
						.catch((err) => console.log("Error while adding general channel ", err));

					db.collection(`servers/${serverRef.id}/members`).add({
						name: user.displayName,
						nickname: user.displayName,
						photo: user.photoURL,
					});

					db.collection("users")
						.doc(userId)
						.update({
							serverNames: firebase.firestore.FieldValue.arrayUnion(serverName),
						})
						.then(() => console.log("Document successfully updated"))
						.catch((err) => console.log("Error during the update: ", err));
				})
				.catch((err) => console.log("Error adding document", err));
		}
	};

	const activeServer = (target, which) => {
		const home = document.querySelector(".serverBubble.discord");
		const servers = document.querySelectorAll(".serverBubble._server");
		const icons = document.querySelectorAll(".serverBubble.icon");

		home.classList.remove("active");
		servers.forEach((server) => server.classList.remove("active"));
		icons.forEach((icon) => icon.classList.remove("active"));

		if (which === "discord") home.classList.add("active");
		if (which === "server") target.classList.add("active");
		if (which === "icon") {
			if (!target.classList.length) target.parentElement.parentElement.classList.add("active");
			else if (target.classList.length === 1) target.parentElement.classList.add("active");
			else target.classList.add("active");
		}
	};

	if (discord) {
		return (
			<div
				className="serverBubble discord active"
				onClick={(e) => {
					history.push(`/home/${userId}`);
					activeServer(e.target, "discord");
				}}>
				<img src={imgUrl} alt={alt} />
			</div>
		);
	} else {
		if (Icon) {
			return (
				<div
					className="serverBubble icon"
					onClick={(e) => {
						activeServer(e.target, "icon");
						if (Icon === AddIcon) {
							history.push(`/${userId}/servers/new`);
							addServer();
						} else history.push("/guild-discovery/home");
					}}>
					<Icon />
				</div>
			);
		} else {
			return (
				<div
					className="serverBubble _server"
					style={{
						backgroundImage: `url(${imgUrl})`,
						backgroundSize: "55px 55px",
						backgroundPosition: "center center",
					}}
					onClick={(e) => {
						activeServer(e.target, "server");
						history.push(`/${userId}/servers/${serverId}/channels/${generalId}`);
					}}></div>
			);
		}
	}
}

export default ServerBubble;
