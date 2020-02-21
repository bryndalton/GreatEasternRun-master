function featuredEventImageResize() {
    var d = $('.searchResultsFeaturedInner .searchResultsFeaturedInnerLeft .eventImageWrapper');
	//var s = $('#featuredImageSlider');
	var w = d.width();
	var h = (w * 0.75);
    d.height(h + 30);
	//s.height(h); 
}

var ridiculousFeaturedInfoScroll = null;

$(document).ready(function () {
    ridiculousFeaturedInfoScroll = function() {

        var t = $(window).scrollTop();
        var hh = $('header.header').outerHeight();
        var h = $('#featuredInfoScroll').outerHeight();

        //If a dropdown is open within the section then make it seem taller
        if ($(".featuredInfo .dateDropdown").hasClass("open")) {
            h += $(".featuredInfo .dateDropdown.open ul").outerHeight();
        }

        if ($('section.searchResultFeatured').length > 0) {
            var f = $('section.searchResultFeatured').offset().top;
            var fh = $('section.searchResultFeatured').outerHeight();

            if ($(window).width() > 768) {
                if ((t + hh) > f && (t + h) < (f + fh - hh)) {
                    $('#featuredInfoScroll').css({ 'top': ((t + hh) - f) });
                } else {
                    if (t < f) {
                        $('#featuredInfoScroll').css({ 'top': '0px' });
                    } else {
                        var height = fh - h - 30;
                        $('#featuredInfoScroll').css({ 'top': height });
                    }

                }
            } else {
                $('#featuredInfoScroll').css({ 'top': '0px' });
            }
        }
    };

    //function ridiculousFAQScroll() {
    //    var t = $(window).scrollTop();
    //    var hh = $('header.header').outerHeight();
    //    var h = $('#FAQLandingPageScroll').outerHeight();
    //    //console.log(h);
    //    //if ($('section.searchResultFeatured').length > 0) {
    //    var f = $('.FAQLandingPageInner').offset().top;
    //    var fh = $('.FAQLandingPageInner').outerHeight();
    //    //console.log(fh);

    //    if ($(window).width() > 768) {
    //        if ((t + hh + 80) > f && (t + h) < (f + fh - hh - 80)) {
    //            $('#FAQLandingPageScroll').css({ 'top': ((t + hh + 80) - f) });
    //        }
    //    } else {
    //        $('#FAQLandingPageScroll').css({ 'top': '0px' })
    //    }
    //    //}
    //};    



    //function FAQfilter(inp) {

    //    $('section.FAQLandingPage .FAQLandingPageInner .FAQLandingPageRight .faqCategory').each(function () {
    //        var title = $(this).children('h4').text();
    //        //console.log(title);
    //        var f = title.toUpperCase().indexOf(inp.toUpperCase()) > -1;
    //        //if (!f) {
    //        //    $(this).removeClass('notFiltered');
    //        //} else {
    //        //    $(this).addClass('notFiltered');
    //        //}

    //        $(this).children('.faqObject').each(function () {
    //            var q = $(this).children('.faqObjectQuestion').text();
    //            var a = $(this).children('.faqObjectAnswer').text();

    //            var qa = (q + a).toUpperCase().indexOf(inp.toUpperCase()) > -1;
    //            //console.log(qa);
    //            if (!qa) {
    //                $(this).removeClass('notFiltered');
    //                //$(this).parent().removeClass('notFiltered');
    //            } else {
    //                $(this).addClass('notFiltered');
    //                //$(this).parent().addClass('notFiltered');
    //            }

    //        });
    //        var id;
    //        if ($(this).children('.faqObject.notFiltered').length > 0) {
    //            $(this).addClass('notFiltered');
    //            id = $(this).attr('id');
    //            console.log(id);
    //            $('section.FAQLandingPage .FAQLandingPageInner .FAQLandingPageLeft .FAQLandingPageScroll .listItem[data-link="#' + id + '"]').addClass('notFiltered');
    //        } else {
    //            $(this).removeClass('notFiltered');
    //            id = $(this).attr('id');
    //            console.log(id);
    //            $('section.FAQLandingPage .FAQLandingPageInner .FAQLandingPageLeft .FAQLandingPageScroll .listItem[data-link="#' + id + '"]').removeClass('notFiltered');
    //        }

    //    });

    //}



        

        $(window).scroll(function () {
            ridiculousFeaturedInfoScroll();
        });
    

    if ($('body').hasClass('FAQLandingPage')) {
        $(window).scroll(function () {
            ridiculousFAQScroll();
        });

        $('section.FAQLandingPage .FAQsearchWrapper #FAQsearch').keyup(function () {
            var v = $(this).val();
            FAQfilter(v);
        });

    }
    
    featuredEventImageResize();
    if (window.featuredImageSlider)
        window.featuredImageSlider.reloadSlider();
    
    
    ridiculousFeaturedInfoScroll();

});

$(window).resize(function () {
    featuredEventImageResize();
    //ridiculousFeaturedInfoScroll();
});