import * as THREE from '../lib/three.js';

class Background {
    constructor(scene, renderer) {
        let loader1 = new THREE.TextureLoader();

        let background = loader1.load(
            '../../../assets/img/galaxy_starfield.png',
            () => {
                const rt = new THREE.WebGLCubeRenderTarget(background.image.height);
                rt.fromEquirectangularTexture(renderer, background);
                scene.background = rt;
        });
    }
}


export { Background };
