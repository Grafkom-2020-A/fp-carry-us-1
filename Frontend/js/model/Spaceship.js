import { GLTFLoader } from './../lib/GLTFLoader.js';

class Spaceship {
    constructor(scene, camera) {
        const loader = new GLTFLoader();
        this.body;
        this.camera = camera;
        this.Z_ROTATION_BOOST = 0.005;
        this.Z_ROTATION_RECOVERY = 0.005;
        this.Z_TRANSLATION_BOOST = 50;
        this.Z_TRANSLATION = 10;
        this.X_ROTATION = 0.01;
        this.Y_ROTATION = 0.01;
        this.time = new Date().getTime();

        loader.load( '../../assets/spaceship/spaceship.glb', function ( gltf ) {
            this.body = gltf.scene;
            scene.add( this.body );
            this.body.position.set(100, 0, 100);
            this.camera.camera.position.z = -350;
            this.camera.camera.position.y = 100;
            this.body.add(this.camera.camera);
            this.camera.camera.lookAt(this.body.position);
        }.bind(this));
    }

    move(vertical, horizontal, boost) {
        this.body.rotateX(vertical);
        this.body.rotateY(horizontal);
        this.body.translateZ(boost);

        this.camera.camera.lookAt(this.body.position);
    }

    render() {
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
                case ' ':
                    boost = this.Z_TRANSLATION;
                    this.move(vertical, horizontal, boost);
                    break;
            }
        }.bind(this));
    }
}

export { Spaceship };