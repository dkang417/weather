import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CityComponent } from './city/city.component';
import { LandingComponent } from './landing/landing.component';
import { AddCityComponent } from './add-city/add-city.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { NotfoundComponent } from './notfound/notfound.component';

import * as fromShared from './shared';


@NgModule({
  declarations: [
    ...fromShared.declarations,
    AppComponent,
    CityComponent,
    LandingComponent,
    AddCityComponent,
    FavoritesComponent,
    NotfoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [...fromShared.providers],
  bootstrap: [AppComponent]
})
export class AppModule { }
