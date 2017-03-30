import { Component, ElementRef, OnInit } from '@angular/core';
import { ResponseTimeService } from './responseTime.service'
import { NgRxjsIndexeddbService } from 'ng-rxjs-indexeddb';

declare var Auth0: any

@Component({
    selector: 'response-time',
    templateUrl: './responseTime.html',
    styleUrls: ['./responseTime.scss'],
})

export class ResponseTimeComponent implements OnInit {

    responseTime: number;
    deleteId
    retry = 5
    tweets
    tweetSubscription
   

    constructor(private _responseTimeService: ResponseTimeService) {

    }
    
    ngOnInit() {
        if (typeof (window) === 'object') {
          this.getSpeed()   
        }
    }

    getSpeed() {
        this._responseTimeService.getSpeed().subscribe((speed) => {
            let currentTime = performance.timing.navigationStart + performance.now();
            if (speed[0] && speed[0].datetime) {
                this.responseTime = currentTime - speed[0].datetime;
            }

            setTimeout(() => {
                this.sendSpeed()
            }, 6000)
        })
    }

    sendSpeed() {
        this._responseTimeService.addSpeed().subscribe()
    }

    deleteSpeed(id) {
        this._responseTimeService.deleteSpeed(id)
    }

}


