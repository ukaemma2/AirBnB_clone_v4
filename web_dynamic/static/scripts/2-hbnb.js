$(document).ready(function () {
  const apiUrl = 'http://0.0.0.0:5001/api/v1/status/';

  // Function to update the status based on the API response
  function updateApiStatus() {
    $.get(apiUrl, function (data) {
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    }).fail(function () {
      $('#api_status').removeClass('available');
    });
  }

  // Call the function to update the status initially
  updateApiStatus();

  // Set an interval to periodically update the status
  setInterval(updateApiStatus, 5000); // Update every 5 seconds
});
