// https://discord-clone-ed9b6.web.app

import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { useStateValue } from "../Context API/StateProvider";
import Login from "./Login";
import Servers from "./Server Menu/Servers";
import Home from "./Home/Home";
import HomeSidebar from "./Home/HomeSidebar";
import Server from "./Server/Server";
import Discovery from "./Discovery/Discovery";
import Nitro from "./Nitro";
import Discover from "./Discover/Discover";
import Error from "./Error";

function App() {
	const [{ user, userId }] = useStateValue();

	return (
		<div className="app">
			<Router>
				{!user ? (
					<Login />
				) : (
					<>
						<Servers />
						<Switch>
							<Route path={`/home/${userId}/friends`}>
								<Home />
							</Route>
							<Route path={`/${userId}/servers/new`}>
								<h1>New server</h1>
							</Route>
							<Route path={`/${userId}/servers/:serverId/channels/:channelId`}>
								<Server />
							</Route>
							<Route path="/guild-discovery/:category">
								<Discover />
							</Route>
							<Route path="/discovery">
								<HomeSidebar />
								<Discovery />
							</Route>
							<Route path="/store">
								<HomeSidebar />
								<Nitro />
							</Route>
							<Route path="/error">
								<Error />
							</Route>
							<Route path="/">
								<Redirect to={`/home/${userId}/friends`} />
							</Route>
						</Switch>
					</>
				)}
			</Router>
		</div>
	);
}

export default App;
