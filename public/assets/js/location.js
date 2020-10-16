$(document).ready(function () {
  const userID = $("#userID").attr("data-id");
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function success(pos) {
    var crd = pos.coords;

    let query = `/api/user-data/${userID}`;
    console.log("Location.js", query);
    $.get(query)
      .then(function (data) {
        data.lat = crd.latitude;
        data.lon = crd.longitude;
        $.ajax({
          url: "/api/user-data",
          type: "PUT",
          data: data,
          success: function (result) {
            // Do something with the result
            console.log(result);
          },
        });
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  navigator.geolocation.getCurrentPosition(success, error, options);
});
