import {Component, ElementRef, OnInit} from '@angular/core';
import {ResponseTimeService} from './responseTime.service'


@Component({
    selector: 'response-time',
    templateUrl: './responseTime.html',
    styleUrls: ['./responseTime.scss'],
    providers: [ResponseTimeService]
})

export class ResponseTimeComponent implements OnInit {

    responseTime: number;
    deleteId


    constructor(private _responseTimeService: ResponseTimeService) {

    }
    ngOnInit() {
        this.getUser()
    }
    getUser(){
        console.log('g')
        this._responseTimeService.getUser().subscribe((user)=>{
            console.log(user)
          this.getSpeed(user)
          this.sendSpeed(user)
        })
    }
    getSpeed(user) {
        this._responseTimeService.getSpeed(user).subscribe((speed) => {
            let currentTime = Date.now();
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


