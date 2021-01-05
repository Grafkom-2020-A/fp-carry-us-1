import * as THREE from './lib/three';
import { OrbitControls } from './lib/OrbitControls';
import { GLTFLoader } from './lib/GLTFLoader';

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
let renderer
