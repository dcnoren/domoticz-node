var idxMap = {};

idxMap.switches = {};
idxMap.dimmers = {};
idxMap.scenes = {};
idxMap.temps = {};
idxMap.doors = {};
idxMap.windows = {};
idxMap.fans = {};

idxMap.scenes.definitions = {};
idxMap.scenes.newDefinitions = {};

idxMap.switches.items = '';
idxMap.dimmers.items = [7, 8, 9, 10, 34, 36, 38, 47, 48];
idxMap.scenes.items = [1, 2, 3, 4, 5];
idxMap.temps.items = [43, 15, 22];
idxMap.doors.items = [28, 29, 30];
idxMap.windows.items = '';
idxMap.fans.items = [37];

idxMap.scenes.definitions = [
"{\"idx\" : 1, \"dtype\" : \"Scene\", \"status\" : \"Off\", \"name\" : \"All On\", \"nvalue\" : 0, \"svalue1\" : \"0\"}",
"{\"idx\" : 2, \"dtype\" : \"Scene\", \"status\" : \"Off\", \"name\" : \"All Off\", \"nvalue\" : 0, \"svalue1\" : \"0\"}"
];

idxMap.scenes.newDefinitions.push([["Name", "All On"], ["idx", 1]]);
idxMap.scenes.newDefinitions.push([["Name", "All On"], ["idx", 1]]);



module.exports = idxMap;
