var config = require('./config.js');
var idxMap = require('./idxMap.js');

var express = require('express');
var app = express();

if(process.env.DOMOTICZ_PORT) {
    var runPort = process.env.DOMOTICZ_PORT;
}
else {
    var runPort = 3000;
}

var http = require('http').Server(app);
var io = require('socket.io')(http);
var mqtt = require('mqtt'), url = require('url');

var router = express.Router();

app.use('/api', router);

router.get('/', function(req, res) {
    res.json({ message: 'domiticz-node api' });
});

router.get('/all/off', function(req, res) {
    res.json({ message: '200 OK' });
    myCommand = '{"command": "switchscene", "idx": 2, "switchcmd": "On" }';
    mqttClient.publish('domoticz/in', myCommand);
});

router.get('/standard/on', function(req, res) {
    res.json({ message: '200 OK' });
    myCommand = '{"command": "switchscene", "idx": 9, "switchcmd": "On" }';
    mqttClient.publish('domoticz/in', myCommand);
});

router.get('/37/on', function(req, res) {
    res.json({ message: '200 OK' });
    myCommand = '{"command": "switchlight", "idx": 37, "switchcmd": "On" }';
    mqttClient.publish('domoticz/in', myCommand);
});

router.get('/37/off', function(req, res) {
    res.json({ message: '200 OK' });
    myCommand = '{"command": "switchlight", "idx": 37, "switchcmd": "Off" }';
    mqttClient.publish('domoticz/in', myCommand);
});

app.use(express.static('static'));

app.get('/', function(req, res){
  password = req.param('p', 'password');
  if(password !== config.security.password){
    return res.sendStatus(401);
  } else {
    res.sendFile(__dirname + '/index.html');
  }
});

var mqttOptions = {
    host: config.mqtt.host,
    port: config.mqtt.port,
    username: config.mqtt.username,
    password: config.mqtt.password
};




// LIGHT FUNCTIONS //

function dimLights(msg){

  //console.log('message: ' + msg);
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

}

function pollLights(msg){

  //console.log('message: ' + msg);
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

}

function switchLights(msg){

  //console.log('message: ' + msg);
  mqttClient.publish('domoticz/in', msg);

}


var flagListen = "";
var eventQueueIDX = "";
var eventQueueValue = "";


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
                          //io.emit('audio');
                      }

                      var abcdef = "";
                      var abcdef = '{"doors":{"' + idx + '":{"Status":"' + cstatus + '","Name":"' + idxname + '"}}}';
                      var jsonABC = JSON.parse(abcdef);
                      io.emit('update',jsonABC);
                  }



            if (jsonobj.Type === "Scene") {

                      cstatus = "Deactivated";

                      var abcdef = "";
                      var abcdef = '{"scenes":{"' + jsonobj.idx + '":{"Status":"' + cstatus + '","Name":"' + jsonobj.Name + '"}}}';
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

            }











            if (config.features.events == true){
              //var events = require('./events');
              //var eventResult = events.processEvents(jsonobj);

              if (idx === 29){

                if (status === 1){

                  flagListen = "60";
                  //eventQueueIDX = 29;
                  //eventQueueValue = 1;
                  myCommand = '{"command": "getdeviceinfo", "idx": 60 }';
                  mqttClient.publish('domoticz/in', myCommand);
                  console.log("IDX 29 event ran");

                }

              }

              if (idx === 60 && flagListen == "60"){

                    if (status === 0){

                      flagListen = {};
                      myCommand = '{"command": "switchlight", "idx": 7, "switchcmd": "On", "level": 100 }';
                      dimLights(myCommand);
                      myCommand = '{"command": "switchlight", "idx": 60, "switchcmd": "Off"}';
                      switchLights(myCommand);
                      console.log("IDX 60 event ran");

                    }

              }

            }



















        });
    });
});

io.on('connection', function(socket){

  io.emit('wit', config.wit.key);

  idxMap.dimmers.items.forEach(function(item) {
		myCommand = '{"command": "getdeviceinfo", "idx": ' + item + ' }';
		mqttClient.publish('domoticz/in', myCommand);
	});

	idxMap.doors.items.forEach(function(item) {
		myCommand = '{"command": "getdeviceinfo", "idx": ' + item + ' }';
		mqttClient.publish('domoticz/in', myCommand);
	});

	idxMap.fans.items.forEach(function(item) {
		myCommand = '{"command": "getdeviceinfo", "idx": ' + item + ' }';
		mqttClient.publish('domoticz/in', myCommand);
	});

	idxMap.temps.items.forEach(function(item) {
		myCommand = '{"command": "getdeviceinfo", "idx": ' + item + ' }';
		mqttClient.publish('domoticz/in', myCommand);
	});

  idxMap.scenes.items.forEach(function(item) {
		myCommand = '{"command": "getsceneinfo", "idx": ' + item + ' }';
		mqttClient.publish('domoticz/in', myCommand);
	});


	socket.on('dimCommand', function(msg){

		dimLights(msg);

	});

	socket.on('dimPoll', function(msg){

    pollLights(msg);

	});

	socket.on('switchCommand', function(msg){

		switchLights(msg);

	});

  socket.on('voice', function(msg){

    if (msg.outcome.intent == "light_on_off") {

      //console.log(msg.outcome.entities.room.value);

      var roomName = msg.outcome.entities.room.value;
      var binaryAction = msg.outcome.entities.binarySwitch.value;
      //console.log(binaryAction);
      var device = idxMap.wit.devices[roomName];

      if (binaryAction == "on") {
        myCommand = '{"command": "switchlight", "idx": ' + device + ', "switchcmd": "On", "level": 100 }';
        dimLights(myCommand);
      }

      if (binaryAction == "off") {
        myCommand = '{"command": "switchlight", "idx": ' + device + ', "switchcmd": "Off", "level": 0 }';
        dimLights(myCommand);
      }

    }






    //mqttClient.publish('domoticz/in', msg);

	});




});



http.listen(runPort, function(){
  console.log('listening on *:' + runPort);
});
