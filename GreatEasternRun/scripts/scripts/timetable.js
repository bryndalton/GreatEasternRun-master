//Return true to not match
function checkDay(element, row) {
    //Show if the table has no day set or it's all
    if (!element.data("day") || element.data("day") === "All")
        return false;

    if (row.data("day")) {
        return row.data("day").indexOf(element.data("day")) === -1 &&
            row.data("day").indexOf(element.data("day").substr(0, 3)) === -1;
    }

    if (row.data("date")) {
        return row.data("date").indexOf(element.data("day")) === -1 &&
            row.data("date").indexOf(element.data("day").substr(0, 3)) === -1;
    }
}

//Timetable filters
function filter(element) {
    var changed = element.find("tbody > tr:not(.empty)").addClass("hide").filter(function () {
        if (checkDay(element, $(this)) ||
            //Support different names
            ((element.data("venue") && $(this).data("venue") && ($(this).data("venue") !== element.data("venue"))) || (element.data("venue") && $(this).data("location") && ($(this).data("location") !== element.data("venue"))))
        )
            return false;

        //No search term so match
        if (!element.data("search") || element.data("search") === "")
            return true;

        //Match all cols with search term
        var match = false;

        $(this).children().each(function () {
            if (!match)
                match = $(this).text().toLowerCase().indexOf(element.data("search").toLowerCase()) !== -1;
        });

        return match;
    }).removeClass("hide");

    var columnIndex = -1;

    $(".eventTable > thead th").each(function (index) {
        if (columnIndex !== -1)
            return;

        var lower = $(this).text().toLowerCase();

        if (lower.indexOf("day") !== -1 || lower.indexOf("date") !== -1) {
            columnIndex = index + 1;
            return;
        }
    });

    $(".eventTable tr:not(.empty) > :nth-child(" + columnIndex + ")").toggleClass("hide", element.data("day") !== "All");

    //Nothing is showing
    var empty = element.find("tbody > .empty");

    if (changed.length === 0 && empty.length === 0) {
        empty = $("<tr class='empty'><td colspan=" + element.find("tr").eq(0).children().length + ">No times available for this day</td></tr>");
        element.find("tbody").append(empty);
    } else if(changed.length > 0) {
        element.find("tbody > .empty").remove();
	}

	//Set the background colour of the rows
	var i = 0;
	$(".eventTable tbody tr").each(function () {
		$(this).removeClass("odd");
	
		if (!this.classList.contains("hide")) {
			if (isOdd(i)) {
				$(this).addClass("odd");
			}
			i++;
		}
	});
}

$(".timetable .searchForm input[type=text]").on("keyup", function () {
    //Store in the table as there could be multiple
    var table = $(this).parents(".timetable");
    table.data("search", $(this).val());
    filter(table);
});

$(".timetable .day, .nonbookable .weekdays .day").on("click", function () {
    $(this).siblings().removeClass("selected");
    $(this).addClass("selected");

    //Store in the table as there could be multiple
    var table = $(this).parents(".timetable,.nonbookable");
    table.data("day", $(this).text());
    filter(table);
});

$(".timetable .venueTabs .venueTab").on("click", function () {
    $(this).siblings().removeClass("selected");
    $(this).addClass("selected");

    //Store in the table as there could be multiple
    var table = $(this).parents(".timetable");
    table.data("venue", $(this).text());
    filter(table);
});

//Select first
$(".timetable .day:first-child, .timetable .venueTab:first-child, .nonbookable .weekdays .day:first-child").click();

if ($(".nonbookable .day").length <= 0) {
	$(".nonbookable .hide").removeClass("hide");
	//Set the background colour of the rows
	var i = 0;
	$(".eventTable tbody tr").each(function () {
		$(this).removeClass("odd");

		if (!this.classList.contains("hide")) {
			if (isOdd(i)) {
				$(this).addClass("odd");
			}
			i++;
		}
	});
}

function isOdd(num) { return num % 2; }