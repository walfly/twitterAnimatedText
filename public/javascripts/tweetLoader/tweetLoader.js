var Q = require('q');
var $ = require('jquery');

var tweets = [];
var requesting = false;
var latest;
var term;

var setTweets = function (res) {
  requesting = false;
  tweets = res.statuses;
  latest = res.latest;
};

exports.setTerm = function (searchTerm) {
  term = searchTerm;
};

exports.loadTweets = function () {
  if(!requesting){
    requesting = true;
    var data = {
      search: term
    };
    if(latest){
      data.latest = latest;
    }
    promise = Q($.ajax({
      url:'/api/tweets',
      type: 'GET',
      dataType: 'json',
      data: data
    })).then(setTweets);
    return promise;
  }
};

exports.getTweet =  function () {
  if (tweets.length) {
    return tweets.pop();
  } else {
    exports.loadTweets();
    return false;
  }
};
