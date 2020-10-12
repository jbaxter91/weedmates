$(document).ready(function () {

    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };

      function success(pos) {
        var crd = pos.coords;
      
        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);

        $.get("/api/user-data")
        .then(function(data) {
          console.log(data);
          data.lat = crd.latitude;
          data.lon = crd.longitude;
          $.ajax({
            url: '/api/user-data',
            type: 'PUT',
            data: data,
            success: function(result) {
                // Do something with the result
                console.log(result);
            }
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
  