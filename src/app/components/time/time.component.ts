import {Component, OnInit} from '@angular/core';
//import * as moment from 'moment';


@Component({
    selector: 'time',
    templateUrl: './time.html',
    styleUrls: ['./time.scss']
})

export class TimeComponent implements OnInit {

    time = new Date()

    constructor() { }
    ngOnInit() {
       
         if (typeof (window) === 'object') {
             setInterval(() => {
                 this.setTime();
             }, 250)
        }
    }

    setTime() {
        //this.time = moment().format('MMMM Do YYYY, h:mm:ss a');
        this.time = new Date()
    }
}


