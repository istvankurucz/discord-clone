import React, { useState } from "react";
import { useStateValue } from "../Context API/StateProvider";
import "./Me.css";

import { Avatar } from "@material-ui/core";
import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from "@material-ui/icons/MicOff";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import SettingsIcon from "@material-ui/icons/Settings";

function Me() {
	const [{ user }] = useStateValue();
	const [isMic, setIsMic] = useState(true);
	const [isHeadphone, setIsHeadphone] = useState(true);

	const setMic = () => setIsMic(!isMic);
	const setHeadphone = () => setIsHeadphone(!isHeadphone);

	return (
		<div className="me">
			<Avatar src={user.photoURL} alt={user.displayName} />
			<div className="me__info">
				<p>{user.displayName}</p>
				<p>#5681</p>
			</div>
			<div className="me__icons">
				{isMic ? <MicIcon onClick={setMic} /> : <MicOffIcon onClick={setMic} />}
				{isHeadphone ? <VolumeUpIcon onClick={setHeadphone} /> : <VolumeOffIcon onClick={setHeadphone} />}
				<SettingsIcon />
			</div>
		</div>
	);
}

export default Me;
