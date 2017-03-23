import { AppComponent } from './';
import { NgModule, Component } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { TimeComponent } from './components/time/time.component';
import { ServerModule } from "@angular/platform-server";
import { AppSharedModule } from './app.shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './app.core.module';
import { APP_BASE_HREF } from "@angular/common";




@NgModule({
  bootstrap: [AppComponent],
  declarations: [ ],
  imports: [
    CoreModule.forRoot(),
    AppSharedModule,
    ServerModule,
  ],
  providers:[
       { provide: APP_BASE_HREF, useValue: '/'}
  ]
})
export class AppNodeModule { }
