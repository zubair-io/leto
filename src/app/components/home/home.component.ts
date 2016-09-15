import {Component} from '@angular/core';
//import {TimeComponent} from '../time'
//import {ResponseTimeComponent} from '../responseTime'

@Component({
    selector: 'home',
    templateUrl: './home.html',
    styleUrls: ['./home.scss'],

})

export class HomeComponent {

    currentWord = -1
    words = ['web', 'mobile', 'desktop', 'console', 'iot']
    timmer = 1500
    constructor() { }

    ngOnInit() {
        if (typeof (window) === 'object') {
            this.startWordshow()
        }
    }
    startWordshow() {
        let nextWord = this.currentWord + 1
        if (nextWord === this.words.length) {
            nextWord = 0
        }
        this.currentWord = nextWord;
        setTimeout(() => {
            this.startWordshow()
        }, this.timmer)
    }
}


export class Cats {
    bob = 'Hockey'
    constructor() { }
}
