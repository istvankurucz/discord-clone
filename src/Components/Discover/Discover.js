import React from "react";
import "./Discover.css";
import DiscoverSidebar from "./DiscoverSidebar";
import DiscoverFeed from "./DiscoverFeed";

function Discover() {
	return (
		<div className="discover">
			<DiscoverSidebar />
			<DiscoverFeed />
		</div>
	);
}

export default Discover;
