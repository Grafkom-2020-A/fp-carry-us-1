import * as THREE from './lib/three.js';
import {OrbitControls, MapControls} from './lib/OrbitControls.js';
import { Background } from './utils/Background.js';
import { Camera } from './utils/Camera.js';
import { Spaceship } from './model/Spaceship.js';
import { Planet } from './model/Planet.js';

let scene = new THREE.Scene();
let renderer = new THREE.WebGLRenderer();
let camera = new Camera();
let background = new Background(scene, renderer);
let spaceship = new Spaceship(scene, camera);
let sun = new Planet(scene, '../assets/space_objects/Sun.glb');

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//------------------Lighting---------------------// Let's put this on the sun later
var light2 = new THREE.PointLight(0xFFD8C0, 7, 0, 2);
light2.position.set(50, 100,-50)
var pointLightHelper = new THREE.PointLightHelper( light2 );

scene.add(light2,pointLightHelper);
/***************** End Lighting *****************/
var controls = new OrbitControls(camera.camera, renderer.domElement)


window.addEventListener('resize', function(){
  renderer.setSize( window.innerWidth, window.innerHeight )
  camera.camera.aspect = window.innerWidth / window.innerHeight
  camera.camera.updateProjectionMatrix()
})

spaceship.render();
camera.render();

var animate = function () {
  requestAnimationFrame( animate );
  // sun.render();
  sun.animate()
  renderer.render( scene, camera.camera );
};

renderer.render( scene, camera.camera );
animate();