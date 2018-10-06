import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CityComponent } from './city/city.component';
import { LandingComponent } from './landing/landing.component';
import { AddCityComponent } from './add-city/add-city.component';
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LandingComponent,
    children: []
  },

  {
    path: 'city/:city',
    pathMatch: 'full',
    component: CityComponent,
    children: []
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
