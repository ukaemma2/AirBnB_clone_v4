$(document).ready(function () {

  const apiUrl = 'http://0.0.0.0:5001/api/v1/places_search/';

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

  // Function to create an article for each place
  function createPlaceArticle(place) {
    return `
      <article>
        <div class="title_box">
          <h2>${place.name}</h2>
          <div class="price_by_night">$${place.price_by_night}</div>
        </div>
        <div class="information">
          <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
          <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
          <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
        </div>
        <div class="description">
          ${place.description}
        </div>
      </article>
    `;
  }

  // Function to update the places in the section.places
  function updatePlaces() {
    $.ajax({
      url: apiUrl,
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({}),
      success: function (data) {
        const placesSection = $('.places');
        placesSection.empty(); // Clear existing content

        data.forEach(function (place) {
          const article = createPlaceArticle(place);
          placesSection.append(article);
        });
      },
      error: function () {
        console.error('Failed to fetch places.');
      }
    });
  }

  // Call the function to update places initially
  updatePlaces();

  // Function to get a list of checked amenity IDs
  function getCheckedAmenityIds() {
    const checkedAmenities = [];
    $('.amenities input[type="checkbox"]:checked').each(function () {
      checkedAmenities.push($(this).data('id'));
    });
    return checkedAmenities;
  }

  // Function to update the places based on checked amenities
  function updatePlaces() {
    const checkedAmenityIds = getCheckedAmenityIds();
    const requestData = { amenities: checkedAmenityIds };

    $.ajax({
      url: apiUrl,
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(requestData),
      success: function (data) {
        const placesSection = $('.places');
        placesSection.empty(); // Clear existing content

        data.forEach(function (place) {
          const article = createPlaceArticle(place);
          placesSection.append(article);
        });
      },
      error: function () {
        console.error('Failed to fetch places.');
      }
    });
  }

  // Call the function to update places when the button is clicked
  $('button').click(updatePlaces);
});
