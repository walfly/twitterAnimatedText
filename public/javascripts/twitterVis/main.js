var paper = require('paper');
var text = 'this is some test text to try and map to an arc, put a lot more in it to test animation';
var textArr = text.split(' ');
var objectArr = [];
textArr.forEach(function (item, index) {
  objectArr.push({
    arr: item.split(''),
    name: item
  });
});

console.log(objectArr);

var changeColor = function (event) {
  this.fillColor = 'red';
};

var resetColor = function (event) {
  this.fillColor = 'black';
}

window.onload = function() {
  var svg = require('./svgConsumer.js');
  // Get a reference to the canvas object
  var canvas = document.getElementById('myCanvas');
  // Create an empty project and a view for the canvas:
  paper.setup(canvas);

  var path = new paper.Path(svg[1]);
  path.visible = false;
  var offset = 8;
  var point, textPoint, tangent, group;
  for(var i = 0; i < objectArr.length; i ++){
    group = new paper.Group();
    group.name = objectArr[i].name;
    for(var j = 0; j < objectArr[i].arr.length; j ++){
      point = path.getPointAt(offset * (i * j));
      tangent = path.getTangentAt(offset * (i * j)).angle;
      textPoint = new paper.PointText(point);
      textPoint.pathOffset = offset * (i * j);
      textPoint.justification = 'center';
      textPoint.fillColor = 'black';
      textPoint.content = objectArr[i].arr[j];
      textPoint.rotate(tangent);
      group.addChild(textPoint);
    }
    group.onMouseEnter = changeColor;
    group.onMouseLeave = resetColor;
  }
  console.log(paper.project.activeLayer.children);
  paper.view.onFrame = function (event){
    var path = paper.project.activeLayer.children[0];
    var step = path.length/2000;
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
          angle = tangent - item.rotation
          item.position = point;
          item.rotate(angle);
        }
      }
    }
  }

}

