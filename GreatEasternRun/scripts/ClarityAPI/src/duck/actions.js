import types from "./types"

const chooseDay = data => ({
	type: types.CHOOSE_DAY,
	data: data
})

const retrieveSchedule = data => ({
	type: types.RETRIEVE_SCHEDULE,
	data: data
})

const recieveSchedule = data => ({
	type: types.RECIEVE_SCHEDULE,
	data: data
})

const chooseVenue = data => ({
	type: types.CHOOSE_VENUE,
	data: data
})

export default {
	chooseDay,
	retrieveSchedule,
	recieveSchedule,
	chooseVenue
}