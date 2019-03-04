//constants
let ctx;
let canvas;
let level = 0;
const size = 500;
const halfSize = size / 2;
const angle = degToRad(-90);
let n = 100;
let invert = false;
let interval;


function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    window.onkeydown = (e) => {
        switch (e.keyCode) {
            case 107:
                if (level < 8) {
                    level++;
                    invert = false;
                    clearCanvas();
                    render();
                }
                break;
            case 109:
                if (level > 0) {
                    level--;
                    invert = true;
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

function temp(step, i) {
    let j = i / n;


    let scale = 1 - j / 2;
    let scaleNeg = 1 - j / 2 * 3;
    ctx.save();
    ctx.save();
    ctx.save();
    ctx.save();

    {
        if (step + 1 === level) {
            ctx.fillStyle = '#dddd55';
        }
        ctx.scale(scale, scale);
        drawShape(step);
        ctx.restore();
    }

    {
        if (step + 1 === level) {
            ctx.fillStyle = '#55dd55';
        }
        ctx.translate(size / 2 * j, size / 2 * j);
        ctx.scale(scale, scaleNeg);
        drawShape(step);
        ctx.restore();
    }

    {
        if (step + 1 === level) {
            ctx.fillStyle = '#dd5555';
        }
        ctx.translate(halfSize * j, halfSize * j);
        ctx.scale(scale, scaleNeg);
        ctx.rotate(angle * j);
        drawShape(step);
        ctx.restore();
    }

    {
        ctx.translate(halfSize / 2 * j, halfSize / 2 * 3 * j);
        let scale2 = 1 - j / 4 * 3;
        ctx.scale(scale2, scale2);
        ctx.rotate(angle * j);
        drawShape(step);
        ctx.restore();
    }
}

function temp2(step, i) {   //i = 0     i=100
    i = 100 - i;           //100       0
    let j = i / n;          //1         0


    let scale = 1 - j / 2;
    let scaleNeg = 1 - j / 2 * 3;
    ctx.save();
    ctx.save();
    ctx.save();
    ctx.save();

    {
        if (step + 1 === level) {
            ctx.fillStyle = '#dddd55';
        }
        ctx.scale(scale, scale);
        drawShape(step);
        ctx.restore();
    }

    {
        if (step + 1 === level) {
            ctx.fillStyle = '#55dd55';
        }
        ctx.translate(size / 2 * j, size / 2 * j);
        ctx.scale(scale, scaleNeg);
        drawShape(step);
        ctx.restore();
    }

    {
        if (step + 1 === level) {
            ctx.fillStyle = '#dd5555';
        }
        ctx.translate(halfSize * j, halfSize * j);
        ctx.scale(scale, scaleNeg);
        ctx.rotate(angle * j);
        drawShape(step);
        ctx.restore();
    }

    {
        ctx.translate(halfSize / 2 * j, halfSize / 2 * 3 * j);
        let scale2 = 1 - j / 4 * 3;
        ctx.scale(scale2, scale2);
        ctx.rotate(angle * j);
        drawShape(step);
        ctx.restore();
    }
}

function drawShape(step) {
    if (step > 0) {
        step --;
        let i = 1;
        if ((step + 1 !== level && !invert) || (invert && step === level)) {
            temp(step, n);
        } else {
            interval = setInterval(() => {
                if (i <= n) {
                    clearCanvas();
                    invert?temp2(step,i):temp(step, i);
                } else {
                    clearInterval(interval);
                }
                i++;
            }, 3000 / n);
        }
    } else {
        drawT();
    }
}


function drawT() {
    ctx.beginPath();
    ctx.moveTo(size, 0);
    ctx.lineTo(size, size);
    ctx.lineTo(0, size);
    ctx.lineTo(0, 80);
    ctx.lineTo(size - 80, 80);
    ctx.lineTo(size - 80, 0);
    ctx.fill();
}

function render() {
    if (invert) {
        drawShape(level + 1)
    } else {
        drawShape(level);
    }
}

function degToRad(deg) {
    return deg * (Math.PI / 180)
}

function clearCanvas() {
    ctx.save();
    // ctx.fillStyle = 'rgb(255,255,255)';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.rect(0,0, canvas.width, canvas.height);
    // ctx.stroke();
    // ctx.fill();
    ctx.restore();
}

init();
