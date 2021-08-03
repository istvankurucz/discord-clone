import React, { useState } from "react";
import "./ChatHeader.css";

import NotificationsIcon from "@material-ui/icons/Notifications";
import PhoneInTalkIcon from "@material-ui/icons/PhoneInTalk";
import VideocamIcon from "@material-ui/icons/Videocam";
import EditLocationIcon from "@material-ui/icons/EditLocation";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import SearchIcon from "@material-ui/icons/Search";
import InboxIcon from "@material-ui/icons/Inbox";
import HelpIcon from "@material-ui/icons/Help";

function ChatHeader({ name, description, isChannel }) {
	const [isShown, setIsShown] = useState(true);

	const showMembers = () => {
		const icon = document.querySelector(".showPeople");
		const members = document.querySelector(".serverChat__members");
		if (isShown) {
			members.style.display = "none";
			icon.style.color = "rgb(185, 187, 190)";
			setIsShown(!isShown);
		} else {
			members.style.display = "block";
			icon.style.color = "white";
			setIsShown(!isShown);
		}
	};

	return (
		<div className="chatHeader">
			<div className="chatHeader__name">
				<span>{isChannel ? "#" : "@"}</span>
				<p>{name}</p>
				<div className="chatHeader__name__status"></div>
			</div>

			{isChannel ? <p className="chatHeader__details">{description}</p> : ""}

			<div className="chatHeader__icons">
				<div className="chatHeader__icons__chat">
					{isChannel ? (
						<NotificationsIcon />
					) : (
						<>
							<PhoneInTalkIcon />
							<VideocamIcon />
						</>
					)}
					<EditLocationIcon />
					{isChannel ? (
						<PeopleAltIcon className="showPeople" onClick={showMembers} style={{ color: "white" }} />
					) : (
						<PersonAddIcon />
					)}
				</div>
				<div className="chatHeader__icons__search">
					<input type="text" placeholder="Search" />
					<SearchIcon />
				</div>
				<div className="chatHeader__icons__help">
					<InboxIcon />
					<HelpIcon />
				</div>
			</div>
		</div>
	);
}

export default ChatHeader;
