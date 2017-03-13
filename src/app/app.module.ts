import { NgModule, NgZone } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRouting } from './';
import { AppComponent } from './app.component';
import { AppSharedModule } from './app.shared.module';



@NgModule({
  imports: [
    AppSharedModule,
    AppRouting,
  ],
  declarations: [],
  bootstrap: [AppComponent],
  providers: [
  ]

})
export class AppModule { }

