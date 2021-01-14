import * as THREE from '../lib/three.js';


let TextSprites = {};
let defaultWidthForText = 450;
let canvasMinSize = 300;
let textMultiplier = 1.2;

TextSprites.getMaxWidth = function(context, texts)
{
    let maxWidth = 0;
    for(let i in texts)
        maxWidth = Math.max(maxWidth, context.measureText(texts[i]).width);

    return maxWidth;
};

TextSprites.roundRect = function(ctx, x, y, w, h, r){
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

TextSprites.makeTextSprite = function( message, parameters )
{
	if ( parameters === undefined ) parameters = {};
	
	var fontface = parameters.hasOwnProperty("fontface") ? 
		parameters["fontface"] : "Arial";
	
	var fontsize = parameters.hasOwnProperty("fontsize") ? 
		parameters["fontsize"] : 18;
	
	var borderThickness = parameters.hasOwnProperty("borderThickness") ? 
		parameters["borderThickness"] : 4;
	
	var borderColor = parameters.hasOwnProperty("borderColor") ?
		parameters["borderColor"] : { r:0, g:0, b:0, a:1.0 };
	
	var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?
		parameters["backgroundColor"] : { r:255, g:255, b:255, a:0.0 };


		
	var canvas = document.createElement('canvas');
	var context = canvas.getContext('2d');
	context.font = "Bold " + fontsize + "px " + fontface;
    
    var texts = message.split('\n');
    var totalLine = texts.length;
    var textWidth = TextSprites.getMaxWidth(context, texts);

    // setting canvas size
    var size = Math.max(canvasMinSize, textWidth + 2 * borderThickness);
    canvas.width = size;
    canvas.height = size;
    context.font = "Bold " + fontsize + "px " + fontface;
	
	// background color
	context.fillStyle   = "rgba(" + backgroundColor.r + "," + backgroundColor.g + ","
                                + backgroundColor.b + "," + backgroundColor.a + ")";
	// border color
	context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + ","
                                + borderColor.b + "," + borderColor.a + ")";

    context.lineWidth = borderThickness;
    // let totalTextHeight = fontsize * textMultiplier * totalLine;
	// roundRect(context, borderThickness/2, borderThickness/2, textWidth + borderThickness, fontsize * 1.4 + borderThickness, 6);
    let totalTextHeight = fontsize * textMultiplier * totalLine;
    TextSprites.roundRect(context, (size/2 - textWidth / 2) - borderThickness/2, size / 2 - fontsize/2 - totalTextHeight/2, textWidth + borderThickness, totalTextHeight + fontsize/2 , 6);

    // 1.4 is extra height factor for text below baseline: g,j,p,q.
	
	// text color
	context.fillStyle = "rgba(255, 255, 255, 1.0)";

    let startY = size / 2  - totalTextHeight/2 + fontsize/2 ;
    for(var i = 0; i < totalLine; i++) {
        let curWidth = context.measureText(texts[i]).width;
        context.fillText(texts[i], size/2 - curWidth/2, startY + fontsize * i * textMultiplier);
    }
	// context.fillText( message, borderThickness, fontsize + borderThickness);
	
	// canvas contents will be used for a texture
	var texture = new THREE.Texture(canvas) 
	texture.needsUpdate = true;

	var spriteMaterial = new THREE.SpriteMaterial( 
		{ map: texture} );
	var sprite = new THREE.Sprite( spriteMaterial );
	sprite.scale.set(1000,1000,1.0);
	return sprite;	
}

export { TextSprites };