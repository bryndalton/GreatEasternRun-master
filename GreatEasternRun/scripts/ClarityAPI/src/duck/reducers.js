import types from "./types";

const INITIAL_STATE = {
	activities: null,
	loading: false,
	selectedDay: -1,
	selectedVenue: "",
	to: null,
	fromDate: null,
	allActivities: false
}

const reducer = (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case types.CHOOSE_DAY:
			return {
				...state,
				selectedDay: action.data.day,
				to: action.data.to,
				fromDate: action.data.fromDate,
				allActivities: action.data.all
			}

		case types.RECIEVE_SCHEDULE:
			return {
				...state,
				loading: false,
				activities: action.data
			}

		case types.RETRIEVE_SCHEDULE:
			return {
				...state,
				loading: true
			}

		case types.CHOOSE_VENUE:
			return {
				...state,
				selectedVenue: action.data
			}

		default:
			return state;
	}
}

export default reducer;