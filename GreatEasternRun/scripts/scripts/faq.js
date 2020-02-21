$(document).ready(function () {
    //console.log('here');
    function FAQfilter(inp) {

        $('section.FAQLandingPage .FAQLandingPageInner .FAQLandingPageRight .faqCategory').each(function () {
            var title = $(this).children('h4').text();
            //console.log(title);
            var f = title.toUpperCase().indexOf(inp.toUpperCase()) > -1;
            //if (!f) {
            //    $(this).removeClass('notFiltered');
            //} else {
            //    $(this).addClass('notFiltered');
            //}

            $(this).children('.faqObject').each(function () {
                var q = $(this).children('.faqObjectQuestion').text();
                var a = $(this).children('.faqObjectAnswer').text();

                var qa = (q + a).toUpperCase().indexOf(inp.toUpperCase()) > -1;
                //console.log(qa);
                if (!qa) {
                    $(this).removeClass('notFiltered');
                    //$(this).parent().removeClass('notFiltered');
                } else {
                    $(this).addClass('notFiltered');
                    //$(this).parent().addClass('notFiltered');
                }

            });
            var id;
            if ($(this).children('.faqObject.notFiltered').length > 0) {
                $(this).addClass('notFiltered');
                id = $(this).attr('id');
                //console.log(id);
                $('section.FAQLandingPage .FAQLandingPageInner .FAQLandingPageLeft .FAQLandingPageScroll .listItem[data-link="#' + id + '"]').addClass('notFiltered');
            } else {
                $(this).removeClass('notFiltered');
                id = $(this).attr('id');
                //console.log(id);
                $('section.FAQLandingPage .FAQLandingPageInner .FAQLandingPageLeft .FAQLandingPageScroll .listItem[data-link="#' + id + '"]').removeClass('notFiltered');
            }

        });

    }

    function ridiculousFAQScroll() {
        var t = $(window).scrollTop();
        var hh = $('header.header').outerHeight();
        var h = $('#FAQLandingPageScroll').outerHeight();
        //console.log(h);
        //if ($('section.searchResultFeatured').length > 0) {
        var f = $('.FAQLandingPageInner').offset().top;
        var fh = $('.FAQLandingPageInner').outerHeight();
        //console.log(t + hh + 80);

        if ($(window).width() > 768) {
            if ((t + hh + 80) > f && (t + h) < (f + fh - hh - 80)) {
                if (((t + hh + 80) - f) < 40) {
                    $('#FAQLandingPageScroll').css({ 'top': '40px' });
                } else {
                    $('#FAQLandingPageScroll').css({ 'top': ((t + hh + 40) - f) });
                }
                
            } 
        } else {
            $('#FAQLandingPageScroll').css({ 'top': '40px' })
        }
        //}
    };




    $(window).scroll(function () {
        ridiculousFAQScroll();
    });

    $('section.FAQLandingPage .FAQsearchWrapper #FAQsearch').keyup(function () {
        var v = $(this).val();
        console.log(v);
        FAQfilter(v);
    });

    if (window.location.hash) {
        var h = window.location.hash.replace("#", "");
        var t = $('#' + h).offset().top;
        var hd = $('header.header').height();
        var s = t - hd;
        $('html,body').animate({ scrollTop: s }, 1000, function () {
            if ($('#' + h).children('.faqObjectAnswer')) {
                $('#' + h).children('.faqObjectAnswer').slideDown();
            }
            
        });
    }

});