import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {


  constructor(private httpClient: HttpClient) { }
  apiKey = '2413eb69409e25db6df9bb397d3d214d';
  unit = 'imperial';

  getCurrentWeather(city: string): Observable<any> {
    const apiCall = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${this.unit}&APPID=${this.apiKey}`;
    console.log('apiCall', apiCall);
    return this.httpClient.get<any>(apiCall).pipe(
      map(resp => {
        console.log('response', resp);
        const date1 = resp.list[0].dt_txt;
        console.log(date1);
        const temp1 = resp.list[0].main.temp;
        const temp2 = resp.list[1].main.temp;
        const temp3 = resp.list[2].main.temp;
        const temp4 = resp.list[3].main.temp;
        const temp5 = resp.list[4].main.temp;

        const weatherInfo = [temp1, temp2, temp3, temp4, temp5];
        console.log(weatherInfo);
        return weatherInfo;
      }));
  }
}
