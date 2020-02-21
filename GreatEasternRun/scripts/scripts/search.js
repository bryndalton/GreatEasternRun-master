//$("section.searchHeader .searchTabsWrapper .searchTabs .tab").on('click', function () {
//    var t = $(this).data('tab');
//    $("section.searchHeader .searchTabsWrapper .searchBoxes").attr("class", "searchBoxes " + t);
//    $("section.searchHeader .searchTabsWrapper .searchTabs .tab").attr('class', 'tab');

//    $(this).parents(".searchTabsWrapper").find("input[name='channel']").val(t);
//    $(this).addClass(t);

//    if (search)
//        search({ "channel": t });
//});

//var searchTab = $("input[name='channel']").val();

//if (searchTab) {
//    $("section.searchHeader .searchTabsWrapper .searchTabs .tab").attr('class', 'tab');
//    $("section.searchHeader .searchTabsWrapper .searchTabs .tab[data-tab='" + searchTab + "']").addClass(searchTab);
//}

function createSearchSlider() {
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
        nextSelector: '#sliderNextsearchResult',
        prevSelector: '#sliderPrevsearchResult',
        hideControlOnEnd: true,
        touchEnabled: true,
        onSlideAfter: function ($slideElement, oldIndex, newIndex) {
            console.log('here');
            if ($(window).width() <= 640) {
                var t = $slideElement.parent().parent().parent().find('.bx-controls').offset().top + ($slideElement.parent().parent().parent().find('.bx-controls').height() * 2) - $(window).height() + 20;
                window.scrollTo({ top: t, behavior: 'smooth' });
                console.log('here');
            }

        }
    };

    var featuredConfig = {
        slideWidth: $('.searchResultsFeaturedInnerLeft').width(),
        pager: true,
        infiniteLoop: true,
        nextSelector: '#featuredImageSliderNext',
        prevSelector: '#featuredImageSliderPrev',
        nextText: '',
        prevText: '',
        auto: true,
        touchEnabled: true
    };

    //Init sliders
    window.searchResultSlider = $(".searchResults .searchResultsInner").bxSlider(config);

    

    //Only show slider controls if there's more then one page
    function handleControls() {
        var hide = window.searchResultSlider.getSlideCount() <= config.slides;

        $(".searchResults .sliderControls").toggleClass("hidden", hide);

        //Hide pager and refresh
        config.pager = !hide;
        window.searchResultSlider.reloadSlider(config);
    }

    if (window.searchResultSlider.length)
        handleControls();

    //Only create featured image slider if there's more than 1
    var featuredSlider = null;

    if ($(".searchSlider #featuredImageSlider").children().length > 1) {
        featuredSlider = $(".searchSlider #featuredImageSlider").bxSlider(featuredConfig);
        $(".searchSlider .sliderControls").removeClass("hidden");
    }

    window.searchResultResize = function () {
        //Update config and reload
        if (window.searchResultSlider.length) {
            config.slides = config.minSlides = config.maxSlides = moveSlides = slides;
            config.slideWidth = Math.floor($(".searchResults").width() / config.slides);

            //Check again now that the amount has changed
            handleControls();
        }

        //Resize image
        

        if (featuredSlider) {
            featuredConfig.slideWidth = $('.searchResultsFeaturedInnerLeft').width();
            featuredSlider.reloadSlider(featuredConfig);
        }
    };
}

if ($('body').hasClass('Search')) {
    function calcMinMax() {
        //Get min and max of each search result
        var min = 0, max = 0;

        $(".searchResultsInner .searchResultItem").each(function () {
            var prices = ($(this).data("prices") || "").toString().split(",");

            if (prices.length > 0) {
                //Check each price
                prices.forEach(function (price) {
                    if (price !== "") {
                        min = Math.min(min, price);
                        max = Math.max(max, price);
                    }
                });
            }
        });

        $(".searchHeader .resultsFilter .priceRangeLabel .min").text(min == 0 ? "Free" : "£" + min);
        $(".searchHeader .resultsFilter .priceRangeLabel .max").text(max == 0 ? "Free" : "£" + max);

        //Hide price if there's only free stuff
        $(".searchHeader .resultsFilter .filterByFormSection.price").toggle(min + max !== 0);

        //Set the value to the max to include everything
        $(".searchHeader .resultsFilter input[type=range]").attr("max", max).attr("min", min).val(max);
    }

    //Bind events on the filter inputs
    $(".searchHeader .resultsFilter input[type=range]").on("change", function () {
        search({ price: $(this).val() });
    });

    $(".searchHeader .resultsFilter input[name=activity]").on("change", function () {
		var arr = [];
		$("input:checkbox[name=activity]:checked").each(function () {
			arr.push($(this).val());
		});
		search({ activity: arr.join("-") });
    });

    $(".searchHeader .resultsFilter input[name=channel]").on("change", function () {
        search({ channel: $(this).val() });
    });

    var lastQuery = null;

    function search(params) {
        var query = lastQuery || location.href.split("?")[1];
        var tab = params ? params["channel"] : "";

        if (query) {
            query = query.split("&");

            //Remove params from query if set
            if (params) {
                query.slice().forEach(function (val, index) {
                    for (var param in params)
                    {
                        var qs = param + "=" + params[param];

                        //Param matches so replace it
                        if (val.indexOf(param) !== -1)
                            query[index] = qs;
                        else if (query.filter(function (f) { return f.indexOf(param) !== -1; }).length === 0) {
                            query.push(qs);
                            break;
                        }
                    }
                });

                //Reset
                $("#searchResults").empty();
                $(".searchResultsSpinner").fadeIn();
                $(".searchHeader .resultsTitle").html("");
            }

            lastQuery = query = query.join("&");
        }
            
        //As soon as we hit the search then search using the query string on the page
        $.get("/umbraco/surface/search/search?" + query, function (data) {
            //Hide the spinner
            $(".searchResultsSpinner").hide();

            $("#searchResults").html(data);

            //Set results text
            var title = resultCount === null ? "" : resultCount > 0 ? resultCount + " result" + (resultCount > 1 ? "s" : "") + " found" : "No results found";

            if (resultCount != null) {
                $(".searchHeader .resultsFilter").removeClass("hidden");

                //Display different text if a query is entered
                var searchQuery = $(".searchHeader input[name=query]").val();
                if (searchQuery !== "")
                    title += " for <span class='query'>'" + searchQuery + "'</span>";

                //Add tab to the end if one is selected
                var tabName = $(".searchHeader .resultsFilter label[for='" + tab + "']").text();
                if (tabName)
                    title += " in <span class='tab'>'" + tabName + "'</span>";

                if (resultCount > 0)
                    $(".searchHeader .filterWrapper").addClass("show");
            }

            //Reset if no results
            if (resultCount == null || resultCount === 0) {
                window.searchResultSlider = null;
                window.searchResultResize = null;
            } else
                //Recreate slider
                createSearchSlider();

            $(".searchHeader .resultsTitle").html(title);

            if(!params || tab)
                calcMinMax();
        });
    }

    search();
}

$(".searchHeader input[type=submit]").click(function (e) {
    var searchQuery = $(".searchHeader input[name=query]").val();

    if (searchQuery)
        return;

    var error = 0;

    $(".error-wrapper").each(function () {
        if ($(this).find("input").val() === "") {
            $(this).addClass("error");
            $(this).find("label").show();
            error++;
        }
    });

    if (error > 0)
        e.preventDefault();
});