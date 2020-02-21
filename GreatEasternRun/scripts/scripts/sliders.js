

var slides;

var sliders = [];
var optionsSliders = [];
var infoSliders = [];
var slideshowSlider;
var whoWeAreSlider;
var reviewSlider;
var collectionsSlider;
var featuredImageSlider;
var corpLogoSlider = [];
var imageSlides = 3;
var venueContactSliderResize = null;
var collectionSliders = [];

function getNumSlides() {
    var outerWidth = $(window).outerWidth();
    if (outerWidth >= 1680) {
        slides = 5;
        imageSlides = 3;
    }
    if (outerWidth >= 1024 && outerWidth < 1680) {
        slides = 4;
        imageSlides = 3;
    }
    if (outerWidth >= 768 && outerWidth < 1024) {
        slides = 3;
        imageSlides = 2;
    }
    if (outerWidth < 768) {
        slides = 2;
        imageSlides = 1;

    }
    if (outerWidth < 640) {
        slides = 1;
        imageSlides = 1;

    }

}

getNumSlides();

$(document).ready(function () {

    if ($('.contactListTabsWrapper').length > 0) {
        $('.contactListTabsWrapper .mayAlsoLike .searchResultsInner').each(function (i, slider) {
            var id = $(this).parent().parent().data('ident');
            var hide = $(this).children().length <= slides;


            $(this).parent().parent().find(".sliderControls").toggleClass("hidden", hide);

            sliders[i] = $(slider).bxSlider({
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
                nextSelector: '#sliderNext' + id,
                prevSelector: '#sliderPrev' + id,
                hideControlOnEnd: true,
                touchEnabled: true,
				pager: !hide,
				pause: 8000,
				onSlideAfter: function ($slideElement, oldIndex, newIndex) {
                    console.log('here');
                    if ($(window).width() <= 640) {
                        
                        var t = $slideElement.parent().parent().parent().find('.bx-controls').offset().top + ($slideElement.parent().parent().parent().find('.bx-controls').height() * 2) - $(window).height() + 20;
                        window.scrollTo({ top: t, behavior: 'smooth' });
                        console.log('here');
                    }
                    
                }
            });

            sliders[i].id = id;
        });
    }
    

    if ($('section.slideshow .slideshowWrapper .slideshowSlide').length > 0) {
        slideshowSlider = $('section.slideshow .slideshowWrapper').bxSlider({
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
			pause: 8000,
			pager: false
        });
    }

	if ($('.searchResultFeatured .searchResultsFeaturedInner .eventImageWrapper #featuredImageSlider .featuredImage').length > 1) {

		var players = [];

		$('.searchResultFeatured .searchResultsFeaturedInner .eventImageWrapper .sliderControls').removeClass('hidden');
		window.featuredImageSlider = $('#featuredImageSlider').bxSlider({
			slideWidth: $('.searchResultsFeaturedInnerLeft').width(),
			pager: true,
			infiniteLoop: true,
			nextSelector: '#featuredImageSliderNext',
			prevSelector: '#featuredImageSliderPrev',
			nextText: '',
			prevText: '',
			auto: true,
			pause: 8000,
			touchEnabled: false,
			video: true,
			onSlideBefore: function () {
				pauseVideos();
			},
			onSliderLoad: function () {
				setTimeout(function () {
					//featuredEventImageResize();
					//console.log('here');
				}, 1000)

			}
		});
		function slideInit() {
			$(".youtubeIframe").each(function (index) {
				var iframe = $($(".youtubeIframe")[index]);
				var iframeId = iframe.attr('id');
				onYouTubeIframeAPIReady(iframeId);
			});
		}

		function readyYoutube() {
			if ((typeof YT !== "undefined") && YT && YT.Player) {
				slideInit();
			} else {
				setTimeout(readyYoutube, 100);
			}
		}

		//For Youtube
		function pauseVideos() {

			for (var i = 0; i < players.length; i++) {
				var player = players[i];
				player.pauseVideo();
			}
		}

		function onYouTubeIframeAPIReady(id) {
			var player = YT.get(id) || new YT.Player(id, {
				videoId: id, events: {
					'onReady': onPlayerReady,
					'onStateChange': onPlayerReady
				}
			});

			players.push(player);
		}

		function onPlayerReady(event) {
			if (typeof event.target.getVideoData !== "undefined") {
				var videoId = event.target.getVideoData().video_id;

				for (var i = 0; i < players.length; i++) {
					var player = players[i];

					if ($(player.getIframe()).attr('id') === videoId) {
						var playerState = player.getPlayerState();

						if (playerState == YT.PlayerState.ENDED) {
							featuredImageSlider.startAuto();
						} else if (playerState == YT.PlayerState.PLAYING) {
							featuredImageSlider.stopAuto();
						} else if (playerState == YT.PlayerState.PAUSED) {
							featuredImageSlider.startAuto();
						}

						break;
					}
				}
			}
			else if (typeof event.data === "number") {
				var videoId = $(event.target.getIframe()).attr('id');
				for (var i = 0; i < players.length; i++) {
					var player = players[i];

					if ($(player.getIframe()).attr('id') === videoId) {
						var playerState = player.getPlayerState();

						if (playerState == YT.PlayerState.ENDED) {
							featuredImageSlider.startAuto();
						} else if (playerState == YT.PlayerState.PLAYING) {
							featuredImageSlider.stopAuto();
						} else if (playerState == YT.PlayerState.PAUSED) {
							featuredImageSlider.startAuto();
						}

						break;
					}
				}
			}
		}

		$(document).ready(function () {
			readyYoutube();
		});
	}

    if ($('body.advancedPage section.imageInfoSlider').length > 0) {
        $('section.imageInfoSlider .imageInfoSliderWrapper').each(function (i, slider) {
            var id = $(this).parent().parent().data('id');
            var hide = $(this).children().length <= imageSlides;

            $(this).parent().parent().find(".imageInfoSliderControls").toggleClass("hidden", hide);

            infoSliders[i] = $(slider).bxSlider({
                slideWidth: $(".imageInfoSliderInner").width(),
                slides: imageSlides,
                moveSlides: imageSlides,
                minSlides: imageSlides,
                maxSlides: imageSlides,
                pager: !hide,
                infiniteLoop: true,
                nextSelector: '#imageInfoNext' + id,
                prevSelector: '#imageInfoPrev' + id,
                nextText: '',
                prevText: '',
                adaptiveHeight: true,
                touchEnabled: true,
                slideMargin: 2,
                controls: true,
				pause: 8000,
                onSlideAfter: function ($slideElement, oldIndex, newIndex) {

                    if ($(window).width() <= 640) {

                        var t = $slideElement.parent().parent().parent().find('.bx-controls').offset().top + ($slideElement.parent().parent().parent().find('.bx-controls').height() * 2) - $(window).height() + 20;
                        window.scrollTo({ top: t, behavior: 'smooth' });

                    }

                }
            });

            infoSliders[i].id = id;
        });
    }

    if ( $(".whoWeAre").length > 0) {
        var whoSlides = slides !== 1 ? slides - 1 : slides;
        var hide = $(".whoWeAre .projectListSlider").children().length <= whoSlides;

        //Hide controls if there's only one page
        $(".whoWeAre .projectsListWrapper .sliderControls").toggleClass("hidden", hide);

        whoWeAreSlider = $(".whoWeAre .projectListSlider").bxSlider({
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
			pause: 8000,
            touchEnabled: true
        });
    }

    if ($('body.advancedPage section.reviews').length > 0) {

        var reviewHide = $(".whoWeAre .projectListSlider").children().length <= 1;
        $("section.reviews .reviewsInner .reviewSliderControls").toggleClass("hidden", reviewHide);

        reviewSlider = $('section.reviews .reviewsInner .reviewSlider').bxSlider({
            slideWidth: $(".reviewsInner").width(),
            slides: 1,
            moveSlides: 1,
            minSlides: 1,
            maxSlides: 1,
            pager: !reviewHide,
            infiniteLoop: false,
            nextSelector: '#reviewNext',
            prevSelector: '#reviewPrev',
            nextText: '',
            prevText: '',
            adaptiveHeight: true,
			pause: 8000,
            touchEnabled: true,
            onSlideAfter: function ($slideElement, oldIndex, newIndex) {

                if ($(window).width() <= 640) {

                    var t = $slideElement.parent().parent().parent().find('.bx-controls').offset().top + ($slideElement.parent().parent().parent().find('.bx-controls').height() * 2) - $(window).height() + 20;
                    window.scrollTo({ top: t, behavior: 'smooth' });

                }

            }
        });
    }

	if ($("body").hasClass("advancedPage") && $(".collections").length > 0) {
		$('.collections').each(function (i, slider) {
			var collectionSlider = $(slider).find(".collectionsSlider");
			var collectionSlides = slides !== 1 ? slides - 1 : slides;
			var collectionHide = collectionSlider.children().length <= collectionSlides;

			//Hide controls if there's only one page
			$(slider).find(".sliderControls").toggleClass("hidden", collectionHide);

			collectionSliders[i] = collectionSlider.bxSlider({
				slideWidth: $(".collections .collectionsInner .slider" + slider.id).width(),
				slides: collectionSlides,
				moveSlides: collectionSlides,
				minSlides: collectionSlides,
				maxSlides: collectionSlides,
				pager: false,
				infiniteLoop: false,
				nextSelector: '#collectionSliderNext' + slider.id,
				prevSelector: '#collectionSliderPrev' + slider.id,
				nextText: '',
				prevText: '',
				adaptiveHeight: false,
				touchEnabled: true,
				pause: 8000,
				slideMargin: 2
			});

			collectionSliders[i].id = slider.id;
			collectionSliders[i].slideWidth = $(".collections .collectionsInner .slider" + slider.id).width();
		});
	}

    //if ($('.memberOptions').length > 0) {
    //    $('.memberOptions .memberOptionsInner .membershipOptionTab.sliderEnabled').each(function (i, slider) {
    //        var id = $(this).find('.membershipOption').data('cat');
    //        var hide = $(this).children().length <= slides;


    //        $(this).parent().parent().find(".sliderControls").toggleClass("hidden", hide);

    //        optionsSliders[i] = $(slider).bxSlider({
    //            mode: 'horizontal',
    //            auto: false,
    //            slides: slides,
    //            moveSlides: slides,
    //            infiniteLoop: false,
    //            slideWidth: Math.floor($('.memberOptionsInner').width() / slides),
    //            minSlides: slides,
    //            maxSlides: slides,
    //            adaptiveHeight: true,
    //            slideMargin: 2,
    //            controls: true,
    //            prevText: '',
    //            nextText: '',
    //            nextSelector: '#sliderNext' + id,
    //            prevSelector: '#sliderPrev' + id,
    //            hideControlOnEnd: true,
    //            touchEnabled: true,
	//			  pause: 8000,
    //            pager: !hide
    //        });

    //        optionsSliders[i].id = id;
    //    });
    //}

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
			pause: 8000,
			touchEnabled: true
        });
    });

    venueContactSliderResize = function (selectedVenue) {
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
				pause: 8000,
				touchEnabled: true
            });
        });
    };

    //if ($("body").hasClass("advancedPage") && $(".corpLogoSliderInner").length > 0) {
    //    console.log($('.corpLogoSlider').innerWidth());
    //    corpLogoSlider = $(".corpLogoSliderInner").bxSlider({
    //        mode:'horizontal',
    //        slideWidth: $('.corpLogoSlider').innerWidth() + 'px',
    //        slides: 1,
    //        moveSlides: 1,
    //        minSlides: 1,
    //        maxSlides: 1,
    //        pager: false,
    //        infiniteLoop: true,
    //        auto:true,
    //        adaptiveHeight: false,
    //        touchEnabled: false,
    //        controls:false
    //    });
    //}

    if ($('.corpLogoSliderInner').length > 0) {
        $('.corpLogoSlider .corpLogoSliderInner').each(function (i, slider) {
            var id = $(this).attr('id');
            //console.log(id);
            //var hide = $(this).children().length <= imageSlides;

            //$(this).parent().parent().find(".imageInfoSliderControls").toggleClass("hidden", hide);

            corpLogoSlider[i] = $(slider).bxSlider({
                slideWidth: $(this).parent().parent().parent().width(),
                slides: 1,
                moveSlides: 1,
                minSlides: 1,
                maxSlides: 1,
                pager: false,
                infiniteLoop: true,
                nextSelector: '#imageInfoNext' + slider.id,
                prevSelector: '#imageInfoPrev' + slider.id,
                nextText: '',
                prevText: '',
                adaptiveHeight: true,
                touchEnabled: false,
                slideMargin: 0,
                auto: true,
                controls: false
                
            });

            //console.log($(this).parent().parent().parent().width());

            corpLogoSlider[i].id = id;
            corpLogoSlider[i].slideWidth = $(this).parent().parent().parent().width();
        });

        setTimeout(function () {
            $.each(corpLogoSlider, function (i, slider) {
                //var hide = slider.getSlideCount() <= slides;
                //var currentSlide = slider.getCurrentSlide();
                //Hide arrows if there's only one page
                //slider.parents(".mayAlsoLike").find(".sliderControls").toggleClass("hidden", hide);
                //console.log(slider.slideWidth);

                slider.reloadSlider({
                    slideWidth: slider.slideWidth,
                    slides: 1,
                    moveSlides: 1,
                    minSlides: 1,
                    maxSlides: 1,
                    pager: false,
                    infiniteLoop: true,
                    nextSelector: '#imageInfoNext' + slider.id,
                    prevSelector: '#imageInfoPrev' + slider.id,
                    nextText: '',
                    prevText: '',
                    adaptiveHeight: true,
                    touchEnabled: false,
                    slideMargin: 0,
                    auto: true,
                    controls: false
                    //startSlide: currentSlide,
                    //pause: 8000,

                });
            });
        }, 2000);

        
    }

});

