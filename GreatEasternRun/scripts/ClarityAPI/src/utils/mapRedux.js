import { connect } from "react-redux"
import { operations } from "../duck";

const mapDispatchToProps = (dispatch) => {
	const chooseDay = (day, to, fromDate, all) => dispatch(operations.chooseDay(day, to, fromDate, all));
	const chooseVenue = (venue) => dispatch(operations.chooseVenue(venue));
	const getSchedule = () => dispatch(operations.getSchedule());

	return {
		chooseDay,
		chooseVenue,
		getSchedule
	}
}

export default (Component) => {
	return connect(state => state, mapDispatchToProps)(Component);
}