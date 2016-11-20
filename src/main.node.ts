import { TimeComponent } from './app/components/time/time.component';
import { ResponseTimeComponent } from './app/components/responseTime/responseTime.component';
import { HomeComponent } from './app/components/home/home.component';
import { AppComponent, AppRouting } from './app';
import { NgModule, Component } from '@angular/core';
import { UniversalModule } from 'angular2-universal';




@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent, HomeComponent, ResponseTimeComponent, TimeComponent],
  imports: [
    AppRouting,
    UniversalModule,
  ]
})
export class MainModule { }
