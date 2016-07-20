import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';


@Component({
    selector: 'time',
    templateUrl: './time.html',
    styleUrls: ['./time.css']
})

export class TimeComponent implements OnInit {

    time: string;

    constructor() { }
    ngOnInit() {
        setInterval(() => {
            this.setTime();
        }, 250)
    }

    setTime() {
        this.time = moment().format('MMMM Do YYYY, h:mm:ss a');
    }
}


