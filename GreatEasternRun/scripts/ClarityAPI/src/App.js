import React from 'react';
import mapRedux from "./utils/mapRedux"
import moment from "moment"
import WeekDays from "./WeekDays";
import EventTable from "./EventTable";
import VenueList from "./VenueList";
import Search from './Search';

class App extends React.Component {
	componentDidMount() {
		this.showVenues = window.eventTableData.venueList && window.eventTableData.venueList.length;
		this.removeLimit = window.eventTableData.removeLimit;
		this.showSearch = window.eventTableData.showSearch;
		this.numDays = window.eventTableData.numDays || 7;

		//Select first day and venue
		if(this.showVenues)
			this.props.chooseVenue(window.eventTableData.venueList[0].code);

		var date = moment().add(0, "day");
		var end = this.removeLimit ? moment().add(1, "year") : date;
		this.props.chooseDay(0, end, date);

		//API call
		this.props.getSchedule();
	}

    render() {
        return (
			<React.Fragment>
				<section className="bookableEventTable">
					<div className="bookableEventTableInner">
						{this.showVenues ? 
							<React.Fragment>
								<h6>Choose your venue</h6>
								<VenueList/>
							</React.Fragment>
						: ""}

						{!this.removeLimit ?
							<React.Fragment>
								<h6>Choose your day</h6>
								<WeekDays numDays={this.numDays}/>
							</React.Fragment>
						: ""}

						{this.showSearch && <Search></Search>}

						<EventTable showVenues={this.showVenues} removeLimit={this.removeLimit} />
					</div>
				</section>
			</React.Fragment>
		)
    }
}

export default mapRedux(App);