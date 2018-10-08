# P.A.W  
Pretty Accurate Weather app 
5 day weather forecast responsive app.
PAW is a Angular project that makes use of the OpenWeatherMap forecast API to retrieve a 5 day weather forecast.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Thought Process for solution
Before diving into the project I wanted to get familiar with the documentation on OpenWeatherMap. The task required to fetch a 5 day forecast but the 16 day/daily forecast was only available for paid accounts.  So I decided to work with the free 5 day / 3 hour forecast api.  I wouldn't need data for every 3 hours so I just fetched the data for every 24 hours to create a 5 day forecast. The information I would want to display would be the temperature in Fahrenheit, the date, and a short description of the weather.   

For the best user experience, I decided for users to search for a city by the city name.  It would also be a better user experience to display an image that matches the description of the weather.  I also wanted to implement a chart graphing out the 5 day temperatures so users can get a better visual of the changes.   
Another key feature that I thought was necessary was to add a favorites list for users to store their favorite cities to gain quick access. 

To help bring these features and functionality to life I decided to use Chart.js and Materialize.   

One tradeoff I had to make was not being able to use navigator.geolocation on an unsecured page.  I originally had the user’s current local temperature display at the top of my app based on their current location. I later found out that google deprecated the navigator.geolocation.getCurrentPosition feature on unsecured pages.   I ultimately decided to take that feature out for version 1.  

Which leads me to possible features and fixes for version 2 of this app.  With more time, I would love to find a way to display weather info based on users location.  Another fix I would want to work on is refactoring and DRYing up my weather service when I map through the API response.  I also want to DRY up the components for displaying the chart and weather icons.  


## Deployed using Amazon EC2
A demo site running this app can be found here:
18.224.151.158
