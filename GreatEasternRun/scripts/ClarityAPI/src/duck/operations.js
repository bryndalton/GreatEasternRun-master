import Creators from "./actions"
import moment from "moment"

const chooseDayAction = Creators.chooseDay;
const chooseVenueAction = Creators.chooseVenue;
const retrieveScheduleAction = Creators.retrieveSchedule;
const recieveScheduleAction = Creators.recieveSchedule;

const chooseDay = (day, to, fromDate, all) => {
	return dispatch => {
		return dispatch(chooseDayAction({day, to, fromDate, all}));
	}
}

const chooseVenue = (venue) => {
	return dispatch => {
		return dispatch(chooseVenueAction(venue));
	}
}

const getSchedule = () => {
	return (dispatch, getState) => {
		const { fromDate, to, selectedVenue } = getState();

		dispatch(retrieveScheduleAction());

		var url = `ActivitySchedule?from=${moment(fromDate).format("YYYY-MM-DD")}&to=${moment(to).format("YYYY-MM-DD")}`;

		if(window.eventTableData.productCode)
			url += `&productCode=${window.eventTableData.productCode}`;

		if(window.eventTableData.venueCode || selectedVenue)
			url += `&centreCode=${window.eventTableData.venueCode || selectedVenue}`;

		return $.get("/umbraco/api/clarityapi/" + url).then(result => {
			result.forEach(centre => {
				centre.TimeSlot.startTime = moment(centre.TimeSlot.startTime);
				centre.TimeSlot.endTime = moment(centre.TimeSlot.startTime).add(centre.TimeSlot.duration, "seconds");
			});

			dispatch(recieveScheduleAction(result));
		}).catch(console.error);
	}
}

export default {
	chooseDay,
	chooseVenue,
	getSchedule
}