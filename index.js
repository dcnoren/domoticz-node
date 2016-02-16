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
      jsonobj = JSON.parse(message);
      var idx = jsonobj.idx;
      console.log("idx " + idx);
      if (jsonobj.dtype === "Light/Switch") {
           socket.emit('push',
            {
                "lights":{
                  "idx":{
                     "Status":"On",
                     "Level":100,
                     "Type":"Light\/Switch",
                     "Name":"jsonobj.name"
                  }}
            });
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
   "doors":{
      "28":{
         "Status":"Closed",
         "Type":"Lighting 2",
         "Name":"Front Door"
      },
      "29":{
         "Status":"Closed",
         "Type":"Lighting 2",
         "Name":"Garage Door"
      },
      "30":{
         "Status":"Closed",
         "Type":"Lighting 2",
         "Name":"Back Door"
      }
   },
   "comfort":{
      "15":{
         "Type":"Temp + Humidity",
         "Name":"Family Room Comfort",
         "Temperature":"67.60",
         "Humidity":25,
         "ComfortLevel":"Comfortable"
      },
      "43":{
         "Type":"Temp + Humidity",
         "Name":"Up Bath Comfort",
         "Temperature":"68.00",
         "Humidity":36,
         "ComfortLevel":"Comfortable"
      }
   },
   "dummy":{
      "27":{
         "Status":"Off",
         "Level":"0",
         "Type":"Lighting 1",
         "Name":"motion"
      },
      "44":{
         "Status":"Off",
         "Level":"0",
         "Type":"Lighting 2",
         "Name":"Bath Fan Automatic"
      }
   },
   "security":{
      "Normal":{
         "Name":"Normal",
         "Status":"enabled"
      },
      "ArmAway":{
         "Name":"Arm Away",
         "Status":"disabled"
      },
      "ArmHome":{
         "Name":"Arm Home",
         "Status":"disabled"
      }
   },
   "lights":{
      "7":{
         "Status":"On",
         "Level":100,
         "Type":"Light\/Switch",
         "Name":"Downstairs Hallway"
      },
      "8":{
         "Status":"Off",
         "Level":"0",
         "Type":"Light\/Switch",
         "Name":"Garage"
      },
      "9":{
         "Status":"On",
         "Level":100,
         "Type":"Light\/Switch",
         "Name":"Entry"
      },
      "10":{
         "Status":"On",
         "Level":100,
         "Type":"Light\/Switch",
         "Name":"Front Porch"
      },
      "34":{
         "Status":"On",
         "Level":100,
         "Type":"Light\/Switch",
         "Name":"Dining Room"
      },
      "36":{
         "Status":"On",
         "Level":100,
         "Type":"Light\/Switch",
         "Name":"Family Room"
      },
      "38":{
         "Status":"Off",
         "Level":"0",
         "Type":"Light\/Switch",
         "Name":"Landing"
      },
      "47":{
         "Status":"On",
         "Level":100,
         "Type":"Light\/Switch",
         "Name":"Breakfast Room"
      }
   },
   "fans":{
      "37":{
         "Status":"Off",
         "Level":0,
         "Type":"Light\/Switch",
         "Name":"Family Room Fan"
      }
   },
   "scenes":{
      "1":{
         "Name":"All On",
         "Status":"Deactivated"
      },
      "2":{
         "Name":"All Off",
         "Status":"Deactivated"
      },
      "3":{
         "Name":"Movie",
         "Status":"Deactivated"
      },
      "4":{
         "Name":"Night Away",
         "Status":"Deactivated"
      },
      "5":{
         "Name":"Entertaining",
         "Status":"Deactivated"
      },
      "6":{
         "Name":"Evening Dim",
         "Status":"Deactivated"
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
