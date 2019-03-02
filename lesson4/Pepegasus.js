let canvas;
let ctx;
let iteration = 0;
let BigScale = 0.5;
let smallScale = 0.75;
let bigNegativeScale = 1.5;
// maximum iteration
let changeIterationBy = 0.01;
let iterationCounter = iteration;
let lag = 100;

//let difference = 0.05;

function init(){
    canvas = document.getElementById('canvas');
    if (canvas.getContext){
        ctx = canvas.getContext('2d');
        drawFractal(iteration);
    }
}

function drawStuff() {
	setTimeout(function () {
		console.log(iteration);
		if(iteration <= 6) {

		drawBorder();
		drawFractal(iteration);
		iteration = (+iteration + +changeIterationBy).toFixed(2);
		document.getElementById('iterationValueSpan').innerHTML = iteration;
		drawStuff(iteration);

		}
	}, 200)
}

function drawFractal(iterationIteration){
    if (iterationIteration === 0){
        drawShape();
    } else {
        let stageReduction = 1;

        if(iterationIteration <= 1) {
            stageReduction = iterationIteration;
        }

        ctx.save();

        let argumentToTransform = stageReduction;
        if (iterationIteration + 1 > iteration){
            ctx.fillStyle = 'rgb(255, 128, 0)';
            //ctx.strokeStyle = 'rgb(255, 128, 0)';
        }

        transformOriginal(argumentToTransform);
        drawFractal(iterationIteration - stageReduction);

        ctx.restore();

        ctx.save();

        if (iterationIteration + 1 > iteration){
            ctx.fillStyle = 'rgb(255, 128, 255)';
           // ctx.strokeStyle = 'rgb(255, 128, 255)';
        }

        transformMirror1(argumentToTransform);
        drawFractal(iterationIteration - stageReduction);

        ctx.restore();

        ctx.save();

        if (iterationIteration + 1 > iteration){
            ctx.fillStyle = 'rgb(128, 128, 255)';
          //  ctx.strokeStyle = 'rgb(128, 128, 255)';
        }

        transformMirror2(argumentToTransform);
        drawFractal(iterationIteration - stageReduction);

        ctx.restore();

        ctx.save();

        if (iterationIteration + 1 > iteration){
            ctx.fillStyle = 'rgb(0, 128, 128)';
          //  ctx.strokeStyle = 'rgb(0, 128, 128)';
        }

        transformLittle(argumentToTransform);
        drawFractal(iterationIteration - stageReduction);

        ctx.restore();

    }
}

function transformLittle(argumentToTransform){
    let alpha = 0 ;
	let scale = 1 - smallScale * argumentToTransform;
    let cos = Math.cos(alpha) * scale;
    let sin = Math.sin(alpha) * scale;

    // 0 degrees

    ctx.transform(cos,
        -1 * sin,
        sin,
        cos,
        0 ,
        150 * argumentToTransform);
	// half size
}

function transformMirror1(argumentToTransform){

    let alpha = 0 ;
    let cos = Math.cos(alpha);
    let sin = Math.sin(alpha);
    let scaleX = 1 - BigScale * argumentToTransform;
	let scaleY = 1 - bigNegativeScale * argumentToTransform;


    ctx.transform(cos * scaleX,
        -1 * sin * scaleX,
        sin * scaleY,
        cos * scaleY,
        0,
        600 * argumentToTransform);
	// mirrored and rotated 180 degrees
    //ctx.rotate(1*Math.PI);
}

function transformMirror2(argumentToTransform){
    let alpha = 0 ;
	let scaleX = 1 - bigNegativeScale * argumentToTransform;
	let scaleY = 1 - BigScale * argumentToTransform;
    let cos = Math.cos(alpha);
    let sin = Math.sin(alpha);
    // 0 degrees
    // mirrored on X axis
    ctx.transform(cos * scaleX,
        -1 * sin * scaleX,
        sin * scaleY,
        cos * scaleY,
        600 * argumentToTransform,
        0);
}

function transformOriginal(argumentToTransform){
    let alpha = 0;
	let scale = 1 - BigScale * argumentToTransform;
    let cos = Math.cos(alpha) * scale;
    let sin = Math.sin(alpha) * scale;
    ctx.transform(cos,
        -1 * sin,
        sin,
        cos,
        300 * argumentToTransform,
        300 * argumentToTransform);
	//(BigScale, 0, 300)
	//(0, BigScale, 300)
	//(0, 0 , 	1)
	// not changes
    // 0 degrees
}

function drawBorder(){
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(600, 0);
    ctx.lineTo(600, 600);
    ctx.lineTo(0, 600);
    ctx.closePath();
    ctx.fillStyle = '#FDFDFD';
    ctx.fill();
    ctx.restore();
}

function drawShape(){
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(75,0);
    ctx.lineTo(75,450);
    ctx.lineTo(600,450);
    ctx.lineTo(600,600);
    ctx.lineTo(0,600);
    ctx.lineTo(0,0);
    ctx.fill();
}

document.addEventListener("keydown", function(e){
    if (e.key === '+'){
        iteration = (+iteration + +changeIterationBy).toFixed(2);
        drawBorder();
        drawFractal(iteration);
    } else if(e.key === '-'){
        iteration = (+iteration - +changeIterationBy).toFixed(2);
        drawBorder();
        drawFractal(iteration);
    } else if(e.key === '*'){
		ctx.restore();
		changeIterationBy = (+changeIterationBy + +0.01).toFixed(2);
		iteration = 0;
		init();
    } else if(e.key === '/'){
		ctx.restore();
		changeIterationBy = (+changeIterationBy - +0.01).toFixed(2);
		iteration = 0;
		init();
    } else if(e.key === 'Backspace'){
		drawStuff(iteration);
    } else if(e.key === '9'){
		lag = (+lag + +100).toFixed(1);
		drawStuff(iteration);
    }

    document.getElementById('iterationValueSpan').innerHTML = iteration;
	document.getElementById('changeIterationValueSpan').innerHTML = changeIterationBy;

});
init();
