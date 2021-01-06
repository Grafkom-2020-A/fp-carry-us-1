import { GLTFLoader } from './../lib/GLTFLoader.js';

class Spaceship {
    constructor(scene, camera) {
        const loader = new GLTFLoader();
        this.body = null;
        this.camera = camera;
        this.Z_ROTATION_BOOST = 0.0001;
        this.Z_ROTATION_RECOVERY = 0.00005;

        loader.load( '../../assets/spaceship/spaceship.glb', function ( gltf ) {
            this.body = gltf.scene;
            scene.add( this.body );
            console.log(this.body);
        }.bind(this));
    }

    move(vertical, horizontal) {
        this.body.position.x += horizontal;
        this.body.position.y += vertical;
        this.body.position.z += 0.01;

        this.camera.camera.position.z -= 0.01;
        this.camera.camera.position.x -= horizontal;
        this.camera.camera.position.y = this.body.position.y + this.camera.Y_FROM_PLANE;
        this.camera.camera.lookAt(this.body.position);

        if(horizontal != 0) {
            this.body.rotation.z += this.Z_ROTATION_BOOST * (horizontal / 0.01);
        }
    }

    recovery(vertical, horizontal) {
        while (this.body.rotation.z != 0 ) {
            this.body.rotation.z += horizontal;
        }

        while (this.body.rotation.y != 0) {
            this.body.rotation.y += vertical;
        } 
    }

    render() {
        document.addEventListener('keydown', function (e) {
            let vertical = 0;
            let horizontal = 0;
            switch (e.key) {
                case 'a':
                    horizontal = -0.01;
                    this.move(vertical, horizontal);
                    break;
                case 'd':
                    horizontal = 0.01;
                    this.move(vertical, horizontal);
                    break;
                case 'w':
                    vertical = 0.01;
                    this.move(vertical, horizontal);
                    break;
                case 's':
                    vertical = -0.01;
                    this.move(vertical, horizontal);
                    break;
                case ' ':
                    break;
            }
        }.bind(this));

        document.addEventListener('onkeyup', function (e) {
            switch (e.key) {
                case 'a':
                    this.recovery(0, this.Z_ROTATION_RECOVERY);
                    break;
                case 'd':
                    this.recovery(0, this.Z_ROTATION_RECOVERY * -1);
                    break;
                case 'w':
                    break;
                case 's':
                    break;
                case ' ':
                    break;
            }
        }.bind(this));
    }
}

export { Spaceship };