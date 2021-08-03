import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./DiscoverFeed.css";
import Card from "./Card";
import SearchIcon from "@material-ui/icons/Search";
import CancelIcon from "@material-ui/icons/Cancel";

function DiscoverFeed() {
	const { category } = useParams();
	const [input, setInput] = useState("");

	const search = (e) => {
		e.preventDefault();
	};

	return (
		<div className="discoverFeed">
			<div className="discoverFeed__banner">
				<h1 className="discoverFeed__banner__title">
					Find <span>{category === "home" ? "your" : category}</span> communities on Discord
				</h1>
				{category === "home" ? <p>From gaming, to music, to learning, there's a place for you</p> : ""}
				<form className="discoverFeed__banner__search">
					<input
						type="text"
						placeholder="Explore Home servers"
						value={input}
						onChange={(e) => setInput(e.target.value)}
					/>
					{input ? <CancelIcon /> : <SearchIcon />}
					<button type="submit" onClick={search}>
						send
					</button>
				</form>
			</div>

			<h2>{category === "home" ? "Featured" : "Popular"} communities</h2>
			<div className="discoverFeed__cards">
				<Card />
			</div>
		</div>
	);
}

export default DiscoverFeed;
