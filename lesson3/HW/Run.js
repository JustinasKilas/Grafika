//constants
let ctx;
let canvas;
let level = 0;
const size = 500;
const halfSize = size/2;
const angle = degToRad(-90);

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    window.onkeydown = (e) => {
        switch (e.keyCode) {
            case 107:
                if (level < 8) {
                    level++;
                    clearCanvas();
                    render();
                }
                break;
            case 109:
                if (level > 0) {
                    level--;
                    clearCanvas();
                    render();
                }
                break;
        }
        if (e.key > 0 && e.key < 10) {
            numberToRotate = Number(e.key);
        }
    };
    render();
}

function drawShape(step) {

    if (step > 0) {
        step = step - 1;
        ctx.save();
        ctx.save();
        ctx.save();
        if (step + 1 === level) {
            ctx.fillStyle = '#dddd55';
        }
        ctx.transform(0.5, 0, 0, 0.5, 0, 0);
        drawShape(step);
        ctx.restore();
        if (step + 1 === level) {
            ctx.fillStyle = '#55dd55';
        }
        ctx.transform(0.5, 0, 0, -0.5, halfSize, halfSize);
        drawShape(step);
        ctx.restore();
        if (step + 1 === level) {
            ctx.fillStyle = '#dd5555';
        }
        ctx.transform(0.5, 0, 0, -0.5, halfSize, halfSize);
        ctx.rotate(angle);
        drawShape(step);
        ctx.restore();
        ctx.transform(0.25, 0, 0, 0.25, halfSize/2, halfSize/2 * 3);
        ctx.rotate(angle);
        drawShape(step);
    } else drawT();
}

function drawT() {
    ctx.translate(halfSize, halfSize);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(halfSize, -halfSize);
    ctx.lineTo(halfSize, halfSize);
    ctx.lineTo(-halfSize, halfSize);

    ctx.lineTo(-halfSize, -size / 3);
    ctx.lineTo(size / 3, -size / 3);
    ctx.lineTo(size / 3, -halfSize);

    ctx.lineTo(halfSize, -halfSize);
    ctx.fill();
}

function render() {
    ctx.save();
    console.log(level);
    ctx.translate(1, 1);
    ctx.scale(1.5, 1.5);
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
