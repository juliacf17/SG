
import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'

class geometria_constructiva extends THREE.Object3D {
  constructor() {
    
    super();

    
    //PAN SUPERIOR 

    // Create cubo
    const geometry1 = new THREE.BoxGeometry(1, 1, 1);
    var material1 = new THREE.MeshPhongMaterial({ color: 'lightpink', side: THREE.DoubleSide });
    const mesh1 = new THREE.Mesh(geometry1, material1);

    // Create the second geometry
    const geometry2 = new THREE.SphereGeometry(0.5, 32, 32);
    const material2 = new THREE.MeshBasicMaterial({ color:  0xa7780a });
    const mesh2 = new THREE.Mesh(geometry2, material2);

    geometry2.translate(0,0.5,0);

    // Perform the CSG operation
    var csg = new CSG();
    csg.union([mesh2]);
    csg.subtract([mesh1]);

    var result = csg.toMesh();
    result.position.set(0,-0.06,0); 

    this.add(result);

    //PAN INFERIOR

    geometry2.translate(0,-0.5, 0); 
    geometry1.translate(0,-0.6,0); 

    var csg2 = new CSG(); 
    csg2.union([mesh2]);
    csg2.subtract([mesh1]); 

    geometry1.translate(0,1.2,0); 
    csg2.subtract([mesh1]); 

    var result2 = csg2.toMesh(); 

    this.add(result2);

    //CARNE
    var geometryCarne = result2.geometry.clone(); 
    const material3 = new THREE.MeshBasicMaterial({ color:  0x873709 });

    geometryCarne.translate(0,0.2,0); 

    var carne = new THREE.Mesh(geometryCarne, material3); 

    this.add(carne); 

    //QUESO
     
    const queso = new THREE.BoxGeometry(0.8, 0.8, 0.8);
    var materialq = new THREE.MeshPhongMaterial({ color: 'yellow', side: THREE.DoubleSide });
    const meshq = new THREE.Mesh(queso, materialq);

    meshq.geometry.rotateY(45); 
    meshq.geometry.translate(0,-0.05,0);

    const quitar = new THREE.BoxGeometry(0.8, 0.8, 0.8);
    var materialquitar = new THREE.MeshPhongMaterial({ color: 'yellow', side: THREE.DoubleSide });
    const meshquitar = new THREE.Mesh(quitar, materialquitar);

    meshquitar.geometry.rotateY(45); 
    meshquitar.geometry.translate(0,-0.1, 0); 

    var csg4 = new CSG(); 
    csg4.union([meshq]);
    csg4.subtract([meshquitar]);

    var result4 = csg4.toMesh(); 

    this.add (result4);

    //LECHUGA

    var geometryLechuga = carne.geometry.clone(); 
    geometryLechuga.scale(1.05,1,1.05);
    geometryLechuga.translate(0,0.25,0); 
    
    const material4 = new THREE.MeshBasicMaterial({ color:  'green' });

    var lechuga = new THREE.Mesh(geometryLechuga, material4); 

    //FORMA DE LA LECHUGA

    var shape = new THREE.Shape();
    var lado = 25; // Puedes ajustar el tamaño según necesites
    shape.moveTo(0, 0);
    shape.lineTo(lado, 0);
    shape.lineTo(lado, lado);
    shape.lineTo(0, lado);
    shape.lineTo(0, 0);

    var pts = [];
    var altura = 5; // Altura de la onda
    var longitud = 200; // Longitud del camino
    var pasos = 300; // Número de puntos en el camino
    for (var i = 0; i <= pasos; i++) {
        var x = (i / pasos) * longitud - longitud / 2;
        var y = Math.sin(i / pasos * Math.PI * 4) * altura;
        var z = 0;
        pts.push(new THREE.Vector3(x, y, z));
    }

    var path = new THREE.CatmullRomCurve3(pts);     //Crea el camino
    
    var options = {
        steps: 150,     //La suavidad de la extrusión, cuanto más pasos más suave.   
        curveSegments: 6, // Mejora la resolución de las curvas cuanto mayor es. 
        extrudePath: path // La trayectoria a lo largo de la cual se extruirá la forma
    };

    var geometry = new THREE.ExtrudeGeometry( shape, options );     //Crear la geometría
    var material = new THREE.MeshPhongMaterial({ color: 'green', side: THREE.DoubleSide });


    geometry.scale(0.005, 0.007, 0.04); 
    geometry.translate(0.02,0.17,0.5); 
    

    var barrido = new THREE.Mesh(geometry, material);   //la forma de la lechuga

    var csg3 = new CSG(); 
    csg3.union([lechuga]);
    csg3.subtract([barrido]);             //la forma de la lechuga por debajo


    barrido.geometry.translate(0,0.32,0);
    csg3.subtract([barrido]);                 //la forma de la lechuga por arriba

    csg3.subtract([result]);    //que el pan se una con la lechuga
    csg3.subtract([result4]);   //que el queso se una con la lechuga

    var result3 = csg3.toMesh(); 

    this.add (result3);
  }

  update() {
    
  }
}

export { geometria_constructiva };