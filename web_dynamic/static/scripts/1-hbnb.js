$(document).ready(function () {
  const selectedAmenities = {};

  // Listen for changes on amenity checkboxes
  $('input[type="checkbox"][data-id]').change(function () {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');

    if ($(this).is(':checked')) {
      selectedAmenities[amenityId] = amenityName;
    } else {
      delete selectedAmenities[amenityId];
    }

    // Update the h4 tag with the list of selected amenities
    updateAmenitiesList();
  });

  function updateAmenitiesList() {
    const amenitiesArray = Object.values(selectedAmenities);
    let amenitiesList = amenitiesArray.join(', ');

    // Truncate the list with three dots if it's over 24 characters
    if (amenitiesList.length > 31) {
      amenitiesList = amenitiesList.slice(0, 31) + '...';
    }

    $('.amenities h4').text(amenitiesList);
  }
});
