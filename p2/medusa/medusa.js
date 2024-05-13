
import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'

class medusa extends THREE.Object3D {
  constructor(circuitoGeometry, _t) {
    
    super();


    this.medusa = new THREE.Group();
    
    // -------------------------------- CABEZA -------------------------------- //

    const cuboGeom = new THREE.BoxGeometry(1, 1, 1);
    var cuboMat = new THREE.MeshPhongMaterial({ color: 'lightpink', side: THREE.DoubleSide,});
    const cubo = new THREE.Mesh(cuboGeom, cuboMat);

    const esferaGeom = new THREE.SphereGeometry(0.5, 32, 32);
    const esferaMat = new THREE.MeshStandardMaterial({ color: 0xfabaf4 , transparent: true, opacity: 1.0});
    const esfera = new THREE.Mesh(esferaGeom, esferaMat);

    cuboGeom.translate(0,-0.5,0);
    esferaGeom.translate(0,0.3,0);

    // Perform the CSG operation
    var cabeza = new CSG();
    cabeza.union([esfera]);
    cabeza.subtract([cubo]);

    this.cabeza = cabeza.toMesh();

    this.cabeza.material.color = new THREE.Color(0xfabaf4);
    this.cabeza.material.emissive = new THREE.Color(0xfabaf4);
    this.cabeza.material.ambient = new THREE.Color(0xfabaf4);
    this.cabeza.material.transparent = true;
    this.cabeza.material.opacity = 1.0;

    this.cabeza.userData = this;
    this.cabeza.name = "medusa";

    this.medusa.add(this.cabeza);


    // Add the result to the scene

    //-------------------------------- ANILLO DE LA MEDUSA -------------------------------- //

    var torusGeom = new THREE.TorusGeometry(0.37, 0.10, 30, 30); //radio, grosor tubo, segmentos radiales (resolución ancho) y segmentos tubulares 
    torusGeom.rotateX(Math.PI/2);
    var torusMat = new THREE.MeshStandardMaterial({ color: 0xf7caf3 , emissive: 0xf7caf3, ambient: 0xf7caf3 , transparent: true, opacity: 1.0});
    
    // Ya podemos construir el Mesh
    this.anillo = new THREE.Mesh (torusGeom, torusMat);
    //torus.rotation.set(Math.PI/2,0,0);

    this.anillo.userData = this;

    this.medusa.add(this.anillo);
    //this.add(anillo); 

    // -------------------------------- TENTÁCULOS -------------------------------- //

    this.tentaculos = new THREE.Group();

    var tentaculoShape = new THREE.Shape();
    tentaculoShape.moveTo(-0.15,0); 
    tentaculoShape.lineTo(-0.15,-0.5);
    tentaculoShape.bezierCurveTo(-0.15,-0.75, -0.5,-0.75, -0.5,-1); 
    tentaculoShape.quadraticCurveTo(-0.5, -1.05, -0.45, -1.05); 
    tentaculoShape.quadraticCurveTo(-0.4,-1.05, -0.4, -1); 
    tentaculoShape.bezierCurveTo(-0.4, -0.8, 0, -0.8, 0, -0.6); 
    tentaculoShape.lineTo(0,0); 
    tentaculoShape.lineTo(-0.15,0); 

    var tentaculosMat = new THREE.MeshStandardMaterial({ color: 0xcb87c5, emissive: 0xcb87c5, ambient: 0xcb87c5, side: THREE.DoubleSide , transparent: true, opacity: 1.0});
    var options = { depth: 1, steps: 10, bevelEnabled: false}; 

    // Tentáculo 1
    var tentaculo1Geom = new THREE.ExtrudeGeometry(tentaculoShape, options);


    this.tentaculo1 = new THREE.Mesh(tentaculo1Geom, tentaculosMat);
    this.tentaculo1.userData = this;
    this.tentaculo1.scale.set(1,1,0.15); 
    this.tentaculo1.position.set(-0.1, 0.1, 0);

    
    

    this.tentaculos.add(this.tentaculo1);
    //this.add(tentaculo1);

    // Tentáculo 2 
    var tentaculo2Geom = new THREE.ExtrudeGeometry(tentaculoShape, options);
    tentaculo2Geom.rotateY(Math.PI); 

    this.tentaculo2 = new THREE.Mesh(tentaculo2Geom, tentaculosMat);
    this.tentaculo2.userData = this;
    this.tentaculo2.scale.set(1,1,0.15); 
    this.tentaculo2.position.set(0.1, 0.1, 0);

    this.tentaculos.add(this.tentaculo2);
    //this.add(tentaculo2);

    // Tentáculo 3 
    var tentaculo3Geom = new THREE.ExtrudeGeometry(tentaculoShape, options);
    tentaculo3Geom.scale(1,0.8,0.15); 
    tentaculo3Geom.rotateY(-Math.PI/2); 
    tentaculo3Geom.translate(0,0.1,-0.1); 

    this.tentaculo3 = new THREE.Mesh(tentaculo3Geom, tentaculosMat);
    this.tentaculo3.userData = this;

    this.tentaculos.add(this.tentaculo3);
    //this.add(tentaculo3);

    // Tentáculo 4 
    var tentaculo4Geom = new THREE.ExtrudeGeometry(tentaculoShape, options);
    tentaculo4Geom.scale(1,0.8,0.15); 
    tentaculo4Geom.rotateY(Math.PI/2); 
    tentaculo4Geom.translate(0,0.1,0.1); 

    this.tentaculo4 = new THREE.Mesh(tentaculo4Geom, tentaculosMat);
    this.tentaculo4.userData = this;

    this.tentaculos.add(this.tentaculo4);
    //this.add(tentaculo4);


    //this.medusa.translateY(1);
    this.medusa.scale.set(0.25,0.25,0.25);
    
    // Posicionamiento en el circuito

    this.circuito = circuitoGeometry;
    this.path = circuitoGeometry.parameters.path;
    this.radio = circuitoGeometry.parameters.radius;
    this.segmentos = circuitoGeometry.parameters.tubularSegments;

    this.t = _t;

    this.nodoPosOrientTubo = new THREE.Object3D();
    this.movLateral = new THREE.Object3D();
    this.posSuper = new THREE.Object3D();



    this.posSuper.translateY(this.radio + 0.5);


    

    

    this.reloj = new THREE.Clock();
    this.velocidad = 0.005;

    this.rotacion = 0;


    this.tentaculos.userData = this;
    
    this.medusa.add(this.tentaculos);

      
    this.add(this.medusa);
    this.add(this.nodoPosOrientTubo);
    this.nodoPosOrientTubo.add(this.movLateral);
    this.movLateral.add(this.posSuper);
    this.posSuper.add(this.medusa);
  }

