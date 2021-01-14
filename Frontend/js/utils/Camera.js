import * as THREE from '../lib/three.js';
import { THREEx } from '../lib/THREEx.FullScreen.js';

class Camera {
    constructor(tooltipVisible = true) {
        this.camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 500000 );
        this.DELTA_FROM_PLANE = 300;
        this.Y_FROM_PLANE = 100;
        this.informationShowed = false;
        this.shortestPlanet = "";
        if (tooltipVisible) {
            this.loadToolTip();
            this.loadControls();
            this.loadInformation();
        }
    }

    loadToolTip() {
        let body = document.getElementsByTagName("BODY")[0]; 
        let img = document.createElement('img');
        img.src = '../../../assets/hud/help_tooltip.png';
        img.id = 'tooltip';
        body.appendChild(img);
    }
    
    hideToolTip() {
        let toolTip = document.getElementById('tooltip');
        tootTip.style.visibility = 'hidden';
    }

    loadControls() {
        let body = document.getElementsByTagName("BODY")[0]; 
        let img = document.createElement('img');
        img.src = '../../../assets/hud/controls.png';
        img.id = 'controls';
        body.appendChild(img);
    }

    loadInformation() {
        let body = document.getElementsByTagName("BODY")[0]; 
        let img = document.createElement('img');
        img.src = '../../../assets/hud/info.png';
        img.id = 'info';
        body.appendChild(img);
    }

    showInformation(planetName) {
        this.informationShowed = true;
        this.shortestPlanet = planetName;
        let img = document.getElementById("info"); 
        img.style.visibility = "visible"; 
    }

    hideInformation() {
        this.informationShowed = false;
        let img = document.getElementById("info"); 
        img.style.visibility = "hidden"; 
    }

    showControls() {
        let img = document.getElementById("controls"); 
        img.style.visibility = "visible"; 
    }

    hideControls() {
        let img = document.getElementById("controls"); 
        img.style.visibility = "hidden"; 
    }

    toggleFullscreen() {
        if(THREEx.FullScreen.activated()) THREEx.FullScreen.cancel();
        else THREEx.FullScreen.request();
    }

    goToPlanet() {
        window.open(window.location.href + this.shortestPlanet + '.html', "_blank"); 
    }

    setPosition(x, y, z) {
        this.camera.position.x = x
        this.camera.position.y = y
        this.camera.position.z = z
    }

    setLookAt(x, y, z) {
        this.camera.lookAt(new THREE.Vector3(x, y, z))
    }

    render() {
        document.addEventListener('keydown', function(e) {
            if (e.key == 'f' || e.key == 'F') this.toggleFullscreen();
            if (e.key == 'h' || e.key == 'H') this.showControls();
            if ((e.key == 'i' || e.key == 'I') && this.informationShowed) this.goToPlanet();
        }.bind(this));

        document.addEventListener('keyup', function(e) {
            if (e.key == 'h' || e.key == 'H') this.hideControls();
        }.bind(this));
    }
}

export { Camera };