$(window).resize(function () {
    getNumSlides();

    //$.each(optionsSliders, function (i, slider) {
    //    var hide = slider.getSlideCount() <= slides;

    //    slider.parent().parent().find(".sliderControls").toggleClass("hidden", hide);

    //    slider.reloadSlider({
    //        mode: 'horizontal',
    //        auto: false,
    //        slides: slides,
    //        moveSlides: slides,
    //        infiniteLoop: false,
    //        slideWidth: Math.floor($('.memberOptionsInner').width() / slides),
    //        minSlides: slides,
    //        maxSlides: slides,
    //        adaptiveHeight: true,
    //        slideMargin: 2,
    //        controls: true,
    //        prevText: '',
    //        nextText: '',
    //        nextSelector: '#sliderNext' + slider.id,
    //        prevSelector: '#sliderPrev' + slider.id,
    //        hideControlOnEnd: true,
    //        touchEnabled: true,
	//        pause: 8000,
    //        pager: !hide
    //    });
    //});

    $.each(sliders, function (i, slider) {
        var hide = slider.getSlideCount() <= slides;
        var currentSlide = slider.getCurrentSlide();
        console.log(currentSlide);
        //slider.goToSlide(currentSlide);

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
            touchEnabled: true,
            pager: !hide,
            startSlide: currentSlide,
			pause: 8000,
            onSlideAfter: function ($slideElement, oldIndex, newIndex) {
                console.log('here');
                if ($(window).width() <= 640) {
                    var t = $slideElement.parent().parent().parent().find('.bx-controls').offset().top + ($slideElement.parent().parent().parent().find('.bx-controls').height() * 2) - $(window).height() + 20;
                    window.scrollTo({ top: t, behavior: 'smooth' });
                    console.log('here');
                }

            }
        });
    });

    if ($('section.slideshow .slideshowWrapper .slideshowSlide').length > 0) {
        var currentSlideshowSlide = slideshowSlider.getCurrentSlide();
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
            pager: false,
			pause: 8000,
            startSlide: currentSlideshowSlide
        });
    }

    if ($('.searchResultFeatured .searchResultsFeaturedInner .eventImageWrapper #featuredImageSlider .featuredImage').length > 1) {
        $('.searchResultFeatured .searchResultsFeaturedInner .eventImageWrapper .sliderControls').removeClass('hidden');
        var currentFeaturedImageSlide = featuredImageSlider.getCurrentSlide();
        window.featuredImageSlider.reloadSlider({
            slideWidth: $('.searchResultsFeaturedInnerLeft').width(),
            pager: true,
            infiniteLoop: true,
            nextSelector: '#featuredImageSliderNext',
            prevSelector: '#featuredImageSliderPrev',
            nextText: '',
            prevText: '',
            auto: true,
            touchEnabled: true,
            video: true,
			pause: 8000,
            startSlide: currentFeaturedImageSlide
        });
    }

    $.each(infoSliders, function (i, slider) {
        var hide = slider.getSlideCount() <= slides;
        var currentSlide = slider.getCurrentSlide();
        //Hide arrows if there's only one page
        slider.parents(".mayAlsoLike").find(".sliderControls").toggleClass("hidden", hide);

        slider.reloadSlider({
            slideWidth: $(".imageInfoSliderInner").width(),
            slides: imageSlides,
            moveSlides: imageSlides,
            minSlides: imageSlides,
            maxSlides: imageSlides,
            pager: !hide,
            infiniteLoop: true,
            nextSelector: '#imageInfoNext' + slider.id,
            prevSelector: '#imageInfoPrev' + slider.id,
            nextText: '',
            prevText: '',
            adaptiveHeight: true,
            touchEnabled: true,
            slideMargin: 2,
            startSlide: currentSlide,
			pause: 8000,
            onSlideAfter: function ($slideElement, oldIndex, newIndex) {

                if ($(window).width() <= 640) {

                    var t = $slideElement.parent().parent().parent().find('.bx-controls').offset().top + ($slideElement.parent().parent().parent().find('.bx-controls').height() * 2) - $(window).height() + 20;
                    window.scrollTo({ top: t, behavior: 'smooth' });

                }

            }
        });
    });

    if ($(".whoWeAre").length > 0) {
        var whoSlides = slides !== 1 ? slides - 1 : slides;
        var hide = $(".whoWeAre .projectListSlider").children().length <= whoSlides;
        var currentWhoWeAreSlide = whoWeAreSlider.getCurrentSlide();
        //Hide controls if there's only one page
        $(".whoWeAre .projectsListWrapper .sliderControls").toggleClass("hidden", hide);

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
            touchEnabled: true,
			pause: 8000,
            startSlide: currentWhoWeAreSlide
        });
    }

    if ($('body.advancedPage section.reviews').length > 0) {

        var reviewHide = $(".whoWeAre .projectListSlider").children().length <= 1;
        var currentReviewSlide = reviewSlider.getCurrentSlide();

        $("section.reviews .reviewsInner .reviewSliderControls").toggleClass("hidden", reviewHide);

        reviewSlider.reloadSlider({
            slideWidth: $(".reviewsInner").width(),
            slides: 1,
            moveSlides: 1,
            minSlides: 1,
            maxSlides: 1,
            pager: !reviewHide,
            infiniteLoop: false,
            nextSelector: '#reviewNext',
            prevSelector: '#reviewPrev',
            nextText: '',
            prevText: '',
            adaptiveHeight: true,
            touchEnabled: true,
			pause: 8000,
            startSlide: currentReviewSlide
        })
    }

	if ($("body").hasClass("advancedPage") && $(".collections").length > 0) {
		$('.collections').each(function (i, slider) {
			var collectionSlides = slides !== 1 ? slides - 1 : slides;
			var collectionHide = $(slider).find(".collectionsInner").length <= collectionSlides;

			//Hide controls if there's only one page
			$(slider).find(".sliderControls").toggleClass("hidden", collectionHide);

			collectionSliders[i] = $(slider).find(".collectionsSlider").bxSlider({
				slideWidth: $(".collections .collectionsInner .slider" + slider.id).width(),
				slides: collectionSlides,
				moveSlides: collectionSlides,
				minSlides: collectionSlides,
				maxSlides: collectionSlides,
				pager: false,
				infiniteLoop: false,
				nextSelector: '#collectionSliderNext' + slider.id,
				prevSelector: '#collectionSliderPrev' + slider.id,
				nextText: '',
				prevText: '',
				adaptiveHeight: false,
				touchEnabled: true,
				pause: 8000,
				slideMargin: 2
			});

			collectionSliders[i].id = slider.id;
			collectionSliders[i].slideWidth = $(".collections .collectionsInner .slider" + slider.id).width();
		});
	}

    if ($("body").hasClass("advancedPage") && $(".corpLogoSliderInner").length > 0) {
        
        //corpLogoSlider.reloadSlider({
        //    mode: 'horizontal',
        //    slideWidth: $('.corpLogoSlider').innerWidth() + 'px',
        //    slides: 1,
        //    moveSlides: 1,
        //    minSlides: 1,
        //    maxSlides: 1,
        //    pager: false,
        //    infiniteLoop: true,
        //    auto: true,
        //    adaptiveHeight: false,
        //    touchEnabled: false,
        //    controls: false
        //});

        $.each(corpLogoSlider, function (i, slider) {
            //var hide = slider.getSlideCount() <= slides;
            //var currentSlide = slider.getCurrentSlide();
            //Hide arrows if there's only one page
            //slider.parents(".mayAlsoLike").find(".sliderControls").toggleClass("hidden", hide);
            //console.log(slider);

            slider.reloadSlider({
                slideWidth: $(this).parent().width(),
                slides: 1,
                moveSlides: 1,
                minSlides: 1,
                maxSlides: 1,
                pager: false,
                infiniteLoop: true,
                nextSelector: '#imageInfoNext' + slider.id,
                prevSelector: '#imageInfoPrev' + slider.id,
                nextText: '',
                prevText: '',
                adaptiveHeight: true,
                touchEnabled: false,
                slideMargin: 0,
                auto: true,
                controls:false
                //startSlide: currentSlide,
                //pause: 8000,
                
            });
        });
    }



    if (venueContactSliderResize)
        venueContactSliderResize();

    if (window.searchResultResize)
        window.searchResultResize();
});

$(window).scroll(function () {
    $.each(sliders, function (i, slider) {
        var currentSlide = slider.getCurrentSlide();
        slider.goToSlide(currentSlide);
    });

    if (window.searchResultSlider)
        window.searchResultSlider.goToSlide(window.searchResultSlider.getCurrentSlide());
});