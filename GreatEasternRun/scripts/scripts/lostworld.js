$(document).ready(function () {

    var sliders = [];

    $('#LWmenuBtn, .LWmobileMenuClose').on('click', function () {
        $('.LWmobileMenu').toggleClass('visible');
    });
    var t = 0;
    $(document).on('scroll', function () {
        t = $(window).scrollTop();
        
    })
    setInterval(function () {
        if (t >= 1) {
            $('.main').addClass('scrolled');
        } else {
            $('.main').removeClass('scrolled');
        }
    }, 100);

    $('.LWfaqs .LWfaqsInner .LWfaqItem').on('click', function () {
        $(this).toggleClass('open');
        $(this).children('.LWfaqAnswer').slideToggle();
    });

    if ($('.LWfeature').length > 0) {
        $('.LWfeature .LWfeatureInner .LWmainImageWrapper .LWimageSlider').each(function (i, slider) {
            //var hide = $(this).children().length <= 1;
            var id = $(this).parent().parent().parent().attr('id');
            
            //if ($(this).children().length > 1) {
                console.log(i);
                sliders[i] = $(slider).bxSlider({
                    mode: 'horizontal',
                    slideWidth: $(this).parent().width(),
                    auto: true,
                    slides: 1,
                    moveSlides: 1,
                    infiniteLoop: true,
                    adaptiveHeight: true,
                    controls: true,
                    prevText: '',
                    nextText: '',
                    pager: true,
                    nextSelector: '#sliderNext' + id,
                    prevSelector: '#sliderPrev' + id,
                });
            //} else {
            //    console.log(i);
            //}
            
        })
    }

    console.log(sliders);

    $(window).resize(function () {
        $.each(sliders, function (i, slider) {
            //var hide = slider.getSlideCount() <= 1;
            var id = $(this).parent().parent().parent().attr('id');

            //Hide arrows if there's only one page
            //slider.parents(".mayAlsoLike").find(".sliderControls").toggleClass("hidden", hide);

            slider.reloadSlider({
                mode: 'horizontal',
                slideWidth: $(this).parent().parent().parent().width(),
                auto: true,
                slides: 1,
                moveSlides: 1,
                infiniteLoop: true,
                adaptiveHeight: true,
                controls: true,
                prevText: '',
                nextText: '',
                //pager: !hide,
                nextSelector: '#sliderNext' + id,
                prevSelector: '#sliderPrev' + id,
            });
        });

        videoResize();

        showHideVideo();
    });

    

    function properScroll() {
        var hash = window.location.href.indexOf('#');
        console.log(hash);
        if (hash > 0) {
            var type = window.location.hash.substr(1);
            console.log(type);
            var t = $('#' + type).offset().top;
            console.log(t);
            var h = $('.vivacityHeader').outerHeight() + $('.LWheader').outerHeight();
            console.log(Math.ceil(t - h));
            $('body, html').animate({ scrollTop: Math.ceil(t-h) }, 500);
        }
    }

    setTimeout(function () { properScroll(); }, 500);

    $('.LWmobileMenu .LWmobileMenuInner .LWmobileMenuList a').on('click', function () {
        $(this).parent().parent().parent().removeClass('visible');
        setTimeout(function () { properScroll(); }, 500);
        
    });

    function videoResize() {
        $('.LWfeature.Video .LWfeatureInner.Video .LWmainImageWrapper.Video iframe').each(function () {
            var v = $(this)[0];
            var w = $(this).outerWidth();
            var h = $(this).height();
            var p = $(this).parent();
            var pw = p.width();
            var r = h / w;
            var fh = pw * r;
           
            v.setAttribute('width', pw);
            v.setAttribute('height', fh);
        });
    }

    videoResize();

    var videosLoaded = false;

    function showHideVideo() {
        var w = $(window).outerWidth();
        if (w > 748 && videosLoaded === false) {
            $('.LWfeature .LWfeatureInner.Video iframe').each(function () {
                var s = $(this).attr('data-src');
                console.log(s)
                $(this).attr('src', s);
            });
            videosLoaded = true;
        } 
    }
    showHideVideo();
    
})