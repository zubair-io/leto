import { AppComponent, AppRouting, } from './';
import { NgModule, Component } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { TimeComponent } from './components/time/time.component';
import { ServerModule } from "@angular/platform-server";
import { BrowserModule } from '@angular/platform-browser';
import { ResponseTimeComponent } from './components/responseTime/responseTime.component';
import { ResponseTimeService } from './components/responseTime/responseTime.service';
import { NgRxjsIndexeddbService } from 'ng-rxjs-indexeddb';
import { TweetsComponent, TweetsService } from './components/tweets';
import { HorizonService } from './components/horizon/horizon.service';


let components = [
    AppComponent,
    HomeComponent,
    ResponseTimeComponent,
    TimeComponent,
    TweetsComponent,
]

@NgModule({
    declarations: components,
    imports: [
        AppRouting,
        BrowserModule.withServerTransition({
            appId: 'Leto'
        }),

    ],
    providers: [
        ResponseTimeService,
        NgRxjsIndexeddbService,
        HorizonService,
        TweetsService,

    ],
    exports: components
})
export class AppSharedModule { }
