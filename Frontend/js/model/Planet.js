import { GLTFLoader } from './../lib/GLTFLoader.js';

class Planet
{
  constructor(scene, glbPath)
  {
    const loader = new GLTFLoader();
    this.body;
    this.Z_TRANSLATION_BOOST = 50;
    this.X_ROTATION = 0.01;
    this.Y_ROTATION = 0.01;

    loader.load( glbPath, function ( gltf ) {
        this.body = gltf.scene;
        scene.add( this.body );
    }.bind(this));
  }

  setPosition(x,y,z) 
  {
    this.body.position.set(x, y, z);
  }


  readyState()
  {
    this.is_stand_by = false;
  }

  animate()
  {
    this.body.rotation.y += this.Y_ROTATION;
  }
}

export { Planet };