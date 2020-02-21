$('section.searchHeader .resultsFilter .filterBy .filterByButton').on('click', function() {
    $(this).parent().find(".filterByForm").slideToggle();
})

//Auto resize on both iframes
$("iframe.output_iframe").on("load", function () {
    iFrameResize({log: false, checkOrigin: false, sizeWidth: false});
});

$('section.FAQLandingPage .FAQLandingPageInner .FAQLandingPageLeft .listItem').on('click', function () {
    var id = $(this).data('link');
    var elem = $('section.FAQLandingPage .FAQLandingPageInner .FAQLandingPageRight .faqCategory' + id).offset();
    var t = elem.top;
    $('body,html').animate({ scrollTop: (t - 120) + 'px' },500);
});

$('body.FAQLandingPage .FAQLandingPageInner .FAQLandingPageRight .faqCategory .faqObject .faqObjectQuestion').on('click', function () {
    $(this).toggleClass('open');
    $(this).siblings().slideToggle();
})

//Theatre booking form
$("#returnFromPayment").submit();

$('section.contactList .contactListTabsWrapper .contactListTab').on('click', function () {
    var t = $(this).data('venue');
    $('section.contactList .contactListTabsWrapper .contactListTab').removeClass('selected');
    $('section.contactList .contactListItemsWrapper').removeClass('selected');
    $(this).addClass('selected');
    $('section.contactList .contactListItemsWrapper[data-venue="' + t + '"]').addClass('selected');

    if (venueContactSliderResize)
        venueContactSliderResize(t);
});

//Scroll down to iframe or the event table
$(".scrollToFrame").click(function () {
    var el = $(".bookableEventTable");

    if (!el.length) {
        el = $(".ticketWrapper");
    }

    $('html, body').stop().animate({
        scrollTop: el.offset().top - 120//header height
    }, 1000);
});

//Hide info popup if clicked outside it
$(window).click(function (ev) {
    if (!$(ev.target).hasClass("info") && $(ev.target).closest($(".eventTable .info .desc")).length <= 0) {
        $(".eventTable .info").removeClass("show");
    }

    if (!$(ev.target).hasClass("dropdown") && $(ev.target).closest($(".menuTab .dropdownWrapper")).length <= 0) {
        $(".menuTab.dropdown.open").removeClass("open").find(".dropdownWrapper").slideUp("fast");
    }

    //Hide filter form when clicked out of
    if (!$(ev.target).hasClass("filterByButton") && $(ev.target).closest($("section.searchHeader .resultsFilter .filterBy .filterByForm")).length <= 0) {
        $('section.searchHeader .resultsFilter .filterBy .filterByForm').slideUp();
    }
});

//Dropdown click
$(".menuTab.dropdown").on("click", function () {
    $(this).toggleClass("open").find(".dropdownWrapper").slideToggle("fast");
});

//Scroll down to vacancy form
$(".roleApplication .applyNow").on("click", function () {
    $('html, body').stop().animate({
        scrollTop: $(".renderForm").offset().top - 120//header height
    }, 1000);
});

//Click for team members on mobile
$(".teamMembersInner .teamMember").on("click touch", function () {
    $(this).addClass("open");
    $(this).siblings().removeClass("open");
});

$(".jobVacancy .renderForm .jobrole input[type=hidden]").val($("#vacancyInfo").val());