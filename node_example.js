const http = require('http')
const url = require('url')

var server = http.createServer(function (request, response) {
  const parsedUrl = url.parse(request.url, true)

  if(parsedUrl.pathname === '/suma') {
    var suma = 0
    for (var propName in parsedUrl.query) {
        var splitted = parsedUrl.query[propName]
        if(isNumeric(splitted)) {
          //Ok, it's a number
          var number = Number(splitted)
          suma += number
        } else {
          //It's not a number, so we show an error message and sends to the client
          response.writeHead(400, {'Content-Type': 'application/json'})
          response.end(JSON.stringify({result:'error, el input debe ser numerico'}))
        }
    }
    //If everithing was OK, we send code 200 response, using json format
    response.writeHead(200, {'Content-Type': 'application/json'})
    response.end(JSON.stringify({result:suma}))
  }
})

/**
 ** isNumeric returns true if input is a number. This can be done using the oppsite behaviour from isNaN function
 **/
function isNumeric(num) {
  //isNaN returns false if the input is a number, true otherwise
  return !isNaN(num)
}

server.listen(8080)
