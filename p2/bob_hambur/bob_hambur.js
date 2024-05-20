
import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'
import { MTLLoader } from '../libs/MTLLoader.js'
import { OBJLoader } from '../libs/OBJLoader.js'

import { bob } from './bob.js'
import { hamburcarro } from './hamburcarro.js'
import { hamburguesa } from '../hamburguesa/hamburguesa.js'
import { plancton } from '../plancton/plancton.js'
import { gary } from '../gary/gary.js'

class bob_hambur extends THREE.Object3D {
  constructor(circuitoGeometry, candidatosColision, _t) {
    
    super();

    // ---------------------------- MONTAR A BOB EN EL HAMBURCARRO ---------------------------- //

    this.bob_hambur = new THREE.Group();

    this.bob = new bob();

    this.bob_hambur.add(this.bob);

    this.hamburcarro = new hamburcarro();

    this.bob_hambur.add(this.hamburcarro);

    this.bob_hambur.scale.set(0.25,0.25,0.25);


    // ---------------------------- VARIABLES ---------------------------- //

    
    this.circuito = circuitoGeometry;
    this.path = circuitoGeometry.parameters.path;
    this.radio = circuitoGeometry.parameters.radius;
    this.segmentos = circuitoGeometry.parameters.tubularSegments;

    this.t = _t; // Longitud recorrida del spline - entre 0 y 1

    this.reloj = new THREE.Clock(); // reloj para aumentar la velocidad

    this.rotacion = 0; // rotación en el tubo


    this.modoVelocidad = "Media"; // modo de velocidad
    this.velocidad = 0.025; // velocidad del personaje
    

    this.nuevoTarget = new THREE.Vector3(); // nuevo target para la cámara

    this.createCamara3aPersona(); //ñ crear cámara en 3a persona

    this.createLight(); // crear luz en la cámara

    // Movimientos a la izquierda y derecha
    this.izquierda = false; 
    this.derecha = false;

    // Colisiones por Raycasting GARY

    this.candidatos = candidatosColision;
    //var distancia = 0.5; 
    //this.posicion = new THREE.Vector3();
    //this.direccion = new THREE.Vector3();
    
    //this.rayo = new THREE.Raycaster(this.posicion, new THREE.Vector3(0,0,1), 0, distancia);

    this.hasImpacted = false;

    // Colisiones por Raycasting HAMBURGUESA

    //this.posicionH = new THREE.Vector3();
    //this.direccionH = new THREE.Vector3();
    
    //this.rayoH = new THREE.Raycaster(this.posicion, new THREE.Vector3(0,0,1), 0, distancia);

    //this.hasImpactedH = false;

    //this.impactoH = null;




// ---------------------------- CAJA DE COLISIÓN --------------------------- //

    this.cajaFigura = new THREE.Box3();

    var cajaVisible = new THREE.Box3Helper(this.cajaFigura, 'black');

    this.add(cajaVisible);

    cajaVisible.visible = false;



// ---------------------------- NODOS ---------------------------- //
    this.nodoPosOrientTubo = new THREE.Object3D();
    this.movLateral = new THREE.Object3D();
    this.posSuper = new THREE.Object3D();

    this.posSuper.translateY(this.radio);

    this.add(this.nodoPosOrientTubo);
    this.nodoPosOrientTubo.add(this.movLateral);
    this.movLateral.add(this.posSuper);
    this.posSuper.add(this.bob_hambur); 




  }

  createCamara3aPersona() {
    this.camara = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.bob_hambur.add(this.camara);

    
    this.camara.position.set(0,3,-6);

    var puntoDeMiraRelativo = new THREE.Vector3(0,-0.1,0.5);

    var target = new THREE.Vector3();
    this.camara.getWorldPosition(target);

    target.add(puntoDeMiraRelativo);

    this.camara.lookAt(puntoDeMiraRelativo);

   }

   createLight() {
    this.luzPuntual = new THREE.PointLight('white');
    this.luzPuntual.power = 5000;
    this.luzPuntual.position.set(0, 5, 0);
    this.luzPuntual.visible = false;
    this.bob_hambur.add(this.luzPuntual);
   }

   setColorLight(color) {
    this.luzPuntual.visible = true;
    this.luzPuntual.color = new THREE.Color(color);

    setTimeout(() => {
        this.luzPuntual.visible = false;
    }, 250);

    }


   getCamara3aPersona() {
    return this.camara;
  }

  getColisionConPlancton() {
    if (this.impacto instanceof plancton){
        var impactoPlancton = true;
        this.impacto = null;
        return impactoPlancton;
    }
    return false;
  }

  getVelocidadInterfaz() {
    return this.modoVelocidad + " (" + Math.floor(this.velocidad*1000) + " km/h)";
  }

  pararPersonaje() {
    this.modoVelocidad = "Parado";
    this.velocidad = 0;
  }


  update() {
    this.cajaFigura.setFromObject(this.bob_hambur);

    // MODIFICAR CON LA VELOCIDAD
    this.t += this.reloj.getDelta() * this.velocidad;
    //console.log(this.t);

    if(this.t >= 1){
        this.t = 0;
        this.velocidad *= 1.1;  //Aumenta un 10% la velocidad

        if(this.velocidad >= 0.045)
            this.velocidad = 0.045;
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

    
    
    this.movLateral.rotation.z = this.rotacion;
        
    var posTmp = this.path.getPointAt(this.t);
    this.nodoPosOrientTubo.position.copy(posTmp);
    
    var tangente = this.path.getTangentAt(this.t);
    posTmp.add(tangente);
    var segmentoActual = Math.floor(this.t * this.segmentos);
    this.nodoPosOrientTubo.up = this.circuito.binormals[segmentoActual];
    this.nodoPosOrientTubo.lookAt(posTmp);

    
    for (var i = 0; i < this.candidatos.length; i++) {
        if(this.cajaFigura.intersectsBox(this.candidatos[i].cajaFigura) && !this.hasImpacted && this.candidatos[i] != this.impacto){  

            if(this.candidatos[i] instanceof plancton){ 
                this.impactoPlancton = true;
                console.log("COLISIÓN CON PLANCTON");
                this.setColorLight('red', true);
                

            
            }else if (this.candidatos[i] instanceof hamburguesa){

                if (this.modoVelocidad != "Alta"){

                    this.velocidad =  this.velocidad + 0.010;

                    if(this.velocidad >= 0.045){
                        this.velocidad = 0.045;
                    }

                    if (this.velocidad >= 0.035){
                        this.modoVelocidad = "Alta";
                    } else if (this.velocidad >= 0.025){
                        this.modoVelocidad = "Media";
                    } else {
                        this.modoVelocidad = "Baja";
                    }

                }

                this.setColorLight('darkgreen');
                console.log("COLISIÓN CON HAMBURGUESA");


            } else if (this.candidatos[i] instanceof gary){


                if (this.modoVelocidad != "Baja"){

                    this.velocidad =  this.velocidad - 0.015;

                    if (this.velocidad <= 0.01){
                        this.velocidad = 0.01;
                    }

                    if (this.velocidad <= 0.025){
                        this.modoVelocidad = "Baja";
                    } else if (this.velocidad <= 0.035){
                        this.modoVelocidad = "Media";
                    } else {
                        this.modoVelocidad = "Alta";
                    }

                }
                this.setColorLight('red');
                console.log("COLISIÓN CON GARY");
            }

            this.impacto = this.candidatos[i];
            this.hasImpacted = true; 

        }else{
            
            this.hasImpacted = false;


        }

    }
    
  
  }
}

export { bob_hambur };