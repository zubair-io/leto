import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
const Horizon = require('@horizon/client/dist/horizon.js')
//declare var Horizon
    

declare var API_URL: string
export class ResponseTimeService {

    horizon
    speed
    user


    constructor() {
        if (typeof (window) === 'object') {
            let settings = { authType: 'anonymous'}
            if(API_URL !== '/'){
                settings['host'] = API_URL
            }
            this.horizon = Horizon(settings);
            this.speed = this.horizon('speed');
            this.horizon.connect()
        }
    }

    getSpeed(user) {
        return this.speed
            .findAll({ 'owner': user.id })
            .order('datetime', 'descending')
            .limit(1)
            .watch()
    }

    addSpeed(user): Observable<[any]> {
        return this.speed.store({
            'owner': user.id,
            datetime: Date.now(),
        })

    }
    deleteSpeed(id) {
        setTimeout(() => {
            this.speed.remove({ id: id })
        }, 500)
    }
    getUser(): Observable<[any]> {
        return this.horizon.currentUser().fetch()
    }

}


