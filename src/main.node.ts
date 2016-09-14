import { TimeComponent } from './app/components/time/time.component';
import { ResponseTimeComponent } from './app/components/responseTime/responseTime.component';
import { HomeComponent } from './app/components/home/home.component';
import { AppComponent, routing } from './app';
import { NgModule, Component } from '@angular/core';
import { UniversalModule } from 'angular2-universal';
 


export function main(config) {

  @NgModule({
    bootstrap: [ AppComponent ],
    declarations: [ AppComponent, HomeComponent, ResponseTimeComponent, TimeComponent ],
    imports: [
      routing,
      UniversalModule.withConfig({
        document: config.document,
        originUrl: 'http://localhost:3000',
        baseUrl: '/',
        requestUrl: '/',
        preboot: false,
        //preboot: { appRoot: ['app'], uglify: true },
      }),
    ]
  })
  class MainModule {}

  return MainModule
};
