import { AppComponent, AppRouting } from './';
import { NgModule, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { TimeComponent } from './components/time/time.component';
import { ServerModule } from "@angular/platform-server";
import { BrowserModule } from '@angular/platform-browser';
import { ResponseTimeComponent } from './components/responseTime/responseTime.component';
import { ResponseTimeService } from './components/responseTime/responseTime.service';


let components = [
    AppComponent,
    HomeComponent,
    ResponseTimeComponent, 
    TimeComponent,
]

@NgModule({
    
    declarations:components,
    imports: [  
        BrowserModule.withServerTransition({
      appId: 'Leto'
    }),
        AppRouting,
        FormsModule,
    ],
    providers: [
        ResponseTimeService,
        
    ],
    exports: components
})
export class AppSharedModule { }
