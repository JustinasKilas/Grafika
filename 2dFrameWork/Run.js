//constants

let ctx;
let canvas;
let spin = true;
let offset = 0;
let speed =1;

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    //revert to normal x y axes; O point is left bottom corner
    // ctx.translate(5,canvas.height);
    // ctx.rotate(degToRad(180));
    // ctx.scale(-1,1);

    canvas.addEventListener('click', () => {
        spin = !spin
    }, false);
}

function drawShape(shape){
    //Shape
}

function render(){
    ctx.save();

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