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
  weatherDates = [];
  mockdates = ['now', '+24hrs', '+24hrs', '+24hrs', '+24hrs'];
  desc = [];

  constructor(public weatherService: WeatherService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.city = this.route.snapshot.params['city'];

    this.weatherService.getCurrentWeather(this.city).subscribe(fullInfo => {

      this.temp = fullInfo[0];
      this.weatherDates = fullInfo[1];
      this.desc = fullInfo[2];

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
    },
      error => {
        console.log('error occured', error);
        this.failedToLoad = true;
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
