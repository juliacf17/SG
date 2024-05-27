
import * as THREE from '../../../libs/three.module.js'
import { CSG } from '../../../libs/CSG-v2.js'
import { bob_hambur } from '../bob_hambur/bob_hambur.js'
import { hamburguesa } from '../hamburguesa/hamburguesa.js';
import { gary } from '../gary/gary.js';

class plancton_multi extends THREE.Object3D {
  constructor(circuitoGeometry, candidatosColision, _t) {
    
    super();

    this.plancton = new THREE.Group();

    var mat = new THREE.MeshStandardMaterial({ color: 'green', side: THREE.DoubleSide });

    // ---------------------------- TORSO ---------------------------- //

    var torsoShape = new THREE.Shape();

    torsoShape.moveTo(0,-0.6);
    torsoShape.quadraticCurveTo(-0.2,-0.6,-0.2,-0.4);
    torsoShape.lineTo(-0.2,0.4);
    torsoShape.quadraticCurveTo(-0.2,0.6,0,0.6);

    var points = torsoShape.getPoints();
    this.torsoGeom = new THREE.LatheGeometry(points, 20, 0, Math.PI * 2);
    
    this.torso = new THREE.Mesh(this.torsoGeom, mat);

    this.plancton.add(this.torso);

    // ---------------------------- PIERNAS ---------------------------- //


    this.piernasGeom = new THREE.LatheGeometry(points, 20, 0, Math.PI * 2);

    this.piernasGeom.scale(0.2,0.25,0.2);

    this.pierna1 = new THREE.Mesh(this.piernasGeom, mat);

    this.pierna1.translateY(-0.6);
    this.pierna1.translateX(-0.1);


    this.plancton.add(this.pierna1);

  
    this.piernasGeom2 = new THREE.LatheGeometry(points, 20, 0, Math.PI * 2);

    this.piernasGeom2.scale(0.2,0.25,0.2);
    

    this.pierna2 = new THREE.Mesh(this.piernasGeom2, mat);

    this.pierna2.translateY(-0.6);
    this.pierna2.translateX(0.1);

    this.plancton.add(this.pierna2);

    // ---------------------------- BRAZOS ---------------------------- //

    this.brazosGeom = new THREE.LatheGeometry(points, 20, 0, Math.PI * 2);

    
    this.brazosGeom.scale(0.25,0.5,0.25);
    this.brazosGeom.translate(0,-0.3,0);
    this.brazosGeom.rotateZ(THREE.MathUtils.degToRad(-30));
    this.brazosGeom.translate(-0.15,0,0);

    this.brazo1 = new THREE.Mesh(this.brazosGeom, mat);

    this.brazosGeom2 = new THREE.LatheGeometry(points, 20, 0, Math.PI * 2);

    this.brazosGeom2.scale(0.25,0.5,0.25);
    this.brazosGeom2.translate(0,-0.3,0);
    this.brazosGeom2.rotateZ(THREE.MathUtils.degToRad(30));
    this.brazosGeom2.translate(0.15,0,0);

    this.brazo2 = new THREE.Mesh(this.brazosGeom2, mat);

    this.plancton.add(this.brazo1);

    //this.add(this.brazo1);

    this.plancton.add(this.brazo2);


    // ---------------------------- ANTENAS ---------------------------- //


    this.antenaGeom = new THREE.CylinderGeometry(0.005,0.05,0.7,20);

    this.antena1 = new THREE.Mesh(this.antenaGeom, mat);

    this.anilloAntenaGeom1 = new THREE.TorusGeometry(0.05,0.01,16,100);
    this.anilloAntenaGeom1.rotateX(THREE.MathUtils.degToRad(90));
    this.anilloAntenaGeom1.translate(0,0.15,0);

    this.anilloAntena1 = new THREE.Mesh(this.anilloAntenaGeom1, mat);
    this.antena1.add(this.anilloAntena1);

    this.anilloAntenaGeom2 = new THREE.TorusGeometry(0.05,0.01,16,100);
    this.anilloAntenaGeom2.rotateX(THREE.MathUtils.degToRad(90));
    this.anilloAntenaGeom2.translate(0,-0.15,0);

    this.anilloAntena2 = new THREE.Mesh(this.anilloAntenaGeom2, mat);
    this.antena1.add(this.anilloAntena2);

    this.anilloAntenaGeom3 = new THREE.TorusGeometry(0.05,0.01,16,100);
    this.anilloAntenaGeom3.rotateX(THREE.MathUtils.degToRad(90));

    this.anilloAntena3 = new THREE.Mesh(this.anilloAntenaGeom3, mat);
    this.antena1.add(this.anilloAntena3);

    this.antena1.translateY(0.9);
    this.antena1.translateX(-0.20);
    this.antena1.rotateZ(THREE.MathUtils.degToRad(20));

    this.plancton.add(this.antena1);

    // Antena 2

    this.antena2 = new THREE.Mesh(this.antenaGeom, mat);

    this.anilloAntenaGeom4 = new THREE.TorusGeometry(0.05,0.01,16,100);
    this.anilloAntenaGeom4.rotateX(THREE.MathUtils.degToRad(90));
    this.anilloAntenaGeom4.translate(0,0.15,0);

    this.anilloAntena4 = new THREE.Mesh(this.anilloAntenaGeom4, mat);
    this.antena2.add(this.anilloAntena4);

    this.anilloAntenaGeom5 = new THREE.TorusGeometry(0.05,0.01,16,100);
    this.anilloAntenaGeom5.rotateX(THREE.MathUtils.degToRad(90));
    this.anilloAntenaGeom5.translate(0,-0.15,0);

    this.anilloAntena5 = new THREE.Mesh(this.anilloAntenaGeom5, mat);
    this.antena2.add(this.anilloAntena5);

    this.anilloAntenaGeom6 = new THREE.TorusGeometry(0.05,0.01,16,100);
    this.anilloAntenaGeom6.rotateX(THREE.MathUtils.degToRad(90));

    this.anilloAntena6 = new THREE.Mesh(this.anilloAntenaGeom6, mat);
    this.antena2.add(this.anilloAntena6);

    this.antena2.translateY(0.9);
    this.antena2.translateX(0.20);
    this.antena2.rotateZ(THREE.MathUtils.degToRad(-20));

    this.plancton.add(this.antena2);


    // ---------------------------- OJOS ---------------------------- //

    this.ojoGeom = new THREE.SphereGeometry(0.15,32,32);
    var ojoMat = new THREE.MeshBasicMaterial({ color: 'white' });

    this.ojo1 = new THREE.Mesh(this.ojoGeom, ojoMat);

    this.ojo1.translateY(0.3);
    this.ojo1.translateZ(0.1);

    this.plancton.add(this.ojo1);

    this.pupilaGeom = new THREE.SphereGeometry(0.05,32,32);
    var pupilaMat = new THREE.MeshBasicMaterial({ color: 'red' });

    this.pupila1 = new THREE.Mesh(this.pupilaGeom, pupilaMat);

    this.pupila1.translateY(0.3);
    this.pupila1.translateZ(0.25);

    this.plancton.add(this.pupila1);

 
    this.add(this.plancton);

    this.plancton.scale.set(0.2,0.2,0.2);
    this.plancton.translateY(0.15);


    // ---------------------------- VARIABLES ---------------------------- //

    
    this.circuito = circuitoGeometry;
    this.path = circuitoGeometry.parameters.path;
    this.radio = circuitoGeometry.parameters.radius;
    this.segmentos = circuitoGeometry.parameters.tubularSegments;

    this.t = _t;  // Longitud recorrida del spline - entre 0 y 1

    this.reloj = new THREE.Clock(); // reloj para aumentar la velocidad

    this.rotacion = 0; // rotación en el tubo



    this.modoVelocidad = "Media"; // modo de velocidad
    this.velocidad = 0; 

    setTimeout(() => {
      this.velocidad = 0.025;
    }, 3000);


    this.nuevoTarget = new THREE.Vector3(); // nuevo target para la cámara

    this.createCamara3aPersona(); //crear cámara en 3a persona

    this.createLight(); // crear luz en la cámara

    // Movimientos a la izquierda y derecha
    this.izquierda = false; 
    this.derecha = false;


    this.candidatos = candidatosColision;

    this.hasImpacted = false;

    this.impactoSpawn = true;


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
    this.posSuper.add(this.plancton); 


    this.pierna1HaciaDelante = true;
  }

