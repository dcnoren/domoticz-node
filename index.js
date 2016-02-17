var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var request = require('request');

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
      //console.log("Received '" + message + "' on '" + topic + "'");
      var jsonobj = JSON.parse(message);
      var idx = jsonobj.idx;
      var idxname = jsonobj.name;
      var status = jsonobj.nvalue;
      var cstatus = "";
      
      if (status === 0){
          cstatus = "Off";
      }
      
      if (status === 1){
          cstatus = "Transition";
      }
      
      if (status === 2){
          cstatus = "On";
      }
      
      if (jsonobj.dtype === "Light/Switch") {
           var abcdef = "";
           var abcdef = '{"lights":{"' + idx + '":{"Status":"' + cstatus + '","Level":100,"Type":"Light\/Switch","Name":"' + idxname + '"}}}';
           var jsonABC = JSON.parse(abcdef);
           io.emit('update',jsonABC);
      }
    });
  });

  
});

app.use(express.static('static'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  
  var url = 'https://davidnoren.com/soaring/ajax/ajax.php?action=getAllStatus';
  initialAPI = request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var APIResponse = JSON.parse(body);
        //console.log("Got a response: ", APIResponse);
        socket.emit('initial', APIResponse);
      } else {
        console.log("Got an error: ", error, ", status code: ", response.statusCode);
      }
  });
  
  
  socket.on('command', function(msg){
    
    function1(funcmsg1) {
        // stuff you want to happen right away
        console.log('message: ' + funcmsg1);
        client.publish('domoticz/in', funcmsg1);
    }
    
    function2(funcmsg2) {
        // all the stuff you want to happen after that pause
        client.publish('domoticz/in', funcmsg2);
    }
    
    // call the first chunk of code right away
    function1(msg);
    
    // call the rest of the code and have it execute after 3 seconds
    setTimeout(function2, 1000, msg);
    
  });
  
  
});

  

http.listen(80, function(){
  console.log('listening on *:80');
});
