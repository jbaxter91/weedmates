$(document).ready(function () {
  const userID = $("#userID").attr("data-id");
  const title_ele = $("#cardTitle");
  const user_description_ele = $("#userDescription");
  const likedBtn = $("#liked");
  const dislikedBtn = $("#disliked");
  const weed_pref_ele = $("#userweedPref");

  console.log(weed_pref_ele);

  rebuildUser();
  likedBtn.on("click", () => {
    $.ajax("/api/ratings", {
      type: "post",
      data: {
        rating: "1",
        initiator_user_id: userID,
        target_user_id: title_ele.attr("data-id"),
      },
    }).then(() => {
      rebuildUser();
    });
  });

  dislikedBtn.on("click", () => {
    $.ajax("/api/ratings", {
      type: "post",
      data: {
        rating: "-1",
        initiator_user_id: userID,
        target_user_id: title_ele.attr("data-id"),
      },
    }).then(() => {
      rebuildUser();
    });
  });
  function rebuildUser() {
    console.log("rebuild start");
    $.ajax("/api/next-user", {
      type: "get",
    }).then(function (result) {
      if (result.username) {
        $("#userPortal").removeClass("d-none");
        title_ele.attr("data-id", result.id);
        title_ele.html(result.username);
        user_description_ele.html(result.description);
        let new_pref_ele = $("<div>").html(result.weed_pref); 
        weed_pref_ele.append(new_pref_ele);
      } else {
        $("#failCont").removeClass("d-none");
        $("#userPortal").addClass("d-none");
      }

      console.log("rebuild finished", result);
    });
  }
});
