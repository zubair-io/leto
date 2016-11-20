import { NgModule, NgZone }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HomeComponent} from './components/home/home.component'
import {ResponseTimeComponent} from './components/responseTime'
import {TimeComponent} from './components/time'
import { AppComponent,  AppRouting}  from './';

@NgModule({
  imports:      [ BrowserModule, AppRouting ],
  declarations: [ AppComponent, HomeComponent, ResponseTimeComponent, TimeComponent ],
  bootstrap:    [ AppComponent ],
  providers: []

})
export class AppModule { }

