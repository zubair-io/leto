import { Component, ElementRef, OnInit } from '@angular/core';
import { ResponseTimeService } from './responseTime.service'

declare var Auth0: any

@Component({
    selector: 'response-time',
    templateUrl: './responseTime.html',
    styleUrls: ['./responseTime.scss'],
    providers: [ResponseTimeService]
})

export class ResponseTimeComponent implements OnInit {

    responseTime: number;
    deleteId
    retry = 5
   

    constructor(private _responseTimeService: ResponseTimeService) {

    }
    
    ngOnInit() {
        if (typeof (window) === 'object') {
            this.getUser()        }
    }
   
    getUser() {
        console.log('getUser')
        this._responseTimeService.getUser().subscribe((user) => {
            console.log(user)
            this.getSpeed(user)
            this.sendSpeed(user)
        }, error => {
            this.retry--
            console.log(error)
            if (this.retry) {
                this._responseTimeService.reConnect()
                this.getUser()
            }
        })
    }
    getSpeed(user) {
        this._responseTimeService.getSpeed(user).subscribe((speed) => {
            let currentTime = performance.timing.navigationStart + performance.now();
            if (speed[0] && speed[0].datetime) {
                this.responseTime = currentTime - speed[0].datetime;
            }

            setTimeout(() => {
                this.sendSpeed(user)
            }, 6000)
        })
    }

    sendSpeed(user) {
        this._responseTimeService.addSpeed(user).subscribe()


    }
    deleteSpeed(id) {
        this._responseTimeService.deleteSpeed(id)

    }

}


