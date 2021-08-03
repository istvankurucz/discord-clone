import React, { useEffect, useState } from "react";
import "./ServerChat.css";
import { useParams } from "react-router";
import db from "../../firebase";
import ChatHeader from "../ChatHeader";
import Message from "../Message";
import MessageInput from "../MessageInput";
import { Avatar } from "@material-ui/core";

function ServerChat({ serverId }) {
	const { channelId } = useParams();
	const [channelDetails, setChannelDetails] = useState({});
	const [messages, setMessages] = useState([]);
	const [members, setMembers] = useState([]);

	useEffect(() => {
		db.doc(`servers/${serverId}/channels/${channelId}`).onSnapshot((snapshot) => {
			setChannelDetails({
				id: snapshot.id,
				name: snapshot.data().name,
				description: snapshot.data().description,
			});
		});
	}, [channelId, serverId]);

	useEffect(() => {
		db.collection(`servers/${serverId}/members`).onSnapshot((snapshot) => {
			setMembers(
				snapshot.docs.map((doc) => ({
					id: doc.id,
					name: doc.data().name,
					nickname: doc.data().nickname,
					photo: doc.data().photo,
				}))
			);
		});
	}, [serverId]);

	useEffect(() => {
		db.collection(`servers/${serverId}/channels/${channelId}/messages`)
			.orderBy("timestamp", "asc")
			.onSnapshot((snapshot) => {
				setMessages(
					snapshot.docs.map((doc) => ({
						id: doc.id,
						name: doc.data().name,
						photo: doc.data().photo,
						content: doc.data().content,
						timestamp: doc.data().timestamp,
					}))
				);
			});
	}, [serverId, channelId]);

	//console.log("Channel details: ", channelDetails);
	//console.log("Channel messages: ", messages);
	//console.log("Members: ", members);

	return (
		<div className="serverChat">
			<ChatHeader name={channelDetails.name} description={channelDetails.description} isChannel />
			<div className="serverChat__flex">
				<div className="help">
					<div className="serverChat__inner">
						<div className="serverChat__info">
							<div>#</div>
							<p className="serverChat__info__name">{channelDetails.name}</p>
							<p>
								This is the beginning of your message history with #<span>{channelDetails.name}</span>
							</p>
						</div>

						<div className="serverChat__messages">
							{messages.map((message) => (
								<Message
									key={message.id}
									serverId={serverId}
									channelId={channelId}
									messageId={message.id}
									photo={message.photo}
									name={message.name}
									content={message.content}
									timestamp={message.timestamp}
								/>
							))}
						</div>
					</div>
					<MessageInput
						className="serverChat__inner__messageInput"
						name={channelDetails.name}
						serverId={serverId}
						channelId={channelDetails.id}
					/>
				</div>

				<div className="serverChat__members">
					{members.map((member) => (
						<div key={member.id} className="serverChat__members__member">
							<Avatar src={member.photo} alt={member.nickname} />
							<p>{member.nickname}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default ServerChat;