  recibeClic(meshConcreto){
    console.log("He clicado la medusa");
    if(meshConcreto.userData == this){
        this.medusa.children[0].material.opacity -= 0.5; // cabeza
        this.medusa.children[1].material.opacity -= 0.5; // anillo
        this.medusa.children[2].children[0].material.opacity -= 0.5; // tentáculos
    }
  }

  getOpacity(meshConcreto){
    if(meshConcreto.userData == this){
        if (this.medusa.children[0].material.opacity<0){
          return true; 
        }
        else if (this.medusa.children[0].material.opacity==0){
          this.medusa.visible = false; 
          console.log("La medusa ha desaparecido");
        }
    }

    return false; 
  }


  update () {    
          
    this.t += this.reloj.getDelta() * this.velocidad;

    //this.medusa.rotation.y += 0.2;
    if(this.t >= 1){
        this.t = 0;
    }

    this.rotacion += Math.PI * 2 /180;

    this.medusa.rotation.z = -this.rotacion;
    this.movLateral.rotation.z = this.rotacion;

    this.medusa.children[2].rotation.y += 0.1;
    
    
    var posTmp = this.path.getPointAt(this.t);
    this.nodoPosOrientTubo.position.copy(posTmp);
    
    var tangente = this.path.getTangentAt(this.t);
    posTmp.add(tangente);
    var segmentoActual = Math.floor(this.t * this.segmentos);
    this.nodoPosOrientTubo.up = this.circuito.binormals[segmentoActual];
    this.nodoPosOrientTubo.lookAt(posTmp);
    
                    
    
  }
}

export { medusa };