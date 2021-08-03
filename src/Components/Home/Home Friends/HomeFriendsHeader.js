import React from "react";
import "./HomeFriendsHeader.css";
import { useHistory, useRouteMatch } from "react-router-dom";

import PersonIcon from "@material-ui/icons/Person";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import InboxIcon from "@material-ui/icons/Inbox";
import HelpIcon from "@material-ui/icons/Help";

function HomeFriendsHeader() {
	const history = useHistory();
	const match = useRouteMatch();

	const activeItem = (target) => {
		const menuItems = document.querySelectorAll(
			".homeFriendsHeader__menu__item:not(.homeFriendsHeader__menu__item:last-child)"
		);

		menuItems.forEach((item) => item.classList.remove("active"));
		target.classList.add("active");
	};

	return (
		<div className="homeFriendsHeader">
			<div className="homeFriendsHeader__menu">
				<div className="homeFriendsHeader__menu__title">
					<PersonIcon />
					<p>Friends</p>
				</div>
				<div
					className="homeFriendsHeader__menu__item active"
					onClick={(e) => {
						activeItem(e.target);
						history.push(`${match.path}`);
					}}>
					Online
				</div>
				<div
					className="homeFriendsHeader__menu__item"
					onClick={(e) => {
						activeItem(e.target);
						history.push(`${match.path}/all`);
					}}>
					All
				</div>
				<div
					className="homeFriendsHeader__menu__item"
					onClick={(e) => {
						activeItem(e.target);
						history.push(`${match.path}/pending`);
					}}>
					Pending
				</div>
				<div
					className="homeFriendsHeader__menu__item"
					onClick={(e) => {
						activeItem(e.target);
						history.push(`${match.path}/blocked`);
					}}>
					Blocked
				</div>
				<div className="homeFriendsHeader__menu__item">Add Friend</div>
			</div>

			<div className="homeFriendsHeader__icons">
				<span className="homeFriendsHeader__icons__icon">
					<ChatBubbleIcon />
				</span>
				<InboxIcon />
				<HelpIcon />
			</div>
		</div>
	);
}

export default HomeFriendsHeader;
