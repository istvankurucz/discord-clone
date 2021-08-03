import React from "react";
import "./HomeFriends.css";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import HomeFriendsHeader from "./HomeFriendsHeader";
import ActiveNow from "../../ActiveNow";

function HomeFriends() {
	const match = useRouteMatch();

	return (
		<div className="homeFriends">
			<HomeFriendsHeader />
			<div className="homeFriends__main">
				<div className="homeFriends__main__friends">
					<img src="https://i.redd.it/epufxryqsvu11.jpg" alt="No one's around to play with Wumpus" />
					<p>No one's around to play with Wumpus</p>
					<Switch>
						<Route path={`${match.path}/all`}>
							<p>All</p>
						</Route>
						<Route path={`${match.path}/pending`}>
							<p>Pending</p>
						</Route>
						<Route path={`${match.path}/blocked`}>
							<p>Blocked</p>
						</Route>
						<Route path={`${match.path}`}>
							<p>Online</p>
						</Route>
					</Switch>
				</div>

				<ActiveNow />
			</div>
		</div>
	);
}

export default HomeFriends;
