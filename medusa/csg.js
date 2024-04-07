
import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'

class geometria_constructiva extends THREE.Object3D {
  constructor() {
    
    super();

    
    //CUERPO DE LA MEDUSA

    const geometry1 = new THREE.BoxGeometry(1, 1, 1);
    var material1 = new THREE.MeshPhongMaterial({ color: 'lightpink', side: THREE.DoubleSide });
    const mesh1 = new THREE.Mesh(geometry1, material1);

    const geometry2 = new THREE.SphereGeometry(0.5, 32, 32);
    const material2 = new THREE.MeshBasicMaterial({ color: 0xfabaf4 });
    const mesh2 = new THREE.Mesh(geometry2, material2);

    geometry1.translate(0,-0.5,0);
    geometry2.translate(0,0.3,0);

    // Perform the CSG operation
    var csg = new CSG();
    csg.union([mesh2]);
    csg.subtract([mesh1]);

    var result = csg.toMesh();

    // Add the result to the scene
    this.add(result);

    //ANILLO DE LA MEDUSA

    var torusGeom = new THREE.TorusGeometry(0.37, 0.10, 30, 30); //radio, grosor tubo, segmentos radiales (resolución ancho) y segmentos tubulares 
    torusGeom.rotateX(Math.PI/2);
    var torusMat = new THREE.MeshBasicMaterial({ color: 0xf7caf3 });
    
    // Ya podemos construir el Mesh
    var torus = new THREE.Mesh (torusGeom, torusMat);
    //torus.rotation.set(Math.PI/2,0,0);

    this.add(torus); 

    //PATAS
    var pata1 = new THREE.Shape();
    pata1.moveTo(-0.15,0); 
    pata1.lineTo(-0.15,-0.5);
    pata1.bezierCurveTo(-0.15,-0.75, -0.5,-0.75, -0.5,-1); 
    pata1.quadraticCurveTo(-0.5, -1.05, -0.45, -1.05); 
    pata1.quadraticCurveTo(-0.4,-1.05, -0.4, -1); 
    pata1.bezierCurveTo(-0.4, -0.8, 0, -0.8, 0, -0.6); 
    pata1.lineTo(0,0); 
    pata1.lineTo(-0.15,0); 

    var materialPatas = new THREE.MeshBasicMaterial({ color: 0xcb87c5, side: THREE.DoubleSide });
    var options1 = { depth: 1, steps: 10, bevelEnabled: false}; 

    //pata1  
    var geometryPata1 = new THREE.ExtrudeGeometry(pata1, options1);


    var mesh_Pata1 = new THREE.Mesh(geometryPata1, materialPatas);
    mesh_Pata1.scale.set(1,1,0.15); 
    mesh_Pata1.position.set(-0.1, 0.1, 0);

    this.add(mesh_Pata1);

    //pata2 
    var geometryPata2 = new THREE.ExtrudeGeometry(pata1, options1);
    geometryPata2.rotateY(Math.PI); 

    var mesh_Pata2 = new THREE.Mesh(geometryPata2, materialPatas);
    mesh_Pata2.scale.set(1,1,0.15); 
    mesh_Pata2.position.set(0.1, 0.1, 0);

    this.add(mesh_Pata2);

    //pata3 
    var geometryPata3 = new THREE.ExtrudeGeometry(pata1, options1);
    geometryPata3.scale(1,0.8,0.15); 
    geometryPata3.rotateY(-Math.PI/2); 
    geometryPata3.translate(0,0.1,-0.1); 

    var mesh_Pata3 = new THREE.Mesh(geometryPata3, materialPatas);

    this.add(mesh_Pata3);

    //pata4 
    var geometryPata4 = new THREE.ExtrudeGeometry(pata1, options1);
    geometryPata4.scale(1,0.8,0.15); 
    geometryPata4.rotateY(Math.PI/2); 
    geometryPata4.translate(0,0.1,0.1); 

    var mesh_Pata4 = new THREE.Mesh(geometryPata4, materialPatas);

    this.add(mesh_Pata4);
  }

  update() {
    
  }
}

export { geometria_constructiva };