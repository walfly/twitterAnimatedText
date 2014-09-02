module.exports = function (paper) {
  var tweet, group;
  var fullStep = 15;
  var step = 5;
  paper.view.onFrame = function (event) {
    var path = paper.project.activeLayer.children[0];
    var point, tangent, item, group, angle;

    for (var i = 1; i < paper.project.activeLayer.children.length; i++) {
      group = paper.project.activeLayer.children[i];
      for (var j = 0; j < group.children.length; j ++){
        item = group.children[j];
        item.pathOffset += step;
        if(item.pathOffset >= path.length){
          item.remove();
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

  }
}