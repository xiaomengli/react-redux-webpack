var express = require('express');
var app = express();
var rootPath = require('path').join(__dirname, '/dist/pages');

app.get('*', function (req, res) {
  var path = 'index.html';
  res.sendfile(path, { root: rootPath });
});


app.listen(2200, function () {
  console.log('Project listening on port 2200!');
});