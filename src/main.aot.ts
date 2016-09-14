/// <reference path="./types/serviceworker-webpack-plugin/index.d.ts" />
import { platformBrowser } from '@angular/platform-browser';
import { AppModuleNgFactory } from './app/app.module.ngfactory';
import { enableProdMode } from '@angular/core';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';

enableProdMode();



platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
if ('serviceWorker' in navigator) {
  const registration = runtime.register();
}
