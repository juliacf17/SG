
import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'

class medusa extends THREE.Object3D {
  constructor() {
    
    super();

    
    // -------------------------------- CABEZA -------------------------------- //

    const cuboGeom = new THREE.BoxGeometry(1, 1, 1);
    var cuboMat = new THREE.MeshPhongMaterial({ color: 'lightpink', side: THREE.DoubleSide });
    const cubo = new THREE.Mesh(cuboGeom, cuboMat);

    const esferaGeom = new THREE.SphereGeometry(0.5, 32, 32);
    const esferaMat = new THREE.MeshBasicMaterial({ color: 0xfabaf4 });
    const esfera = new THREE.Mesh(esferaGeom, esferaMat);

    cuboGeom.translate(0,-0.5,0);
    esferaGeom.translate(0,0.3,0);

    // Perform the CSG operation
    var cabeza = new CSG();
    cabeza.union([esfera]);
    cabeza.subtract([cubo]);

    var cabeza = cabeza.toMesh();

    // Add the result to the scene
    this.add(cabeza);

    //-------------------------------- ANILLO DE LA MEDUSA -------------------------------- //

    var torusGeom = new THREE.TorusGeometry(0.37, 0.10, 30, 30); //radio, grosor tubo, segmentos radiales (resolución ancho) y segmentos tubulares 
    torusGeom.rotateX(Math.PI/2);
    var torusMat = new THREE.MeshBasicMaterial({ color: 0xf7caf3 });
    
    // Ya podemos construir el Mesh
    var anillo = new THREE.Mesh (torusGeom, torusMat);
    //torus.rotation.set(Math.PI/2,0,0);

    this.add(anillo); 

    // -------------------------------- TENTÁCULOS -------------------------------- //

    var tentaculoShape = new THREE.Shape();
    tentaculoShape.moveTo(-0.15,0); 
    tentaculoShape.lineTo(-0.15,-0.5);
    tentaculoShape.bezierCurveTo(-0.15,-0.75, -0.5,-0.75, -0.5,-1); 
    tentaculoShape.quadraticCurveTo(-0.5, -1.05, -0.45, -1.05); 
    tentaculoShape.quadraticCurveTo(-0.4,-1.05, -0.4, -1); 
    tentaculoShape.bezierCurveTo(-0.4, -0.8, 0, -0.8, 0, -0.6); 
    tentaculoShape.lineTo(0,0); 
    tentaculoShape.lineTo(-0.15,0); 

    var tentaculosMat = new THREE.MeshBasicMaterial({ color: 0xcb87c5, side: THREE.DoubleSide });
    var options = { depth: 1, steps: 10, bevelEnabled: false}; 

    // Tentáculo 1
    var tentaculo1Geom = new THREE.ExtrudeGeometry(tentaculoShape, options);


    var tentaculo1 = new THREE.Mesh(tentaculo1Geom, tentaculosMat);
    tentaculo1.scale.set(1,1,0.15); 
    tentaculo1.position.set(-0.1, 0.1, 0);

    this.add(tentaculo1);

    // Tentáculo 2 
    var tentaculo2Geom = new THREE.ExtrudeGeometry(tentaculoShape, options);
    tentaculo2Geom.rotateY(Math.PI); 

    var tentaculo2 = new THREE.Mesh(tentaculo2Geom, tentaculosMat);
    tentaculo2.scale.set(1,1,0.15); 
    tentaculo2.position.set(0.1, 0.1, 0);

    this.add(tentaculo2);

    // Tentáculo 3 
    var tentaculo3Geom = new THREE.ExtrudeGeometry(tentaculoShape, options);
    tentaculo3Geom.scale(1,0.8,0.15); 
    tentaculo3Geom.rotateY(-Math.PI/2); 
    tentaculo3Geom.translate(0,0.1,-0.1); 

    var tentaculo3 = new THREE.Mesh(tentaculo3Geom, tentaculosMat);

    this.add(tentaculo3);

    // Tentáculo 4 
    var tentaculo4Geom = new THREE.ExtrudeGeometry(tentaculoShape, options);
    tentaculo4Geom.scale(1,0.8,0.15); 
    tentaculo4Geom.rotateY(Math.PI/2); 
    tentaculo4Geom.translate(0,0.1,0.1); 

    var tentaculo4 = new THREE.Mesh(tentaculo4Geom, tentaculosMat);

    this.add(tentaculo4);
    this.translateY(0.94); 
  }

  update() {
      this.rotation.y += 0.01;
  }
}

export { medusa };