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

    move(vertical, horizontal) {
        this.body.rotateX(vertical);
        this.body.rotateY(horizontal);
        this.body.translateZ((vertical != 0 || horizontal != 0)?this.Z_TRANSLATION:this.Z_TRANSLATION_BOOST);

        let z_rotation = parseFloat(this.body.rotation.z).toFixed(2);

        if(horizontal != 0 && z_rotation < 0.25 && z_rotation > -0.25) {
            this.body.rotateZ(this.Z_ROTATION_BOOST * -(horizontal/this.X_ROTATION));
        }

        this.camera.camera.lookAt(this.body.position);
    }

    recovery() {
        if(parseFloat(this.body.rotation.z).toFixed(2) != 0.00) {
            let interval_id = setInterval(() => {
                let z_rotation = parseFloat(this.body.rotation.z).toFixed(2);

                if (z_rotation < 0) this.body.rotateZ(this.Z_ROTATION_RECOVERY);
                else if(z_rotation > 0) this.body.rotateZ(-this.Z_ROTATION_RECOVERY);

                if(z_rotation == 0.00) {
                    this.body.rotation.z = 0;
                    clearInterval(interval_id);
                }
            }, 100);
        }
    }

    render() {
        document.addEventListener('keydown', function (e) {
            let vertical = 0;
            let horizontal = 0;
            switch (e.key) {
                case 'a':
                    horizontal = this.X_ROTATION;
                    this.move(vertical, horizontal);
                    break;
                case 'd':
                    horizontal = -this.X_ROTATION;
                    this.move(vertical, horizontal);
                    break;
                case 'w':
                    vertical = -this.Y_ROTATION;
                    this.move(vertical, horizontal);
                    break;
                case 's':
                    vertical = this.Y_ROTATION;
                    this.move(vertical, horizontal);
                    break;
                case ' ':
                    this.move(vertical, horizontal);
                    break;
            }
        }.bind(this));

        document.addEventListener('keyup', function(e) {
            this.recovery();
        }.bind(this));
    }
}

export { Spaceship };