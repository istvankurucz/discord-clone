export const initalState = {
	user: null,
	userId: null,
	//user: "István Kurucz",
	//user: "Kovács Erzsi",
	//userId: "110795690083739006472",
	//userId: "W0BGmB0mTgDLUQSXK1EE",
};

export const actionTypes = {
	SET_USER: "SET_USER",
};

const reducer = (state, action) => {
	switch (action.type) {
		case actionTypes.SET_USER:
			return {
				...state,
				user: action.user,
				userId: action.userId,
			};
		default:
			return state;
	}
};

export default reducer;
