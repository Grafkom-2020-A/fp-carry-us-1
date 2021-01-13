import { GLTFLoader } from './../lib/GLTFLoader.js';
import * as THREE from '../lib/three.js';

class Planet
{
  constructor(glbPath, name = "planet")
  {
    this.body;
    this.path = glbPath
    this.X_ROTATION = 0.01;
    this.Y_ROTATION = 0.01;
    this.is_revoluting = true
    this.name = name
    this.load()
  }

  load()
  {
    const loader = new GLTFLoader();

    loader.load( this.path, function ( gltf ) {
      this.body = gltf.scene;
      this.body.scale.set(0.1,0.1,0.1)
      
      if(this.name == "sun")
        this.body.traverse( function ( child ) {

            if ( child instanceof THREE.Mesh) {
              child.material.emissiveIntensity = 1
              child.material.emissive = new THREE.Color(1, 1, 1)
            }

        } );
    }.bind(this))
  }

  setRevolutionStatus(status)
  {
    this.is_revoluting = status
  }

  getRevolutionStatus()
  {
    return this.is_revoluting
  }

  setPosition(x,y,z) 
  {
    this.body.position.set(x, y, z);
  }
  
  setSize(size)
  {
    this.body.scale.set(size, size, size)
  }

  getBody()
  {
    return this.body
  }
  
  animate()
  {
    if(this.body)
      this.body.rotation.y += 0.001
  }
}

export { Planet };