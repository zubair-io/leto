import { TimeComponent } from './app/components/time/time.component';
import { ResponseTimeComponent } from './app/components/responseTime/responseTime.component';
import { HomeComponent } from './app/components/home/home.component';
import { AppComponent, AppRouting } from './app';
import { NgModule, Component } from '@angular/core';
import { UniversalModule } from 'angular2-universal';
import { FormsModule } from '@angular/forms';




@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent, HomeComponent, ResponseTimeComponent, TimeComponent, ],
  imports: [
    AppRouting,
    UniversalModule,
    FormsModule,
  ],
  providers:[]
})
export class MainModule { }
