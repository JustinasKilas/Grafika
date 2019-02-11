//Constants
var ctx;
var canvas;
var offset = 0;	
var colorTest = 'rgba(200, 200, 200, 1)';
var colorWhite = 'rgba(255, 255, 255, 1)';
var speed = 3;
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
		x: 188,
		y: 65,
		clockwise: false
	},
	{
		color: 'rgba(10, 10, 200, 0.9)',
		size: 60,
		spikes: 22,
		x: 136, 
		y: 216,
		clockwise: false
	},
	 {
		color: 'rgba(0, 0, 0, 0.9)',
		size: 20,
		spikes: 7,
		x: 225,
		y: 236,
		clockwise: true
	},
	 {
		color: 'rgba(0, 200, 200, 0.9)',
		size: 100,
		spikes: 40,
		x: 344,
		y: 176,
		clockwise: false
	}
];

setInterval(()=>{
	if(offset% 20 ===0 ){
		console.clear();
		console.log('Time: ', offset/20 , '\r');
	}
	if(offset === 0){		
		canvas = document.getElementById('gears');
		ctx = canvas.getContext('2d');
	}
	clearCanvas();
	render();
	offset += 1;
}, 50);

function clearCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawGears(rotation) {
	gears.map(gear => {		
		ctx.save();
		let dir = gear.clockwise? rotation : -rotation;		
		ctx.fillStyle = gear.color;
		//set gear center
		ctx.translate(gear.x, gear.y);
		//spin gear
		ctx.rotate(degToRad(dir*speed*10/gear.spikes));	//this one
		//set spike to point up
		ctx.rotate(degToRad(-90-(270/gear.spikes/2)));
		//oval(gear.size);
		spikes(gear.spikes, gear.size);
		ctx.fillStyle = colorWhite;
		oval(gear.size/2+gear.spikes/5);
		ctx.restore();
	})

}

function oval(size) {
	ctx.beginPath();
	ctx.arc(0, 0, size, 0, Math.PI * 2, false);
	ctx.closePath();
	ctx.fill();
}

function degToRad(deg){
	return deg * (Math.PI / 180)
}

function spikes(spikes, size){		
	let rot = 360/spikes/4;
	//ctx.rotate(Math.PI/drawSpikes*2);
	ctx.save();
	//ctx.scale(3, 3);
	ctx.rotate(degToRad(-90));
	ctx.beginPath();
	ctx.moveTo(size, 0);
	ctx.lineTo(size, 0);
	for(let i=0; i < spikes; i++){
		ctx.rotate(degToRad(rot));
		ctx.lineTo(size, 0);
		ctx.rotate(degToRad(rot));
		ctx.lineTo(size+8,0);
		ctx.rotate(degToRad(rot));
		ctx.lineTo(size+8,0);
		ctx.rotate(degToRad(rot));
		ctx.lineTo(size,0);
	}	
	ctx.lineTo(size,0);
	ctx.closePath();
	ctx.fill();
	ctx.restore();
	
}

function render(){
	ctx.save();
	//ctx.scale(3,1);
	drawGears(offset);
	ctx.restore();
}

