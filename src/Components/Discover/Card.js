import React from "react";
import "./Card.css";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";

function Card() {
	return (
		<div className="card">
			<img
				src="https://ak.picdn.net/shutterstock/videos/17568802/thumb/1.jpg"
				alt="Card Background"
				className="card__background"
			/>
			<img
				src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Flag_of_the_United_Kingdom.svg/640px-Flag_of_the_United_Kingdom.svg.png"
				alt="Card logo"
				className="card__logo"
			/>
			<div className="card__title">
				<VerifiedUserIcon />
				<p>English</p>
			</div>
			<p className="card__description">
				Join the best place to practice your English skills with thousand of native speakers and other eager
				learners!
			</p>
			<div className="card__data">
				<div className="card__data__online">
					<div className="card__dataCircle green"></div>
					<span className="card__dataNumber">46242</span>
					<span className="crad__dataCategory">Online</span>
				</div>
				<div className="card__data__members">
					<div className="card__dataCircle grey"></div>
					<span className="card__dataNumber">266712</span>
					<span className="crad__dataCategory">Members</span>
				</div>
			</div>
		</div>
	);
}

export default Card;
