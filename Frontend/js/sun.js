import * as THREE from './lib/three.js';
import {OrbitControls, MapControls} from './lib/OrbitControls.js';
import { Background } from './utils/Background.js';
import { Camera } from './utils/Camera.js';
import { Spaceship } from './model/Spaceship.js';
import { Planet } from './model/Planet.js';

let scene = new THREE.Scene();
let renderer = new THREE.WebGLRenderer();
let camera = new Camera(scene);
let background = new Background(scene, renderer);
let spaceship = new Spaceship(scene, camera);

let sun = new Planet('../../assets/space_objects/Sun.glb');

setInterval(function(){ 
  sun.setPosition(0, 0, 0)
  sun.setSize(1.5)
}, 1500)

//------------------Text Sprite---------------------//
var defaultWidthForText = 450;
var canvasMinSize = 300;
var textMultiplier = 1.2;
var spritey = makeTextSprite( " SUN \n is \n not \n cold \n at all ", 
{ fontsize: 16, fontface: "Arial", borderColor: {r:0, g:162, b:221, a:1.0} } );
spritey.position.set(1000,0,900);
scene.add( spritey );

function getMaxWidth(context, texts)
{
    let maxWidth = 0;
    for(let i in texts)
        maxWidth = Math.max(maxWidth, context.measureText(texts[i]).width);
    return maxWidth;
}

function makeTextSprite( message, parameters )
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
  var textWidth = getMaxWidth(context, texts);

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
  roundRect(context, (size/2 - textWidth / 2) - borderThickness/2, size / 2 - fontsize/2 - totalTextHeight/2, textWidth + borderThickness, totalTextHeight + fontsize/2 , 6);

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

function roundRect(ctx, x, y, w, h, r) {
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

/**************** End Text Sprite *****************/

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//------------------Lighting---------------------// Let's put this on the sun later
var ambient = new THREE.AmbientLight( 0x404040)
scene.add(ambient)

var light2 = new THREE.PointLight(0xFFD8C0, 15, 0, 2);
light2.position.set(0, 0, 0)
var pointLightHelper = new THREE.PointLightHelper( light2 );

scene.add(light2,pointLightHelper);
/***************** End Lighting *****************/
var controls = new OrbitControls(camera.camera, renderer.domElement)

setTimeout(function()
{
  scene.add(sun.getBody())
}, 1500)

window.addEventListener('resize', function(){
  renderer.setSize( window.innerWidth, window.innerHeight )
  camera.camera.aspect = window.innerWidth / window.innerHeight
  camera.camera.updateProjectionMatrix()
})

spaceship.render();
camera.render();

var animate = function ()
{
  requestAnimationFrame( animate );

  sun.animate()
  renderer.render( scene, camera.camera );
};

renderer.render( scene, camera.camera );
setTimeout(() => {  animate(); }, 1500);