import React from "react";
import mapRedux from "./utils/mapRedux"

class VenueList extends React.Component {
	handleClick = (venue) => {
		this.props.chooseVenue(venue);
		this.props.getSchedule();
	}

	render() {
		const { selectedVenue } = this.props;

		return (
			<section className="venueTabs">
				{window.eventTableData.venueList.map(a => (
					<div key={a.name} className={"venueTab" + (selectedVenue === a.code && " selected" || "")} onClick={() => this.handleClick(a.code)}>
						{a.name}
					</div>
				))}
			</section>
		)
	}
}

export default mapRedux(VenueList);