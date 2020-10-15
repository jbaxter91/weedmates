$(function () {
    $.ajax({
        url: "/api/matches",
        method: "GET"
    }).then(function (response) {
        console.log(response);
        if (response.length == 0) {
            $("#noUsers").removeClass("d-none")
            console.log(response)
        };
    });
});