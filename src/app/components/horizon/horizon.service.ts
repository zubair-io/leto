import { Component, OnInit, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/switchMap';

import * as Horizon from '@horizon/client';
declare var API_URL: string

@Injectable()
export class HorizonService {
    horizonInstance: Horizon.HorizonInstance
    horizon: any
    user: Observable<{ id: string }>
    constructor() {
        this.connect()
    }
    getHorizon(): Horizon.HorizonInstance {
        return this.horizonInstance
    }
    connect() {
        let settings = { authType: 'anonymous' }
        if (API_URL !== '/') {
            settings['host'] = API_URL
        }
        this.horizon = Horizon
        this.horizonInstance = this.horizon(settings);
        this.horizonInstance.connect()

    }
    disconnect() {
        this.horizonInstance.disconnect()
    }
    reConnect() {
        this.horizonInstance.disconnect()
        this.horizon.clearAuthTokens();
        this.connect()
    }
    getUser(): Observable<{ id: string }> {
        
        if (!this.user) {
            this.user = this.horizonInstance.currentUser()
                .fetch()
                .asObservable()
                .publishReplay(1)
                .refCount()

        }
        return this.user
    }
    getCollection(name): Horizon.Collection {
        return this.horizonInstance(name)
    }


}