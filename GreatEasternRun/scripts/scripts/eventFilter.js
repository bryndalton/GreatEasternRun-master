var searchResultResize = null;
var activitySlidersResize = [];

function createSearchSlider(id) {
	var slideWidth = Math.floor($(".searchResults").width() / slides);

	var config = {
		slides: slides,
		moveSlides: slides,
		infiniteLoop: false,
		slideWidth: slideWidth,
		minSlides: slides,
		maxSlides: slides,
		adaptiveHeight: true,
		slideMargin: 2,
		prevText: '',
		nextText: '',
		nextSelector: '#sliderNext' + id,
		prevSelector: '#sliderPrev' + id,
		hideControlOnEnd: true,
        touchEnabled: true,
        onSlideAfter: function ($slideElement, oldIndex, newIndex) {
            
            if ($(window).width() <= 640) {

                var t = $slideElement.parent().parent().parent().find('.bx-controls').offset().top + ($slideElement.parent().parent().parent().find('.bx-controls').height() * 2) - $(window).height() + 20;
                window.scrollTo({ top: t, behavior: 'smooth' });
                
            }

        }
	};

	//Init sliders
    var searchResultSlider = $(".searchResults[data-ident='" + id + "'] .searchResultsInner").bxSlider(config);

	//Only show slider controls if there's more then one page
    function handleControls() {
        var hide = searchResultSlider.getSlideCount() <= config.slides;

        $(".searchResults[data-ident='" + id + "'] .sliderControls").toggleClass("hidden", hide);

        config.nextSelector = "#sliderNext" + id;
        config.prevSelector = "#sliderPrev" + id;

        //Hide pager and refresh
        config.pager = !hide;
        searchResultSlider.reloadSlider(config);
	}

	if (searchResultSlider.length)
		handleControls();

    activitySlidersResize.push(function () {
        //Update config and reload
        if (searchResultSlider.length) {
            config.slides = config.minSlides = config.maxSlides = moveSlides = slides;
            config.slideWidth = Math.floor($(".searchResults").width() / config.slides);

            //Check again now that the amount has changed
            handleControls();
        }
    });
}

if ($(".activityFilterSection")[0]) {

	$(".searchHeader .resultsFilter input[name=activity]").on("change", function () {
        var arr = [];

		$(this).parents("ul").find("input[type=checkbox]:checked").each(function () {
			arr.push({ activity: $(this).val()});
        });

        search(arr, $(this).parents(".searchHeader").data("ident"));
    });

	var lastQuery = "";

	function search(params, id) {
		var query = [""];		

		if (params) {
			for (var i = 0; i < params.length; i++) {
				var param = params[i];
				for (var q in param) {
					var qs = q + "=" + param[q];
					query.push(qs);
				}
			}		

			query = query.join("&");

			//Reset 
			$("#searchResults[data-ident='" + id + "']").empty();
			//$(".searchResultsSpinner").fadeIn();
		}

		//As soon as we hit the search then search using the query string on the page
		$.get("/umbraco/surface/search/searcheventlist?contentId=" + id + query, function (data) {
			//Hide the spinner
			//$(".searchResultsSpinner").hide();

            $("#searchResults[data-ident='" + id + "']").html(data);
            $(".searchHeader[data-ident='" + id + "'] .filterWrapper").addClass("show");

			//Recreate slider
			createSearchSlider(id);
		});
    }

    $("#searchResults[data-ident]").each(function () {
        search(null, $(this).data("ident"));
    });

    searchResultResize = function () {
        activitySlidersResize.forEach(function (el) {
            el();
        });
    }
}