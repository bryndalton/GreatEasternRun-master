/*$(function () {
    setTimeout(function () {
        //    $("#backgroundIframe").prop('src', "http://onlinebookings.vivacity.org/TheatreBookingssamplesite/Checkout/Checkout?view=check");
    }, 2000);

});*/

displayBasket();

window.addEventListener('message', function (e) {
    var key = e.message ? 'message' : 'data';
    var data = e[key];

    if (typeof data.indexOf == 'function') {
        //Scroll on load
        /*if (data.indexOf('newPageLoaded') > -1) {
            var aTag = $("a[name='iframeTopPosition']");
            $('html,body').animate({ scrollTop: aTag.offset().top - 80 }, 'slow');
        }*/

        if (data.indexOf('checkoutMessage') > -1) {
            console.log("CHECKOUT MESSAGE:" + data);
            var parameters = data.replace("checkoutMessage:", "").split(",");
            var isCheck = false;

            parameters.forEach(function (param) {
                var parts = param.split("=");

                if (parts.length == 2) {
                    console.log("Parts 0 = " + parts[0]);

                    if (parts[0] == "itemsInBasket") {
                        setBasketItemQuantity(parseInt(parts[1]));
                    }

                    if (parts[0] == "checkView") {
                        isCheck = parts[1] == "true";
                    }

                    if (parts[0] == "valueOfBasket") {
                        setBasketValue(parts[1]);
                    }

                    //if (parts[0] == "suggestionhint") {
                    //    //alert(parts[1]); works but removed for publish
                    //    if (typeof USC === 'object') {
                    //        USC.getSuggestions(parts[1]);
                    //    }
                    //}
                };

                if (parts[0] == "homevisited") {
                    setBasketValue("0");
                    setBasketItemQuantity("0");
                    window.location.href = "/";
                }

                if (parts[0] == "basketempty") {
                    setBasketValue("0");
                    setBasketItemQuantity("0");

                    //Go back to the homepage
                    //window.location = "/";
                }

                if (parts[0] == "whatson") {
                    console.log("Redirect to Whats on");
                    window.location = "/theatre";
                }
            }, this);

            if (!isCheck) {
                if (!(window.location.href.toLowerCase().indexOf("/checkout/") >= 0))
                {
                    console.log("Redirect in here" + window.location.href);
                    iFrameResize({ log: false, autoResize: false });

                    $('#output_frame').hide();
                    $('#loading_frame').show();
                    console.log("Redirect");
                    window.location.href = '/checkout/';
                }
            }
        }
    }
}, false);

function setBasketValue(amount) {
    if (amount.length > 6) {
        amount = amount.slice(6);

        setCookie("basketValue", amount, 60);
        setCookie("basketExists", "true", 60);
        displayBasket();
    }
}

function setBasketItemQuantity(items) {
    setCookie("basketQuantity", items, 60);
    setCookie("basketExists", "true", 60);
    displayBasket();
}

//Disable since there's currently no basket icon
function displayBasket() {
    //console.log("Displaying basket");
    var basketExists = getCookie("basketExists");

    if (basketExists == "true") {
        var items = getCookie("basketQuantity");
        var value = getCookie("basketValue");

        if ((items == "0") || (value == "0")) {
            //$('#basketIcon').addClass("show");
            //$('#basketValue').hide();
        }

        if ((items && value) && (items != "0") && (value != "0")) {
            $('#basketIcon').addClass("show");
            //$('#valueOfBasket').hide();
            //$('#itemsInBasket').html("&nbsp;" + items + " items");
            $('#basketIcon > .items').html(items);
            $('#basketValue').html("&nbsp;£" + value);
            $('#basketValue').addClass("show");
        }
    } else {
        //$('#basketIcon').hide();
        //$('#basketValue').hide();
    }
}

function setCookie(cname, cvalue, exminutes) {
    var d = new Date();
    d.setTime(d.getTime() + (exminutes * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + encodeURIComponent(cvalue) + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return decodeURIComponent(c.substring(name.length, c.length));
        }
    }
    return "";
}