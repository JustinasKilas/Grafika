//Constants
let context;
let canvas;
let offset = 0;
let colorTest = 'rgba(200, 200, 200, 1)';
let colorWhite = 'rgba(255, 255, 255, 1)';
let speed = 3;
let gears = [
    {
        color: 'rgba(200, 10, 10, 0.9)',
        size: 50,
        spikes: 15,
        x: 100,
        y: 100,
        clockwise: true,
        parent: null
    },
    {
        color: 'rgba(10, 200, 10, 0.9)',
        size: 35,
        spikes: 10,
        x: 188,
        y: 65,
        clockwise: false,
        parent: 0
    },
    {
        color: 'rgba(10, 10, 200, 0.9)',
        size: 60,
        spikes: 22,
        x: 136,
        y: 216,
        clockwise: false,
        parent: 0
    },
    {
        color: 'rgba(0, 0, 0, 0.9)',
        size: 20,
        spikes: 7,
        x: 225,
        y: 236,
        clockwise: true,
        parent: 1
    },
    {
        color: 'rgba(0, 200, 200, 0.9)',
        size: 100,
        spikes: 15,
        x: 344,
        y: 176,
        clockwise: false,
        parent: 3
    },
    {
        color: 'rgba(0, 0, 0, 0.9)',
        size: 20,
        spikes: 7,
        x: 340,
        y: 150,
        clockwise: false,
        parent: 1
    },
];

let innerGears = [
    {
        parent: 4,
        spikes: 15,
        color: colorTest
    },

];

setInterval(() => {
    if (offset % 20 === 0) {
        console.clear();
        console.log('Time: ', offset / 20, '\r');
    }
    if (offset === 0) {
        canvas = document.getElementById('gears');
        context = canvas.getContext('2d');
    }
    clearCanvas();
    render();
    offset += 1;
}, 50);

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function drawGears(rotation) {
    gears.map((gear, i) => {
        context.save();
        let dir = gear.clockwise ? rotation : -rotation;
        context.fillStyle = gear.color;
        //set gear center
        context.translate(gear.x, gear.y);
        //spin gear
        context.rotate(degToRad(dir * speed * 10 / gear.spikes));	//this one
        //set spike to point up
        context.rotate(degToRad(-90 - (270 / gear.spikes / 2)));
        oval(gear.size);
        spikes(gear.spikes, gear.size, i);
        context.fillStyle = colorWhite;
        oval(gear.size / 2);
        context.restore();
    })

}

function oval(size) {
    context.beginPath();
    context.arc(0, 0, size, 0, Math.PI * 2, false);
    context.closePath();
    context.fill();
}

function degToRad(deg) {
    return deg * (Math.PI / 180)
}

function spikes(spikes, size, i) {
    let rot = 360 / spikes / 4;
    //ctx.rotate(Math.PI/drawSpikes*2);
    context.save();
    //ctx.scale(3, 3);
    context.rotate(degToRad(-90));
    context.beginPath();
    context.moveTo(size, 0);
    context.lineTo(size, 0);
    for (let i = 0; i < spikes; i++) {
        context.rotate(degToRad(rot));
        context.lineTo(size, 0);
        context.rotate(degToRad(rot));
        context.lineTo(size + 8, 0);
        context.rotate(degToRad(rot));
        context.lineTo(size + 8, 0);
        context.rotate(degToRad(rot));
        context.lineTo(size, 0);
    }
    context.lineTo(size, 0);
    context.closePath();
    context.fill();
    context.restore();
    let inner = innerGears.find((iG) => iG.parent === i);

      if(inner){
          // console.log("AA");
          let rot2 = 360 / inner.spikes / 4;
          context.save();
          context.beginPath();
          context.fillStyle = colorWhite;
          for(let i=0; i<inner.spikes; i++){
              context.rotate(degToRad(rot2));
              context.lineTo(size/2, 0);
              context.rotate(degToRad(rot2));
              context.lineTo(size/2 + 8, 0);
              context.rotate(degToRad(rot2));
              context.lineTo(size/2 + 8, 0);
              context.rotate(degToRad(rot2));
              context.lineTo(size/2, 0);
          }

          context.closePath();
          context.fill();
          context.restore();
      }
}

function render() {
    //ctx.save();
    //ctx.scale(3,1);
    drawGears(offset);
    // ctx.restore();
}

