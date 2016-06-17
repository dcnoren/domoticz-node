
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

  if (jsonobj.idx = events.famFan.)

}
