import React, { useEffect, useState } from "react";
import "./ServerSidebar.css";
import { useParams } from "react-router-dom";
import db from "../../firebase";
import Channel from "./Channel";
import ServerSettings from "./ServerSettings";
import Me from "../Me";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CloseIcon from "@material-ui/icons/Close";
import { useStateValue } from "../../Context API/StateProvider";

function ServerSidebar() {
	const [{ user }] = useStateValue();
	const { serverId } = useParams();
	const [serverDetails, setServerDetails] = useState({});
	const [channels, setChannels] = useState([]);
	const [isSettingsOpen, setIsSettingsOpen] = useState(false);

	useEffect(() => {
		db.collection(`servers/${serverId}/channels`).onSnapshot((snapshot) => {
			setChannels(
				snapshot.docs.map((doc) => ({
					id: doc.id,
					name: doc.data().name,
				}))
			);
		});

		db.collection("servers")
			.doc(serverId)
			.onSnapshot((snapshot) =>
				setServerDetails({
					name: snapshot.data().name,
					owner: snapshot.data().owner,
				})
			);
	}, [serverId]);

	//console.log("Channels: ", channels);

	const showSettings = () => {
		const settings = document.querySelector(".serverSettings");
		if (isSettingsOpen) {
			settings.style.display = "none";
			setIsSettingsOpen(!isSettingsOpen);
		} else {
			settings.style.display = "block";
			setIsSettingsOpen(!isSettingsOpen);
		}
	};

	return (
		<div className="serverSidebar">
			<div className="serverSidebar__name" onClick={showSettings}>
				<p>{serverDetails.name}</p>
				{isSettingsOpen ? <CloseIcon /> : <ExpandMoreIcon />}
			</div>

			<div className="serverSidebar__channels">
				{channels.map((channel) => (
					<Channel key={channel.id} name={channel.name} channelId={channel.id} />
				))}
			</div>

			<ServerSettings serverId={serverId} own={user.displayName === serverDetails.owner} />

			<Me />
		</div>
	);
}

export default ServerSidebar;
