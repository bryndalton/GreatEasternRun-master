//Donation widget
function scrollToNext(el) {
    $('html, body').stop().animate({
        scrollTop: el.offset().top - 120//header height
    }, 1000);
}

$(".whoWeAre .projectItem .clickHere").on("click", function () {
    var parent = $(this).parents(".projectItem");
    parent.addClass("selected");

    //Remove class from others
    parent.siblings().removeClass("selected").find(".clickHere:not(:visible)").fadeIn();

    var next = $(".whoWeAre [data-step=2]");

    //Show text
    next.find(".projectText[data-id='" + parent.data("id") + "']").show().siblings(".projectText").hide();

    //Next step
    next.fadeIn();
    scrollToNext(next);
});

$(".whoWeAre .donationInfo").find(".next").on("click", function (e) {
    e.preventDefault();

    //Next step
    scrollToNext($(".whoWeAre [data-step=3]").fadeIn());
});

//When other is selected focus on the number input
$(".whoWeAre [name='DonationAmount']").on("change", function () {
    if ($(this).val() === "donateOther")
        other.focus();
});

$(".whoWeAre form:not(#simForm)").on("submit", function (e) {
    e.preventDefault();

    //Gather inputs
    var steps = $("form:not(#simForm) input:not([type=radio]), form:not(#simForm) select, form:not(#simForm) input[type=radio]:checked").get().reduce(function (prev, cur, index, arr) {
        cur = $(cur);

        if (cur.attr("name"))
            prev[cur.attr("name")] = cur.is("[type=checkbox]") ? cur.is(":checked") ? true : false : cur.val();

        return prev;

    }, {});

    //Fix donation amount
    if (steps.DonationAmount === "donateOther")
        steps.DonationAmount = parseInt(steps.DonationAmountOther);
    else
        steps.DonationAmount = parseInt(steps.DonationAmount.split("donate")[1]);
    delete steps.DonationAmountOther;

    //Combine name
    steps.FullName = [steps.Title, steps.FirstName, steps.LastName].join(" ");
    delete steps.Title;
    delete steps.FirstName;
    delete steps.LastName;

    //Set selected project id
    steps.Project = $(".whoWeAre .projectItem.selected").data("id");

    $.ajax({
        type: "POST",
        url: "/umbraco/surface/Donation/Persist",
        data: JSON.stringify(steps),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $("#simForm #ref").val(data.TransRef);
            $("#simForm #requid").val(data.TransUid);
            $("#simForm #amt").val(steps.DonationAmount);
            $("#simForm #cust_email").val(steps.EmailAddress);
            $("#simForm #accountName").val(steps.FullName);
            $("#simForm").submit();
        }
    });
});

if ($("body").hasClass("advancedPage") && $(".whoWeAre").length > 0) {
    $.ajax({
        type: "POST",
        url: "/umbraco/surface/Donation/Retrieve",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data.DataValid) {
                $(".whoWeAre .projectItem[data-id=" + data.Project + "]").addClass("selected");
                $(".whoWeAre [data-step]").fadeIn();

                //Split name out
                var name = data.FullName.split(" ");
                data.Title = name[0];
                data.FirstName = name[1];
                data.LastName = name[2];

                var checked = $("[id='donate" + data.DonationAmount + "']").attr("checked", true);

                if (checked.length <= 0) {
                    $("[id='donateOther']").attr("checked", true);
                    $("[name='DonationAmountOther']").val(data.DonationAmount);
                }

                $("form:not(#simForm) input, form:not(#simForm) select").each(function () {
                    var match = data[$(this).attr("name")];
                    if(match)
                        $(this).val(match);
                });
            }
        }
    });
}