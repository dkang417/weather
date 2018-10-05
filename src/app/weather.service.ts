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
    console.log('apiCall', apiCall);
    return this.httpClient.get<any>(apiCall).pipe(
      map(resp => {
        console.log('response', resp);
        resp.list.map(res => res.dt);
        // dates
        const date1 = resp.list[0].dt;
        const date2 = resp.list[8].dt;
        const date3 = resp.list[16].dt;
        const date4 = resp.list[24].dt;
        const date5 = resp.list[32].dt;
        const jsdate1 = new Date(date1 * 1000);
        jsdate1.toLocaleTimeString('en', { year: '2-digit', month: 'short', day: 'numeric' });
        const jsdate2 = new Date(date1 * 1000);
        jsdate1.toLocaleTimeString('en', { year: '2-digit', month: 'short', day: 'numeric' });
        const jsdate3 = new Date(date2 * 1000);
        jsdate1.toLocaleTimeString('en', { year: '2-digit', month: 'short', day: 'numeric' });
        const jsdate4 = new Date(date3 * 1000);
        jsdate1.toLocaleTimeString('en', { year: '2-digit', month: 'short', day: 'numeric' });
        const jsdate5 = new Date(date4 * 1000);
        jsdate1.toLocaleTimeString('en', { year: '2-digit', month: 'short', day: 'numeric' });
        const alldates = [];
        alldates.push(jsdate1, jsdate2, jsdate3, jsdate4, jsdate5);

        // temp
        const temp1 = resp.list[0].main.temp;
        const temp2 = resp.list[1].main.temp;
        const temp3 = resp.list[2].main.temp;
        const temp4 = resp.list[3].main.temp;
        const temp5 = resp.list[4].main.temp;
        const weatherInfo = [temp1, temp2, temp3, temp4, temp5];

        // description
        const des1 = resp.list[0].weather[0].description;
        const des2 = resp.list[1].weather[0].description;
        const des3 = resp.list[2].weather[0].description;
        const des4 = resp.list[3].weather[0].description;
        const des5 = resp.list[4].weather[0].description;
        const fulldesc = [des1, des2, des3, des4, des5];
        const cityname = resp.city.name;
        const fullInfo = [weatherInfo, alldates, fulldesc, cityname];


        return fullInfo;
      }));
  }
}
