import { NgModule, NgZone }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HomeComponent} from './components/home/home.component'
import {ResponseTimeComponent} from './components/responseTime'
import {TimeComponent} from './components/time'
import { AppComponent,  routing}  from './';

@NgModule({
  imports:      [ BrowserModule, routing ],
  declarations: [ AppComponent, HomeComponent, ResponseTimeComponent, TimeComponent ],
  bootstrap:    [ AppComponent ],
  providers: []

})
export class AppModule { }

