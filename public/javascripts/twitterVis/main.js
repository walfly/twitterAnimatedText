var paper = require('paper');
var $ = require('jquery');

// load first tweets
var setTerm = require('../tweetLoader/tweetLoader.js').setTerm;
var getTweet = require('../tweetLoader/tweetLoader.js').getTweet;
var loadTweets = require('../tweetLoader/tweetLoader.js').loadTweets;
var preload = require('./preloadCanvas.js');
var setupEvent = require('./setUpEvent.js');

setTerm('paint');
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

  promise.done(function () {
    preload(paper, path);
    setupEvent(paper);
  });


  // var tweet;
  // var group;
  // var distance;
  // var pathFull = false;
  // var renderFunction = function (event){
  //   if(tweet  && tweet.textArr.length){
  //     var path = paper.project.activeLayer.children[0];
  //     var step = 15;
  //     var point, tangent, item, group, angle;

  //     for (var i = 1; i < paper.project.activeLayer.children.length; i++) {
  //       group = paper.project.activeLayer.children[i];
  //       for (var j = 0; j < group.children.length; j ++){
  //         item = group.children[j];
  //         item.pathOffset += step;
  //         if(item.pathOffset >= path.length){
  //           pathFull = true;
  //           item.remove();
  //         } else {
  //           point = path.getPointAt(item.pathOffset);
  //           tangent = path.getTangentAt(item.pathOffset).angle;
  //           angle = tangent - item.rotation
  //           item.position = point;
  //           item.rotate(angle);
  //         }
  //       }
  //     }

  //     point = path.getPointAt(0);
  //     tangent = path.getTangentAt(0).angle;
  //     var textPoint = new paper.PointText(point);
  //     textPoint.rotate(tangent);
  //     textPoint.fillColor = 'black';
  //     textPoint.fontSize = 18;
  //     textPoint.pathOffset = 0;
  //     textPoint.content = tweet.textArr.pop();
  //     group.addChild(textPoint);
  //   } else {
  //     tweet = getTweet();
  //     group = (tweet !== undefined) ? new paper.Group() : undefined;
  //     if(group){
  //       group.onMouseEnter = changeColor;
  //       group.onMouseLeave = resetColor;
  //     }
  //   }
  // };

});

