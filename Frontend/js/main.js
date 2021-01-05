import * as THREE from './lib/three.js';
import { GLTFLoader } from './lib/GLTFLoader.js';
import { Background } from './utils/Background.js';
import { Camera } from './utils/Camera.js';

let scene = new THREE.Scene();
let renderer = new THREE.WebGLRenderer();
let camera = new Camera(scene);
let background = new Background(scene, renderer);
// console.log(camera.camera);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//------------------Lighting---------------------//
var light2 = new THREE.PointLight(0xFFD8C0, 7, 0, 2);
light2.position.set(50, 100,-50)
scene.add(light2);
/***************** End Lighting *****************/

const loader = new GLTFLoader();

loader.load( '../../assets/spaceship/spaceship.glb', function ( gltf ) {
    scene.add( gltf.scene );
});

window.addEventListener('resize', function(){
  renderer.setSize( window.innerWidth, window.innerHeight )
  camera.camera.aspect = window.innerWidth / window.innerHeight
  camera.camera.updateProjectionMatrix()
})

var animate = function () {
  requestAnimationFrame( animate );
  //if ( spotLightHelper ) spotLightHelper.update();
  renderer.render( scene, camera.camera );
};

renderer.render( scene, camera.camera );
animate();