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

/*idxMap.scenes.definitions = [
"{\"idx\" : 1, \"dtype\" : \"Scene\", \"name\" : \"All On\"}",
"{\"idx\" : 2, \"dtype\" : \"Scene\", \"name\" : \"All Off\"}"
];*/

//idxMap.scenes.newDefinitions.one = {"idx" : 1, "Name": "All On"};
//idxMap.scenes.newDefinitions.two = {"idx" : 2, "Name": "All Off"};

/*idxMap.scenes.newDefinitions.one.idx=1;
idxMap.scenes.newDefinitions.one.Name="All Off";
idxMap.scenes.newDefinitions.two.idx=2;
idxMap.scenes.newDefinitions.two.Name="All On";*/

idxMap.scenes.newDefinitions.push([1, "All On"]);
idxMap.scenes.newDefinitions.push([2, "All Off"]);



module.exports = idxMap;
