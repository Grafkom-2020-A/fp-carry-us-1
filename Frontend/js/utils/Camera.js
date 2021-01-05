import * as THREE from '../lib/three.js';

class Camera {
    constructor(scene) {
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        this.camera_pivot = new THREE.Object3D()
        let Y_AXIS = new THREE.Vector3( 0, 1, 0 );
        let vector = new THREE.Vector3( 0, 0, 0 ) ;

        this.camera.position.z = 300;
        this.camera.position.y = 40;
        this.camera_pivot.add( this.camera );
        this.camera.lookAt( this.camera_pivot.position );
        this.camera_pivot.rotateOnAxis( Y_AXIS, 22/7 ); 
        scene.add( this.camera_pivot );
        this.camera.lookAt( vector );
    }
}

export { Camera };