
import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'

class geometria_constructiva extends THREE.Object3D {
  constructor() {
    
    super();
    

    this.base = this.createExtrusion();
    this.base.position.set(1,1.5,0); 

    var esfera = this.createEsfera(); 
    var molde = this.createBox(); 

    //MOLDE PARA CURVA DE LA BASE
    var csg = new CSG();
    csg.union([molde]);
    csg.subtract([esfera]); 

    this.resultadoMesh = csg.toMesh();
    this.resultadoMesh.scale.set(1,1,4); 
    this.resultadoMesh.position.set(1.3,1,0); 

    //BASE CON CURVA
    /*var csg2 = new CSG();
    csg2.union([this.base]);
    csg2.union([this.resultadoMesh]); 

    this.resultadoMesh2 = csg2.toMesh();*/

    //BASE EN FORMA DE U
    this.quitar = this.createExtrusion(); 
    this.quitar.scale.set(1.2,1,0.6); 
    this.quitar.rotateZ(-Math.PI/18); 
    this.quitar.position.set(1.2,1.8,0); 

    var csg2 = new CSG();
    csg2.union([this.base]);
    csg2.subtract([this.quitar]); 

    this.resultadoMesh2 = csg2.toMesh();

    //QUITAR EL HUECO CENTRAL
    this.hueco_cilindrico = this.createCilindro(0.4,0.2,0.4,20);
    this.hueco_cilindrico.scale.set(1,1,0.5); 
    this.hueco_cilindrico.position.set(1, 0,0); 

    var csg3 = new CSG();
    csg3.union([this.resultadoMesh2]);
    csg3.subtract([this.hueco_cilindrico]); 

    this.resultadoMesh3 = csg3.toMesh();

    //HUECO LATERAL
    this.hueco_lateral = this.createExtrusion();  
    this.hueco_lateral.scale.set(0.2, 1.5, 0.3);
    this.hueco_lateral.rotateX(Math.PI/2); 
    this.hueco_lateral.position.set(0.8,0.6,1); 
    
    var csg4 = new CSG();
    csg4.union([this.resultadoMesh3]);
    csg4.subtract([this.hueco_lateral]); 

    this.resultadoMesh4 = csg4.toMesh();



    this.add(this.resultadoMesh4); 
    

  }

  createExtrusion(){
    var shape = new THREE.Shape();
    
    shape.moveTo(2, -3);
    shape.lineTo(-2,-3);
    shape.quadraticCurveTo(-3,-3,-3,-2);
    shape.lineTo(-3,2);
    shape.quadraticCurveTo(-3,3,-2,3);
    shape.lineTo(2,3);
    shape.quadraticCurveTo(3,3,3,2);
    shape.lineTo(3,-2);
    shape.quadraticCurveTo(3,-3,2,-3);


    var extrudeSettings = {
      depth: 5, // Profundidad de la extrusión
      bevelEnabled: true, // Activa el biselado
      bevelThickness: 0.05, // Grosor del biselado
      bevelSize: 0.02, // Tamaño del biselado
      bevelSegments: 20 // Segmentos del biselado
    };

    var geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geometry.rotateX(Math.PI/2); 
    var material = new THREE.MeshPhongMaterial({ color: 'lightpink', side: THREE.DoubleSide });
    var mesh = new THREE.Mesh(geometry, material);

    geometry.scale(0.3333,0.3333,0.3333);
    

    return mesh;
  }

  createEsfera(){
    var geometry = new THREE.SphereGeometry(0.6, 32, 32);
    var material = new THREE.MeshBasicMaterial({ color: 'blue' });
    var mesh = new THREE.Mesh(geometry, material);

    return mesh;
  }

  createBox( ) {
    var geometry = new THREE.BoxGeometry(0.7, 0.7, 0.4);
    geometry.translate(0.4,0.35,0); 
    var material = new THREE.MeshNormalMaterial();
    var mesh = new THREE.Mesh( geometry, material );
    return mesh;
  }

  createCilindro(radio_sup, radio_inf, altura, n_segmentos){
    var geometry = new THREE.CylinderGeometry(radio_sup, radio_inf, altura, n_segmentos, 1);
    var material = new THREE.MeshPhongMaterial({ color: 'red', side: THREE.DoubleSide });
    var mesh = new THREE.Mesh(geometry, material);
    return mesh;
  }

  


  update() {
    
  }
}

export { geometria_constructiva };