//Constants
var context;
var canvas;
var offset = 0;	
var colorTest = 'rgba(200, 200, 200, 1)';
var colorWhite = 'rgba(255, 255, 255, 1)';
var speed = 2;
var gears = [
	{
		color: 'rgba(200, 10, 10, 0.9)',
		size: 50,
		spikes: 15,
		x: 100, 
		y: 100,
		clockwise: true
	},
	{
		color: 'rgba(10, 200, 10, 0.9)',
		size: 35,
		spikes: 10,
		x: 195,
		y: 55,
		clockwise: false
	},
	{
		color: 'rgba(10, 10, 200, 0.9)',
		size: 60,
		spikes: 22,
		x: 145, 
		y: 226,
		clockwise: false
	},
	 {
		color: 'rgba(0, 0, 0, 0.9)',
		size: 20,
		spikes: 6,
		x: 252,
		y: 237,
		clockwise: true
	}
];

setInterval(()=>{
	if(offset% 20 ===0 ){
		console.clear();
		console.log('Time: ', offset/20 , '\r');
	}
	if(offset === 0){		
		canvas = document.getElementById('gears');
		context = canvas.getContext('2d');
	}
	clearCanvas();
	render();
	offset += 1;
}, 50);

function clearCanvas() {
	context.clearRect(0, 0, canvas.width, canvas.height);
}

function drawGears(rotation) {
	gears.map(gear => {		
		context.save();
		let dir = gear.clockwise? rotation : -rotation;		
		context.fillStyle = gear.color;		
		//set gear center
		context.translate(gear.x, gear.y);
		//spin gear
		context.rotate(degToRad(dir*speed*10/gear.spikes));	//this one
		//set spike to point up
		context.rotate(degToRad(-90-(270/gear.spikes/2)));
		oval(gear.size);	
		spikes(gear.spikes, gear.size);
		context.fillStyle = colorWhite;
		oval(gear.size/2+gear.spikes/5);
		context.restore();
	})

}

function oval(size) {
	context.beginPath();
	context.arc(0, 0, size, 0, Math.PI * 2, false);
	context.closePath();
	context.fill();
}

function degToRad(deg){
	return deg * (Math.PI / 180)
}

function spikes(spikes, size){		
	for(var i = 0; i<spikes; i++){
		context.save();
		context.beginPath();	
		context.moveTo(0, 0);
		context.lineTo(size, 0);	
		context.rotate(degToRad(90/spikes))
		//spike lenth
		context.lineTo(size+15, 0);	
		context.rotate(degToRad(90/spikes))		
		//spike lenth
		context.lineTo(size+15, 0);		
		context.rotate(degToRad(90/spikes))
		context.lineTo(size, 0);
		context.closePath();
		if(i === 0){
			context.save();
			context.fillStyle = colorTest;
			context.fill();
			context.restore();
		}else{
			context.fill();
		}
		context.restore();
		context.rotate(Math.PI/spikes*2);
	}			
}

function render(){
	drawGears(offset);
}

