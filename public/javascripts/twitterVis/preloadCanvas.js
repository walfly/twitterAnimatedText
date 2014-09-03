var getTweet = require('../tweetLoader/tweetLoader.js').getTweet;
var eventHandlers = require('./hoverEvents.js');

module.exports = function (paper, path) {
  var totalOffset = 0;
  var tweet = getTweet();
  var step = 15;
  var point, tangent, group, angle, textPoint;
  while(totalOffset < path.length){
    group = new paper.Group();
    group.onMouseEnter = eventHandlers.changeColor;
    group.onMouseLeave = eventHandlers.resetColor;
    for(var i = 0; i < tweet.textArr.length; i ++){
      if(totalOffset > path.length){
        continue;
      }
      point = path.getPointAt(totalOffset);
      tangent = path.getTangentAt(totalOffset).angle;
      textPoint = new paper.PointText(point);
      textPoint.rotate(tangent);
      textPoint.fillColor = 'black';
      textPoint.fontSize = 18;
      textPoint.pathOffset = totalOffset;
      textPoint.content = tweet.textArr[i];
      group.addChild(textPoint);
      totalOffset += step;
    }
    tweet = getTweet();
  }
};