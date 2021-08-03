import React from "react";
import "./Home.css";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import HomeSidebar from "./HomeSidebar";
import HomeFriends from "./Home Friends/HomeFriends";
import HomeChat from "./Home Chat/HomeChat";

function Home() {
	const match = useRouteMatch();

	return (
		<div className="home">
			<HomeSidebar />
			<Switch>
				<Route path={`${match.path}/chats/:chatId`}>
					<HomeChat />
				</Route>
				<Route path={`${match.path}`}>
					<HomeFriends />
				</Route>
			</Switch>
		</div>
	);
}

export default Home;
