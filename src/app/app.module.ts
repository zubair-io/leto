import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HomeComponent} from './components/home'
import { AppComponent, routing }  from './';

@NgModule({
  imports:      [ BrowserModule, routing],
  declarations: [ AppComponent, HomeComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
