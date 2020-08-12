'use strict';
import allTweets from './uw_ischool_tweets';
const tweetArray = allTweets.map((tweetObj) => {
    let mappedObj = {
        text: tweetObj.text, 
        timestamp: Date.parse(tweetObj.created_at)
    }
    return mappedObj;
});
tweetArray.sort((tweet1, tweet2) => {
    return tweet2.timestamp - tweet1.timestamp
});
export function getRecentTweets() {
    return tweetArray.slice(0, 5);
}
export function searchTweets(text) {
    let results = tweetArray.filter((tweetObj) => {
    return (tweetObj.text.toLowerCase().indexOf(text.toLowerCase()) >= 0)
    });
    return results;
}
