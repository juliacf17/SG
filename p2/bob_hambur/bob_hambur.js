
import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'
import { MTLLoader } from '../libs/MTLLoader.js'
import { OBJLoader } from '../libs/OBJLoader.js'

import { bob } from './bob.js'
import { hamburcarro } from './hamburcarro.js'
import { hamburguesa } from './hamburguesa.js'
import { plancton } from '../plancton/plancton.js'

class bob_hambur extends THREE.Object3D {
  constructor(circuitoGeometry, candidatosColision, premiosColision, _t) {
    
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
    this.colisionPlancton = false;

    this.impacto = null;


    // Colisiones por Raycasting HAMBURGUESA

    this.premios = premiosColision;
    //this.posicionH = new THREE.Vector3();
    //this.direccionH = new THREE.Vector3();
    
    //this.rayoH = new THREE.Raycaster(this.posicion, new THREE.Vector3(0,0,1), 0, distancia);

    this.hasImpactedH = false;

    this.impactoH = null;




// ---------------------------- CAJA DE COLISIÓN --------------------------- //

    this.cajaFigura = new THREE.Box3();

    var cajaVisible = new THREE.Box3Helper(this.cajaFigura, 'black');

    this.add(cajaVisible);

    cajaVisible.visible = true;



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

   getCamara3aPersona() {
    return this.camara;
  }

  getColisionConPlancton() {
    return this.colisionPlancton;
  }

  getModoVelocidad() {
    return this.modoVelocidad + " (" + Math.floor(this.velocidad*1000) + " km)";
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
                this.colisionPlancton = true;
                console.log("COLISIÓN CON PLANCTON");
            } else{
                if (this.modoVelocidad == "Alta"){
                    this.velocidad =  this.velocidad - 0.015;
                    this.modoVelocidad = "Media";
                }
                else if (this.modoVelocidad == "Media"){
                    this.velocidad =  this.velocidad - 0.015;

                    if(this.velocidad < 0.01)
                        this.velocidad = 0.01;

                    this.modoVelocidad = "Baja";
                }
                
                this.impacto = this.candidatos[i];
                this.hasImpacted = true;
            }  
        }else{
            this.hasImpacted = false;
            this.colisionPlancton = false;
        }
    }

    for (var i = 0; i < this.premios.length; i++) {
      if(this.cajaFigura.intersectsBox(this.premios[i].cajaFigura) && !this.hasImpactedH && this.premios[i] != this.impactoH){
          
        if (this.modoVelocidad == "Baja"){
            this.velocidad =  this.velocidad + 0.01;
            this.modoVelocidad = "Media";
        }
        else if (this.modoVelocidad == "Media"){
            this.velocidad = this.velocidad + 0.01;

            if(this.velocidad > 0.045)
                this.velocidad = 0.045;

            this.modoVelocidad = "Alta";
        }

          this.impactoH = this.premios[i];
          this.hasImpactedH = true;
      }else{
          this.hasImpactedH = false;
      }
  }
    
  
  }
}

export { bob_hambur };