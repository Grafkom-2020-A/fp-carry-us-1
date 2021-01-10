import { GLTFLoader } from './../lib/GLTFLoader.js';
import { Camera } from '../utils/Camera.js';

class Spaceship {
    constructor(scene, camera) {
        const loader = new GLTFLoader();
        this.body;
        this.camera = camera;
        this.Z_TRANSLATION_BOOST = 50;
        this.X_ROTATION = 0.01;
        this.Y_ROTATION = 0.01;
        this.camera_position = null;
        this.is_stand_by = false;

        loader.load( '../../assets/spaceship/spaceship.glb', function ( gltf ) {
            this.body = gltf.scene;
            scene.add( this.body );
            this.body.position.set(100, 0, 100);
            this.initCamera();
        }.bind(this));
    }

    move(vertical, horizontal, boost) {
        if(!this.is_stand_by) {
            this.body.rotateX(vertical);
            this.body.rotateY(horizontal);
            this.body.translateZ(boost);

            this.camera.camera.lookAt(this.body.position);
        }
    }

    initCamera() {
        this.camera.camera.position.z = this.body.position.z - 450;
        this.camera.camera.position.y = this.body.position.y + 100;
        this.camera.camera.position.x = this.body.position.x - 100;
        this.body.add(this.camera.camera);
        this.camera.camera.lookAt(this.body.position);
    }

    releaseCamera() {
        this.body.remove(this.camera.camera);
        this.saveCamera();
        this.standBy();
    }

    saveCamera() {
        this.camera_position = this.camera.camera.position;
    }

    loadCamera() {
        this.camera.camera.set(this.camera_position);
        this.body.add(this.camera.camera);
        this.camera.camera.lookAt(this.body.position);
        this.readyState();
    }

    standBy() {
        this.is_stand_by = true;
    }

    readyState() {
        this.is_stand_by = false;
    }

    render() {
        this.camera.render();

        document.addEventListener('keydown', function (e) {
            let vertical = 0;
            let horizontal = 0;
            let boost = 0;
            switch (e.key) {
                case 'a':
                    horizontal = this.X_ROTATION;
                    this.move(vertical, horizontal, boost);
                    break;
                case 'd':
                    horizontal = -this.X_ROTATION;
                    this.move(vertical, horizontal, boost);
                    break;
                case 'w':
                    vertical = -this.Y_ROTATION;
                    this.move(vertical, horizontal, boost);
                    break;
                case 's':
                    vertical = this.Y_ROTATION;
                    this.move(vertical, horizontal, boost);
                    break;
                case 'Shift':
                    boost = this.Z_TRANSLATION_BOOST;
                    this.move(vertical, horizontal, boost);
                    break;
            }
        }.bind(this));
    }
}

export { Spaceship };