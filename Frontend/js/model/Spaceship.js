import { GLTFLoader } from './../lib/GLTFLoader.js';

class Spaceship {
    constructor(scene, camera) {
        const loader = new GLTFLoader();
        this.body = null;
        this.camera = camera;
        this.Z_ROTATION_BOOST = 0.000025;
        this.Z_ROTATION_RECOVERY = 0.001;
        this.X_MOVE = 0.01;
        this.Y_MOVE = 0.01;
        this.time = new Date().getTime();

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
            this.body.rotation.z += this.Z_ROTATION_BOOST * (horizontal / this.X_MOVE);
        }

        if(vertical != 0) {
            this.body.rotation.x += this.Z_ROTATION_BOOST * (vertical / this.Y_MOVE);
        }
    }

    recovery(vertical, horizontal) {
        this.body.rotation.z += horizontal;
        this.body.rotation.x += vertical;
    }

    render() {
        document.addEventListener('keydown', function (e) {
            let vertical = 0;
            let horizontal = 0;
            switch (e.key) {
                case 'a':
                    horizontal = -this.X_MOVE;
                    this.move(vertical, horizontal);
                    break;
                case 'd':
                    horizontal = this.X_MOVE;
                    this.move(vertical, horizontal);
                    break;
                case 'w':
                    vertical = this.Y_MOVE;
                    this.move(vertical, horizontal);
                    break;
                case 's':
                    vertical = -this.Y_MOVE;
                    this.move(vertical, horizontal);
                    break;
                case ' ':
                    break;
            }
        }.bind(this));

        if(this.body != null && this.time - new Date().getTime() < 1000) {
            if(this.body.rotation.z > 0.0) this.recovery(0, this.Z_ROTATION_RECOVERY * -1);
            else if(this.body.rotation.z < 0.0) this.recovery(0, this.Z_ROTATION_RECOVERY);
            else if(this.body.rotation.x > 0.0) this.recovery(this.Z_ROTATION_RECOVERY * -1, 0);
            else if(this.body.rotation.x < 0.0) this.recovery(this.Z_ROTATION_RECOVERY, 0);
            if(this.body.rotation.z == 0.0 && this.body.rotation.y == 0) this.time = new Date().getTime();
        }
    }
}

export { Spaceship };