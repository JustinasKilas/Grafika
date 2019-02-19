//constants

let ctx;
let canvas;
let spin = true;
let offset = 0;
let speed = 1;
let level = 0;
const size = 500;


function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.addEventListener('click', () => {
        level++;
        clearCanvas();
        render();
    }, false);
    render();
}

let angle = 90;

function drawFractal(fractalStages) {
    if (fractalStages === 0) {
        drawShape();
    } else {
        let stage = 0;
        let toMinus = 1;
        if (fractalStages < 1) {
            toMinus = 0;
        }
        ctx.save();
        if (fractalStages === stage) {
            ctx.fillStyle = '#FF0000';
            ctx.strokeStyle = '#FF0000';
        }
        transformF1(toMinus);
        drawFractal(fractalStages - toMinus);
        ctx.restore();

        ctx.save();
        if (fractalStages === stage) {
            ctx.fillStyle = '#00FF00';
            ctx.strokeStyle = '#00FF00';
        }
        transformF2(toMinus);
        drawFractal(fractalStages - toMinus);
        ctx.restore();

        ctx.save();
        if (fractalStages === stage) {
            ctx.fillStyle = '#0000FF';
            ctx.strokeStyle = '#0000FF';
        }
        transformF3(toMinus);
        drawFractal(fractalStages - toMinus);
        ctx.restore();

        ctx.save();
        if (fractalStages === stage) {
            ctx.fillStyle = '#00FFFF';
            ctx.strokeStyle = '#00FFFF';
        }
        transformF4(toMinus);
        drawFractal(fractalStages - toMinus);
        ctx.restore();

    }
}

function drawShape(step) {

    if (step > 0) {
        step = step - 1;
        ctx.save();
        ctx.save();
        ctx.save();
        if (step + 1 === level) {
           // ctx.fillStyle = '#dddd55';
        }
        ctx.transform(0.5, 0, 0, 0.5, 0, 0);
        drawShape(step);
        ctx.restore();
        if (step + 1 === level) {
           // ctx.fillStyle = '#55dd55';
        }
        ctx.transform(0.5, 0, 0, -0.5, size / 2, size / 2);
        drawShape(step);
        ctx.restore();
        if (step + 1 === level) {
           // ctx.fillStyle = '#dd5555';
        }
        ctx.transform(0.5, 0, 0, -0.5, size / 2, size / 2);
        ctx.rotate(degToRad(-90));
        drawShape(step);
        ctx.restore();
        ctx.transform(0.25, 0, 0, 0.25, size / 4, size / 4 * 3);
        ctx.rotate(degToRad(-90));
        drawShape(step);
    } else drawT();
}

function drawT() {
    // Filled red triangle
    //ctx.fillStyle = "rgb(0,0,0)";
    ctx.translate(size / 2, size / 2);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(size / 2, -size / 2);
    ctx.lineTo(size / 2, size / 2);
    ctx.lineTo(-size / 2, size / 2);

    ctx.lineTo(-size / 2, -size / 3);
    ctx.lineTo(size / 3, -size / 3  );
    ctx.lineTo(size / 3, -size / 2);

    ctx.lineTo(size / 2, -size / 2);

    //ctx.closePath();
    ctx.fill();
}

function render() {
    ctx.save();
    console.log(level);
    ctx.translate(1, 1);
    ctx.scale(1.5,1.5);
    drawShape(level);
    ctx.restore();
}

function degToRad(deg) {
    return deg * (Math.PI / 180)
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

init();
