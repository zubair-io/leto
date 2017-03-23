import { Component, OnInit, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as Horizon from '@horizon/client';
import { NgRxjsIndexeddbService } from 'ng-rxjs-indexeddb';
import { HorizonService } from '../horizon/horizon.service';
import { Subscription } from "rxjs/Subscription";

declare var API_URL: string
@Injectable()
export class TweetsService {

    horizon
    user
    settings
    tweets
    _tweets
    hz: any


    constructor(
        private ngRxjsIndexeddbService: NgRxjsIndexeddbService,
        private horizonService: HorizonService,
    ) {
        this._tweets = this.horizonService.getCollection('tweets')
        this.tweets = this._watchTweets()
    }

  
    getTweets(): Observable<[any]> {

        this._getTweets()       
        if (typeof (window) === 'object') {
            return this.tweets
        } else {
            return this.tweets.take(25).toArray().map((data) => {
                let x = data.map((d) => {
                    if (!d) {
                        return
                    }
                    return d['new_val']
                })
                return x.filter(Boolean)
            })
        }
    }
    private _getTweets():Subscription {
        return this._tweets
            .order('date', 'descending')
            .limit(50)
            .watch().subscribe((tweets) => {
                this.ngRxjsIndexeddbService.set('tweets', tweets)
            })
    }
    private _watchTweets(){
        return this.ngRxjsIndexeddbService.get('tweets')
    }
   
    disconnect() {
        this._getTweets().unsubscribe()
        this.horizonService.disconnect()
       // this.horizon.disconnect()
    }

}


