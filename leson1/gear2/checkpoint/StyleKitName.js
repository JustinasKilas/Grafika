
//// APIs you can use in your code:
//
// Available methods for drawing into <canvas> elements:
//    StyleKitName.drawGears(canvas, rotation, targetFrame*, resizing*)
//
// NOTE: 'canvas' parameter can be either a <canvas> element object, or the id of a <canvas> element in your document.
//
// NOTE: Parameters marked with the '*' symbol are optional
//
// NOTE: Possible arguments for 'resizing' parameter in drawing methods are:
//   'aspectfit': The content is proportionally resized to fit into the target rectangle.
//   'aspectfill': The content is proportionally resized to completely fill the target rectangle.
//   'stretch': The content is stretched to match the entire target rectangle.
//   'center': The content is centered in the target rectangle, but it is NOT resized.
//
// Available Utilities:
//    StyleKitName.clearCanvas(canvas)
//    StyleKitName.makeRect(x, y, width, height)


//// Create StyleKit Object
var StyleKitName = {};
(function() {

    //// Drawing Methods

    function drawGears(canvas, rotation, targetFrame, resizing) {
        //// General Declarations
        canvas = initializeCanvas(typeof canvas === 'string' ? document.getElementById(canvas) : canvas);
        var context = canvas.getContext('2d');
        var pixelRatio = canvas.paintCodePixelRatio;
        
        //// Resize to Target Frame
        context.save();
        var resizedFrame = applyResizingBehavior(resizing, makeRect(0, 0, 241, 217), targetFrame);
        context.translate(resizedFrame.x, resizedFrame.y);
        context.scale(resizedFrame.w / 241, resizedFrame.h / 217);


        //// Color Declarations
        var blue = 'rgba(53, 126, 228, 1)';
        var color = 'rgba(53, 126, 228, 1)';
        var color2 = 'rgba(0, 161, 87, 1)';
        var color3 = 'rgba(245, 180, 61, 1)';
        var color4 = 'rgba(235, 57, 49, 1)';

        //// Variable Declarations
        var rotationInverted = -rotation;

        //// Group
        context.save();
        context.translate(74.8, 78.08);
        context.rotate(-rotation * Math.PI / 180);



        //// Rectangle Drawing
        context.save();
        context.translate(-0, 0);

        roundedRect(context, -4.5, -41.5, 10, 20, 5);
        context.fillStyle = color4;
        context.fill();

        context.restore();


        //// Rectangle 2 Drawing
        context.save();
        context.translate(0, -0.01);
        context.rotate(-30 * Math.PI / 180);

        roundedRect(context, -4.5, -41.5, 10, 20, 5);
        context.fillStyle = color4;
        context.fill();

        context.restore();


        //// Rectangle 3 Drawing
        context.save();
        context.translate(0.02, 0.02);
        context.rotate(-60 * Math.PI / 180);

        roundedRect(context, -4.5, -41.5, 10, 20, 5);
        context.fillStyle = color4;
        context.fill();

        context.restore();


        //// Rectangle 4 Drawing
        context.save();
        context.translate(0.04, -0.03);
        context.rotate(-90 * Math.PI / 180);

        roundedRect(context, -4.5, -41.5, 10, 20, 5);
        context.fillStyle = color4;
        context.fill();

        context.restore();


        //// Rectangle 5 Drawing
        context.save();
        context.translate(-0, 0);
        context.rotate(-120 * Math.PI / 180);

        roundedRect(context, -4.5, -41.5, 10, 20, 5);
        context.fillStyle = color4;
        context.fill();

        context.restore();


        //// Rectangle 6 Drawing
        context.save();
        context.translate(0.01, -0.01);
        context.rotate(-150 * Math.PI / 180);

        roundedRect(context, -4.5, -41.5, 10, 20, 5);
        context.fillStyle = color4;
        context.fill();

        context.restore();


        //// Rectangle 8 Drawing
        context.save();
        context.translate(0.02, 0.01);
        context.rotate(-180 * Math.PI / 180);

        roundedRect(context, -4.5, -41.5, 10, 20, 5);
        context.fillStyle = color4;
        context.fill();

        context.restore();


        //// Rectangle 9 Drawing
        context.save();
        context.translate(0.05, -0.01);
        context.rotate(-210 * Math.PI / 180);

        roundedRect(context, -4.5, -41.5, 10, 20, 5);
        context.fillStyle = color4;
        context.fill();

        context.restore();


        //// Rectangle 10 Drawing
        context.save();
        context.translate(0.04, -0.01);
        context.rotate(120 * Math.PI / 180);

        roundedRect(context, -4.5, -41.5, 10, 20, 5);
        context.fillStyle = color4;
        context.fill();

        context.restore();


        //// Rectangle 11 Drawing
        context.save();
        context.translate(0.01, 0.02);
        context.rotate(90 * Math.PI / 180);

        roundedRect(context, -4.5, -41.5, 10, 20, 5);
        context.fillStyle = color4;
        context.fill();

        context.restore();


        //// Rectangle 12 Drawing
        context.save();
        context.translate(0.01, -0.02);
        context.rotate(60 * Math.PI / 180);

        roundedRect(context, -4.5, -41.5, 10, 20, 5);
        context.fillStyle = color4;
        context.fill();

        context.restore();


        //// Rectangle 13 Drawing
        context.save();
        context.translate(0.03, 0.01);
        context.rotate(30 * Math.PI / 180);

        roundedRect(context, -4.5, -41.5, 10, 20, 5);
        context.fillStyle = color4;
        context.fill();

        context.restore();


        //// Oval Drawing
        oval(context, -8.74, -8.93, 17.35, 17.35);
        context.fillStyle = color4;
        context.fill();




        context.restore();


        //// Group 2
        context.save();
        context.translate(120.3, 139.08);
        context.rotate(-rotationInverted * Math.PI / 180);



        //// Rectangle 7 Drawing
        context.save();
        context.translate(-0, 0);

        roundedRect(context, -4.5, -41.5, 10, 20, 5);
        context.fillStyle = color3;
        context.fill();

        context.restore();


        //// Rectangle 14 Drawing
        context.save();
        context.translate(0, -0.01);
        context.rotate(-30 * Math.PI / 180);

        roundedRect(context, -4.5, -41.5, 10, 20, 5);
        context.fillStyle = color3;
        context.fill();

        context.restore();


        //// Rectangle 15 Drawing
        context.save();
        context.translate(0.02, 0.02);
        context.rotate(-60 * Math.PI / 180);

        roundedRect(context, -4.5, -41.5, 10, 20, 5);
        context.fillStyle = color3;
        context.fill();

        context.restore();


        //// Rectangle 16 Drawing
        context.save();
        context.translate(0.04, -0.03);
        context.rotate(-90 * Math.PI / 180);

        roundedRect(context, -4.5, -41.5, 10, 20, 5);
        context.fillStyle = color3;
        context.fill();

        context.restore();


        //// Rectangle 17 Drawing
        context.save();
        context.translate(-0, 0);
        context.rotate(-120 * Math.PI / 180);

        roundedRect(context, -4.5, -41.5, 10, 20, 5);
        context.fillStyle = color3;
        context.fill();

        context.restore();


        //// Rectangle 18 Drawing
        context.save();
        context.translate(0.01, -0.01);
        context.rotate(-150 * Math.PI / 180);

        roundedRect(context, -4.5, -41.5, 10, 20, 5);
        context.fillStyle = color3;
        context.fill();

        context.restore();


        //// Rectangle 19 Drawing
        context.save();
        context.translate(0.02, 0.01);
        context.rotate(-180 * Math.PI / 180);

        roundedRect(context, -4.5, -41.5, 10, 20, 5);
        context.fillStyle = color3;
        context.fill();

        context.restore();


        //// Rectangle 20 Drawing
        context.save();
        context.translate(0.05, -0.01);
        context.rotate(-210 * Math.PI / 180);

        roundedRect(context, -4.5, -41.5, 10, 20, 5);
        context.fillStyle = color3;
        context.fill();

        context.restore();


        //// Rectangle 21 Drawing
        context.save();
        context.translate(0.04, -0.01);
        context.rotate(120 * Math.PI / 180);

        roundedRect(context, -4.5, -41.5, 10, 20, 5);
        context.fillStyle = color3;
        context.fill();

        context.restore();


        //// Rectangle 22 Drawing
        context.save();
        context.translate(0.01, 0.02);
        context.rotate(90 * Math.PI / 180);

        roundedRect(context, -4.5, -41.5, 10, 20, 5);
        context.fillStyle = color3;
        context.fill();

        context.restore();


        //// Rectangle 23 Drawing
        context.save();
        context.translate(0.01, -0.02);
        context.rotate(60 * Math.PI / 180);

        roundedRect(context, -4.5, -41.5, 10, 20, 5);
        context.fillStyle = color3;
        context.fill();

        context.restore();


        //// Rectangle 24 Drawing
        context.save();
        context.translate(0.03, 0.01);
        context.rotate(30 * Math.PI / 180);

        roundedRect(context, -4.5, -41.5, 10, 20, 5);
        context.fillStyle = color3;
        context.fill();

        context.restore();


        //// Bezier 2 Drawing
        context.beginPath();
        context.moveTo(-20.84, -2.63);
        context.bezierCurveTo(-22.18, 8.89, -13.93, 19.31, -2.41, 20.65);
        context.bezierCurveTo(9.11, 21.99, 19.54, 13.74, 20.87, 2.22);
        context.bezierCurveTo(22.21, -9.3, 13.96, -19.73, 2.44, -21.07);
        context.bezierCurveTo(-9.08, -22.41, -19.5, -14.15, -20.84, -2.63);
        context.closePath();
        context.moveTo(4.07, -35.11);
        context.bezierCurveTo(23.27, -32.88, 37.02, -15.5, 34.79, 3.7);
        context.bezierCurveTo(32.56, 22.9, 15.18, 36.65, -4.02, 34.42);
        context.bezierCurveTo(-23.22, 32.19, -36.97, 14.81, -34.74, -4.39);
        context.bezierCurveTo(-32.51, -23.59, -15.13, -37.34, 4.07, -35.11);
        context.closePath();
        context.fillStyle = color3;
        context.fill();

        context.restore();

    }
	

    //// Infrastructure

    function clearCanvas(canvas) {
        canvas = initializeCanvas(typeof canvas === 'string' ? document.getElementById(canvas) : canvas);
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    }

    // Possible arguments for 'resizing' parameter are:
    //   'aspectfit': The content is proportionally resized to fit into the target rectangle.
    //   'aspectfill': The content is proportionally resized to completely fill the target rectangle.
    //   'stretch': The content is stretched to match the entire target rectangle.
    //   'center': The content is centered in the target rectangle, but it is NOT resized.
    function applyResizingBehavior(resizing, rect, targetRect) {
        if (targetRect === undefined || equalRects(rect, targetRect) || equalRects(targetRect, makeRect(0, 0, 0, 0))) {
            return rect;
        }

        var scales = makeSize(0, 0);
        scales.w = Math.abs(targetRect.w / rect.w);
        scales.h = Math.abs(targetRect.h / rect.h);

        switch (resizing) {
            case 'aspectfit': {
                scales.w = Math.min(scales.w, scales.h);
                scales.h = scales.w;
                break;
            }
            case 'aspectfill': {
                scales.w = Math.max(scales.w, scales.h);
                scales.h = scales.w;
                break;
            }
            case 'stretch':
            case undefined:
                break;
            case 'center': {
                scales.w = 1;
                scales.h = 1;
                break;
            }
            default:
                throw 'Unknown resizing behavior "' + resizing + '". Use "aspectfit", "aspectfill", "stretch" or "center" as resizing behavior.';
        }

        var result = makeRect(Math.min(rect.x, rect.x + rect.w), Math.min(rect.y, rect.y + rect.h), Math.abs(rect.w), Math.abs(rect.h));
        result.w *= scales.w;
        result.h *= scales.h;
        result.x = targetRect.x + (targetRect.w - result.w) / 2;
        result.y = targetRect.y + (targetRect.h - result.h) / 2;
        return result;
    }

    function oval(context, x, y, w, h) {
        context.save();
        context.beginPath();
        context.translate(x, y);
        context.scale(w/2, h/2);
        context.arc(1, 1, 3.3, 0, 2*Math.PI , false);
        context.closePath();
        context.restore();
    }

    function roundedRect(context, x, y, w, h, r) {
		//ctx.rotate();
        context.beginPath();
		context.rect(x+r,y+r, r*3, r*2);
		context.closePath();
		return ;
        context.arc(x+r, y+r, r, Math.PI, 1.5*Math.PI);
        context.arc(x+w-r, y+r, r, 1.5*Math.PI, 2*Math.PI);
        context.arc(x+w-r, y+h-r, r, 0, 0.5*Math.PI);
        context.arc(x+r, y+h-r, r, 0.5*Math.PI, Math.PI);
        context.closePath();
    }

    function makeRect(x, y, w, h) {
        return { x: x, y: y, w: w, h: h };
    }

    function equalRects(r1, r2) {
        return r1.x === r2.x && r1.y === r2.y && r1.w == r2.w && r1.h === r2.h;
    }

    function makeSize(w, h) {
        return { w: w, h: h };
    }

    function initializeCanvas(canvas) {
        if ('paintCodePixelRatio' in canvas) return canvas;
        // This function should only be called once on each canvas.
        var context = canvas.getContext('2d');

        var devicePixelRatio = window.devicePixelRatio || 1;
        var backingStorePixelRatio = context.webkitBackingStorePixelRatio
            || context.mozBackingStorePixelRatio
            || context.msBackingStorePixelRatio
            || context.oBackingStorePixelRatio
            || context.backingStorePixelRatio
            || 1;

        var pixelRatio = devicePixelRatio / backingStorePixelRatio;

        canvas.style.width = canvas.width + 'px';
        canvas.style.height = canvas.height + 'px';
        canvas.width *= pixelRatio;
        canvas.height *= pixelRatio;
        canvas.paintCodePixelRatio = pixelRatio;

        context.scale(pixelRatio, pixelRatio);
        return canvas;
    }

    //// Public Interface

    // Drawing Methods
    StyleKitName.drawGears = drawGears;

    // Utilities
    StyleKitName.clearCanvas = clearCanvas;
    StyleKitName.makeRect = makeRect;

})();
