var socket = io.connect();

$(document).ready(function(){

      socket.on('update', function(data){

				var lightItems = [];

				if (data.lights){
					$.each(data.lights, function(key, val) {

						if ($('#lightBoard').find("#" + key + "").length>0) {
							 lightItems.push('<div id="' + key + '" class="light ui-bar ui-bar-a ' + val.Status + '" style="height:80px"><center><h1>' + val.Name + '</h1></center></div>');
							 $("#" + key + ".light").replaceWith(lightItems).enhanceWithin();
						} else {
							 lightItems.push('<div class="ui-block-b"><div id="' + key + '" class="light ui-bar ui-bar-a ' + val.Status + '" style="height:80px"><center><h1>' + val.Name + '</h1></center></div></div>');
							 $('#lightBoard').append(lightItems).enhanceWithin();
						}

					});
				}


				var doorItems = [];

				if (data.doors){
					$.each(data.doors, function(key, val) {

						if ($('#doorBoard').find("#" + key + "").length>0) {
							 doorItems.push('<div id="' + key + '" class="door ui-bar ui-bar-a ' + val.Status + '" style="height:80px"><center><h1>' + val.Name + '</h1></center></div>');
							 $("#" + key + ".door").replaceWith(doorItems).enhanceWithin();
						} else {
							 doorItems.push('<div class="ui-block-b"><div id="' + key + '" class="door ui-bar ui-bar-a ' + val.Status + '" style="height:80px"><center><h1>' + val.Name + '</h1></center></div></div>');
							 $('#doorBoard').append(doorItems).enhanceWithin();
						}

					});
				}


				var fanItems = [];

				if (data.fans){
					$.each(data.fans, function(key, val) {

						if ($('#fanBoard').find("#" + key + "").length>0) {
							 fanItems.push('<div id="' + key + '" class="fan ui-bar ui-bar-a ' + val.Status + '" style="height:80px"><center><h1>' + val.Name + '</h1></center></div>');
							 $("#" + key + ".fan").replaceWith(fanItems).enhanceWithin();
						} else {
							 fanItems.push('<div class="ui-block-b"><div id="' + key + '" class="fan ui-bar ui-bar-a ' + val.Status + '" style="height:80px"><center><h1>' + val.Name + '</h1></center></div></div>');
							 $('#fanBoard').append(fanItems).enhanceWithin();
						}

					});
				}


				var sceneItems = [];

				if (data.scenes){
					$.each(data.scenes, function(key, val) {

						if ($('#sceneBoard').find("#" + key + "").length>0) {
							 sceneItems.push('<div id="' + key + '" class="scene ui-bar ui-bar-a ' + val.Status + '" style="height:80px"><center><h1>' + val.Name + '</h1></center></div>');
							 $("#" + key + ".scene").replaceWith(sceneItems).enhanceWithin();
						} else {
               sceneItems.push('<div class="ui-block-b"><div id="' + key + '" class="scene ui-bar ui-bar-a ' + val.Status + '" style="height:80px"><center><h1>' + val.Name + '</h1></center></div></div>');
							 $('#sceneBoard').append(sceneItems).enhanceWithin();
						}

					});
				}

				//ONLY ONE NOT DONE
				var securityItems = [];

				if (data.security){
				$.each(data.security, function(key, val) {
					securityItems.push('<div class="ui-block-b"><div id="' + key + '" class="security ui-bar ui-bar-a ' + val.Status + '" style="height:80px"><center><h1>' + val.Name + '</h1></center></div></div>');
				});
				$('#securityBoard').html(securityItems).enhanceWithin();
				}




      });


  socket.on('audio', function(){
    $("#audioBell").get(0).play();
  });


	$(document).on('click', '.light.Off', function() {
    $(this).addClass("Transition").removeClass("Off");
		myidx = $(this).attr("id");
		var myCommand = "";
		myCommand = '{"command": "switchlight", "idx": ' + myidx + ', "switchcmd": "On", "level": 100 }';
		socket.emit('dimCommand', myCommand);
		//myCommand = '{"command": "getdeviceinfo", "idx": ' + myidx + ' }';
		//socket.emit('dimPoll', myCommand);
		return false;
	});

	$(document).on('click', '.light.On', function() {
		$(this).addClass("Transition").removeClass("On");
		myidx = $(this).attr("id");
		var myCommand = "";
		myCommand = '{"command": "switchlight", "idx": ' + myidx + ', "switchcmd": "Off", "level": 0 }';
		socket.emit('dimCommand', myCommand);
		//myCommand = '{"command": "getdeviceinfo", "idx": ' + myidx + ' }';
		//socket.emit('dimPoll', myCommand);
		return false;
	});

	$(document).on('click', '.light.Transition', function() {
		$(this).addClass("Transition").removeClass("On");
		myidx = $(this).attr("id");
		var myCommand = "";
		myCommand = '{"command": "switchlight", "idx": ' + myidx + ', "switchcmd": "Off", "level": 0 }';
		socket.emit('dimCommand', myCommand);
		//myCommand = '{"command": "getdeviceinfo", "idx": ' + myidx + ' }';
		//socket.emit('dimPoll', myCommand);
		return false;
	});

	$(document).on('click', '.fan.Off', function() {
		$(this).addClass("Transition").removeClass("Off");
		myidx = $(this).attr("id");
		var myCommand = "";
		myCommand = '{"command": "switchlight", "idx": ' + myidx + ', "switchcmd": "On" }';
		socket.emit('switchCommand', myCommand);
		return false;
	});

	$(document).on('click', '.fan.On', function() {
		$(this).addClass("Transition").removeClass("On");
		myidx = $(this).attr("id");
		var myCommand = "";
		myCommand = '{"command": "switchlight", "idx": ' + myidx + ', "switchcmd": "Off" }';
		socket.emit('switchCommand', myCommand);
		return false;
	});

	/*$(document).on('click', '.security.disabled', function() {
		mystatus = $(this).attr("id");
		$.get('ajax/ajax.php?action=setSecurity&command=' + mystatus);
		$("#securityBoard").parent().addClass("ui-disabled").delay(30000).queue(function(next){
			$(this).removeClass("ui-disabled");
			next();
		});
	});*/

	$(document).on('click', '.scene.Deactivated', function() {
    $(this).siblings(".Activated").removeClass("Activated");
    $(this).switchClass("Deactivated", "Activated");
    //$(this).removeClass("Deactivated");
    setTimeout(function() {
        //$(this).addClass("Deactivated").clearQueue();
        $('.scene.Activated').switchClass("Activated", "Deactivated", 5000).clearQueue();
    },5000);
    myidx = $(this).attr("id");
		var myCommand = "";
		myCommand = '{"command": "switchscene", "idx": ' + myidx + ', "switchcmd": "On" }';
		socket.emit('dimCommand', myCommand);
		return false;
	});




	//$('#chartsBoard').highcharts({
        fart = new Highcharts.Chart({
            chart: {
                type: 'spline',
                renderTo: 'chartsBoard',
                animation: Highcharts.svg, // don't animate in old IE
                marginBottom: 60,
                events: {
                    load: function () {
			socket.on('chart', function (sample) {

                        var series = fart.get(sample.idx);
                        if (!series){
                        	//console.log('adding series')
                        	fart.addSeries({
                        		id: sample.idx,
                        		name: sample.idxname,
                        		data: [null,null]
                        	});
                        	//fart.isDirtyLegend = true;
                        	//fart.isDirtyBox = true;
                        	//fart.redraw();
                        }
                        // when a sample arrives we plot it
                        series = fart.get(sample.idx);
                        series.addPoint([sample.x, sample.y], true, false);
                        //console.log('adding data')
                        fart.xAxis[0].update({
    				min: new Date(sample.x - 3600000).getTime(),
                		max: new Date(sample.x).getTime()
			});
						});
                    }
                }
            },
            title: {
                text: 'Temperatures'
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 100,
                min: new Date().setHours(new Date().getHours()-1),
                max: new Date().setMinutes(new Date().getMinutes()+2),
            },
            yAxis: {
                title: {
                    text: 'Temp'
                },
		tickInterval: 10,
            	min: 25,
            	max: 100,
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            legend: {
            	align: 'center',
	        verticalAlign: 'bottom',
	        layout: 'horizontal'
	       // x: 0,
	        //y: 100
            },
            plotOptions: {
            	line: {
                	dataLabels: {
                    		enabled: true
                	},
        		 enableMouseTracking: false
	        }
	    },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                        Highcharts.numberFormat(this.y, 2);
                }
            },
            exporting: {
                enabled: false
            }/*,
            series: [{
            name: 'Blank',
            data: [null,null]
            }]*/
        });



        socket.on('wit', function (token) {

        //MICROPHONE
          var mic = new Wit.Microphone(document.getElementById("microphone"));
          var info = function (msg) {
            document.getElementById("info").innerHTML = msg;
          };
          var error = function (msg) {
            document.getElementById("error").innerHTML = msg;
          };
          mic.onready = function () {
            info("Microphone is ready to record");
          };
          mic.onaudiostart = function () {
            info("Recording started");
            error("");
          };
          mic.onaudioend = function () {
            info("Recording stopped, processing started");
          };
          mic.onresult = function (intent, entities, a) {
            var r = kv("intent", intent);

            for (var k in entities) {
              var e = entities[k];

              if (!(e instanceof Array)) {
                r += kv(k, e.value);
              } else {
                for (var i = 0; i < e.length; i++) {
                  r += kv(k, e[i].value);
                }
              }
            }

            document.getElementById("result").innerHTML = r;

            socket.emit('voice', a);


          };
          mic.onerror = function (err) {
            error("Error: " + err);
          };
          mic.onconnecting = function () {
            info("Microphone is connecting");
          };
          mic.ondisconnected = function () {
            info("Microphone is not connected");
          };


          mic.connect(token);
          // mic.start();
          // mic.stop();

          function kv (k, v) {
            if (toString.call(v) !== "[object String]") {
              v = JSON.stringify(v);
            }
            return k + "=" + v + "\n";
          }

        });




});
