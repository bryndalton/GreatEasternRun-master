import React from 'react';
import mapRedux from "./utils/mapRedux";
import moment from 'moment';

function getAvailColour(avail) {
	if(avail < 3)
		return "red";
	else if(avail < 6)
		return "orange";
}

function calcDateAndTime(date) {
	var midnight = date.clone().startOf("day");
	console.log(date.diff(midnight, "seconds"));

	var start = moment("1967-12-31");
	console.log(date.diff(start, "day"));
}

class EventTable extends React.Component {
	toggleDesc(ev) {
		var classes = ev.currentTarget.classList;

		//Close them all
		var table = ev.currentTarget.parentElement.parentElement.parentElement;
		var others = table.getElementsByClassName("info");

		for(var i = 0; i < others.length; i++)
		{
			if(others.item(i))
				others.item(i).classList.remove("show");
		}

		//Toggle class on this
		if(classes.contains("show"))
			classes.remove("show");
		else
			classes.add("show");
	}

	render() {
		const { activities, loading, allActivities, showVenues, selectedVenue, removeLimit } = this.props;

		return (
			<React.Fragment>
				{loading  ? 
				<p className="loading text-center">Loading...</p> : activities && activities.length ?
				<table className="eventTable" cellPadding="0" cellSpacing="0">
					<thead>
						<tr>
							<th>{showVenues ? "Activity" : "Location"}</th>
							{removeLimit && <th>Date</th>}
							{allActivities && <th>Day</th>}
							<th>Time</th>
							<th className="text-center">Availability</th>
							<th></th>
						</tr>
					</thead>

					<tbody>
						{activities && activities.map((activity, index) => (
							<tr key={index}>
                                {/*calcDateAndTime(activity.TimeSlot.startTime)*/}
								<td>
									{showVenues ? activity.ProductName : activity.CentreName}
									{showVenues && activity.ProductDescription && 
										<span className="info" onClick={this.toggleDesc}>i
											<div className="desc">{activity.ProductDescription}</div>
										</span>
									}
								</td>
								{removeLimit && <td>{activity.TimeSlot.startTime.format("DD/MM/YYYY")}</td>}
								{allActivities && <td>{activity.TimeSlot.startTime.format("dddd")}</td>}
								<td>{activity.TimeSlot.startTime.format("HH.mm") + " - " + activity.TimeSlot.endTime.format("HH.mm")}</td>
								<td className="text-center"><span className={"avail " + getAvailColour(activity.TimeSlot.availableCount)}>{activity.TimeSlot.availableCount}</span></td>
                                <td className="text-center"><a href={`/healthy-active/online-booking?cc=${showVenues ? selectedVenue : activity.CentreCode}&ac=${showVenues ? activity.ProductCode : window.eventTableData.productCode}`}>Book online</a></td>
							</tr>
						))}
					</tbody>
				</table> : <p className="error text-center">No bookings available for the selected day</p>}
			</React.Fragment>
		)
	}
}

export default mapRedux(EventTable);