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
		size: 25,
		spikes: 6,
		x: 258,
		y: 232,
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
	context.save();
	
	gears.map(gear => {
		context.save();		
		context.fillStyle = gear.color;		
		context.translate(gear.x, gear.y);
		oval( gear.size);
		spikes(gear.spikes, gear.size, gear.clockwise? rotation : -rotation);
		context.fillStyle = colorWhite;
		oval(gear.size/gear.size*gear.spikes*2);
		context.restore();
	})
	
	context.restore();
}

function oval(size) {
	context.save();
	context.beginPath();
	context.arc(0, 0, size, 0, 2*Math.PI , false);
	context.closePath();
	context.fill();
	context.restore();
}

function degToRad(deg){
	return deg * (Math.PI / 180)
}

function spikes(spikes, size, rotation){
		context.save();	
	context.rotate(rotation*(speed*20)/spikes * Math.PI / 360);		
	for(let i = 0; i<spikes; i++){
		if(i+1 === spikes){
			context.fillStyle = colorTest;
		}
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
		context.fill();
		context.restore();
		context.rotate(Math.PI/spikes*2);
	}		
		context.restore();
}

function render(){
	drawGears(offset);
}

