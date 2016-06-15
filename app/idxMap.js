var idxMap = {};

idxMap.switches = {};
idxMap.dimmers = {};
idxMap.scenes = {};
idxMap.temps = {};
idxMap.doors = {};
idxMap.windows = {};
idxMap.fans = {};
idxMap.wit = {};

idxMap.scenes.definitions = {};

idxMap.switches.items = '';
idxMap.dimmers.items = [7, 8, 9, 10, 34, 36, 38, 47, 48];
idxMap.scenes.items = [1, 2, 3, 4, 5];
idxMap.temps.items = [43, 15, 22];
idxMap.doors.items = [28, 29, 30];
idxMap.windows.items = '';
idxMap.fans.items = [37];

idxMap.scenes.definitions[1] = "All On";
idxMap.scenes.definitions[2] = "All Off";
idxMap.scenes.definitions[3] = "Movie";
idxMap.scenes.definitions[4] = "Night Away";
idxMap.scenes.definitions[5] = "Entertaining";
idxMap.scenes.definitions[6] = "Evening Dim";
idxMap.scenes.definitions[7] = "Garage Test";

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



module.exports = idxMap;
