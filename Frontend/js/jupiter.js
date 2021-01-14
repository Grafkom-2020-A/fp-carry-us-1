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

let jupiter = new Planet('../../assets/space_objects/Jupiter.glb');

let Callisto = new Planet('../../assets/space_objects/Callisto.glb');
let Europa = new Planet('../../assets/space_objects/Europa.glb');
let Ganymede = new Planet('../../assets/space_objects/Ganymede.glb');
let Io = new Planet('../../assets/space_objects/Io.glb');


setInterval(function(){ 
  jupiter.setPosition(0, 0, 0)
  jupiter.setSize(1.5)

  Callisto.setPosition(0, 100, 1000)
  Callisto.setSize(0.1)

  Europa.setPosition(0, 200, 1500)
  Europa.setSize(0.1)

  Ganymede.setPosition(0, 300, 1250)
  Ganymede.setSize(0.1)

  Io.setPosition(0, 400, 1000)
  Io.setSize(0.1)
}, 1000)

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

xhr.open('GET', "http://kerupuksambel.com:6900/object/jupiter", true);
xhr.send('');

/**************** End Text Sprite *****************/

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//------------------Lighting---------------------// Let's put this on the sun later
var ambient = new THREE.AmbientLight( 0x404040)
scene.add(ambient)

var light2 = new THREE.PointLight(0xFFD8C0, 2.5, 0, 2);
light2.position.set(0, 5500, 7050)
var pointLightHelper = new THREE.PointLightHelper( light2 );

scene.add(light2,pointLightHelper);
/***************** End Lighting *****************/
var controls = new OrbitControls(camera.camera, renderer.domElement)

//----------------- GROUP ------------//
var revCal = new THREE.Group()
var revEu = new THREE.Group()
var revGan = new THREE.Group()
var revIo = new THREE.Group()

setTimeout(function()
{
  scene.add(jupiter.getBody())
  revCal.add(Callisto.getBody())
  revEu.add(Europa.getBody())
  revGan.add(Ganymede.getBody())
  revIo.add(Io.getBody())
  scene.add(revCal)
  scene.add(revEu)
  scene.add(revGan)
  scene.add(revIo)
}, 2000)

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

  jupiter.animate()
  Callisto.animate()
  Europa.animate()
  Ganymede.animate()
  Io.animate()
  // console.log(spaceship.getPosition())
  revCal.rotation.x = -0.1
  revCal.rotation.y += 0.0005

  revEu.rotation.x = 0.2
  revEu.rotation.y += 0.0015

  revGan.rotation.x = 0.3
  revGan.rotation.y += 0.0025

  revIo.rotation.x = 0.4
  revIo.rotation.y += 0.0035


  // revMars.rotation.z += 0.005
  // mars.getBody().rotation.x = 0
  // mars.getBody().rotation.y += 0.01

  renderer.render( scene, camera.camera );
};

renderer.render( scene, camera.camera );
setTimeout(() => {  animate(); }, 1500);