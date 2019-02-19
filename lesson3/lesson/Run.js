//constants

let ctx;
let canvas;
let spin = true;
let offset = 0;
let speed = 1;
let level = 0;


function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.addEventListener('click', () => {
        level++; clearCanvas(); render(); console.log(level);
    }, false);
    render();
}

function cos () {
    return Math.cos(angle);
}
function sin () {
    return Math.sin(angle);
}
let angle = 90;

function drawShape(step) {
    if (step > 0) {
        step = step - 1;
        ctx.save();
        ctx.save();
        ctx.transform(0.5, 0, 0, 0.5, 250, 0);
        ctx.rotate(degToRad(90));
        drawShape(step);
        ctx.restore();
        ctx.transform(0.5, 0, 0, 0.5, 250, 250);
        drawShape(step);
        ctx.restore();
        ctx.transform(0.5, 0, 0, 0.5, 0, 250);
        drawShape(step);
    } else drawT();
}

function drawT() {
    // Filled red triangle
    //ctx.fillStyle = "rgb(0,0,0)";
    ctx.beginPath();
    ctx.moveTo(500, 500);
    ctx.lineTo(0, 500);
    ctx.lineTo(0, 0);
    ctx.lineTo(250, 0);
    //ctx.closePath();
    ctx.fill();
}


function render() {
    ctx.save();
    ctx.lineWidth = 100;
    ctx.translate(10,10);
    drawShape(level );
    ctx.restore();
}

function degToRad(deg) {
    return deg * (Math.PI / 180)
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

init();
