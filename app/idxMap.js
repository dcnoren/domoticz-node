// /////////////////////////////////
// Configuration file for IDX mapping,
// which is what Domoticz uses to track
// all devices it knows about. You can
// find IDX information under the devices
// section in Domoticz.
// /////////////////////////////////

// /////////////////////////////////
// Do not modify this block ////////
// /////////////////////////////////
var idxMap = {};
idxMap.switches = {};
idxMap.dimmers = {};
idxMap.scenes = {};
idxMap.scenes.definitions = {};
idxMap.temps = {};
idxMap.doors = {};
idxMap.windows = {};
idxMap.fans = {};
idxMap.wit = {};


// /////////////////////////////////
// Begin modifications below here //
// /////////////////////////////////


// Populate these with the items you want to
// have immediately appear on the dashboard.
// Domoticz only sends MQTT traffic if the device
// has an update or is polled, so Domoticz-node
// uses this list to know what devices to poll.
idxMap.dimmers.items = [7, 8, 9, 10, 34, 36, 38, 47, 48];
idxMap.temps.items = [43, 15, 22];
idxMap.doors.items = [28, 29, 30];
idxMap.windows.items = '';
idxMap.fans.items = [37];
// /////////////////////////////////


// This needs to be populated based on the scenes
// defined in Domoticz. These can be found under
// the devices information in domoticz. You may
// name the scene whatever you desire here, such
// as "all on", "all off", etc - and they do not
// need to match in Domoticz. However, the number
// in the brackets *must* align with the scene
// idx in domoticz. Numbers do not need to be
// sequential and may skip numbers.
idxMap.scenes.definitions[1] = "All On";
idxMap.scenes.definitions[2] = "All Off";
idxMap.scenes.definitions[3] = "Movie";
idxMap.scenes.definitions[4] = "Night Away";
idxMap.scenes.definitions[5] = "Entertaining";
idxMap.scenes.definitions[6] = "Evening Dim";
idxMap.scenes.definitions[7] = "Garage Test";
// /////////////////////////////////


// This is a mapping from room names to idx.
// Multiple room names can map to the same idx,
// which allows for multiple names for a room,
// such as 'hallway' and 'downstairs hallway'.
// This solves wit misunderstanding or the person
// speaking shorter names and will still match
// to the desired idx.
idxMap.wit.devices = {
  "dining room" : 34,
  "dining" : 34,
  "front porch" : 10,
  "porch" : 10,
  "garage" : 8,
  "entry" : 9,
  "landing" : 38,
  "family room" : 36,
  "family" : 36,
  "downstairs hallway" : 7,
  "hallway" : 7,
  "breakfast room" : 47,
  "breakfast" : 47,
  "upstairs bathroom" : 40,
  "bathroom" : 40
}
// /////////////////////////////////

// /////////////////////////////////
// Do not modify below this line ///
// /////////////////////////////////
module.exports = idxMap;
