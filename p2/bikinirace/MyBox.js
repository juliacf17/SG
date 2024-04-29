import * as THREE from '../libs/three.module.js'
import { circuito } from '../circuito/circuito.js'


class MyBox extends THREE.Object3D {
    constructor(gui,titleGui, circuitoGeometry) {
        super();
        // Se crea la parte de la interfaz que corresponde a la caja
        // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
        this.createGUI(gui,titleGui);

        this.axis = new THREE.AxesHelper (0.1);
        this.add (this.axis);

        // Un Mesh se compone de geometría y material
        var boxGeom = new THREE.BoxGeometry (0.5,0.5,0.5); //ancho, alto y largo
        boxGeom.translate(0,0.25,0);
        var boxMat = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        boxMat.flatShading = true;
        boxMat.needsUpdate = true;
     
        this.box = new THREE.Mesh (boxGeom, boxMat);


        this.circuito = circuitoGeometry;
        this.path = circuitoGeometry.parameters.path;
        this.radio = circuitoGeometry.parameters.radius;
        this.segmentos = circuitoGeometry.parameters.tubularSegments;

        this.t = 0;

        this.reloj = new THREE.Clock();

        this.rotacion = 0;

        this.velocidad = 0.01;

        this.nuevoTarget = new THREE.Vector3();

        this.createCamara3aPersona();

    }

    createGUI (gui,titleGui) {

    
    }

    createCamara3aPersona() {
        this.camara = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.box.add(this.camara);

        
        this.camara.position.set(0,1,-2);

        var puntoDeMiraRelativo = new THREE.Vector3(0,-0.1,0.5);

        var target = new THREE.Vector3();
        this.camara.getWorldPosition(target);

        target.add(puntoDeMiraRelativo);

        this.camara.lookAt(puntoDeMiraRelativo);

    }

    getCamara3aPersona() {
        return this.camara;
    }




    update () {

        // MODIFICAR CON LA VELOCIDAD
        this.t += this.reloj.getDelta() * this.velocidad;
        console.log(this.t);

        if(this.t >= 1){
            this.t = 0;
            this.velocidad *= 2;
        }

        
        this.rotacion += Math.PI * 2 /180;
        
        this.nodoPosOrientTubo = new THREE.Object3D();
        this.movLateral = new THREE.Object3D();
        this.posSuper = new THREE.Object3D();

        this.posSuper.translateY(this.radio);

        this.movLateral.rotateZ(this.rotacion);
           
        var posTmp = this.path.getPointAt(this.t);
        this.nodoPosOrientTubo.position.copy(posTmp);
        
        var tangente = this.path.getTangentAt(this.t);
        posTmp.add(tangente);
        var segmentoActual = Math.floor(this.t * this.segmentos);
        this.nodoPosOrientTubo.up = this.circuito.binormals[segmentoActual];
        this.nodoPosOrientTubo.lookAt(posTmp);
        
                         
        this.add(this.nodoPosOrientTubo);
        this.nodoPosOrientTubo.add(this.movLateral);
        this.movLateral.add(this.posSuper);
        this.posSuper.add(this.box);


        this.box.getWorldPosition(this.nuevoTarget);

        this.camara.lookAt(this.nuevoTarget);

        
  
    }
}

export { MyBox };