import * as THREE from '../libs/three.module.js'
import { circuito } from '../circuito/circuito.js'


class MyBoxVolador extends THREE.Object3D {
    constructor(circuitoGeometry, _t) {
        super();

        var boxGeom = new THREE.BoxGeometry (0.25,0.25,0.25); //ancho, alto y largo
        boxGeom.translate(0,0.5,0);
        var boxMat = new THREE.MeshStandardMaterial({ color: 'lightpink' , transparent: true, opacity: 1.0, metalness: 0.3, roughness: 0.7});
        boxMat.flatShading = true;
        boxMat.needsUpdate = true;
     
        this.box = new THREE.Mesh (boxGeom, boxMat);
        this.geometry = boxGeom; 


        this.circuito = circuitoGeometry;
        this.path = circuitoGeometry.parameters.path;
        this.radio = circuitoGeometry.parameters.radius;
        this.segmentos = circuitoGeometry.parameters.tubularSegments;

        this.t = _t;

        this.reloj = new THREE.Clock();
        this.velocidad = 0.015;

        this.rotacion = 0;
    }

    update () {    
        
        //this.t += this.reloj.getDelta() * this.velocidad;

        if(this.t >= 1){
            this.t = 0;
        }

        //this.rotacion += Math.PI * 2 /180;
        
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
    }
}

export { MyBoxVolador };