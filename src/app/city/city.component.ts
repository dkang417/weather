import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../shared/services';
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
  weatherDates = [];
  desc = [];
  failed: boolean;
  chart = [];
  chartDates = ['now', '+24hrs', '+24hrs', '+24hrs', '+24hrs'];


  constructor(public weatherService: WeatherService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.failed = false;
    this.city = this.route.snapshot.params['city'];

    this.weatherService.getCurrentWeather(this.city).subscribe(fullInfo => {
      this.temp = fullInfo[0];
      this.weatherDates = fullInfo[1];
      this.desc = fullInfo[2];

      // weather chart
      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: this.chartDates,
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

    },
      error => {
        console.log('error occured', error);
        this.failed = true;
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
