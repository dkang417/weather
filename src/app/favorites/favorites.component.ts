import { Component} from '@angular/core';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent  {

  newCity: string;
  city = '';
  cities = [];
  storageName = 'cities';

  constructor() {
    const existingCities = JSON.parse(localStorage.getItem(this.storageName));
    if (existingCities) {
      this.cities = existingCities;
    }
  }

  saveCity() {
    const city = this.newCity;
    if (!this.cities.includes(city)) {
      this.cities.push(city);
      localStorage.setItem(this.storageName, JSON.stringify(this.cities));
    }
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

}

