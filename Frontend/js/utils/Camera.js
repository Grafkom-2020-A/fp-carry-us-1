import * as THREE from '../lib/three.js';
import { THREEx } from '../lib/THREEx.FullScreen.js';

class Camera {
    constructor(scene) {
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        this.camera_pivot = new THREE.Object3D()
        this.DELTA_FROM_PLANE = 300;
        this.Y_FROM_PLANE = 100;
    }

    toggleFullscreen() {
        if(THREEx.FullScreen.activated()) THREEx.FullScreen.cancel();
        else THREEx.FullScreen.request();
    }

    render() {
        document.addEventListener('keydown', function(e) {
            if (e.key == 'f') this.toggleFullscreen();
        }.bind(this));
    }
}

export { Camera };