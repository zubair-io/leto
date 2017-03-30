import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResponseTimeService } from './components/responseTime/responseTime.service';
import { NgRxjsIndexeddbService } from 'ng-rxjs-indexeddb';
import { HorizonService } from './components/horizon/horizon.service';
import { TweetsService } from './components/tweets/tweets.service';
import { BrowserModule } from '@angular/platform-browser';
import { AppSharedModule } from './app.shared.module';
import { AppRouting } from './app.routes';

@NgModule({
    imports: [
        CommonModule,
        AppSharedModule,
    ],
    declarations: [],
    exports: [],
    providers: [
        ResponseTimeService,
        NgRxjsIndexeddbService,
        HorizonService,
        TweetsService
    ]
})
export class CoreModule {

    constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error(
                'CoreModule is already loaded. Import it in the AppModule only');
        }
    }

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: [

            ]
        };
    }
}
