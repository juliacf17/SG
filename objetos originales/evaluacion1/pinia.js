
import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'

class pinia extends THREE.Object3D {
  constructor() {
    
    super();

    
    //var MatBasePinia = new THREE.MeshBasicMaterial({ color: 0xb8921c, side: THREE.DoubleSide });

    var texture = new THREE.TextureLoader().load('../imgs/textura-piña.png');
    var MatBasePinia = new THREE.MeshStandardMaterial ({map: texture});

    
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


    var hojasPinia = new THREE.Mesh(hojasPiniaGeom, MatHojasPinia);   //Hoja central  

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

    var chimeneaGeom1 = new THREE.BoxGeometry (0.4,0.20,0.15); //ancho, alto y largo
    chimeneaGeom1.translate(0.8,1.4,0); 
    var chimeneaMat1 = new THREE.MeshBasicMaterial({ color: 'grey', side: THREE.DoubleSide });

    var chimeneaParte1 = new THREE.Mesh (chimeneaGeom1, chimeneaMat1);

    //this.add(chimenea); 


    var chimeneaGeom2 = new THREE.BoxGeometry (0.2,0.4,0.15); //ancho, alto y largo
    chimeneaGeom2.translate(0.9,1.5,0); 
    var chimeneaMat2 = new THREE.MeshBasicMaterial({ color: 'grey', side: THREE.DoubleSide });

    // Ya podemos construir el Mesh
    var chimeneaParte2 = new THREE.Mesh (chimeneaGeom2, chimeneaMat2);

    //this.add(chimenea2); 

    var chimenea = new CSG();
    chimenea.union([chimeneaParte1, chimeneaParte2]);

    var chimenea = chimenea.toMesh();          
    this.add(chimenea);

  }

  update() {

    this.rotation.y += 0.01;



  }
}

export { pinia };