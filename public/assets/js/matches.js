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
        
      let ulEle = $("<ul class='row'>");
      for (let i = 0; i < response.length; i++) {
        let query = `/api/user-data/${response[i].initiator_user_id}`;
        console.log(query);
        $.get(query).then(function (data) {
          let liEle = $("<button class='col-xs btn-warning'> ");
          let aEle = $("<a>");
          aEle.attr("href", `/${data.username}`);
          aEle.text(data.username);
          liEle.append(aEle);
          ulEle.append(liEle);
          
          
        });
      }
      $("#matchedUser").append(ulEle);
    }
  });
});
