import React from "react";
import mapRedux from "./utils/mapRedux"
import moment from "moment"

class WeekDays extends React.Component {
	handleDayClick = (index, date) => {
		this.props.chooseDay(index, date, date, false);
		this.props.getSchedule();
	}

	handleAllClick = () => {
		this.props.chooseDay(-1, moment().add(this.props.numDays - 1, "days"), moment(), true);
		this.props.getSchedule();
	}

	generateDayArray(numDays) {
		var days = [];
		for(var i = 0; i < numDays; i++)
			days.push(i);
		return days;
	}

	render() {
		const { selectedDay, numDays } = this.props;

		return (
			<section className="weekdays">
				{this.generateDayArray(numDays).map((index) => {
					var date = moment().add(index, "day");

					return (
						<div onClick={() => this.handleDayClick(index, date)} className={"day" + (selectedDay === index && " selected" || "")} key={index}>
							{date.format("dddd")}
							<span>{date.format("DD MMM")}</span>
						</div>
					)
				})}

				<div className={"all day" + (selectedDay === -1 && " selected" || "")} onClick={this.handleAllClick}>
					<div>All</div>
				</div>
			</section>
		)
	}
}

export default mapRedux(WeekDays);