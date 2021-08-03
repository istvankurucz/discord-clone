import React from "react";
import "./Discovery.css";
import ActiveNow from "../ActiveNow";
import Stage from "./Stage";

import TrackChangesIcon from "@material-ui/icons/TrackChanges";
import RefreshIcon from "@material-ui/icons/Refresh";
import InboxIcon from "@material-ui/icons/Inbox";
import HelpIcon from "@material-ui/icons/Help";

function Discovery() {
	return (
		<div className="discovery">
			<div className="discovery__header">
				<div className="discovery__header__menu">
					<TrackChangesIcon />
					<p>Stage Discovery</p>
					<button>Start a stage</button>
				</div>

				<div className="discovery__header__icons">
					<RefreshIcon />
					<InboxIcon />
					<HelpIcon />
				</div>
			</div>

			<div className="discovery__main">
				<div className="discovery__main__feed">
					<h2>Live Stages</h2>
					<div className="discovery__main__feed__stages">
						<Stage
							key="The Chatter Box"
							server={{ icon: TrackChangesIcon, name: "The Chatter Box" }}
							title="Talent Show"
							members={[
								{ photo: "", name: "laidoctorn" },
								{ photo: "", name: "Corvo" },
								{ photo: "", name: "Lillyy" },
							]}
							views={142}
						/>
					</div>
				</div>
				<ActiveNow />
			</div>
		</div>
	);
}

export default Discovery;
