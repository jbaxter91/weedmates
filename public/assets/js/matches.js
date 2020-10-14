$(function () {
    $.ajax({
        url: "http://localhost:9000/api/matches",
        method: "GET"
    }).then(function (response) {
        console.log(response);
        if (response.length == 0) {
            $("#noUsers").removeClass("d-none")
            console.log(response)
        };
    });
});