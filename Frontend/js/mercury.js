import * as THREE from './lib/three.js';
import {OrbitControls, MapControls} from './lib/OrbitControls.js';
import { Background } from './utils/Background.js';
import { Camera } from './utils/Camera.js';
import { Spaceship } from './model/Spaceship.js';
import { Planet } from './model/Planet.js';
import { TextSprites } from './utils/TextSprites.js';

let scene = new THREE.Scene();
let renderer = new THREE.WebGLRenderer();
let camera = new Camera(false);
let background = new Background(scene, renderer);

let mercury = new Planet('../../assets/space_objects/Mercury.glb');

setInterval(function(){ 
  mercury.setPosition(0, 0, 0)
  mercury.setSize(1.5)
}, 2000)

//------------------Text Sprite---------------------//
var defaultWidthForText = 450;
var canvasMinSize = 300;
var textMultiplier = 1.2;
var text = ""
var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function() {
  if (xhr.readyState === 4) {
    var resp = JSON.parse(xhr.responseText);
    text = resp['msg'];
    console.log(text)
    var spritey = TextSprites.makeTextSprite( text, 
    { fontsize: 16, fontface: "Arial", borderColor: {r:0, g:162, b:221, a:1.0} } );
    spritey.position.set(1000,0,900);
    scene.add( spritey );
  }
}

xhr.open('GET', "http://kerupuksambel.com:6900/object/mercury", true);
xhr.send('');

/**************** End Text Sprite *****************/

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//------------------Lighting---------------------// Let's put this on the sun later
var ambient = new THREE.AmbientLight( 0x404040)
scene.add(ambient)

var light2 = new THREE.PointLight(0xFFD8C0, 7, 0, 2);
light2.position.set(0, 5500, 7050)
var pointLightHelper = new THREE.PointLightHelper( light2 );

scene.add(light2,pointLightHelper);
/***************** End Lighting *****************/
var controls = new OrbitControls(camera.camera, renderer.domElement)

//----------------- GROUP ------------//
var revMercury = new THREE.Group()

setTimeout(function()
{
  revMercury.add(mercury.getBody())
  scene.add(revMercury)
}, 1500)

/***************** END GROUP ***************/

window.addEventListener('resize', function(){
  renderer.setSize( window.innerWidth, window.innerHeight )
  camera.camera.aspect = window.innerWidth / window.innerHeight
  camera.camera.updateProjectionMatrix()
})

camera.setPosition(2000, 0, 0);
camera.setLookAt(0, 0, 0);

var animate = function ()
{
  requestAnimationFrame( animate );

  mercury.animate()
  // console.log(spaceship.getPosition())
  // revMercury.rotation.y += 0.15
  renderer.render( scene, camera.camera );
};

renderer.render( scene, camera.camera );
setTimeout(() => {  animate(); }, 1500);