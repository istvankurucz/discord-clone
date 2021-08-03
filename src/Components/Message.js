import React from "react";
import "./Message.css";
import db from "../firebase";
import { useStateValue } from "../Context API/StateProvider";

import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import ReplyIcon from "@material-ui/icons/Reply";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import EditIcon from "@material-ui/icons/Edit";
import EditLocationIcon from "@material-ui/icons/EditLocation";
import MarkunreadIcon from "@material-ui/icons/Markunread";
import LinkIcon from "@material-ui/icons/Link";
import SpeakerNotesIcon from "@material-ui/icons/SpeakerNotes";
import DeleteIcon from "@material-ui/icons/Delete";

function Message({ serverId, channelId, messageId, photo, name, content, timestamp }) {
	const [{ user }] = useStateValue();

	const showMore = (target) => {
		const options =
			target.className.baseVal === "MuiSvgIcon-root"
				? target.parentElement.lastElementChild
				: target.parentElement.parentElement.lastElementChild;
		if (options) {
			if (options.style.display === "none") options.style.display = "block";
			else options.style.display = "none";
		} else console.log("No");
	};

	const deleteMessage = () => {
		if (serverId && name) {
			db.doc(`servers/${serverId}/channels/${channelId}/messages/${messageId}`)
				.delete()
				.then(() => console.log("Document has been deleted."))
				.catch((err) => console.log("Error deleting document", err));
		}
	};

	return (
		<div className="message">
			<img src={photo} alt={name} />
			<div className="message__main">
				<div className="message__main__header">
					<span className="message__main__header__name">{name}</span>
					<span className="message__main__header__timestamp">{new Date(timestamp?.toDate()).toUTCString()}</span>
				</div>
				<p className="message__main__content">{content}</p>
			</div>

			<div className="message__icons">
				<EmojiEmotionsIcon />
				<ReplyIcon />
				<MoreHorizIcon onClick={(e) => showMore(e.target)} />

				<div className="message__iconsMore">
					{name === user.displayName ? (
						<div className="message__iconsMore__option">
							<p>Edit Message</p>
							<EditIcon />
						</div>
					) : (
						""
					)}
					{serverId ? (
						""
					) : (
						<div className="message__iconsMore__option">
							<p>Pin Message</p>
							<EditLocationIcon />
						</div>
					)}

					<div className="message__iconsMore__option">
						<p>Reply</p>
						<ReplyIcon />
					</div>
					<div className="message__iconsMore__option">
						<p>Mark Unread</p>
						<MarkunreadIcon />
					</div>
					<div className="message__iconsMore__option">
						<p>Reactions</p>
						<EmojiEmotionsIcon />
					</div>
					<div className="message__iconsMore__option">
						<p>Copy Message Link</p>
						<LinkIcon />
					</div>
					<div className="message__iconsMore__option">
						<p>Speak Message</p>
						<SpeakerNotesIcon />
					</div>
					{serverId && name === user.displayName ? (
						<div className="message__iconsMore__option delete" onClick={deleteMessage}>
							<p>Delete Message</p>
							<DeleteIcon />
						</div>
					) : (
						""
					)}
				</div>
			</div>
		</div>
	);
}

export default Message;
