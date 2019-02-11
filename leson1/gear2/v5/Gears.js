class Gear {
    constructor(color, size, spikes, parent, x, y, clockwise, position) {
        this.color = color;
        this.size = size;
        this.spikes = spikes;
        if (parent === null) {
            this.x = x;
            this.y = y;
            this.clockwise = clockwise;
        } else {
            this.parent = parent;
            this.clockwise = !parent.clockwise;
            this.position = position;
            this.setX();
            this.setY();
            this.countOffset();
        }
    }

    updatePosition(delta) {
        this.position += delta;
        this.setX();
        this.setY();
        this.countOffset();
    }

    setX() {
        const {parent, position, size} = this;
        this.x = parent.x - (parent.size + size + spikeSize * 1.6) * Math.sin(degToRad(-position));
    }

    setY() {
        const {parent, position, size} = this;
        this.y = parent.y - (parent.size + size + spikeSize * 1.6) * Math.cos(degToRad(-position));
    }

    offsetFromParent(gear) {
        let dif = 0;
        if (gear.parent.parent !== undefined) {
            // paralel to parent
            // dif += degToRad(90-gear.position) ;
            // dif -= degToRad(-360 / gear.spikes * gear.dif);
            // dif += gear.parent.offset;

            //then
            dif =-  gear.parent.offset;
        }
        return dif;
    }


    countOffset() {
        let parentPeriod = 360 / this.parent.spikes;
        //get mod
        let mod = this.position % (parentPeriod);
        //invert mod
        let inMod = parentPeriod - mod;
        //
        this.dif = inMod / parentPeriod - 0.5;
        //
        let counter = this.offsetFromParent(this);
        this.offset = degToRad(-360 / this.spikes * this.dif) + counter;
    }
}

//Constants

let ctx;
let canvas;
let spin = undefined;
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
    let a = new Gear('rgba(200, 10, 10, 0.9)', 36, 60, null, 40, 50, true, undefined);
    let b = new Gear('rgba(10, 200, 10, 0.9)', 35, 67, a, null, null, null, 90);
    let c = new Gear('rgba(10, 10, 200, 0.9)', 6, 10, a, null, null, null, 180);
    let d = new Gear('rgba(10, 200, 200, 0.9)', 20, 35, b, null, null, null, 90 + 45);
    let e = new Gear('rgba(10, 200, 10, 0.9)', 10, 20, a, null, null, null, 210);

    gears = [a, b, c, d, e];
    console.log(gears);
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    ctx.lineWidth = 0.2;
    spin = false;
    canvas.addEventListener('click', () => {
        spin = !spin
    }, false);
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
                gears[3].updatePosition(1);
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

        //set gear center
        ctx.translate(gear.x, gear.y);
        //set gear to point up
        ctx.rotate(degToRad(-90 - 180 / gear.spikes));

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

function drawSpikes(spikes, size) {
    let rot = 360 / spikes / 4;
    ctx.save();
    //ctx.scale(3, 3);
    ctx.beginPath();
    ctx.moveTo(size, 0);
    for (let i = 0; i < spikes; i++) {
        ctx.rotate(degToRad(rot / 2));
        ctx.lineTo(size, 0);
        ctx.rotate(degToRad(rot));
        ctx.lineTo(size + spikeSize, 0);
        ctx.rotate(degToRad(rot / 2));
        if (i === 0 && drawFirstPointer) {
            ctx.lineTo(size + spikeSize, 0);
            ctx.lineTo(200, 0);
            ctx.lineTo(size + spikeSize, 0);
            ctx.stroke();
        }
        ctx.rotate(degToRad(rot / 2));
        ctx.lineTo(size + spikeSize, 0);
        ctx.rotate(degToRad(rot));
        ctx.lineTo(size, 0);
        ctx.rotate(degToRad(rot / 2));
        ctx.lineTo(size, 0);
        if (i === 0 && drawFirst) {
            ctx.stroke();
        }
    }
    ctx.lineTo(size, 0);
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
    if (offset % 20 === 0) {
        //console.clear();
        //console.log('Time: ', offset / 20, '\r');
    }
    clearCanvas();
    render();
    if (spin) {
        offset += speed;
    }
}, 5);