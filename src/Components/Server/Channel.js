import React from "react";
import "./Channel.css";
import { useHistory, useParams } from "react-router-dom";
import firebase from "firebase";
import db from "../../firebase";
import { useStateValue } from "../../Context API/StateProvider";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

function Channel({ name, channelId }) {
	const [{ userId }] = useStateValue();
	const { serverId } = useParams();
	const history = useHistory();

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

	const activeChannel = (target) => {
		const channels = document.querySelectorAll(".channel");

		channels.forEach((channel) => channel.classList.remove("active"));

		if (!target.className) target.parentElement.classList.add("active");
		if (target.className === "channel") target.classList.add("active");
	};

	return (
		<div
			className={`channel ${name === "general" ? "active" : ""}`}
			onClick={(e) => {
				activeChannel(e.target);
				history.push(`/${userId}/servers/${serverId}/channels/${channelId}`);
			}}>
			<span>#</span>
			<p>{name}</p>
			<div className="channel__addIcon" onClick={addMember}>
				<PersonAddIcon />
			</div>
		</div>
	);
}

export default Channel;
