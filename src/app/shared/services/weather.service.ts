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

  getCurrentWeather(city: string): Observable<any> {
    const apiCall = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&APPID=${this.apiKey}`;
    return this.httpClient.get<any>(apiCall).pipe(
      map(resp => {
        const date1 = resp.list[0].dt_txt;
        const date2 = resp.list[8].dt_txt;
        const date3 = resp.list[16].dt_txt;
        const date4 = resp.list[24].dt_txt;
        const date5 = resp.list[32].dt_txt;
        const alldates = [date1, date2, date3, date4, date5];
        // temp
        const temp1 = resp.list[0].main.temp;
        const temp2 = resp.list[8].main.temp;
        const temp3 = resp.list[16].main.temp;
        const temp4 = resp.list[24].main.temp;
        const temp5 = resp.list[32].main.temp;
        const weatherInfo = [temp1, temp2, temp3, temp4, temp5];
        // description
        const des1 = resp.list[0].weather[0].description;
        const des2 = resp.list[8].weather[0].description;
        const des3 = resp.list[16].weather[0].description;
        const des4 = resp.list[24].weather[0].description;
        const des5 = resp.list[32].weather[0].description;
        const fulldesc = [des1, des2, des3, des4, des5];
        // full info we need
        const fullInfo = [weatherInfo, alldates, fulldesc];
        return fullInfo;
      }));
  }



  getLocalWeather(lat: number, lon: number): Observable<any> {
    const apiCall = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&APPID=${this.apiKey}`;
    return this.httpClient.get<any>(apiCall).pipe(
      map(resp => {
        const weatherInfo = resp.list[0].main.temp;
        // description
        const des1 = resp.list[0].weather[0].description;
        // full info we need
        const fullInfo = [weatherInfo, des1];
        return fullInfo;
      }));
  }


}
