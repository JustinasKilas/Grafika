//Constants
var context;
var canvas;
var offset = 0;	
var colorTest = 'rgba(200, 200, 200, 1)';
var colorWhite = 'rgba(200, 200, 200, 1)';
var speed = 2;
var gears = [
	{
		color: 'rgba(200, 10, 10, 1)',
		size: 50,
		spikes: 15,
		xy:{x: 100, y: 100},
		clockwise: true
	},{
		color: 'rgba(10, 200, 10, 3)',
		size: 40,
		spikes: 10,
		xy:{x: 207, y: 55},
		clockwise: false
	},
	{
		color: 'rgba(10, 10, 200, 3)',
		size: 60,
		spikes: 25,
		xy:{x: 148, y: 239},
		clockwise: false
	},
	 {
		color: 'rgba(10, 200, 200, 1)',
		size: 25,
		spikes: 6,
		xy:{x: 262, y: 250},
		clockwise: true
	 }
];

setInterval(()=>{
	if(offset === 0){
		canvas = document.getElementById('gears');
		context = canvas.getContext('2d');
	}
	
	clearCanvas();
	render();
}, 50);

function clearCanvas() {
	context.clearRect(0, 0, canvas.width, canvas.height);
}

function drawGears(rotation) {
	var pixelRatio = canvas.paintCodePixelRatio;
	context.save();

	//
	gears.map(gear => {
		context.save();
		context.fillStyle = gear.color;
		spikes(gear.spikes, gear.xy, gear.size, gear.clockwise? rotation : -rotation);
		oval(gear.xy, gear.size);
		context.globalCompositeOperation = 'destination-out';
		oval(gear.xy, gear.size/gear.size*gear.spikes*2);
		context.restore();
	})
}

function oval(xy, size) {
	let x=xy.x;
	let y=xy.y;
	context.save();
	context.beginPath();
	context.translate(x, y);
	context.arc(0, 0, size, 0, 2*Math.PI , false);
	context.closePath();
	context.fill();
	context.restore();
}

function spikes(spikes, xy, size, rotation){
	let x=xy.x;
	let y=xy.y;
	context.save();
	context.translate(x , y);
	context.rotate(rotation*(speed*20)/spikes * Math.PI / 360);
	for(let i = 0; i<spikes; i++){
		if(i+1 === spikes){
			context.fillStyle = colorTest;
		}
		context.beginPath();
		context.moveTo(0, 0);
		context.lineTo(size, 0);
		context.lineTo(size, size);
		context.lineTo(0, size/5*3);
		context.closePath();
		context.rotate(Math.PI/spikes*2);
		context.fill();
		//ctx.restore();
	}		
	context.restore();
}

function render(){
	drawGears(offset);
	offset += 1;
}

