import * as THREE from '../lib/three.js';
import { THREEx } from '../lib/THREEx.FullScreen.js';

class Camera {
    constructor() {
        this.camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 50000 );
        this.DELTA_FROM_PLANE = 300;
        this.Y_FROM_PLANE = 100;
        this.informationShowed = false;
        this.shortestPlanet = "";
        this.loadToolTip();
        this.loadControls();
        this.loadInformation();
    }

    loadToolTip() {
        let body = document.getElementsByTagName("BODY")[0]; 
        let img = document.createElement('img');
        img.src = '../../../assets/hud/help_tooltip.png';
        img.id = 'tooltip';
        body.appendChild(img);
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
        console.log(this.shortestPlanet);
    }

    render() {
        document.addEventListener('keydown', function(e) {
            if (e.key == 'f') this.toggleFullscreen();
            if (e.key == 'h') this.showControls();
            if (e.key == 'i' && this.informationShowed) this.goToPlanet();
        }.bind(this));

        document.addEventListener('keyup', function(e) {
            if (e.key == 'h') this.hideControls();
        }.bind(this));
    }
}

export { Camera };