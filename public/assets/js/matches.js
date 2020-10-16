$(function () {
  $.ajax({
    url: "/api/matches",
    method: "GET",
  }).then(function (response) {
    console.log(response);
    if (response.length == 0) {
        $("#noUsers").removeClass("d-none");
    }
    else{
        console.log(response[0].User.username);
      let ulEle = $("<ul>");
      for (let i = 0; i < response.length; i++) {
        let liEle = $("<li>");
        let aEle = $("<a>");
        aEle.attr("href", `/${response[i].User.username}`);
        aEle.text(response[i].User.username);
        liEle.append(aEle);
        ulEle.append(liEle);
      }
      $("#matchedUser").append(ulEle);
    }
  });
});
