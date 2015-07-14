var http = require('http');

exports.getTags = function(req, res) {

  // console.log(req.params);

  var options = {
    host: 'www.gifbase.com',
    path: '/js/tags.json'
  };

  http.request(options, function(response) {
    var str = '';

    // console.log(response);
    // another chunk of data has been recieved, so append it to `str`
    response.on('data', function (chunk) {
      str += chunk;
    });

    //the whole response has been recieved, so we just print it out here
    response.on('end', function () {
      res.send(str);
    });
  }).end();

};