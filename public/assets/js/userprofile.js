$(document).ready(function () {
  const userID = $("#userID").attr("data-id");
  const usernameEle = $("#usernameInput");
  const locationEle = $("#locationInput");
  const descEle = $("#descInput");
  const sativaEle = $("#weed1");
  const indicaEle = $("#weed2");
  const hybridEle = $("#weed3");
  const saveBtn = $("#saveBtn");

  renderProfile();

  function renderProfile() {
    $.get("/api/user-data").then(function (data) {
      console.log("Data", data);
      usernameEle.val(data.username);
      locationEle.val(data.city + data.state + data.country);
      descEle.val(data.description);
      let weedPrefs = data.weed_pref.split(",");
      for (let i = 0; i < weedPrefs.length; i++) {
        switch (weedPrefs[i]) {
          case "Indica":
            indicaEle.prop("checked", true);
            break;
          case "Sativa":
            sativaEle.prop("checked", true);
            break;
          case "Hybrid":
            hybridEle.prop("checked", true);
            break;
        }
      }
    });
  }

  saveBtn.on("click", () => {
    console.log("Clicky!");
    let weed_prefs = "";
    if(indicaEle.is(':checked'))
    {
        weed_prefs += "Indica,";
    }
    if(hybridEle.is(':checked'))
    {
        weed_prefs += "Hybrid,";
    }
    if(sativaEle.is(':checked'))
    {
        weed_prefs += "Sativa";
    }
    let userData = {
      id: userID,
      username: usernameEle.val(),
      weed_pref: weed_prefs,
      description: descEle.val(),
    };

    $.ajax({
      url: "/api/user-data",
      type: "PUT",
      data: userData,
      success: function (data) {
      },
      error: function (request, msg, error) {
        console.log(request, msg, error);
      },
    });
  });
});
