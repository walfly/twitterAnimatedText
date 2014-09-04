var paper = require('paper');
var $ = require('jquery');

// load first tweets
var setTerm = require('../tweetLoader/tweetLoader.js').setTerm;
var getTweet = require('../tweetLoader/tweetLoader.js').getTweet;
var loadTweets = require('../tweetLoader/tweetLoader.js').loadTweets;
var preload = require('./preloadCanvas.js');
var setupEvent = require('./setUpEvent.js');

setTerm('boats');
var promise = loadTweets();

var changeColor = function (event) {
  this.fillColor = 'red';
};

var resetColor = function (event) {
  this.fillColor = 'black';
}

$(function () {

  var svg = require('./svgConsumer.js');
  // Get a reference to the canvas object
  var canvas = document.getElementById('myCanvas');
  // Create an empty project and a view for the canvas:
  paper.setup(canvas);
  // load svg path from svg
  var path = new paper.Path(svg[0]);
  path.visible = false;

  var fitContainer = function () {
    var $canvas = $(paper.project.view.element);
    var $parent = $canvas.parent();
    var width = $parent.width() * 0.75;
    var height = $parent.height();
    var size = new paper.Size(width, height);
    paper.project.view.setViewSize(size); 
    // var canvas = paper.project;
    // var parent = canvas.parentNode;
  };

  promise.done(function () {
    preload(paper, path);
    setupEvent(paper);
    fitContainer();
  });

});

