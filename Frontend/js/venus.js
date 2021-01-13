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

let venus = new Planet('../../assets/space_objects/Venus.glb');

setInterval(function(){ 
  venus.setPosition(0, 0, 0)
  venus.setSize(0.15)
}, 1000)


renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//------------------Lighting---------------------// Let's put this on the sun later
var ambient = new THREE.AmbientLight( 0x404040)
scene.add(ambient)

var light2 = new THREE.PointLight(0xFFD8C0, 2, 0, 2);
light2.position.set(0, 550, 750)
var pointLightHelper = new THREE.PointLightHelper( light2 );

scene.add(light2,pointLightHelper);
/***************** End Lighting *****************/
var controls = new OrbitControls(camera.camera, renderer.domElement)

//----------------- GROUP ------------//
var revVenus = new THREE.Group()

setTimeout(function()
{
  revVenus.add(venus.getBody())
  scene.add(revVenus)
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

  venus.animate()
  // console.log(spaceship.getPosition())
  // revVenus.rotation.y += 0.15
  renderer.render( scene, camera.camera );
};

renderer.render( scene, camera.camera );
setTimeout(() => {  animate(); }, 1500);