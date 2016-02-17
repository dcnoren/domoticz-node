var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var request = require('request');
var mqtt = require('mqtt'), url = require('url');

app.use(express.static('static'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var mqttOptions = {
    host: "m10.cloudmqtt.com",
    port: 12556,
    username: "soaring",
    password: "password"
};

// Create a client connection
var mqttClient = mqtt.connect(mqttOptions);

mqttClient.on('connect', function() {
    // subscribe to a topic
    mqttClient.subscribe('domoticz/out', function() {
        // when a message arrives, do something with it
        mqttClient.on('message', function(topic, message, packet) {
            //console.log("Received '" + message + "' on '" + topic + "'");
            var jsonobj = JSON.parse(message);
            var idx = jsonobj.idx;
            var idxname = jsonobj.name;
            var status = jsonobj.nvalue;
            var level = jsonobj.svalue1;
          
            if (jsonobj.dtype === "Light/Switch") {
          
                var cstatus = "";
                  
                if (status === 0){
                    cstatus = "Off";
                }
                  
                if (status === 1){
                    cstatus = "On";
                }
                  
                if (status === 2 && level != 100){
                    cstatus = "Transition";
                }
                  
                if (status === 2 && level === 100){
                    cstatus = "On";
                }
              
              
                var abcdef = "";
                var abcdef = '{"lights":{"' + idx + '":{"Status":"' + cstatus + '","Level":' + level + ',"Type":"Light\/Switch","Name":"' + idxname + '"}}}';
                var jsonABC = JSON.parse(abcdef);
                io.emit('update',jsonABC);
            }
        });
    });
});

io.on('connection', function(socket){
  
	var url = 'https://davidnoren.com/soaring/ajax/ajax.php?action=getAllStatus';
	initialAPI = request(url, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var APIResponse = JSON.parse(body);
			socket.emit('initial', APIResponse);
		} else {
			console.log("Got an error: ", error, ", status code: ", response.statusCode);
		}
	});
  
  
	socket.on('command', function(msg){

		console.log('message: ' + msg);
		mqttClient.publish('domoticz/in', msg);

		setTimeout(function(str1) {
			mqttClient.publish('domoticz/in', str1);
		}, 2000, msg);

		setTimeout(function(str1) {
			mqttClient.publish('domoticz/in', str1);
		}, 3000, msg);

		setTimeout(function(str1) {
			mqttClient.publish('domoticz/in', str1);
		}, 3500, msg);

	});
  
	socket.on('poll', function(msg){

		console.log('message: ' + msg);
		mqttClient.publish('domoticz/in', msg);

		setTimeout(function(str1) {
			mqttClient.publish('domoticz/in', str1);
		}, 500, msg);

		setTimeout(function(str1) {
			mqttClient.publish('domoticz/in', str1);
		}, 1000, msg);

		setTimeout(function(str1) {
			mqttClient.publish('domoticz/in', str1);
		}, 1500, msg);

		setTimeout(function(str1) {
			mqttClient.publish('domoticz/in', str1);
		}, 2500, msg);

		setTimeout(function(str1) {
			mqttClient.publish('domoticz/in', str1);
		}, 4000, msg);

	});
});


http.listen(80, function(){
  console.log('listening on *:80');
});
