import { GLTFLoader } from './../lib/GLTFLoader.js';

class Planet
{
  constructor(scene, glbPath)
  {
    this.mesh;
    this.path = glbPath
    this.X_ROTATION = 0.01;
    this.Y_ROTATION = 0.01;
  }

  load(scene)
  {
    const loader = new GLTFLoader();

    loader.load( this.path, function ( gltf ) {
        this.mesh = gltf.scene.children[0];
        scene.add( this.mesh );
        this.mesh.position.set(0, 0, -10);
    }.bind(this));
  }

  setPosition(x,y,z) 
  {
    // this.body.position.set(x, y, z);
  }

  animate()
  {
    // this.mesh.rotation.y += 0.01
    // this.setPosition(0, 0, -100)
  }
}

export { Planet };