
import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'

class geometria_constructiva extends THREE.Object3D {
  constructor() {
    
    super();

    
/* //CUBO MENOS UNA ESFERA  

    // Create the first geometry
    const geometry1 = new THREE.BoxGeometry(1, 1, 1);
    var material1 = new THREE.MeshPhongMaterial({ color: 'lightpink', side: THREE.DoubleSide });
    const mesh1 = new THREE.Mesh(geometry1, material1);

    // Create the second geometry
    const geometry2 = new THREE.SphereGeometry(0.5, 32, 32);
    const material2 = new THREE.MeshBasicMaterial({ color: 'lightgreen' });
    const mesh2 = new THREE.Mesh(geometry2, material2);

    geometry2.translate(0,0.5,0);

    // Perform the CSG operation
    var csg = new CSG();
    csg.union([mesh1]);
    csg.subtract([mesh2]);

    var result = csg.toMesh();

    // Add the result to the scene
    this.add(result);

*/

    var MatBasePinia = new THREE.MeshBasicMaterial({ color: 0xb8921c, side: THREE.DoubleSide });

    this.points = [];

    //CUERPO PIÑA
    this.points.push(new THREE.Vector2(0,0));
    this.points.push(new THREE.Vector2(1,0));
    this.points.push(new THREE.Vector2(1,0.5));
    this.points.push(new THREE.Vector2(0.95,0.7));
    this.points.push(new THREE.Vector2(0.9,0.9));
    this.points.push(new THREE.Vector2(0.85,1.05));
    this.points.push(new THREE.Vector2(0.8,1.2));
    this.points.push(new THREE.Vector2(0.70,1.5));
    this.points.push(new THREE.Vector2(0.65,1.6));
    this.points.push(new THREE.Vector2(0.45,1.8));
    this.points.push(new THREE.Vector2(0.3,1.9));  
    this.points.push(new THREE.Vector2(0.2,1.95));
    this.points.push(new THREE.Vector2(0,2));


    var basePiniaGeom = new THREE.LatheGeometry(this.points,20,0,Math.PI*2);

    var basePinia = new THREE.Mesh(basePiniaGeom, MatBasePinia); 
    this.add(basePinia);


    //HOJAS PIÑA

    var MatHojasPinia = new THREE.MeshBasicMaterial({ color: 0x25800c, side: THREE.DoubleSide });

    this.points = [];

    this.points.push(new THREE.Vector2(0.2,0));
    this.points.push(new THREE.Vector2(0.2,0.3));
    this.points.push(new THREE.Vector2(0.15,0.5));
    this.points.push(new THREE.Vector2(0.1,0.7));
    this.points.push(new THREE.Vector2(0.05,1));
    this.points.push(new THREE.Vector2(0,1.2));
    

    var hojasPiniaGeom = new THREE.LatheGeometry(this.points,20,0,Math.PI*2);
    hojasPiniaGeom.scale(0.9,0.9,0.9); 

    // Añadir las partes al objeto con this.add(this.parte)
    var hojasPinia = new THREE.Mesh(hojasPiniaGeom, MatHojasPinia);   //Hoja central  
    //this.add(hojasPinia);

    var geom2 =  new THREE.LatheGeometry(this.points,20,0,Math.PI*2);
    geom2.scale(0.8,0.8,0.8); 
    geom2.rotateZ(Math.PI/4); 

    var hojasPinia2 = new THREE.Mesh(geom2, MatHojasPinia);   

    var geom3 =  new THREE.LatheGeometry(this.points,20,0,Math.PI*2);
    geom3.scale(0.8,0.8,0.8); 
    geom3.rotateZ(-Math.PI/4); 

    var hojasPinia3 = new THREE.Mesh(geom3, MatHojasPinia); 

    var geom4 =  new THREE.LatheGeometry(this.points,20,0,Math.PI*2);
    geom4.scale(0.7,0.7,0.7); 
    geom4.rotateX(-Math.PI/4); 

    var hojasPinia4 = new THREE.Mesh(geom4, MatHojasPinia); 

    var geom5 =  new THREE.LatheGeometry(this.points,20,0,Math.PI*2);
    geom5.scale(0.7,0.7,0.7); 
    geom5.rotateX(Math.PI/4); 

    var hojasPinia5 = new THREE.Mesh(geom5, MatHojasPinia); 


    var csg = new CSG();
    csg.union([hojasPinia, hojasPinia2, hojasPinia3, hojasPinia4, hojasPinia5]);

    var result = csg.toMesh();            //todas las hojas
    result.scale.set(1.5,1.5,1.5);
    result.position.set(0,1.8,0); 

    this.add(result);

    //LA CHIMENEA

    var boxGeom = new THREE.BoxGeometry (0.4,0.20,0.15); //ancho, alto y largo
    boxGeom.translate(0.8,1.4,0); 
    var boxMat = new THREE.MeshBasicMaterial({ color: 'grey', side: THREE.DoubleSide });

    // Ya podemos construir el Mesh
    var box = new THREE.Mesh (boxGeom, boxMat);

    this.add(box); 


    var boxGeom2 = new THREE.BoxGeometry (0.2,0.4,0.15); //ancho, alto y largo
    boxGeom2.translate(0.9,1.5,0); 
    var boxMat2 = new THREE.MeshBasicMaterial({ color: 'grey', side: THREE.DoubleSide });

    // Ya podemos construir el Mesh
    var box2 = new THREE.Mesh (boxGeom2, boxMat2);

    this.add(box2); 

    //VENTANAS




  }

  update() {

  }
}

export { geometria_constructiva };