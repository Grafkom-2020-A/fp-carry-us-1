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

let mercury = new Planet('../../assets/space_objects/Mercury.glb');
let venus = new Planet('../../assets/space_objects/Venus.glb');
let earth = new Planet('../../assets/space_objects/Earth.glb');
let mars = new Planet('../../assets/space_objects/Mars.glb');
let jupiter = new Planet('../../assets/space_objects/Jupiter.glb');
let saturnus = new Planet('../../assets/space_objects/Saturn.glb');
let uranus = new Planet('../../assets/space_objects/Uranus.glb');
let neptunus = new Planet('../../assets/space_objects/Neptune.glb');
let pluto = new Planet('../../assets/space_objects/Pluto.glb');


setInterval(function(){ 
  sun.setPosition(0, 0, 0)
  sun.setSize(0.15)

  mercury.setPosition(-150, 0, 0)
  mercury.setSize(0.05)
  
  venus.setPosition(-250, 0, 0)
  venus.setSize(0.05)
  
  earth.setPosition(-350, 0, 0)
  earth.setSize(0.05)

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
}, 1500)


renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//------------------Lighting---------------------// Let's put this on the sun later
var ambient = new THREE.AmbientLight( 0x404040)
scene.add(ambient)

var light2 = new THREE.PointLight(0xFFD8C0, 5, 0, 2);
light2.position.set(0, 0, 0)
var pointLightHelper = new THREE.PointLightHelper( light2 );

scene.add(light2,pointLightHelper);
/***************** End Lighting *****************/
var controls = new OrbitControls(camera.camera, renderer.domElement)

//----------------- GROUP ------------//
var revMercury = new THREE.Group()
var revVenus = new THREE.Group()
var revBumi = new THREE.Group()
var revMars = new THREE.Group()
var revJupiter = new THREE.Group()
var revSaturnus = new THREE.Group()
var revUranus = new THREE.Group()
var revNeptunus = new THREE.Group()
var revPluto = new THREE.Group()

setTimeout(function()
{
  revMercury.add(sun.getBody(), mercury.getBody())
  scene.add(revMercury)

  revVenus.add(sun.getBody(), venus.getBody())
  scene.add(revVenus)

  revBumi.add(sun.getBody(), earth.getBody())
  scene.add(revBumi)

  revMars.add(sun.getBody(), mars.getBody())
  scene.add(revMars)

  revJupiter.add(sun.getBody(), jupiter.getBody())
  scene.add(revJupiter)

  revSaturnus.add(sun.getBody(), saturnus.getBody())
  scene.add(revSaturnus)

  revUranus.add(sun.getBody(), uranus.getBody())
  scene.add(revUranus)

  revNeptunus.add(sun.getBody(), neptunus.getBody())
  scene.add(revNeptunus)

  revPluto.add(sun.getBody(), pluto.getBody())
  scene.add(revPluto)


}, 1500)

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

  sun.animate()
  mercury.animate()
  venus.animate()
  earth.animate()
  mars.animate()
  jupiter.animate()
  saturnus.animate()
  uranus.animate()
  neptunus.animate()
  pluto.animate()

  revMercury.rotation.y += 0.15
  revVenus.rotation.y += 0.075
  revBumi.rotation.y += 0.05
  revMars.rotation.y += 0.025
  revJupiter.rotation.y += 0.00375
  revSaturnus.rotation.y += 0.001875
  revUranus.rotation.y += 0.00046875
  revNeptunus.rotation.y += 0.000234375
  revPluto.rotation.y += 0.0001171875

  renderer.render( scene, camera.camera );
};

renderer.render( scene, camera.camera );
setTimeout(() => {  animate(); }, 1500);