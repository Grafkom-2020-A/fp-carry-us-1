import * as THREE from './lib/three.js';
import {OrbitControls, MapControls} from './lib/OrbitControls.js';
import { Background } from './utils/Background.js';
import { Camera } from './utils/Camera.js';
import { Spaceship } from './model/Spaceship.js';
import { Planet } from './model/Planet.js';
import { TextSprites } from './utils/TextSprites.js';

let scene = new THREE.Scene();
let renderer = new THREE.WebGLRenderer();
let camera = new Camera(scene);
let background = new Background(scene, renderer);
let spaceship = new Spaceship(scene, camera);

let neptune = new Planet('../../assets/space_objects/Neptune.glb');

setInterval(function(){ 
  neptune.setPosition(0, 0, 0)
  neptune.setSize(1.5)
}, 1000)

//------------------Text Sprite---------------------//
var defaultWidthForText = 450;
var canvasMinSize = 300;
var textMultiplier = 1.2;
var spritey = TextSprites.makeTextSprite( " neptune \n is \n not \n an \n alien \n race's \n base. ", 
{ fontsize: 16, fontface: "Arial", borderColor: {r:0, g:162, b:221, a:1.0} } );
spritey.position.set(1000,0,900);
scene.add( spritey );

/**************** End Text Sprite *****************/


renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//------------------Lighting---------------------// Let's put this on the sun later
var ambient = new THREE.AmbientLight( 0x404040)
scene.add(ambient)

var light2 = new THREE.PointLight(0xFFD8C0, 3, 0, 2);
light2.position.set(0, 5500, 7050)
var pointLightHelper = new THREE.PointLightHelper( light2 );

scene.add(light2,pointLightHelper);
/***************** End Lighting *****************/
var controls = new OrbitControls(camera.camera, renderer.domElement)

//----------------- GROUP ------------//
var revNeptune = new THREE.Group()

setTimeout(function()
{
  scene.add(neptune.getBody())
  // revneptune.add(moon.getBody())
  scene.add(revNeptune)
}, 1000)

/***************** END GROUP ***************/

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

  neptune.animate()
  // console.log(spaceship.getPosition())
  revNeptune.rotation.x += 0.01
  revNeptune.rotation.y += 0.05
  // revneptune.rotation.z += 0.005
  // neptune.getBody().rotation.x = 0
  // neptune.getBody().rotation.y += 0.01

  renderer.render( scene, camera.camera );
};

renderer.render( scene, camera.camera );
setTimeout(() => {  animate(); }, 1500);