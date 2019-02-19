//constants

let ctx;
let canvas;
let spin = true;
let offset = 0;
let speed =1;

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    //rever to normal x y axes; O point is left bottom corner
    // ctx.translate(5,canvas.height);
    // ctx.rotate(degToRad(180));
    // ctx.scale(-1,1);

    canvas.addEventListener('click', () => {
        spin = !spin
    }, false);
}

function drawShape(x, y, angle, scaleX, scaleY){
    ctx.save();
    ctx.beginPath();
    ctx.translate(x*250+10, y*250+10);
    ctx.rotate(degToRad(angle));
    ctx.scale(scaleX, scaleY);
    ctx.moveTo(0,0);
    ctx.lineTo(250,0);
    ctx.lineTo(250,400);
    ctx.lineTo(500,400);
    ctx.lineTo(500,500);
    ctx.lineTo(0,500);
    ctx.lineTo(0,0);
    ctx.fill();
    ctx.restore();
}

function render(){
    ctx.save();
    ctx.scale(1.5,1.5);
    ctx.fillStyle = "rgba(200, 10, 10, 1)";
    this.drawShape(0, 0, 0, 0.5, 0.5);
    ctx.fillStyle = "rgba(10, 200, 10, 1)";
    this.drawShape(0, 1, 0, 0.5, 0.5);
    ctx.fillStyle = "rgba(10, 10, 200, 1)";
    this.drawShape(2, 0, 90, 0.5, 0.5);
    ctx.fillStyle = "rgba(200, 200, 0, 1)";
    this.drawShape(2, 1, 0, -0.5, 0.5);
    // this.drawShape(100, 100, 90);
    // this.drawShape(200, 200, 180);
    // this.drawShape(200, 200, 180, 1, -1);
    // this.drawShape(200, 200, 180, -1, 1);
    // this.drawShape(200, 200, 180, -1, -1);

    ctx.restore();
}

function degToRad(deg) {
    return deg * (Math.PI / 180)
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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