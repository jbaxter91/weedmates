$(document).ready(function () {

    $.ajax({
        url: queryURL,
        method: "GET",
        responseType: 'application/json',
    }).then(function (response) {
        console.log(response)
        $("#liked").on(click, function (event) {
            event.preventDefault();
            // not sure if we will need a .html or .prepend
            $("#liked").html()

        });
    });
});