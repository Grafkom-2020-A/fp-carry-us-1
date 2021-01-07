import * as THREE from '../lib/three.js';

class Camera {
    constructor(scene) {
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        this.camera_pivot = new THREE.Object3D()
        this.DELTA_FROM_PLANE = 300;
        this.Y_FROM_PLANE = 100;
    }
}

export { Camera };