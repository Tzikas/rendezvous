$(document).ready(function () {

	console.log('go'); 


	var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
	var audioElement = document.getElementById('audioElement');
	var audioSrc = audioCtx.createMediaElementSource(audioElement);
	var analyser = audioCtx.createAnalyser();

	// Bind our analyser to the media element source.
	audioSrc.connect(analyser);
	audioSrc.connect(audioCtx.destination);

	//var frequencyData = new Uint8Array(analyser.frequencyBinCount);
	var frequencyData = new Uint8Array(8);


/*
	if(!Detector.webgl){
		Detector.addGetWebGLMessage();
	} else {

		var container = document.getElementById('container');
		var globe = new DAT.Globe(container);
		//console.log(globe); 
		var tween; 
		var adjustLines = function(globe, t) {
			return function() { //Adds z-axis lines to places on the globe 
				tween = new TWEEN.Tween(globe).to({time: t/3},500).easing(TWEEN.Easing.Cubic.EaseOut).start();
			};
		};
		document.body.style.backgroundImage = 'none'; // remove loading
		TWEEN.start();
		globe.addData(frequencyData, {format: 'magnitude', animated: true}); 
		globe.createPoints();
		//adjustLines(globe,0)();
		tween = new TWEEN.Tween(globe).to({time: 0},1000).easing(TWEEN.Easing.Cubic.EaseOut).start();
		
		globe.animate();
	}
*/



	var years = ['1990','1995','2000'];
	var container = document.getElementById('container');
	var globe = new DAT.Globe(container);
	var i, tweens = [];
	
	/*
	var settime = function(globe, t) {
		return function() { //Adds z-axis lines to places on the globe 
			//new TWEEN.Tween(globe).to({time: t/years.length},500).easing(TWEEN.Easing.Cubic.EaseOut).start();
			var tween = new TWEEN.Tween(globe).to({time: 0},1000).easing(TWEEN.Easing.Cubic.EaseOut).start();
			console.log(tween);
		};
	};*/



	var tween; 

	//globe.createPoints();
	//settime(globe,0)();
	//globe.animate();



	var xhr;
	TWEEN.start();



	xhr = new XMLHttpRequest();
	xhr.open('GET', '/population909500.json', true);
	xhr.onreadystatechange = function(e) {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				var data = JSON.parse(xhr.responseText);
				window.data = data;
				for (i=0;i<data.length;i++) {
					//globe.addData(data[i][1], {format: 'magnitude', name: data[i][0], animated: true});
					//var d = data[i][1]*Math.random(); 
					var d = []; 
					for(var j=0; j<data[i][1].length; j++){
						d.push(data[i][1][j]*Math.random())
					}
					//console.log(data[i][1]);
					//console.log(d);
					//console.log(''); 
					globe.addData(data[i][1], {format: 'magnitude', name: data[i][0], animated: true});
				
				}
				globe.createPoints();
				console.log(globe);			
				tween = new TWEEN.Tween(globe).to({time:4},1000).easing(TWEEN.Easing.Cubic.EaseOut).start();
				globe.animate();
				document.body.style.backgroundImage = 'none'; // remove loading
			}
		}
	};
	xhr.send(null);
	


	// Continuously loop and update chart with frequency data.
	function renderChart() {
		requestAnimationFrame(renderChart);
		
		// Copy frequency data to frequencyData array.
		analyser.getByteFrequencyData(frequencyData);
		//console.log(frequencyData[1]); 

		if(globe.points){
			globe.points.morphTargetInfluences[2] = frequencyData[2]/100; // SO THIS WRONG.  I need more morphTargets 
		}
		//globe._baseGeometry.morphTargets[2].vertices[0].z += 1; 
		//globe._baseGeometry.morphTargets[2].vertices[0].x += 1; 
		//globe._baseGeometry.morphTargets[2].vertices[0].y += 1; 
		console.log(undefined);
	}

	// Run the loop
	console.log('run the loop');
	renderChart();


});

