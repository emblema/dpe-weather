# dpe-weather

Develop a weather forecasting application that integrates with the OpenWeatherMap API and Google Maps API. The application should allow users to retrieve weather information for a given location and visualize the weather conditions on a map.

## Definition of done

- user can run the application on their laptop. user can view a html page and input a city name. the application respond to the input (and returns a html page with javacript client side function in it) by providing a map with weather markers in it.
- user can directly send a POST request to the backend service (say http://localhost:3000/post/weather) see the example below
- Implement caching mechanisms to avoid making excessive API calls for repeated requests to the same location within a short time span.
- Provide a user-friendly interface for inputting the location and displaying the weather information.
- Implement error handling for cases such as invalid locations, API failures, or network errors.
- Optimize the application's performance by considering asynchronous operations.
- The application should be well-structured and follow best practices for code organization, modularization, and error handling.
- Write comprehensive unit tests for the backend API endpoints and any critical logic components using a testing framework of your choice (e.g., Mocha, Chai, or Jest).
- Create a README.md to document the API endpoints, including their purpose, required parameters, request/response structures, and any authentication/authorization requirements.
  Include instructions on how to run the application, execute the tests, and obtain the necessary API keys.
  -The application should be self-contained, allowing the developer to run it on their local machine without additional dependencies or external services.

## Requirements:

- Implement a client-side JavaScript function to interact with the server and update the map with weather markers based on the retrieved weather data.
- Implement a Node.js based REST service that serves as the backend for the weather forecasting application.
- Integrate with the OpenWeatherMap API to retrieve weather data for a specified location.
- Integrate with the Google Maps API to visualize the weather conditions on a map.
- Implement the following server endpoints:

```
openapi: 3.0.0
info:
  title: Weather API
  version: 1.0.0
paths:
  /api.weather.local:
    post:
      summary: Get Weather Information
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                location:
                  type: string
                  example: "New York"
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema:
                type: object
                properties:
                  temperature:
                    type: number
                    example: 25.6
                  humidity:
                    type: number
                    example: 65
                  windSpeed:
                    type: number
                    example: 10.5
                  condition:
                    type: string
                    example: "Cloudy"
```

- Also, fetch relevant weather data including temperature, humidity, wind speed, and weather condition.

```
- GET /map:

  - Description: Retrieve a visual map with weather conditions displayed using markers or overlays.

  - Response:

    - Status: 200 OK

    - Body: HTML page displaying the map with weather markers.
```

- Example:

- Request: GET /map

       - Response:

         ```

         <!DOCTYPE html>

         <html>

         <head>

           <title>Weather Map</title>

           <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY"></script>

         </head>

         <body>

           <div id="map" style="width: 100%; height: 400px;"></div>

           <script>

             // JavaScript code to display the map with weather markers

           </script>

         </body>

         </html>

         ```

touch ~/.zshenv

export OPENWEATHER_API_KEY=96ea8b8da35bb1b622afc63ab36ea365
export GOOGLEMAPS_API_KEY=AIzaSyCkjckzJqifOWWxOXHbo3rN9goyz--M-qg

source ~/.zshenv
