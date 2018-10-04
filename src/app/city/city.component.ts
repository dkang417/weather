import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  city = '';
  temp = [];
  failedToLoad: boolean;
  chart = [];
  weatherDates = ['monday', 'tuesday', 'wed', 'thurs', 'fri'];

  constructor(public weatherService: WeatherService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.city = this.route.snapshot.params['city'];

    this.weatherService.getCurrentWeather(this.city).subscribe(weatherInfo => {
      // this.weather = weatherInfo.weather.description;
      this.temp = weatherInfo;


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
        console.log('error occured', error);
        this.failedToLoad = true;
      });



  }
}
