$("#menuIcon").on('click', function () {
    $("#menuModal").addClass('visible');
    $('body').addClass('menuVisible');

    //Offset modal if scrolled
    var flash = $(".header .newsFlash");
    if ($("body").hasClass("hasAnnouncement")) {
        var height = (flash.height() + 120);
        $("#menuModal").attr("style", "top: " + Math.max(height - $(window).scrollTop(), height) + "px");
    }
});

$("#closeModal").on('click', function () {
    $("#menuModal").removeClass('visible');
    $('body').removeClass('menuVisible');
});

$(".subMenuOpenIcon, .menuModalItemTop").on('click', function () {
    $(this).parent().find('.subMenuOpenIcon').toggleClass('open');
    $(this).parent().children('.subMenu').slideToggle();
});

$('#emailSignUp').on('click', function () {
    $('body').addClass('showSignUpModal');
});