  createCamara3aPersona() {
    this.camara = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.plancton.add(this.camara);

    
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
    this.plancton.add(this.luzPuntual);
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

  getColisionConBob() {
    if (this.impactoSpawn){
      this.impactoSpawn = false;
    }
    else {
      if (this.impacto instanceof bob_hambur){
        var impactoBob = true;
        this.impacto = null;
        return impactoBob;
      }
    }
    return false;
  }

  addCandidato(candidato) {
    this.candidatos.push(candidato);
}

  getVelocidadInterfaz() {
    return this.modoVelocidad + " (" + Math.floor(this.velocidad*1000) + " km/h)";
  }

  pararPersonaje() {
    this.modoVelocidad = "Parado";
    this.velocidad = 0;
  }


  update() {
    this.cajaFigura.setFromObject(this.plancton);

    // MODIFICAR CON LA VELOCIDAD
    this.t += this.reloj.getDelta() * this.velocidad;

    if(this.t >= 1){
        this.t = 0;
        this.velocidad *= 1.1;  //Aumenta un 10% la velocidad

        if(this.velocidad >= 0.045)
            this.velocidad = 0.045;
    }
    
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

    this.brazo1.rotation.x += 0.05;
    this.brazo2.rotation.x = -this.brazo1.rotation.x;

    if(this.pierna1HaciaDelante){
      this.pierna1.rotation.x += 0.05;  

      if(this.pierna1.rotation.x >= THREE.MathUtils.degToRad(30)){
        this.pierna1.rotation.x = THREE.MathUtils.degToRad(30);
        this.pierna1HaciaDelante = false;
      }
    }else{
      this.pierna1.rotation.x -= 0.05;

      if(this.pierna1.rotation.x <= -THREE.MathUtils.degToRad(30)){
        this.pierna1.rotation.x = -THREE.MathUtils.degToRad(30);
        this.pierna1HaciaDelante = true;
      }
    }

    this.pierna2.rotation.x = -this.pierna1.rotation.x;

    
    this.movLateral.rotation.z = this.rotacion;
        
    var posTmp = this.path.getPointAt(this.t);
    this.nodoPosOrientTubo.position.copy(posTmp);
    
    var tangente = this.path.getTangentAt(this.t);
    posTmp.add(tangente);
    var segmentoActual = Math.floor(this.t * this.segmentos);
    this.nodoPosOrientTubo.up = this.circuito.binormals[segmentoActual];
    this.nodoPosOrientTubo.lookAt(posTmp);

    
    for (var i = 0; i < this.candidatos.length; i++) {
        if(this.cajaFigura.intersectsBox(this.candidatos[i].cajaFigura) && !this.hasImpacted && this.candidatos[i] != this.impacto && !this.impactoSpawn){
          
            console.log("Impacto spawn: " + this.impactoSpawn);

            if(this.candidatos[i] instanceof bob_hambur){ 
                console.log("Plancton dice: COLISIÓN CON BOB");
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

export { plancton_multi };
