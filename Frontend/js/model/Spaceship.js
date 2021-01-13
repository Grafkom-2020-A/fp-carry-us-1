import { GLTFLoader } from './../lib/GLTFLoader.js';
import { Camera } from '../utils/Camera.js';

class Spaceship {
    constructor(scene, camera) {
        this.body;
        this.camera = camera;
        this.Z_TRANSLATION_BOOST = 10;
        this.X_ROTATION = 0.01;
        this.Y_ROTATION = 0.01;
        this.SHORTEST_DISTANCE = 1500;
        this.camera_position = null;
        this.is_stand_by = false;
        this.allPlanet = [];
        this.load(scene);
    }

    load(scene) {
        const loader = new GLTFLoader();

        loader.load( '../../assets/spaceship/spaceship.glb', function ( gltf ) {
            this.body = gltf.scene;
            scene.add( this.body );
            this.body.position.set(1000, 0, 1000);
            this.body.rotation.y = 10;
            this.body.scale.set(0.1, 0.1, 0.1)
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
        this.camera.camera.position.z = this.body.position.z - 1250;
        this.camera.camera.position.y = this.body.position.y + 100;
        // this.camera.camera.position.x = this.body.position.x - 100;
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

    getPosition()
    {
        return ("X = " + this.body.position.x + "\nY= " + this.body.position.y + "\nZ= " + this.body.position.z)
    }

    detectCollisionCubes(object){
        this.body.geometry.computeBoundingBox(); //not needed if its already calculated
        object.geometry.computeBoundingBox();
        this.body.updateMatrixWorld();
        object.updateMatrixWorld();
        
        var box1 = this.body.geometry.boundingBox.clone();
        box1.applyMatrix4(this.body.matrixWorld);

        var box2 = object.geometry.boundingBox.clone();
        box2.applyMatrix4(object.matrixWorld);

        return box1.intersectsBox(box2);
    }

    loadCamera() {
        this.camera.camera.set(this.camera_position);
        this.body.add(this.camera.camera);
        this.camera.camera.lookAt(this.body.position);
        this.readyState();
    }

    loadAllPlanet(allPlanet) {
        this.allPlanet = allPlanet;
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
            switch (e.keyCode) {
                case 65: // A
                    horizontal = this.X_ROTATION;
                    this.move(vertical, horizontal, boost);
                    break;
                case 68: // D
                    horizontal = -this.X_ROTATION;
                    this.move(vertical, horizontal, boost);
                    break;
                case 87: // W
                    vertical = -this.Y_ROTATION;
                    this.move(vertical, horizontal, boost);
                    break;
                case 83: // S
                    vertical = this.Y_ROTATION;
                    this.move(vertical, horizontal, boost);
                    break;
                case 32: // Shift
                    boost = this.Z_TRANSLATION_BOOST;
                    this.move(vertical, horizontal, boost);
                    break;
            }
        }.bind(this));

        let plane = this;

        setInterval(() => {
            let shortestExist = false;
            let shortestDistance = 999999999;
            let shortestPlanet = "";
            let planePosition = plane.body.position;

            for (let index = 0; index < plane.allPlanet.length; index++) {
                let planet = plane.allPlanet[index]
                if(!planet.body) continue
                let dist = planePosition.distanceTo(planet.body.position);
                // if(planet.name == "jupiter")
                    // console.log(planet.body.position)

                if( dist <= this.SHORTEST_DISTANCE && dist < shortestDistance) {
                    shortestExist = true;
                    shortestPlanet = planet.name;
                }
            }


            if (!shortestExist) plane.camera.hideInformation();
            else {
                plane.camera.showInformation(shortestPlanet);
            }
        }, 1000);
    }
}

export { Spaceship };