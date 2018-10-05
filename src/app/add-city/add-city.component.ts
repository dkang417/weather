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
  // passed: boolean;
  searching: boolean;

  city = '';
  chart = [];
  weatherDates = [];
  mockdates = ['now', '+24hrs', '+24hrs', '+24hrs', '+24hrs'];
  temp = [];
  allInfo = [];
  desc = [];
  constructor(public weatherService: WeatherService) { }

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

      // this.passed = true;
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

}
