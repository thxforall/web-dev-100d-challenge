import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import express from 'express'; // const express = require('express');

const app = express();

app.use(
  express.urlencoded({
    extended: false,
  })
);

app.get('/currenttime', function (req, res) {
  res.send('<h1>' + new Date().toISOString() + '</h1>');
}); // localhost:3000/currenttime

app.get('/', function (req, res) {
  res.send(
    '<form action="/store-user" method="POST"><label>Your name: </label><input type="text" name="username" /><button type="submit">Submit</button></form>'
  );
});

app.post('/store-user', function (req, res) {
  const userName = req.body.username;

  const filePath = path.join(__dirname, 'data', 'users.json');

  const fileData = fs.readFileSync(filePath);
  const existingUsers = JSON.parse(fileData);

  existingUsers.push(userName);

  fs.writeFileSync(filePath, JSON.stringify(existingUsers));

  res.send('<h1>Username stored!</h1>');
});

app.get('/users', function (req, res) {
  const filePath = path.join(__dirname, 'data', 'users.json');

  const fileData = fs.readFileSync(filePath);
  const existingUsers = JSON.parse(fileData);

  let responseData = '<ul>';

  for (const user of existingUsers) {
    responseData += '<li>' + user + '</li>';
  }

  responseData += '</ul>';

  res.send(responseData);
});

app.listen(3000);

// function handleRequest(request, response) {
//   if (request.url === '/currenttime') {
//     response.statusCode = 200;
//     response.end();
//   } else if (request.url === '/') {
//     response.statusCode = 200;
//     response.end('');
//   }
// }
// const server = createServer(handleRequest);
// // amazon.com => Send a request to Amazon's server
// // amazon.com:80 / 443
// server.listen(3000);
