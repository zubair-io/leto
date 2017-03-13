import { AppComponent, AppRouting } from './';
import { NgModule, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { TimeComponent } from './components/time/time.component';
import { ServerModule } from "@angular/platform-server";
import { AppSharedModule } from './app.shared.module';
import {APP_BASE_HREF} from '@angular/common';




@NgModule({
  bootstrap: [AppComponent],
  declarations: [ ],
  imports: [
    ServerModule,
    FormsModule,
    AppSharedModule,
  ],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}]
})
export class AppNodeModule { }
