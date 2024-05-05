import * as THREE from '../libs/three.module.js'
import { circuito } from '../circuito/circuito.js'


class MyBox extends THREE.Object3D {
    constructor(circuitoGeometry, candidatosColision) {
        super();
        // Se crea la parte de la interfaz que corresponde a la caja
        // Se crea primero porque otros métodos usan las variables que se definen para la interfaz

        this.axis = new THREE.AxesHelper (0.1);
        this.add (this.axis);

        // Un Mesh se compone de geometría y material
        var boxGeom = new THREE.BoxGeometry (0.25,0.25,0.25); //ancho, alto y largo
        boxGeom.translate(0,0.125,0);
        var boxMat = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        boxMat.flatShading = true;
        boxMat.needsUpdate = true;
     
        this.box = new THREE.Mesh (boxGeom, boxMat);


        this.circuito = circuitoGeometry;
        this.path = circuitoGeometry.parameters.path;
        this.radio = circuitoGeometry.parameters.radius;
        this.segmentos = circuitoGeometry.parameters.tubularSegments;

        this.t = 0; // Longitud recorrida del spline - entre 0 y 1

        this.reloj = new THREE.Clock(); // reloj para aumentar la velocidad

        this.rotacion = 0; // rotación en el tubo

        this.velocidad = 0.05; // velocidad del personaje
        

        this.nuevoTarget = new THREE.Vector3(); // nuevo target para la cámara

        this.createCamara3aPersona(); // crear cámara en 3a persona

        // Movimientos a la izquierda y derecha
        this.izquierda = false; 
        this.derecha = false;

        // Colisiones por Raycasting

        this.candidatos = candidatosColision;
        var distancia = 0.5; 
        this.posicion = new THREE.Vector3();
        this.direccion = new THREE.Vector3();
        
        this.rayo = new THREE.Raycaster(this.posicion, new THREE.Vector3(0,0,1), 0, distancia);

        this.hasImpacted = false;

        this.impacto = null;

        this.cajaFigura = new THREE.Box3();

        var cajaVisible = new THREE.Box3Helper(this.cajaFigura, 'black');
        
        this.add(cajaVisible);

        cajaVisible.visible = true;

        




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

    reduceSpeed(){
    this.velocidad = 0.001; 
    }


    update () {

        this.cajaFigura.setFromObject(this.box);

        // MODIFICAR CON LA VELOCIDAD
        this.t += this.reloj.getDelta() * this.velocidad;
        //console.log(this.t);

        if(this.t >= 1){
            this.t = 0;
            this.velocidad *= 2;
        }

        //console.log("Izquierda: " + this.izquierda);
        //console.log("Derecha: " + this.derecha);

        
        if (this.izquierda) {
            this.rotacion -= Math.PI * 2 / 180;
            if (this.rotacion < -Math.PI / 3) {
            this.rotacion = -Math.PI / 3;
            }
        } else if (this.derecha) {
            this.rotacion += Math.PI * 2 / 180;
            if (this.rotacion > Math.PI / 3) {
            this.rotacion = Math.PI / 3;
            }
        }
    
        
        //this.rotacion += Math.PI * 2 /180;
   

        //console.log(this.velocidad);

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
        
        this.box.getWorldPosition(this.posicion);

        this.nodoPosOrientTubo.getWorldDirection(this.direccion);

        for (var i = 0; i < this.candidatos.length; i++) {
            if(this.cajaFigura.intersectsBox(this.candidatos[i].cajaFigura) && !this.hasImpacted && this.candidatos[i] != this.impacto){
                console.log("COLISIÓN");
                this.velocidad =  this.velocidad * 0.5;
                this.impacto = this.candidatos[i];
                this.hasImpacted = true;
                console.log(this.hasImpacted);
            }else{
                //console.log("NO COLISIÓN");
                this.hasImpacted = false;
            }
        }

        //console.log(this.hasImpacted);
        //console.log(this.velocidad);

/*
        this.rayo.set(this.posicion, this.direccion.normalize());

        var impactados = this.rayo.intersectObjects(this.candidatos, true);

        if (impactados.length > 0) {
            console.log("IMPACTO");
        }

        if (!this.hasImpacted) {
            if (impactados.length > 0) {
                console.log(impactados[0].object);
                this.impacto = impactados[0].object;
                this.velocidad =  this.velocidad * 2;
                this.hasImpacted = true;
            }
        }else{
            if (impactados.length == 0 || impactados.length > 0 && impactados[0].object != this.impacto) {
                console.log("Cambio de impacto");
                this.hasImpacted = false;
                this.impacto = null;
            }
        }

        //console.log(this.hasImpacted);
        //console.log(this.velocidad);
*/

        

    }
}

export { MyBox };