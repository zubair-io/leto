import {Component, OnInit, Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import Horizon from '@horizon/client';

declare var API_URL: string
@Injectable()
export class ResponseTimeService {

    horizon
    speed
    user
    settings
    

    constructor() {
        if (typeof (window) === 'object') {
            this.settings = { authType: 'anonymous' }
            if (API_URL !== '/') {
                this.settings['host'] = API_URL
            }
            this.connect()
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
            'datetime': performance.timing.navigationStart + performance.now(),
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
    connect(){
            this.horizon = Horizon(this.settings);
            this.speed = this.horizon('speed');
            this.horizon.connect()
    }
    reConnect() {
        this.horizon.disconnect()
        Horizon.clearAuthTokens();
        this.connect()
    }

}


