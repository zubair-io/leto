import { Component, ElementRef, OnInit } from '@angular/core';
import { TweetsService } from './tweets.service'

@Component({
    selector: 'tweets',
    templateUrl: './tweets.html',
    styleUrls: ['./tweets.scss'],
})

export class TweetsComponent implements OnInit {

    responseTime: number;
    deleteId
    retry = 5
    tweets
    tweetSubscription

    constructor(private _tweetsService: TweetsService) {

    }

    ngOnInit() {
        this.tweetSubscription = this._tweetsService.getTweets().subscribe((tweets) => {
            this.tweets = tweets
            if (typeof (window) !== 'object') {
                this.disconnect()
            }
        })
    }

    disconnect() {
        this.tweetSubscription.unsubscribe()
        this._tweetsService.disconnect()
    }
}
