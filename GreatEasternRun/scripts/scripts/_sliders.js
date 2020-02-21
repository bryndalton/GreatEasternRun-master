



var venueContactSliderResize = null;



    

    //Scrolling and aspect ratio code for event headers/search featured
    var featuredInfoClasses =
        $('body').hasClass('BookableTheatreEvent') ||
        $('body').hasClass('NonBookableTheatreEvent') ||
        $('body').hasClass('NonBookableEvent') ||
        $('body').hasClass('BookableSportEvent') ||
        $('body').hasClass('BookableHeritageEvent') ||
        $('body').hasClass('BookableLibraryEvent') ||
        $('body').hasClass('OmnicoArtEvent');

    

    var slides = getNumSlides();
    var imageSlides = getNumInfoSlides();

    var mayAlsoLikeClasses =
        $('body').hasClass('advancedPage') ||
        $('body').hasClass('Search') ||
        $('body').hasClass('BookableHeritageEvent') ||
        $('body').hasClass('BookableTheatreEvent') ||
        $('body').hasClass('NonBookableTheatreEvent') ||
        $('body').hasClass('BookableSportEvent') ||
        $('body').hasClass('NonBookableEvent') ||
        $('body').hasClass('BookableLibraryEvent') ||
        $('body').hasClass('OmnicoArtEvent') ||
        $('body').hasClass('Venue');

    if (mayAlsoLikeClasses) {
        var sliders = [];

        

        if ($('section.slideshow .slideshowWrapper .slideshowSlide').length > 0) {
            var slideshowSlider = $('section.slideshow .slideshowWrapper').bxSlider({
                mode: 'horizontal',
                auto: true,
                slides: 1,
                moveSlides: 1,
                infiniteLoop: true,
                slideWidth: $('section.slideshow').width(),
                minSlides: 1,
                maxSlides: 1,
                adaptiveHeight: true,
                controls: false,
                hideControlOnEnd: true,
                touchEnabled: true,
                pager: false
            });
        }

        var venueContactSlider = $(".contactList .contactListItemsWrapper .contactListSlider").map(function (i, slide) {
            return $(slide).bxSlider({
                mode: 'horizontal',
                auto: false,
                slides: slides,
                moveSlides: slides,
                infiniteLoop: false,
                slideWidth: Math.floor($('.contactList').width() / slides),
                minSlides: slides,
                maxSlides: slides,
                adaptiveHeight: true,
                slideMargin: 2,
                controls: $(slide).parent().hasClass("selected"),
                pager: false,
                prevText: '',
                nextText: '',
                nextSelector: '#sliderNextContact',
                prevSelector: '#sliderPrevContact',
                hideControlOnEnd: false,
                touchEnabled: false
            });
        });

        venueContactSliderResize = function (selectedVenue) {
            //Recalc slide count
            slides = getNumSlides();

            venueContactSlider.each(function (i, slide) {
                var venue = slide.parents(".contactListItemsWrapper").data("venue");

                slide.reloadSlider({
                    mode: 'horizontal',
                    auto: false,
                    slides: slides,
                    moveSlides: slides,
                    infiniteLoop: false,
                    slideWidth: Math.floor(slide.parents(".contactList").width() / slides),
                    minSlides: slides,
                    maxSlides: slides,
                    adaptiveHeight: true,
                    slideMargin: 2,
                    controls: selectedVenue === venue || $(slide).parents(".contactListItemsWrapper").hasClass("selected"),
                    pager: false,
                    prevText: '',
                    nextText: '',
                    nextSelector: '#sliderNextContact',
                    prevSelector: '#sliderPrevContact',
                    hideControlOnEnd: true,
                    touchEnabled: false
                });
            });
        };
    }

    if (featuredInfoClasses) {
        if ($('.searchResultFeatured .searchResultsFeaturedInner .eventImageWrapper #featuredImageSlider .featuredImage').length > 1) {
            $('.searchResultFeatured .searchResultsFeaturedInner .eventImageWrapper .sliderControls').removeClass('hidden');
            var featuredImageSlider = $('#featuredImageSlider').bxSlider({
                slideWidth: $('.searchResultsFeaturedInnerLeft').width(),
                pager: true,
                infiniteLoop: true,
                nextSelector: '#featuredImageSliderNext',
                prevSelector: '#featuredImageSliderPrev',
                nextText: '',
                prevText: '',
                auto: true,
                touchEnabled: false
            });
        }
    }

    if ($('body').hasClass('Venue')) {
        if ($('.venueInfo .venueInfoInner .openingHours .openingHoursRight #openingHoursRight .openingHoursSlide').length > 1) {
            $('.venueInfo .venueInfoInner .openingHours .openingHoursRight .sliderControls').removeClass('hidden');
            var venueImageSlider = $('#openingHoursRight').bxSlider({
                slideWidth: $('.openingHoursRight').width(),
                pager: true,
                infiniteLoop: true,
                nextSelector: '#venueImageSliderNext',
                prevSelector: '#venueImageSliderPrev',
                nextText: '',
                prevText: '',
                adaptiveHeight: true,
                auto: true,
                touchEnabled: false
            });
        }
    }
    if ($('body').hasClass('VenueFolder')) {
        $('section.memberOptions .memberOptionsInner .membershipOptionTab .membershipOption .findOutMore').on('click', function () {
            $(this).parent().addClass('selected');
            $(this).parent().parent().addClass('optionSelected');
        });
    }

    if ($("body").hasClass("advancedPage") && $(".whoWeAre").length > 0) {
        var whoSlides = slides !== 1 ? slides - 1 : slides;
        var hide = $(".whoWeAre .projectListSlider").children().length <= whoSlides;

        //Hide controls if there's only one page
        $(".whoWeAre .projectsListWrapper .sliderControls").toggleClass("hidden", hide);

        var whoWeAreSlider = $(".whoWeAre .projectListSlider").bxSlider({
            slideWidth: $(".whoWeAre .projectListSlider").width(),
            slides: whoSlides,
            moveSlides: whoSlides,
            minSlides: whoSlides,
            maxSlides: whoSlides,
            pager: false,
            infiniteLoop: false,
            nextSelector: '#whoWeAreSliderNext',
            prevSelector: '#whoWeAreSliderPrev',
            nextText: '',
            prevText: '',
            adaptiveHeight: false,
            touchEnabled: true
        });
    }

    if ($('body.advancedPage section.reviews').length > 0) {
        var reviewSlider = $('section.reviews .reviewsInner .reviewSlider').bxSlider({
            slideWidth: $(".reviewsInner").width(),
            slides: 1,
            moveSlides: 1,
            minSlides: 1,
            maxSlides: 1,
            pager: true,
            infiniteLoop: true,
            nextSelector: '#reviewNext',
            prevSelector: '#reviewPrev',
            nextText: '',
            prevText: '',
            adaptiveHeight: true,
            touchEnabled: false
        })
    }

    if ($('body.advancedPage section.imageInfoSlider').length > 0) {
        var imageInfoSlides = imageSlides !== 1 ? imageSlides - 1 : imageSlides;
        var imageInfoHide = $(".imageInfoSlider .imageInfoSliderWrapper").children().not('.bx-clone').length <= imageInfoSlides;
        console.log(imageSlides);
        //Hide controls if there's only one page
        $(".imageInfoSlider .imageInfoSliderInner .imageInfoSliderControls").toggleClass("hidden", imageInfoHide);

        var imageInfoSlider = $('section.imageInfoSlider .imageInfoSliderWrapper').bxSlider({
            slideWidth: $(".imageInfoSliderInner").width(),
            slides: imageSlides,
            moveSlides: imageSlides,
            minSlides: imageSlides,
            maxSlides: imageSlides,
            pager: true,
            infiniteLoop: true,
            nextSelector: '#imageInfoNext',
            prevSelector: '#imageInfoPrev',
            nextText: '',
            prevText: '',
            adaptiveHeight: true,
            touchEnabled: false,
            slideMargin: 2
        });
    }

    if ($("body").hasClass("advancedPage") && $(".collections").length > 0) {
        var collectionSlides = slides !== 1 ? slides - 1 : slides;
        var collectionHide = $(".collections .collectionsSlider").children().length <= collectionSlides;

        //Hide controls if there's only one page
        $(".collections .sliderControls").toggleClass("hidden", collectionHide);

        var collectionsSlider = $(".collections .collectionsSlider").bxSlider({
            slideWidth: $(".collections .collectionsInner").width(),
            slides: collectionSlides,
            moveSlides: collectionSlides,
            minSlides: collectionSlides,
            maxSlides: collectionSlides,
            pager: false,
            infiniteLoop: false,
            nextSelector: '#collectionSliderNext',
            prevSelector: '#collectionSliderPrev',
            nextText: '',
            prevText: '',
            adaptiveHeight: false,
            touchEnabled: true,
            slideMargin: 2
        });
    }

    $(window).resize(function () {
        //Handle resizing the search results slider
        if (searchResultResize)
            searchResultResize();

        //Also handle them on resize
        if (featuredInfoClasses) {
            featuredEventImageResize();
            ridiculousFeaturedInfoScroll();
        }

        if ($('body').hasClass('FAQLandingPage ')) {
            ridiculousFAQScroll();
        }

        if (mayAlsoLikeClasses) {
            //Recalc slide count
            slides = getNumSlides();

            $.each(sliders, function (i, slider) {
                var hide = slider.getSlideCount() <= slides;

                //Hide arrows if there's only one page
                slider.parents(".mayAlsoLike").find(".sliderControls").toggleClass("hidden", hide);

                slider.reloadSlider({
                    mode: 'horizontal',
                    auto: false,
                    slides: slides,
                    moveSlides: slides,
                    infiniteLoop: false,
                    slideWidth: Math.floor($('.mayAlsoLike').width() / slides),
                    minSlides: slides,
                    maxSlides: slides,
                    adaptiveHeight: true,
                    slideMargin: 2,
                    controls: true,
                    prevText: '',
                    nextText: '',
                    nextSelector: '#sliderNext' + slider.id,
                    prevSelector: '#sliderPrev' + slider.id,
                    hideControlOnEnd: true,
                    touchEnabled: false,
                    pager: !hide
                });
            });

            if ($('section.slideshow .slideshowWrapper .slideshowSlide').length > 0) {
                slideshowSlider.reloadSlider({
                    mode: 'horizontal',
                    auto: true,
                    slides: 1,
                    moveSlides: 1,
                    infiniteLoop: true,
                    slideWidth: $('section.slideshow').width(),
                    minSlides: 1,
                    maxSlides: 1,
                    adaptiveHeight: true,
                    controls: false,
                    hideControlOnEnd: true,
                    touchEnabled: true,
                    pager: false
                });
            }

            if (venueContactSliderResize)
                venueContactSliderResize();
        }

        if (featuredInfoClasses) {
            if ($('.searchResultFeatured .searchResultsFeaturedInner .eventImageWrapper #featuredImageSlider .featuredImage').length > 1) {
                $('.searchResultFeatured .searchResultsFeaturedInner .eventImageWrapper .sliderControls').removeClass('hidden');
                featuredImageSlider.reloadSlider({
                    slideWidth: $('.searchResultsFeaturedInnerLeft').width(),
                    pager: true,
                    infiniteLoop: true,
                    nextSelector: '#featuredImageSliderNext',
                    prevSelector: '#featuredImageSliderPrev',
                    nextText: '',
                    prevText: '',
                    auto: true,
                    touchEnabled: false
                });
            }
        }

        if ($('body').hasClass('Venue') && venueImageSlider) {
            venueImageSlider.reloadSlider({
                slideWidth: $('.openingHoursRight').width(),
                pager: true,
                infiniteLoop: true,
                nextSelector: '#venueImageSliderNext',
                prevSelector: '#venueImageSliderPrev',
                nextText: '',
                prevText: '',
                adaptiveHeight: true,
                auto: true,
                touchEnabled: false
            });
        }

        if ($("body").hasClass("advancedPage") && $(".whoWeAre").length > 0) {
            //Recalc slide count
            slides = getNumSlides();

            var whoSlides = slides !== 1 ? slides - 1 : slides;

            var hide = whoWeAreSlider.getSlideCount() <= whoSlides;

            //Hide arrows if there's only one page
            whoWeAreSlider.parents(".projectsListWrapper").find(".sliderControls").toggleClass("hidden", hide);

            whoWeAreSlider.reloadSlider({
                slideWidth: $(".whoWeAre .projectListSlider").width(),
                slides: whoSlides,
                moveSlides: whoSlides,
                minSlides: whoSlides,
                maxSlides: whoSlides,
                pager: false,
                infiniteLoop: false,
                nextSelector: '#whoWeAreSliderNext',
                prevSelector: '#whoWeAreSliderPrev',
                nextText: '',
                prevText: '',
                adaptiveHeight: false,
                touchEnabled: true
            });
        }

        if ($("body").hasClass("advancedPage") && $(".collections").length > 0) {
            var collectionSlides = slides !== 1 ? slides - 1 : slides;
            var collectionHide = $(".collections .collectionsSlider").children().length <= collectionSlides;

            //Hide controls if there's only one page
            $(".collections .sliderControls").toggleClass("hidden", collectionHide);

            collectionsSlider.reloadSlider({
                slideWidth: $(".collections .collectionsInner").width(),
                slides: collectionSlides,
                moveSlides: collectionSlides,
                minSlides: collectionSlides,
                maxSlides: collectionSlides,
                pager: false,
                infiniteLoop: false,
                nextSelector: '#collectionSliderNext',
                prevSelector: '#collectionSliderPrev',
                nextText: '',
                prevText: '',
                adaptiveHeight: false,
                touchEnabled: true,
                slideMargin: 2
            });
        }

        if ($('body.advancedPage section.imageInfoSlider').length > 0) {

            imageSlides = getNumInfoSlides();
            var imageInfoSlides = imageSlides !== 1 ? imageSlides - 1 : imageSlides;
            var imageInfoHide = $(".imageInfoSlider .imageInfoSliderWrapper").children().not('.bx-clone').length <= imageInfoSlides;

            //Hide controls if there's only one page
            $(".imageInfoSlider .imageInfoSliderInner .imageInfoSliderControls").toggleClass("hidden", imageInfoHide);

            imageInfoSlider.reloadSlider({
                slideWidth: $(".imageInfoSliderInner").width(),
                slides: imageSlides,
                moveSlides: imageSlides,
                minSlides: imageSlides,
                maxSlides: imageSlides,
                pager: true,
                infiniteLoop: true,
                nextSelector: '#imageInfoNext',
                prevSelector: '#imageInfoPrev',
                nextText: '',
                prevText: '',
                adaptiveHeight: true,
                touchEnabled: false,
                slideMargin: 2
            });
        }

        if ($("body").hasClass("advancedPage") && $(".reviews").length > 0) {
            //Recalc slide count
            //slides = getNumSlides();

            //var whoSlides = slides !== 1 ? slides - 1 : slides;

            //var hide = whoWeAreSlider.getSlideCount() <= whoSlides;

            //Hide arrows if there's only one page
            reviewSlider.parents(".projectsListWrapper").find(".sliderControls").toggleClass("hidden", hide);

            reviewSlider.reloadSlider({
                slideWidth: $(".reviewsInner").width(),
                slides: 1,
                moveSlides: 1,
                minSlides: 1,
                maxSlides: 1,
                pager: true,
                infiniteLoop: true,
                nextSelector: '#reviewNext',
                prevSelector: '#reviewPrev',
                nextText: '',
                prevText: '',
                adaptiveHeight: true,
                touchEnabled: false
            });
        }
    });
});