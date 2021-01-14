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
let sun = new Planet('../../assets/space_objects/Sun.glb', "sun");
let mercury = new Planet('../../assets/space_objects/Mercury.glb', "mercury");
let venus = new Planet('../../assets/space_objects/Venus.glb', "venus");
let earth = new Planet('../../assets/space_objects/EarthClouds.glb', "earth");
let mars = new Planet('../../assets/space_objects/Mars.glb', "mars");
let jupiter = new Planet('../../assets/space_objects/Jupiter.glb', "jupiter");
let saturnus = new Planet('../../assets/space_objects/Saturn.glb', "saturnus");
let uranus = new Planet('../../assets/space_objects/Uranus.glb', "uranus");
let neptunus = new Planet('../../assets/space_objects/Neptune.glb', "neptunus");
let pluto = new Planet('../../assets/space_objects/Pluto.glb', "pluto");
let allPlanet = [];

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//------------------Lighting---------------------// Let's put this on the sun later
var ambient = new THREE.AmbientLight( 0x404040)
scene.add(ambient)

var light2 = new THREE.PointLight(0xFDFBD3, 3.2, 0, 2);
light2.position.set(0, 0, 0)
var pointLightHelper = new THREE.PointLightHelper( light2 );

scene.add(light2,pointLightHelper);
/***************** End Lighting *****************/
// var controls = new OrbitControls(camera.camera, renderer.domElement)

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

let intervalId = setInterval(() => {
  let isAllLoaded = true;
  if(!sun.getBody() ||
  !mercury.getBody() ||
  !venus.getBody() ||
  !earth.getBody() ||
  !mars.getBody() ||
  !jupiter.getBody() ||
  !saturnus.getBody() ||
  !uranus.getBody() ||
  !neptunus.getBody() ||
  !pluto.getBody()) isAllLoaded = false;

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

  sun.setPosition(0, 0, 0)
  sun.setSize(2)

  mercury.setPosition(-2000, 0, 0)
  mercury.setSize(0.1)

  venus.setPosition(-2500, 0, 0)
  venus.setSize(0.2)

  earth.setPosition(-3000, 0, 0)
  earth.setSize(0.2)

  mars.setPosition(-3500, 0, 0)
  mars.setSize(0.1)

  jupiter.setPosition(-7000, 0, 0)
  jupiter.setSize(0.75)

  saturnus.setPosition(-9500, 0, 0)
  saturnus.setSize(0.65)

  uranus.setPosition(-11000, 0, 0)
  uranus.setSize(0.3)

  neptunus.setPosition(-13000, 0, 0)
  neptunus.setSize(0.3)

  pluto.setPosition(-15000, 0, 0)
  pluto.setSize(0.1)

  if(isAllLoaded) {
    allPlanet.push(sun);
    allPlanet.push(mercury);
    allPlanet.push(venus);
    allPlanet.push(earth);
    allPlanet.push(mars);
    allPlanet.push(jupiter);
    allPlanet.push(saturnus);
    allPlanet.push(uranus);
    allPlanet.push(neptunus);
    allPlanet.push(pluto);
    spaceship.loadAllPlanet(allPlanet);
    clearInterval(intervalId);
  }
}, 1500);

setInterval(() => {
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

  revMercury.rotation.y += 1/87.97
  revVenus.rotation.y += 1/224.7
  revBumi.rotation.y += 1/365.26
  revMars.rotation.y += 1/(365*1.88)
  revJupiter.rotation.y += 1/(11.86*365)
  revSaturnus.rotation.y += 1/(29.46 * 365)
  revUranus.rotation.y += 1/(84.01*365)
  revNeptunus.rotation.y += 1/(164.79*365)
  revPluto.rotation.y += 1/(248.58*365)
}, 25);

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

  renderer.render( scene, camera.camera );
};

setTimeout(() => { animate() }, 1500); 