
var events = {};

events.famFan = {
  this.name = 'Family Room Fan';
  this.description = 'Turn on family room fan when temp bounds are met';
  this.input[0] = '15';
  this.input[1] = '43';
  this.action = 'compareWithBound';
  this.targetDev = '37';
}

if (abs(events.famFan.input[0] - events.famFan.input[1]) > 5){
  myCommand = '{"command": "switchlight", "idx": ' + events.famFan.targetDev + ', "switchcmd": "Off", "level": 0 }';
  switchLights(myCommand);
}

function processEvent(jsonobj){

  if ((jsonobj.dtype === "Temp" || jsonobj.dtype === "Temp + Humidity" || jsonobj.dtype === "Thermostat") && idxname != "House Temperature Setpoint") {

    if (abs(idxHistory[15].level - idxHistory[43].level) > 5){

      myCommand = '{"command": "switchlight", "idx": ' + '37' + ', "switchcmd": "On", "level": 100 }';
      switchLights(myCommand);

    }

  }

}
