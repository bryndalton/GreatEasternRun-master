$('section.memberOptions .memberOptionsInner .membershipTabs.topLevel .membershipTab').on('click', function () {
    $('section.memberOptions .memberOptionsInner .membershipTabs.topLevel .membershipTab').removeClass('selected');
    $(this).addClass('selected');
    var id = $(this).data('cat');
    $('section.memberOptions .memberOptionsInner .membershipOptionTab').removeClass('optionSelected');
    $('section.memberOptions .memberOptionsInner .membershipOptionTab[data-cat="' + id + '"]').addClass('optionSelected');
});

$('section.memberOptions .memberOptionsInner .membershipOptionTab .membershipOption .findOutMore').on('click', function () {
    $('.prepaidAnnualMembership').remove('hidden');
    var id = $(this).parent().parent().parent().data('cat');
    var slideId = $(this).parent().parent().parent().parent().parent().data('cat');
    console.log(slideId);
    console.log(id);
    console.log(optionsSliders);
    //var destroy = optionsSliders.find(function () { return x => x.id === slideId; });
    //console.log(optionsSliders.find(function () { return x => x.id === slideId; }));
    //destroy.destroySlider();
    $(this).parent().parent().parent().parent().parent().removeAttr("style");
    $(this).parent().parent().parent().parent().removeAttr("style");
    //$(this).parent().parent().parent().parent().parent().parent().addClass('here');
    $(this).parent().parent().parent().parent().parent().parent().parent().siblings('.prepaidAnnualMembership').addClass('hidden');
    $(this).parent().parent().parent().parent().parent().parent().parent().siblings('.prepaidAnnualMembership.otherMembership').removeClass('hidden');
    $('section.memberOptions .memberOptionsInner .membershipOptionTab .membershipOption .membershipDetails[data-price="' + id + '"]').addClass('hidden');
    console.log($('section.memberOptions .memberOptionsInner .membershipOptionTab .membershipOption[data-cat="' + id + '"] .membershipDetails'));
    $('section.memberOptions .memberOptionsInner .membershipOptionTab .membershipOption[data-cat="' + id + '"] .membershipDetails .overview').addClass('hidden');
    $('section.memberOptions .memberOptionsInner .membershipOptionTab .membershipOption[data-cat="' + id + '"] .membershipDetails').children('.detailedOverview').first().removeClass('hidden');
    $('section.memberOptions .memberOptionsInner .membershipTabs.topLevel').addClass('hidden');
    $('section.memberOptions .memberOptionsInner .membershipTabs[data-mem="' + id + '"]').removeClass('hidden');
    $('section.memberOptions .memberOptionsInner .membershipTabs[data-mem="' + id + '"] .membershipTab:first-child').addClass('selected');
    $(this).parent().parent().parent().addClass('selected');
    $(this).parent().parent().parent().parent().addClass('selected');
    $(this).parent().parent().parent().parent().siblings('.membershipOptionWrapper').addClass('hidden');
    $(this).parent().parent().parent().siblings('.membershipInfoWrapper:nth-child(2)').addClass('selected');
});

$('section.memberOptions .memberOptionsInner .membershipTabs.secondLevel .membershipTab').on('click', function () {
    $('section.memberOptions .memberOptionsInner .membershipTabs.secondLevel .membershipTab').removeClass('selected');
    $(this).addClass('selected');
    var id = $(this).data('mem');
    console.log(id);
    $('section.memberOptions .memberOptionsInner .membershipOptionTab .membershipInfoWrapper').removeClass('selected');
    $('section.memberOptions .memberOptionsInner .membershipOptionTab .membershipInfoWrapper[data-cat="' + id + '"]').addClass('selected');
    $('section.memberOptions .memberOptionsInner .membershipOptionTab .membershipOptionWrapper .membershipOption .membershipDetails .detailedOverview').addClass('hidden');
    $('section.memberOptions .memberOptionsInner .membershipOptionTab .membershipOptionWrapper .membershipOption .membershipDetails .detailedOverview#' + id).removeClass('hidden');
});

$('.prepaidAnnualMembership.otherMembership .clickHere, section.memberOptions .memberOptionsInner .membershipOptionTab .membershipOptionWrapper .membershipInfoWrapper .goBack').on('click', function () {
    window.location.href = '#membershipOptions';
    window.location.reload(true);
})