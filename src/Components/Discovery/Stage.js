import React from "react";
import "./Stage.css";
import { Avatar } from "@material-ui/core";
import HeadsetIcon from "@material-ui/icons/Headset";

function Stage({ server, title, members, views }) {
	return (
		<div className="stage">
			<div className="stage__header">
				<div className="stage__header__title">
					<server.icon />
					<p>{server.name}</p>
				</div>
				<div className="stage__header__views">
					<HeadsetIcon />
					<span>{views}</span>
				</div>
			</div>

			<h1 className="stage__title">{title}</h1>

			<div className="stage__participants">
				{members.map((member) => (
					<div key={member.name} className="stage__participants__participant">
						<Avatar src={member.photo} alt={member.name} />
						<p>{member.name}</p>
					</div>
				))}
			</div>
		</div>
	);
}

export default Stage;
