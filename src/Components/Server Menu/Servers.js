import React, { useEffect, useState } from "react";
import "./Servers.css";
import ServerBubble from "./ServerBubble";

import AddIcon from "@material-ui/icons/Add";
import ExploreIcon from "@material-ui/icons/Explore";

import db from "../../firebase";
import { useStateValue } from "../../Context API/StateProvider";

function Servers() {
	const [servers, setServers] = useState([]);
	const [{ userId }] = useStateValue();

	useEffect(() => {
		db.collection("users")
			.doc(userId)
			.onSnapshot((doc) => {
				db.collection("servers")
					.where("name", "in", doc.data().serverNames)
					.onSnapshot((snapshot) => {
						setServers(
							snapshot.docs.map((doc) => ({
								id: doc.id,
								background: doc.data().backgroundImgUrl,
							}))
						);
					});
			});
	}, [userId]);

	//console.log("Servers: ", servers);

	return (
		<div className="servers">
			<ServerBubble
				key="discordLogo"
				imgUrl="https://discord.com/assets/145dc557845548a36a82337912ca3ac5.svg"
				alt="Discord Logo"
				discord={true}
			/>
			<hr />
			{servers.map((server) => (
				<ServerBubble key={server.id} imgUrl={server.background} alt="Server name" serverId={server.id} />
			))}
			<ServerBubble key="addIcon" Icon={AddIcon} />
			<ServerBubble key="exploreIcon" Icon={ExploreIcon} />
		</div>
	);
}

export default Servers;
