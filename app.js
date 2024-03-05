import { createServer } from 'http'; // const http = require('http')

function handleRequest(request, response) {
  if (request.url === '/currenttime') {
    response.statusCode = 200;
    response.end('<h1>' + new Date().toISOString() + '</h1>');
  } else if (request.url === '/') {
    response.statusCode = 200;
    response.end('<h1>Hello World!</h1>');
  }
}

const server = createServer(handleRequest);
// amazon.com => Send a request to Amazon's server
// amazon.com:80 / 443
server.listen(3000);
