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
idxMap.dimmers = {};
idxMap.scenes = {};
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
idxMap.scenes.items = [1, 2, 3, 4, 5, 6, 7];
idxMap.temps.items = [43, 15, 22];
idxMap.doors.items = [28, 29, 30];
idxMap.windows.items = '';
idxMap.fans.items = [37];
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
