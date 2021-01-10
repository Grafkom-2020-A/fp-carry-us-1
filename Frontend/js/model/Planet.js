import { GLTFLoader } from './../lib/GLTFLoader.js';

class Planet
{
  constructor(scene, glbPath)
  {
    this.body;
    this.path = glbPath
    this.X_ROTATION = 0.01;
    this.Y_ROTATION = 0.01;
  }

  load(scene)
  {
    const loader = new GLTFLoader();

    loader.load( this.path, function ( gltf ) {
        this.body = gltf.scene;
        scene.add( this.body );
        this.body.position.set(0, 0, 0);
        this.initCamera();
    }.bind(this));
  }

  setPosition(x,y,z) 
  {
    // this.body.position.set(x, y, z);
  }

  animate()
  {
    // this.body.rotateY(-0.3*Math.PI);
    // this.setPosition(0, 0, -100)
  }
}

export { Planet };