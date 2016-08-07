
if (idx === 29){

  if (status === 1){

    var flagListen = 60;
    var eventQueueIDX = 29;
    var eventQueueValue = 1;
    myCommand = '{"command": "getdeviceinfo", "idx": 60 }';
		mqttClient.publish('domoticz/in', myCommand);

  }

}

if (idx === 60 && flagListen === 60){

  if (eventQueueIDX === 29){

    if (eventQueueValue === 1){

      if (status === 0){

        myCommand = '{"command": "switchlight", "idx": 7, "switchcmd": "On", "level": 100 }';
        dimLights(myCommand);

      }

    }

  }

}
