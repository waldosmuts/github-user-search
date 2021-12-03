$(document).ready(function () {
    $(".theme-switch__icon-dark").hide();
    $("#search__input").val("octocat");
    $(".header__search").submit();
});

$("#header__theme-switch").click(function (e) {
    e.preventDefault();
    if ($("body").hasClass("light")) {
        $("body").removeClass("light");
        $(".theme-switch__text").text("Light");
        $(".theme-switch__icon-dark").fadeOut(200, () => {
            $(".theme-switch__icon-light").fadeIn(200);
        });

    } else {
        $("body").addClass("light");
        $(".theme-switch__text").text("Dark");
        $(".theme-switch__icon-light").fadeOut(200, () => {
            $(".theme-switch__icon-dark").fadeIn(200);
        });
    }
});

$(".header__search").submit(async function (e) {
    e.preventDefault();
    console.log($("#search__input").val());
    clearCard();
    $(".main__card").addClass("loading");
    await $.getJSON(`https://api.github.com/users/${$("#search__input").val()}`)
        .done(function (data) {
            console.log(data);
            $("#search__input").val("");
            $(".main__card").removeClass("loading");
            populateCard(data);
        })
        .fail(function () {
            alert("Request Failed");
            clearCard();
        })
});

function populateCard(user) {
    $(".avatar__img").attr("src", user.avatar_url);
    user.name ? $(".header__name").removeClass("not-available").text(user.name) : $(".header__name").addClass("not-available").text("Not Available");
    $(".header__username").text(`@${user.login}`);
    $(".header__username").attr("href", user.html_url);
    $(".header__joined").text(`Joined ${new Date(user.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}`);
    user.bio ? $(".card__bio").removeClass("not-available").text(user.bio) : $(".card__bio").addClass("not-available").text("I’m a mysterious individual who has yet to fill out my bio.");
    $(".stats__heading").css("display", "block");
    $(".stats__repos").text(user.public_repos);
    $(".stats__followers").text(user.followers);
    $(".stats__following").text(user.following);
    user.location ? $(".details__location").removeClass("not-available").text(user.location) : $(".details__location").addClass("not-available").text("Not Available");
    user.blog ? $(".details__website").removeClass("not-available").text(user.blog) : $(".details__website").addClass("not-available").text("Not Available");
    user.twitter_username ? $(".details__twitter").removeClass("not-available").text(user.twitter_username) : $(".details__twitter").addClass("not-available").text("Not Available");
    user.company ? $(".details__company").removeClass("not-available").text(user.company) : $(".details__company").addClass("not-available").text("Not Available");
}

function clearCard() {
    $(".avatar__img").attr("src", "");
    $(".header__name").text("");
    $(".header__username").text("");
    $(".header__joined").text("");
    $(".card__bio").text("");
    $(".stats__heading").css("display", "none");
    $(".stats__value").text("");
    $(".details__location").text("");
    $(".details__website").text("");
    $(".details__twitter").text("");
    $(".details__company").text("");
}