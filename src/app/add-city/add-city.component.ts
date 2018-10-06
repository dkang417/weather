import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { Chart } from 'chart.js';



@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.css']
})
export class AddCityComponent implements OnInit {
  newCity: string;
  failed: boolean;
  searching: boolean;
  homecity = '';
  city = '';
  cities = [];
  storageName = 'cities';
  chart = [];
  weatherDates = [];
  mockdates = ['now', '+24hrs', '+24hrs', '+24hrs', '+24hrs'];
  temp = [];
  allInfo = [];
  desc = [];

  constructor(public weatherService: WeatherService) {
    const existingCities = JSON.parse(localStorage.getItem(this.storageName));
    if (existingCities) {
      this.cities = existingCities;
    }
    console.log('Stored cities', this.cities);
   }

  ngOnInit() {
    this.city = 'New York';
    this.weatherService.getCurrentWeather(this.city).subscribe(fullInfo => {

      this.temp = fullInfo[0];
      this.weatherDates = fullInfo[1];
      this.desc = fullInfo[2];

      this.showChart();
    },
      error => {
        console.log('error occured', error);
      });


  }


  saveCity() {
    const city = this.newCity;
    if (!this.cities.includes(city)) {
      this.cities.push(city);
      localStorage.setItem(this.storageName, JSON.stringify(this.cities));
    }
    // this.citySavedService.saveCity(city);
    console.log('this is the city:',  city, 'here are the cities:', this.cities);
  }
  removeCity() {
    const city = this.newCity;
    this.cities = this.cities.filter(c => c.toLocaleLowerCase() !== city.toLocaleLowerCase());
    localStorage.setItem(this.storageName, JSON.stringify(this.cities));
  }
  clearFavorites() {
    this.cities = [];
    localStorage.clear();
  }



  addCity() {
    this.failed = false;
    this.searching = true;
    const city = this.newCity;

    this.weatherService.getCurrentWeather(city).subscribe(weatherInfo => {
      console.log('found the city');
      this.searching = false;
      this.temp = weatherInfo[0];
      this.weatherDates = weatherInfo[1];
      this.desc = weatherInfo[2];



      this.city = this.newCity;
      this.showChart();
    },
      error => {
        console.log('could not add the city');
        this.failed = true;
        this.searching = false;
      });

  }

  showChart() {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: this.mockdates,
        datasets: [
          {
            data: this.temp,
            borderColor: '#FFC0CB',
            backgroundColor: '#0984e3'
          },
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });
  }

  weatherIcon(any) {
    switch (any) {
      case 'light rain':
        return 'wi wi-day-rain';
      case 'shower rain':
        return 'wi wi-day-rain';
      case 'thunderstorm':
        return 'wi wi-day-thunderstorm';
      case 'clear sky':
        return 'wi wi-day-sunny';
      case 'few clouds':
        return 'wi wi-night-partly-cloudy';
      case 'scattered clouds':
        return 'wi wi-day-cloudy';
      case 'broken clouds':
        return 'wi wi-day-cloudy';
      case 'snow':
        return 'wi wi-day-snow';
      default:
        return `wi wi-day-sunny`;
    }
  }


}
