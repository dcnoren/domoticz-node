var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var mqtt = require('mqtt'), url = require('url');

var mqttoptions = {
    host: "m10.cloudmqtt.com",
    port: 12556,
    username: "soaring",
    password: "password"
};

// Create a client connection
var client = mqtt.connect(mqttoptions);

client.on('connect', function() { // When connected

  // subscribe to a topic
  client.subscribe('domoticz/out', function() {
    // when a message arrives, do something with it
    client.on('message', function(topic, message, packet) {
      console.log("Received '" + message + "' on '" + topic + "'");
      var jsonobj = JSON.parse(message);
      var idx = jsonobj.idx;
      console.log("idx " + idx);
      if (jsonobj.dtype === "Light/Switch") {
           //var idbba = idx.toString();
           
           //var jsonpush = {};
           
           //var abcdef = '{"lights":{"' + idbba + '":{"Status":"On","Level":100,"Type":"Light\/Switch","Name":"' + jsonobj.name + '"}},"meta":{"md5":"a8e2f0b630ad5d9a2dfa7c68a3df3ee3","lightd5":"39d511329000c66158ab327172d647b5","timestamp":"2016-02-15T19:37:59-05:00"}}';
           
           //io.emit('push',abcdef);
           
           var ii = 0;
           
           var annoying = {};
           
           annoying = {
                   "lights":{
                      idx : {
                         Status:"On",
                         Level:100,
                         Type:"Light\/Switch",
                         Name:jsonobj.name
                      }
                   },
                   "meta":{
                      "md5":"a8e2f0b630ad5d9a2dfa7c68a3df3ee3",
                      "lightd5":"39d511329000c66158ab327172d647b5",
                      "timestamp":"2016-02-15T19:37:59-05:00"
                   }
                };
           
           io.emit('push', annoying);
            
            /*io.emit('push', 
                  {
                   "lights":{
                      "55":{
                         "Status":"On",
                         "Level":100,
                         "Type":"Light\/Switch",
                         "Name":"Testing"
                      }
                   },
                   "meta":{
                      "md5":"a8e2f0b630ad5d9a2dfa7c68a3df3ee3",
                      "lightd5":"39d511329000c66158ab327172d647b5",
                      "timestamp":"2016-02-15T19:37:59-05:00"
                   }
                }*/
  
      }
    });
  });

  // publish a message to a topic
  //client.publish('domoticz/out', 'my message', function() {
    //console.log("Message is published");
    //client.end(); // Close the connection when published
  //});
});

app.use(express.static('static'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.emit('push', 
  {
   "lights":{
      "47":{
         "Status":"On",
         "Level":100,
         "Type":"Light\/Switch",
         "Name":"Breakfast Room"
      }
   },
   "meta":{
      "md5":"a8e2f0b630ad5d9a2dfa7c68a3df3ee3",
      "lightd5":"39d511329000c66158ab327172d647b5",
      "timestamp":"2016-02-15T19:37:59-05:00"
   }
}
  );
});

http.listen(80, function(){
  console.log('listening on *:80');
});
