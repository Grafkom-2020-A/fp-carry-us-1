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

let sun = new Planet(scene, '../../assets/space_objects/Sun.glb');

let mercury = new Planet(scene, '../../assets/space_objects/Mercury.glb');
let venus = new Planet(scene, '../../assets/space_objects/Venus.glb');
let earth = new Planet(scene, '../../assets/space_objects/Earth.glb');
let moon = new Planet(scene, '../../assets/space_objects/Moon.glb');
let mars = new Planet(scene, '../../assets/space_objects/Mars.glb');
let jupiter = new Planet(scene, '../../assets/space_objects/Jupiter.glb');
let saturnus = new Planet(scene, '../../assets/space_objects/Saturn.glb');
let uranus = new Planet(scene, '../../assets/space_objects/Uranus.glb');
let neptunus = new Planet(scene, '../../assets/space_objects/Neptune.glb');
let pluto = new Planet(scene, '../../assets/space_objects/Pluto.glb');


setInterval(function(){ 
  sun.setPosition(0, 0, 0)
  sun.setSize(0.15)

  mercury.setPosition(-150, 0, 0)
  mercury.setSize(0.05)
  
  venus.setPosition(-250, 0, 0)
  venus.setSize(0.05)
  
  earth.setPosition(-350, 0, 0)
  earth.setSize(0.05)

  moon.setPosition(-375, 0, 0)
  moon.setSize(0.01)
  
  mars.setPosition(-450, 0, 0)
  mars.setSize(0.05)

  jupiter.setPosition(-550, 0, 0)
  jupiter.setSize(0.08)

  saturnus.setPosition(-650, 0, 0)
  saturnus.setSize(0.05)

  uranus.setPosition(-750, 0, 0)
  uranus.setSize(0.05)

  neptunus.setPosition(-850, 0, 0)
  neptunus.setSize(0.05)

  pluto.setPosition(-950, 0, 0)
  pluto.setSize(0.03)
}, 1000)


renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//------------------Lighting---------------------// Let's put this on the sun later
var ambient = new THREE.AmbientLight( 0x404040)
scene.add(ambient)

var light2 = new THREE.PointLight(0xFFD8C0, 7, 0, 2);
light2.position.set(0, 0, 0)
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

var animate = function ()
{
  requestAnimationFrame( animate );
  if(sun) sun.animate()
  if(mercury) mercury.animate()
  if(venus) venus.animate()
  if(earth) earth.animate()
  if(moon) moon.animate()
  if(mars) mars.animate()
  if(jupiter) jupiter.animate()
  if(saturnus) saturnus.animate()
  if(uranus) uranus.animate()
  if(neptunus) neptunus.animate()
  if(pluto) pluto.animate()
  renderer.render( scene, camera.camera );
};

renderer.render( scene, camera.camera );
animate();