//constants
let ctx;
let canvas;
let level = 0;
const size = 500;
const halfSize = size / 2;
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
        let i = 1;
        let n = 100;
        let interval = setInterval(() => {
            if (i <= n) {
                let j = i / n;
                console.log(j);
                clearCanvas();

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
                    ctx.translate(halfSize / 3 * j, halfSize * 5 / 3 * j);
                    let scale2 = 1 - j / 3 * 2;
                    ctx.scale(scale2, scale2);
                    ctx.rotate(angle * j);
                    drawShape(step);
                    ctx.restore();
                }

            } else {
                clearInterval(interval);
            }
            i++;
        }, 3000 / n);
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
    console.log(level);
    drawShape(level);
}

function degToRad(deg) {
    return deg * (Math.PI / 180)
}

function clearCanvas() {

    ctx.fillStyle = 'rgb(255,255,255)';
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fill();
    ctx.fillStyle = 'rgb(0,0,0)';
}

init();
