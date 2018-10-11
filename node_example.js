var http = require('http')

var server = http.createServer(function (request, response) {
  var url = request.url
  var data = url.split('?')

  if(data[0] === '/suma') {
    var suma = 0
    var input = data[1].split('&')
    input.forEach(function(numero) {
      var splitted = numero.split('=')[1]
      if(isNumeric(splitted)) {
        var number = Number(splitted)
        suma += number
      } else {
        response.writeHead(400, {'Content-Type': 'application/json'})
        response.end(JSON.stringify({result:'error, el input debe ser numerico'}))
      }
    })
    response.writeHead(200, {'Content-Type': 'application/json'})
    response.end(JSON.stringify({result:suma}))
  }
})

function isNumeric(num) {
  return !isNaN(num)
}

server.listen(8080)
