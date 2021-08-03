import React from "react";
import "./DiscoverSidebar.css";
import { useHistory } from "react-router";
import Me from "../Me";

import ExploreIcon from "@material-ui/icons/Explore";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import SchoolIcon from "@material-ui/icons/School";
import ComputerIcon from "@material-ui/icons/Computer";
import TvIcon from "@material-ui/icons/Tv";

function DiscoverSidebar() {
	const history = useHistory();

	const activeItem = (num) => {
		const menuItems = document.querySelectorAll(".discoverSidebar__menu__item");

		menuItems.forEach((item) => item.classList.remove("active"));
		menuItems[num].classList.add("active");
	};

	return (
		<div className="discoverSidebar">
			<h1>Discover</h1>
			<div className="discoverSidebar__menu">
				<div
					className="discoverSidebar__menu__item active"
					onClick={() => {
						activeItem(0);
						history.push("/guild-discovery/home");
					}}>
					<ExploreIcon />
					<p>Home</p>
				</div>
				<div
					className="discoverSidebar__menu__item"
					onClick={() => {
						activeItem(1);
						history.push("/guild-discovery/gaming");
					}}>
					<SportsEsportsIcon />
					<p>Gaming</p>
				</div>
				<div
					className="discoverSidebar__menu__item"
					onClick={() => {
						activeItem(2);
						history.push("/guild-discovery/music");
					}}>
					<MusicNoteIcon />
					<p>Music</p>
				</div>
				<div
					className="discoverSidebar__menu__item"
					onClick={() => {
						activeItem(3);
						history.push("/guild-discovery/education");
					}}>
					<SchoolIcon />
					<p>Education</p>
				</div>
				<div
					className="discoverSidebar__menu__item"
					onClick={() => {
						activeItem(4);
						history.push("/guild-discovery/science");
					}}>
					<ComputerIcon />
					<p>Science & Tech</p>
				</div>
				<div
					className="discoverSidebar__menu__item"
					onClick={() => {
						activeItem(5);
						history.push("/guild-discovery/entertainment");
					}}>
					<TvIcon />
					<p>Entertainment</p>
				</div>
			</div>

			<Me />
		</div>
	);
}

export default DiscoverSidebar;
