import React, { useEffect, useState } from "react";
import "./Server.css";
import { useParams, Redirect } from "react-router-dom";
import { useStateValue } from "../../Context API/StateProvider";
import ServerSidebar from "./ServerSidebar";
import ServerChat from "./ServerChat";
import db from "../../firebase";

function Server() {
	const [{ user }] = useStateValue();
	const { serverId } = useParams();
	const [access, setAccess] = useState(true);

	useEffect(() => {
		db.collection(`servers/${serverId}/members`)
			.where("name", "==", user.displayName)
			.onSnapshot((snapshot) => {
				if (!snapshot.docs.length) setAccess(false);
				else setAccess(true);
			});
	}, [serverId, user.displayName]);

	return (
		<div className="server">
			{access ? (
				<>
					<ServerSidebar />
					<ServerChat serverId={serverId} />
				</>
			) : (
				<Redirect to="/error" />
			)}
		</div>
	);
}

export default Server;
