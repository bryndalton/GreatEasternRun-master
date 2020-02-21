//Bookable theatre dropdown
$(".featuredInfo .dateDropdown .selected").on("click", function () {
    $(this).parent().toggleClass("open");

    if (ridiculousFeaturedInfoScroll)
        ridiculousFeaturedInfoScroll();
});

if ($("body").hasClass("BookableTheatreEvent") || $("body").hasClass("OmnicoArtEvent")) {
    fetchAvailability($(".featuredInfo .dateDropdown .selected").data("id") || $("input[name='eventCode']").val());

    $(".featuredInfo .dateDropdown li").on("click", function () {
        showPerformance($(this).data("id"));

        //Set selected text and hide
        $(this).parent().siblings(".selected").text($(this).children(".date").text());
        hidePerformanceDropdown();

        //Scroll to the iframe
        $('html, body').stop().animate({
            scrollTop: $(".ticketWrapper").offset().top - 120//header height
        }, 1000);
    });
} else {
    $(".featuredInfo .dateDropdown li").on("click", function () {
        //Remove old button
        $(this).parents(".featuredInfo").find(".dateDropdown + .bookNowButton").remove();

        //Add a new one
        $(this).parents(".dateDropdown").after('<a href="' + $(this).data("url") + '" class="bookNowButton">Book Now</a>');

        //Set selected text and hide
        $(this).parent().siblings(".selected").text($(this).text());
        hidePerformanceDropdown();
    });
}

function hidePerformanceDropdown() {
    $(".featuredInfo .dateDropdown").removeClass("open");
}

$(window).click(function (ev) {
    //Hide ticket dropdown when clicked out of
    if (!($(ev.target).hasClass("selected") || $(ev.target).hasClass("performance")))
        hidePerformanceDropdown();
});

function showPerformance(id) {
    //Set form input on dropdown click and submit it
    $(".ticketWrapper input[name='PerformanceID']").val(id);
    $(".ticketWrapper #book-tickets-form").submit();

    //Show the iframe and hide the empty message
    $(".ticketWrapper iframe").fadeIn();
    $(".ticketWrapper .emptyMessage").hide();
}

//There's only one performance so open up
var singlePerformance = $("input[name='singlePerformance']");
if (singlePerformance.length > 0)
    showPerformance(singlePerformance.val());

//Get availability info for dropdown
function fetchAvailability(eventCode) {
    $.get("/umbraco/api/theatreapi/EventDetail?eventCode=" + eventCode, function (data) {
        data.performances.forEach(function (el) {
            $(".featuredInfo .dateDropdown li[data-id='" + el.performanceID + "'] .availability").text(el.availableSeatText + " availability");
        });
    }).fail(function () {
        $(".ticketWrapper iframe").hide();
        $(".ticketWrapper .emptyMessage").show().html("Oops, we seem to be having a problem. Please try again later or <a href='/contact-us'>contact us</a>");
    });
}