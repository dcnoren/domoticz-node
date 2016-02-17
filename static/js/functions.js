var socket = io.connect();

$(document).ready(function(){
      
      socket.on('update', function(data){

				var lightItems = [];

				if (data.lights){
					$.each(data.lights, function(key, val) {

						if ($('#lightBoard').find("#" + key + "").length>0) {
							 lightItems.push('<div id="' + key + '" class="light ui-bar ui-bar-a ' + val.Status + '" style="height:80px"><center><h1>' + val.Name + '</h1></center></div>');
							 $("#" + key + "").replaceWith(lightItems).enhanceWithin();
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
							 $("#" + key + "").replaceWith(doorItems).enhanceWithin();
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
							 $("#" + key + "").replaceWith(fanItems).enhanceWithin();
						} else {
							 fanItems.push('<div class="ui-block-b"><div id="' + key + '" class="fan ui-bar ui-bar-a ' + val.Status + '" style="height:80px"><center><h1>' + val.Name + '</h1></center></div></div>');
							 $('#fanBoard').append(fanItems).enhanceWithin();
						}
						
					});
				}

				
				//THIS DOES NOT WORK
				var sceneItems = [];

				if (data.scenes){
					$.each(data.scenes, function(key, val) {

						if ($('#sceneBoard').find("#" + key + "").length>0) {
							 sceneItems.push('<div id="' + key + '" class="scene ui-bar ui-bar-a ' + val.Status + '" style="height:80px"><center><h1>' + val.Name + '</h1></center></div>');
							 $("#" + key + "").replaceWith(sceneItems).enhanceWithin();
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


	$(document).on('click', '.light.Off', function() {
		$(this).addClass("Transition").removeClass("Off");
		myidx = $(this).attr("id");
		var myCommand = "";
		myCommand = '{"command": "switchlight", "idx": ' + myidx + ', "switchcmd": "On", "level": 100 }';
		socket.emit('dimCommand', myCommand);
		myCommand = '{"command": "getdeviceinfo", "idx": ' + myidx + ' }';
		socket.emit('dimPoll', myCommand);
		return false;
	});

	$(document).on('click', '.light.On', function() {
		$(this).addClass("Transition").removeClass("On");
		myidx = $(this).attr("id");
		var myCommand = "";
		myCommand = '{"command": "switchlight", "idx": ' + myidx + ', "switchcmd": "Off", "level": 0 }';
		socket.emit('dimCommand', myCommand);
		myCommand = '{"command": "getdeviceinfo", "idx": ' + myidx + ' }';
		socket.emit('dimPoll', myCommand);
		return false;
	});

	$(document).on('click', '.light.Transition', function() {
		$(this).addClass("Transition").removeClass("On");
		myidx = $(this).attr("id");
		var myCommand = "";
		myCommand = '{"command": "switchlight", "idx": ' + myidx + ', "switchcmd": "Off", "level": 0 }';
		socket.emit('dimCommand', myCommand);
		myCommand = '{"command": "getdeviceinfo", "idx": ' + myidx + ' }';
		socket.emit('dimPoll', myCommand);
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
	
	$(document).on('click', '.security.disabled', function() {
		mystatus = $(this).attr("id");
		$.get('ajax/ajax.php?action=setSecurity&command=' + mystatus);
		$("#securityBoard").parent().addClass("ui-disabled").delay(30000).queue(function(next){
			$(this).removeClass("ui-disabled");
			next();
		});
	});

	$(document).on('click', '.Deactivated', function() {
		$(this).siblings(".Activated").removeClass("Activated");
		myscene = $(this).attr("id");
		$.get('ajax/ajax.php?action=setSceneStatus&scene=' + myscene);
		$("#scenesBoard").parent().addClass("ui-disabled").delay(3000).queue(function(next){
			$(this).removeClass("ui-disabled");
			next();
		});
	});

	
	
	
	$('#chartsBoard').highcharts({
            chart: {
                type: 'spline',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                events: {
                    load: function () {

                        // set up the updating of the chart each second
                        var series = this.series[0];
                        setInterval(function () {
                            var x = (new Date()).getTime(), // current time
                                y = Math.random();
                            series.addPoint([x, y], true, true);
                        }, 1000);
                    }
                }
            },
            title: {
                text: 'Live random data'
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150
            },
            yAxis: {
                title: {
                    text: 'Value'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                        Highcharts.numberFormat(this.y, 2);
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                name: 'Random data',
                data: (function () {
                    // generate an array of random data
                    var data = [],
                        time = (new Date()).getTime(),
                        i;

                    for (i = -19; i <= 0; i += 1) {
                        data.push({
                            x: time + i * 1000,
                            y: Math.random()
                        });
                    }
                    return data;
                }())
            }]
        });
	
	
	

});
