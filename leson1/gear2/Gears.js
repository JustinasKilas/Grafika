class Gear {
    constructor(color, size, spikes, parent, x, y, clockwise, position) {
        this.color = color;
        this.size = size;
        this.spikes = spikes;
        this.parent = parent;
        if (parent === null) {
            this.x = x;
            this.y = y;
            this.clockwise = clockwise;
        } else {
            this.clockwise = !parent.clockwise;
            this.position = position;
            this.setX();
            this.setY();
            this.countOffset(this);
        }
    }

    updatePosition(delta) {
        this.position += delta;
        this.setX();
        this.setY();
        this.countOffset(this);
    }

    setX() {
        const {parent, position, size} = this;
        if(this.parent === null){
            return ;
        }
        this.x = parent.x - (parent.size + size + spikeSize * 1.15) * Math.sin(degToRad(-position));
    }

    setY() {
        const {parent, position, size} = this;
        if(this.parent === null){
            return ;
        }
        this.y = parent.y - (parent.size + size + spikeSize * 1.15) * Math.cos(degToRad(-position));
    }

    countOffset(gear) {
        if(this.parent === null){
            return ;
        }
        let add = 0;
        let igear = gear;
        while (igear.parent.parent !== null) {
            add = igear.parent.offset;
            add = radToDeg(add);
            add += (igear.parent.position);
            console.log();
            igear = igear.parent;
        }
        let parentPeriod = 360 / gear.parent.spikes;
        //get mod
        let mod = (gear.position - add) % (parentPeriod);
        //invert mod
        let inMod = parentPeriod - mod;
		
        gear.dif = Math.round((inMod / parentPeriod - 0.5) * 100000) / 100000;

        gear.offset = degToRad(-360 / gear.spikes * gear.dif);
    }
}

//Constants
let numberToRotate = 0;
let ctx;
let canvas;
let spin = true;
let debug = false;
let drawAxes = debug;
let drawFirst = debug;
let drawFirstPointer = debug;
let offset = 0;
let colorTest = 'rgba(200, 200, 200, 0.7)';
let colorWhite = 'rgba(255, 255, 255, 1)';
let speed = 1;
let spikeSize = 2;
let gears;

function init() {

    //init gears
	//color, size, spikes, parent(parent gear object), x, y, clockwise(true/false), position(angle 0-360 from parent top)
    let a = new Gear('rgba(200, 10, 10, 0.9)', 32, 60, null, 40, 50, true, undefined);
    let b = new Gear('rgba(10, 200, 10, 0.9)', 15, 30, a, null, null, null, 90);
    let c = new Gear('rgba(10, 10, 200, 0.9)', 20, 40, b, null, null, null, 120);
    // let d = new Gear('rgba(10, 200, 200, 0.9)', 30, 60, c, null, null, null, 90 + 65);
    //let e = new Gear('rgba(10, 200, 10, 0.9)', 10, 20, d, null, null, null, 210);

	//add gear to array
    gears = [a, b, c,];
	
	//init canvas
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
	
    ctx.lineWidth = 0.3;
	
    canvas.addEventListener('click', () => {
        spin = !spin
    });
	
    document.onkeydown = (e) => {
        switch (e.keyCode) {
            case 107:
                speed += 0.2;
                break;
            case 109:
                speed -= 0.2;
                break;
            case 32:
                e.preventDefault();
                gears.map((gear, i) => {
                    gear.updatePosition(i === numberToRotate? 1 : 0)
                });
                break;
            case 81:
                drawAxes = !drawAxes;
                break;
            case 87:
                drawFirst = !drawFirst;
                break;
            case 69:
                drawFirstPointer = !drawFirstPointer;
                break;
        }
        if (e.key > 0 && e.key < 10) {
            numberToRotate = Number(e.key);
        }
    };
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawGears(rotation) {
    gears.map((gear, i) => {
        ctx.save();
        let dir = gear.clockwise ? rotation : -rotation;
        ctx.fillStyle = gear.color;
        if (gears[numberToRotate] === gear && gear.parent !== null) {
            ctx.fillStyle = colorTest;
        }
        //set gear center
        ctx.translate(gear.x, gear.y);

        if (gear.parent) {
            //set child to point to parent then adjust angle
            ctx.rotate(degToRad(180 + gear.position));

            //adjust angle
            ctx.rotate(gear.offset);
        }

        //spin gear
        ctx.rotate(degToRad(dir / gear.spikes));	//this one

        drawSpikes(gear.spikes, gear.size);
        ctx.fillStyle = colorWhite;
        oval(gear.size / 2);
        ctx.restore();

        //draw x y lines from gear center if enabled
        if (drawAxes) {
            ctx.beginPath();
            ctx.moveTo(gear.x, 0);
            ctx.lineTo(gear.x, 1000);
            ctx.moveTo(0, gear.y);
            ctx.lineTo(1000, gear.y);
            ctx.stroke();
        }
    })
}

function oval(size) {
    ctx.beginPath();
    ctx.arc(0, 0, size, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
}

function degToRad(deg) {
    return deg * (Math.PI / 180)
}

function radToDeg(rad) {
    return rad * 180 / Math.PI;
}

function drawSpikes(spikes, size) {
	// count rotation for gear steps
    let rot = 360 / spikes / 4;
	
    ctx.save();
    ctx.beginPath();
	//rotate back so first tooth to point up
    ctx.rotate(-degToRad(rot * 2));
	
	//draw gear
    ctx.moveTo(0, -size);
    for (let i = 0; i < spikes; i++) {
        ctx.rotate(degToRad(rot / 2));
        ctx.lineTo(0, -size);
        ctx.rotate(degToRad(rot));
        ctx.lineTo(0, -size - spikeSize);
        ctx.rotate(degToRad(rot / 2));
		//draw pointer from first tooth if enabled
        if (i === 0 && drawFirstPointer) {
            ctx.lineTo(0, -size - spikeSize);
            ctx.lineTo(0, -200);
            ctx.lineTo(0, -size - spikeSize);
            ctx.stroke();
        }
        ctx.rotate(degToRad(rot / 2));
        ctx.lineTo(0, -size - spikeSize);
        ctx.rotate(degToRad(rot));
        ctx.lineTo(0, -size);
        ctx.rotate(degToRad(rot / 2));
        ctx.lineTo(0, -size);
		//outline first tooth if enabled
        if (i === 0 && drawFirst) {
            ctx.stroke();
        }
    }
    ctx.lineTo(0, -size);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}

function render() {
    ctx.save();
    ctx.scale(4, 4);
    drawGears(offset * 3);
    ctx.restore();
}

init();

setInterval(() => {
    clearCanvas();
    render();
    if (spin) {
        offset += speed;
    }
}, 5);