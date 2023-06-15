var map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
}

// Function to update the map with new markers
function updateMap(location, weatherData) {
  // Extract the necessary weather information from the weatherData object
  const { temperature, humidity, windSpeed, weatherCondition, coord } =
    weatherData;

  // Center the existing map at the searched location
  map.setCenter(new google.maps.LatLng(coord.lat, coord.lon));

  // Clear the map before adding new markers
  map.data.forEach((marker) => marker.setMap(null));

  // Create a marker for the searched location
  var locationMarker = new google.maps.Marker({
    position: { lat: coord.lat, lng: coord.lon },
    map: map,
    title: location,
  });

  // Create an info window to display weather information
  var infoWindow = new google.maps.InfoWindow();

  // Format the weather information to be displayed in the info window
  var weatherInfo = `
  <h3>${location.name}</h3>
  <p><strong>Temperature:</strong> ${temperature}°C</p>
  <p><strong>Humidity:</strong> ${humidity}%</p>
  <p><strong>Wind Speed:</strong> ${windSpeed} km/h</p>
  <p><strong>Weather Condition:</strong> ${weatherCondition}</p>
`;

  // Add a click event listener to the location marker to open the info window
  locationMarker.addListener('click', () => {
    infoWindow.setContent(weatherInfo);
    infoWindow.open(map, locationMarker);
  });
}

// Submit button click handler will call this function to fetch weather data from /api/weather endpoint
function submitHandler(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  var location = document.getElementById('locationInput').value;
  var options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ location }),
  };

  fetch('/api/weather', options)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Something went wrong');
      }
    })
    .then((data) => {
      updateMap(location, data);
    })
    .catch((error) => {
      console.log(error);
    });
}

document.getElementById('searchForm').addEventListener('submit', submitHandler);
