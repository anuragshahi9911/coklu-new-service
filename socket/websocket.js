// WebSocket server
var http = require('http');
var WebSocketServer = require('ws');
const webSocketPort = 1337
var Message = require('../models/message')

var server = http.createServer(function (request, response) {
  // process HTTP request. Since we're writing just WebSockets
  // server we don't have to implement anything.
});
server.listen(webSocketPort, function () {
  console.log(` WebSocketServer is listening on port ${webSocketPort}!`)
});
function createMessage(content, isBroadcast = false, sender = 'NS') {
    return JSON.stringify(new Message(content, isBroadcast, sender));
  }
wsServer = new WebSocketServer.Server({ server });
wsServer.on('connection', function (connection) {
  // This is the most important callback for us, we'll handle
  // all messages from users here.
  // console.log(wsServer.clients)
  connection.on('message', function (msg) {
    const message = JSON.parse(msg);

    setTimeout(() => {
      if (message.isBroadcast) {

        //send back the message to the other clients
        wsServer.clients
          .forEach(client => {
            if (client != connection) {
              client.send(createMessage(message.content, true, message.sender));
            }
          });

      }

      connection.send(createMessage(`You sent -> ${message.content}`, message.isBroadcast));

    }, 1000);
  });
  connection.on('error', (err) => {
    console.warn(`Client disconnected - reason: ${err}`);
  })

  connection.send(createMessage('Hi there, I am a WebSocket server'));
  connection.on('close', function (connection) {
    // close user connection
  });
});

module.exports = wsServer;