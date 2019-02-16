//constants

let ctx;
let canvas;
let spin = true;
let offset = 0;
let speed = 1;

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

function getSin(deg) {
    return Math.round(Math.sin(degToRad(deg)) * 1000000000000000) / 1000000000000000
}

function getCos(deg) {
    return Math.round(Math.cos(degToRad(deg)) * 1000000000000000) / 1000000000000000
}

function drawShape(x, y, angle, scaleX = 1, scaleY = 1) {
    ctx.save();
    if(scaleX<0){
        ctx.fillStyle = "rgba(200, 200, 10, 1)";
    }else{
        ctx.fillStyle = "rgba(10, 180, 10, 1)";
    }
    let cos = getCos(angle);
    let sin = getSin(angle);
    ctx.beginPath();
    ctx.transform(-cos * scaleX, sin, -sin, cos*scaleY, x * 200, y * 200);

    ctx.moveTo(0, 0);
    ctx.lineTo(100, 0);
    ctx.lineTo(100, 160);
    ctx.lineTo(200, 160);
    ctx.lineTo(200, 200);
    ctx.lineTo(0, 200);
    ctx.lineTo(0, 0);
    ctx.fill();
    ctx.strokeStyle = "rgba(255, 255, 255, 1)";
    ctx.lineWidth = 5;
    ctx.strokeRect(0, 0, 200, 200);
    ctx.restore();
}

function render() {
    ctx.save();
    ctx.scale(0.5, 0.5);
    ctx.translate(10, 10);

    drawShape(1, 0, 0);
    drawShape(1, 1, -90, -1, 1);
    drawShape(2, 1, 180);
    drawShape(4, 0, 90, -1, 1);

    drawShape(0, 3, 180, 2, 2);
    drawShape(2, 1, 0, -2, 2);

    drawShape(0, 3, 0, -1, 1);
    drawShape(1, 4, 180);
    drawShape(2, 4, -90, -1, 1);
    drawShape(4, 4, 180, -1, 1);
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