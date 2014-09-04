var getTweet = require('../tweetLoader/tweetLoader.js').getTweet;
var eventHandlers = require('./hoverEvents.js');

module.exports = function (paper) {
  var fullStep = 15;
  var step = 1;
  var tweet = getTweet();
  var group = new paper.Group();
  group.onMouseEnter = eventHandlers.changeColor;
  group.onMouseLeave = eventHandlers.resetColor;
  paper.view.onFrame = function (event) {
    var path = paper.project.activeLayer.children[0];
    var point, tangent, item, group, angle, textPoint;

    for (var i = 1; i < paper.project.activeLayer.children.length; i++) {
      group = paper.project.activeLayer.children[i];
      for (var j = 0; j < group.children.length; j ++){
        item = group.children[j];
        item.pathOffset += step;
        if(item.pathOffset >= path.length){
          item.remove();
          if(!group.children.length){
            group.remove();
          }
        } else {
          point = path.getPointAt(item.pathOffset);
          tangent = path.getTangentAt(item.pathOffset).angle;
          if(tangent !== item.rotation){
            angle = tangent - item.rotation
            item.rotate(angle);
          }
          item.position = point;
        }
      }
    }
    if(event.count > 0 && event.count % fullStep === 0){
      if(!tweet || !tweet.textArr.length){
        tweet = getTweet();
        if(tweet){
          group = new paper.Group();
          group.onMouseEnter = eventHandlers.changeColor;
          group.onMouseLeave = eventHandlers.resetColor;
        }
      }
      if(tweet){
        point = path.getPointAt(0);
        tangent = path.getTangentAt(0).angle;
        textPoint = new paper.PointText(point);
        textPoint.rotate(tangent);
        textPoint.fillColor = '#fafcfb';
        textPoint.fontSize = 18;
        textPoint.pathOffset = 0;
        textPoint.content = tweet.textArr.pop();
        group.addChild(textPoint);
      }
        
    }

  }
}