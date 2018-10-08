import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../shared/services';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  temp = [];
  desc = [];
  lat: number;
  lon: number;
  available: boolean;

  constructor(public weatherService: WeatherService) { }

  ngOnInit() {
    this.available = false;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lon = position.coords.longitude;
        this.weatherService.getLocalWeather(this.lat, this.lon).subscribe(fullInfo => {
          this.temp = fullInfo[0];
          this.desc = fullInfo[1];
          this.available = true;
        },
          error => {
            console.log('error occured', error);
          });
     });
   } else {
      this.available = false;
   }
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
