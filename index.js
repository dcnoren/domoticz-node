var config = require('./config.js');

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mqtt = require('mqtt'), url = require('url');
var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1"
});

var docClient = new AWS.DynamoDB.DocumentClient();
var table = "soaring-dev";

var abc123 = new Date();

var params = {
	TableName:table,
	Item:{
		"timestamp": abc123,
		"title": "test"
	}
}

console.log("Adding a new item...");
docClient.put(params, function(err, data) {
    if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
    }
});

var router = express.Router();

app.use('/api', router);

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.get('/all/off', function(req, res) {
    res.json({ message: '200 OK' });
    myCommand = '{"command": "switchscene", "idx": 2, "switchcmd": "On" }';
    mqttClient.publish('domoticz/in', myCommand);
});

app.use(express.static('static'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var mqttOptions = {
    host: config.mqtt.host,
    port: config.mqtt.port,
    username: config.mqtt.username,
    password: config.mqtt.password
};

//Specify the items you care about here
var dimmers = [7, 8, 9, 10, 34, 36, 38, 47, 48];
var fans = [37];
var temps = [43, 15, 22];
var doors = [28, 29, 30];
//var scenes = [1, 2, 3, 4, 5, 6, 7]; //These aren't real IDXes, so can't do this...

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

			//if (jsonobj.dtype === "Light/Switch" && jsonobj.switchType === "Dimmer") { //This will filter out the MB Runner Light - D

            if (jsonobj.switchType === "Dimmer") {

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


			if (jsonobj.dtype === "Light/Switch" && jsonobj.switchType === "On/Off") {

                var cstatus = "";

                if (status === 0){
                    cstatus = "Off";
                }

                if (status === 1){
                    cstatus = "On";
                }

                var abcdef = "";
                var abcdef = '{"fans":{"' + idx + '":{"Status":"' + cstatus + '","Name":"' + idxname + '"}}}';
                var jsonABC = JSON.parse(abcdef);
                io.emit('update',jsonABC);
            }


			if (jsonobj.switchType === "Contact") {

                var cstatus = "";

                if (status === 0){
                    cstatus = "Closed";
                }

                if (status === 1){
                    cstatus = "Open";
                }

                var abcdef = "";
                var abcdef = '{"doors":{"' + idx + '":{"Status":"' + cstatus + '","Name":"' + idxname + '"}}}';
                var jsonABC = JSON.parse(abcdef);
                io.emit('update',jsonABC);
            }



			if ((jsonobj.dtype === "Temp" || jsonobj.dtype === "Temp + Humidity" || jsonobj.dtype === "Thermostat") && idxname != "House Temperature Setpoint") {

				var x = new Date().getTime();

		                var f = parseFloat(level);
		                var f = f * 9 / 5 + 32;
		                f = f.toFixed(1);
		                f = parseFloat(f);

				io.emit('chart', {
						x: x,
						y: f,
						idx: idx,
						idxname: idxname
					});

				//console.log('charted x: ' + x + ' y: ' + f);

            }

        });
    });
});

io.on('connection', function(socket){

	dimmers.forEach(function(item) {
		myCommand = '{"command": "getdeviceinfo", "idx": ' + item + ' }';
		mqttClient.publish('domoticz/in', myCommand);
	});

	doors.forEach(function(item) {
		myCommand = '{"command": "getdeviceinfo", "idx": ' + item + ' }';
		mqttClient.publish('domoticz/in', myCommand);
	});

	fans.forEach(function(item) {
		myCommand = '{"command": "getdeviceinfo", "idx": ' + item + ' }';
		mqttClient.publish('domoticz/in', myCommand);
	});

	temps.forEach(function(item) {
		myCommand = '{"command": "getdeviceinfo", "idx": ' + item + ' }';
		mqttClient.publish('domoticz/in', myCommand);
	});

	/*scenes.forEach(function(item) {
		myCommand = '{"command": "getdeviceinfo", "idx": ' + item + ' }';
		mqttClient.publish('domoticz/in', myCommand);
	});*/


	socket.on('dimCommand', function(msg){

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

	socket.on('dimPoll', function(msg){

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

	socket.on('switchCommand', function(msg){

		console.log('message: ' + msg);
		mqttClient.publish('domoticz/in', msg);

	});

  socket.on('voice', function(msg){

		console.log('message: ' + msg);

    if (msg.intent = "light_on_off") {

      devices = {
        "dining room" : 34,
        "dining" : 34
      }

      var roomName = JSON.stringify(msg.room);
      var device = devices.roomName;

      myCommand = '{"command": "switchlight", "idx": ' + device + ', "switchcmd": "Off", "level": 0 }';
      console.log('message: ' + myCommand);
      mqttClient.publish('domoticz/in', myCommand);
    }






    //mqttClient.publish('domoticz/in', msg);

	});




});


http.listen(3000, function(){
  console.log('listening on *:3000');
});
