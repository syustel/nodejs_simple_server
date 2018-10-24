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
        //Ok, it's a number
        var number = Number(splitted)
        suma += number
      } else {
        //It's not a number, so we show an error message and sends to the client
        response.writeHead(400, {'Content-Type': 'application/json'})
        response.end(JSON.stringify({result:'error, el input debe ser numerico'}))
      }
    })
    //If everithing was OK, we send code 200 response, using json format
    response.writeHead(200, {'Content-Type': 'application/json'})
    response.end(JSON.stringify({result:suma}))
  }
  else if(data[0] === '/multiplicacion') {
    var producto = 1
    var input = data[1].split('&')
    input.forEach(function(numero) {
      var splitted = numero.split('=')[1]
      if(isNumeric(splitted)) {
        //Ok, it's a number
        var number = Number(splitted)
        producto *= number
      } else {
        //It's not a number, so we show an error message and sends to the client
        response.writeHead(400, {'Content-Type': 'application/json'})
        response.end(JSON.stringify({result:'error, el input debe ser numerico'}))
      }
    })
    //If everithing was OK, we send code 200 response, using json format
    response.writeHead(200, {'Content-Type': 'application/json'})
    response.end(JSON.stringify({result:producto}))
  }
  else if(data[0] === '/fibonacci') {
    var n1 = 0
    var n2 = 1
    var secuencia = []
    var input = data[1].split('&')
    var n = (input[0].split('=')[1])
    if(isNumeric(n)) {
        //Ok, it's a number
        var number = Number(n)
        var i
        for (i = 0; i < n; i++) {
          n2 = n2 + n1
          n1 = n2 - n1
          secuencia.push(n1)
        }
      } else {
        //It's not a number, so we show an error message and sends to the client
        response.writeHead(400, {'Content-Type': 'application/json'})
        response.end(JSON.stringify({result:'error, el input debe ser numerico'}))
      }

    //If everithing was OK, we send code 200 response, using json format
    response.writeHead(200, {'Content-Type': 'application/json'})
    response.end(JSON.stringify({result:secuencia}))
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
