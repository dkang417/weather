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
  passed: boolean;
  searching: boolean;

  city = '';
  temp = [];
  chart = [];
  weatherDates = ['monday', 'tuesday', 'wed', 'thurs', 'fri'];

  constructor(public weatherService: WeatherService) { }

  ngOnInit() {
  }
  addCity() {
    this.failed = false;
    this.searching = true;
    const city = this.newCity;

    this.weatherService.getCurrentWeather(city).subscribe(weatherInfo => {
      console.log('found the city');
      this.searching = false;
      // this.weather = weatherInfo.weather.description;
      this.temp = weatherInfo;
      this.passed = true;
      this.city = this.newCity;

      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: this.weatherDates,
          datasets: [
            {
              data: this.temp,
              borderColor: '#ffcc00',

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

    },
      error => {
        console.log('could not add the city');
        this.failed = true;
        this.searching = false;
      });
  }

}
