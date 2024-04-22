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

        this.rotacion = 0;


    }

    createGUI (gui,titleGui) {

    
    }
    update () {




        // MODIFICAR CON LA VELOCIDAD
        this.t += 0.0001;
        if(this.t >= 1) this.t = 0;

        if(this.rotacion >= Math.PI * 2) this.rotacion = 0;
        this.rotacion += Math.PI * 2 /180;
        
        this.nodoPosOrientTubo = new THREE.Object3D();
        this.movLateral = new THREE.Object3D();
        this.posSuper = new THREE.Object3D();

        this.posSuper.translateY(this.radio+ 0.5);

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

export { MyBox };

/*

OTRA FORMA DE CAMBIAR POSICIÓN / ESCALADO / ROTACIÓN -> CON UN SET

createGUI (gui,titleGui) {
    // Controles para el movimiento de la parte móvil
    this.guiControls = {
    escalado : 1        //Valor inicial del escalado. 
    } 
    
    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder (titleGui);
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    folder.add (this.guiControls, 'escalado', 0.5, 5, 0.1)
    .name ('Escalado : ')
    .onChange ( (value) => this.setTamanio(value));
}

setTamanio(value){
    this.cubo.scale.set(value, value, value); 
}


*/