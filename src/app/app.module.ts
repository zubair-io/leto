import { NgModule, NgZone } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppSharedModule } from './app.shared.module';
import { NgRxjsIndexeddbService } from 'ng-rxjs-indexeddb';
import { HorizonService } from './components/horizon/horizon.service';
import { TweetsService } from './components/tweets/tweets.service';
import { ResponseTimeService } from './components/responseTime/responseTime.service';
import { CoreModule } from './app.core.module';



@NgModule({
  imports: [
    AppSharedModule,
    CoreModule.forRoot()
  ],
  declarations: [],
  bootstrap: [AppComponent],
  providers: [
    
  ]

})
export class AppModule { }

