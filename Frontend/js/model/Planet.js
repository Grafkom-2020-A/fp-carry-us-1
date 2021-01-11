import { GLTFLoader } from './../lib/GLTFLoader.js';

class Planet
{
  constructor(scene, glbPath)
  {
    this.body;
    this.path = glbPath
    this.X_ROTATION = 0.01;
    this.Y_ROTATION = 0.01;
    this.load(scene)
  }

  load(scene)
  {
    const loader = new GLTFLoader();

    loader.load( this.path, function ( gltf ) {
      this.body = gltf.scene;
      scene.add( this.body );
      this.body.scale.set(0.1,0.1,0.1)
      this.body.position.set(50, 0, -50);
    }.bind(this))
  }

  handle_load(gltf)
  {
    console.log(gltf);
    this.body = gltf.scene;
    scene.add( this.body );
    this.body.position.z = -10;
}

  setPosition(x,y,z) 
  {
    this.body.position.set(x, y, z);
  }
  
  setSize(size)
  {
    this.body.scale.set(size, size, size)
  }
  
  animate()
  {
    this.body.rotation.y += 0.01
  }
}

export { Planet };