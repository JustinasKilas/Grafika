var size = 0;

function clearRect() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function draw() {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        ctx = canvas.getContext('2d');
        window.onkeydown = (e) => {
            switch (e.keyCode) {
                case 107:
                    if (size < 7) {
                        size++;
                        clearRect();
                        drawF(size);
                    }
                    break;
                case 109:
                    if (size > 0) {
                        size--;
                        clearRect();
                        drawF(size);
                    }
                    break;
            }
        };
    }
    drawF(size);


    // Recursive draw
    function drawF(step) {
        if (step > 0) {
            step = step - 1;
            var t = 0;
            setInterval(function () {
                if (t > 100)
                    return;
                clearRect();
                ctx.save();
                console.log(t);

                if (step + 1 === size) {
                    ctx.fillStyle = '#dddd55';

                }
                ctx.transform(1 - t / 100, t / 200, t / 200, 1 - t / 100, t * 2.5, t * 2.5);
                drawT(step);

                ctx.restore();
                t++;
            }, 20)
            // ctx.save();
            //
            // if (step + 1 === size) {
            //     ctx.fillStyle = '#dddd55';
            //
            // }
            // ctx.transform(0, 0.5, 0.5, 0, 250, 250);
            //
            // drawF(step);
            //
            // ctx.restore();
            // if (step + 1 === size) {
            //     ctx.fillStyle = '#55dd55';
            // }
            // ctx.transform(0.5, 0, 0, -0.5, 250, 250);
            // drawF(step);
            //
            // ctx.restore();
            // if (step + 1 === size) {
            //     ctx.fillStyle = '#dd5555';
            // }
            // ctx.transform(0.5, 0, 0, 0.5, 0, 250);
            // drawF(step);
            //
            // ctx.restore();
            // ctx.transform(-0.25, 0, 0, -0.25, 250, 125);
            // drawF(step);

        } else drawT();
    }

    function drawT() {

        // Filled red triangle
        ctx.beginPath();
        ctx.moveTo(125, 0);
        ctx.lineTo(0, 0);

        ctx.lineTo(0, 500);
        ctx.lineTo(125, 500);
        ctx.lineTo(125, 325);
        ctx.lineTo(500, 325);
        ctx.lineTo(500, 500);
        ctx.lineTo(125, 500);
        ctx.fill();
    }
}

function angleToRad(angle) {
    return angle * (180 / Math.PI);
}
