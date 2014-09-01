var $ = require('jquery');

var svg = $('#TwitterPathSVG');

var paths = svg.children('path');

var pathsArr = [];

paths.each(function (index, item) {
  pathsArr.push($(item).attr('d'));
});

svg.remove();

module.exports = pathsArr;
