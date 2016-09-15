import {Component} from '@angular/core';

@Component({
    selector: 'app',
   styleUrls: ['./app.scss'],
  templateUrl: './app.html',

})

export class AppComponent {

    constructor() { }

  
}

export class HelloWorld{
    goodBye = 'The should get remove duing tree shaking'
}
