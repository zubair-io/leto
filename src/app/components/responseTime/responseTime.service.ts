import { Component, OnInit, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as Horizon from '@horizon/client';
import { NgRxjsIndexeddbService } from 'ng-rxjs-indexeddb';
import { HorizonService } from '../horizon/horizon.service';

declare var API_URL: string
@Injectable()
export class ResponseTimeService {
    speed: Horizon.Collection
    settings
    constructor(private ngRxjsIndexeddbService: NgRxjsIndexeddbService, private horizonService: HorizonService) {
        this.speed = this.horizonService.getCollection('speed')



    }

    getSpeed(): Observable<[any]> {
        return this.getUser().switchMap((user) => {
            let query = { 'owner': user.id }
            return this.speed
                .findAll(query)
                .order('datetime', 'descending')
                .limit(1)
                .watch()
        })
    }

    addSpeed(): Observable<[any]> {
        return this.getUser().switchMap((user) => {
            return this.speed.store({
                'owner': user.id,
                'datetime': performance.timing.navigationStart + performance.now(),
            })
        })
    }

    deleteSpeed(id) {
        this.speed.remove({ id: id })
    }

    getUser() {
        return this.horizonService.getUser()
    }

}
