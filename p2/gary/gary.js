
import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'
import { MTLLoader } from '../libs/MTLLoader.js'
import { OBJLoader } from '../libs/OBJLoader.js'

class gary extends THREE.Object3D {
  constructor() {
    
    super();


    // ---------------------------- BABOSA ---------------------------- //

    // Shape cuadrado
    var shapeBabosa = new THREE.Shape();
    var lado = 1; // Puedes ajustar el tamaño según necesites
    shapeBabosa.moveTo(0, 0);
    shapeBabosa.lineTo(lado*2, 0);
    shapeBabosa.lineTo(lado*2, lado);
    shapeBabosa.lineTo(0, lado);
    shapeBabosa.lineTo(0, 0);

    // Camino en forma de onda
    var pts = [];
    var altura = 0.2; // Altura de la onda
    var longitud = 7.5; // Longitud del camino
    var pasos = 10; // Número de puntos en el camino
    for (var i = 0; i <= pasos; i++) {
        var x = (i / pasos) * longitud - longitud / 2;
        var y = Math.sin(i / pasos * Math.PI * 4) * altura;
        var z = 0;
        pts.push(new THREE.Vector3(x, y, z));
    }
    
    var path = new THREE.CatmullRomCurve3(pts);     //Creamos el camino

    var options = {
        steps: 150,     //La suavidad de la extrusión, cuanto más pasos más suave.   
        curveSegments: 6, // Mejora la resolución de las curvas cuanto mayor es. 
        extrudePath: path, // La trayectoria a lo largo de la cual se extruirá la forma
        bevelEnabled: true, // Habilita el biselado
    };

    var babosaGeom = new THREE.ExtrudeGeometry( shapeBabosa, options );     //Crear la geometría
    babosaGeom.translate(0, -0.6, 1.0);
    var babosaMat = new THREE.MeshPhongMaterial({ color: 'lightblue', side: THREE.DoubleSide });

    var babosa = new THREE.Mesh(babosaGeom, babosaMat);


    //this.add(babosa);

    // ---------------------------- SOPORTES OJOS ---------------------------- 

    var soporteGeom = new THREE.CylinderGeometry(0.1, 0.5, 5, 64);

    var soporteMat = new THREE.MeshPhongMaterial({ color: 'lightblue', side: THREE.DoubleSide });

    var soporte1 = new THREE.Mesh(soporteGeom, soporteMat);

    soporte1.position.set(2.5, 2.5, 1.0);
    soporte1.rotateZ(-20 * Math.PI / 180);
    soporte1.rotateX(20 * Math.PI / 180)

    //this.add(soporte1);

    var soporte2 = new THREE.Mesh(soporteGeom, soporteMat);

    soporte2.position.set(2.5, 2.5, -1.0);
    soporte2.rotateZ(-20 * Math.PI / 180);
    soporte2.rotateX(-20 * Math.PI / 180)

    //this.add(soporte2);

    var csg = new CSG();
    csg.union([babosa, soporte1, soporte2]);
    var cuerpo = csg.toMesh();

    this.add(cuerpo);

    


    // ---------------------------- CAPARAZÓN ---------------------------- //

    //CAMINO EN ESPIRAL
    var pts = [];
    var altura =  0; // Altura de la espiral
    var vueltas = 5; // Número de vueltas completas
    var pasos = 100; // Número de puntos en el camino
    for (var i = 0; i <= pasos; i++) {
      var t = i / pasos * vueltas * Math.PI * 2; // ángulo actual
      var x = Math.sin(t) * (i / pasos) * 20; // Ajustar el crecimiento del radio
      var y = (i / pasos) * altura - altura / 2;
      var z = Math.cos(t) * (i / pasos) * 20; // Ajustar el crecimiento del radio
      pts.push(new THREE.Vector3(x, y, z));
    }


    var path = new THREE.CatmullRomCurve3(pts, false);     //Creamos el camino
    var resolucion = 200;
    var radio = 4.5;
    var segmentosCirculo = 20;


    var caparazonGeom = new THREE.TubeGeometry(path, resolucion, radio, segmentosCirculo, false);
    caparazonGeom.rotateX(Math.PI / 2);
    caparazonGeom.translate(-10, 20.5, 0);
    caparazonGeom.scale(0.15, 0.15, 0.2);

    var caparazonMat = new THREE.MeshPhongMaterial({ color: 'lightpink', side: THREE.DoubleSide });

    var caparazon = new THREE.Mesh(caparazonGeom, caparazonMat);

    this.add(caparazon);

    // ---------------------------- OJOS ---------------------------- //


    var materialLoader = new MTLLoader();
    var objectLoader = new OBJLoader();
    materialLoader.load('../../models/ojo/eyeball.mtl', (materials1) => {
      objectLoader.setMaterials(materials1);
      objectLoader.load('../../models/ojo/eyeball.obj', (ojo1) => {
        ojo1.scale.set(0.5,0.5,0.5);
        ojo1.rotateY(Math.PI/2);
        this.add(ojo1); 
        ojo1.position.z = 2;
        ojo1.position.x = 3.5;
        ojo1.position.y = 5.5;

      }, null, null); 
    });

    materialLoader.load('../../models/ojo/eyeball.mtl', (materials1) => {
      objectLoader.setMaterials(materials1);
      objectLoader.load('../../models/ojo/eyeball.obj', (ojo2) => {
        ojo2.scale.set(0.5,0.5,0.5);
        ojo2.rotateY(Math.PI/2);
        this.add(ojo2); 
        ojo2.position.z = -2;
        ojo2.position.x = 3.5;
        ojo2.position.y = 5.5;

      }, null, null); 
    });



    // ---------------------------- SOPORTES OJOS ---------------------------- 

    var soporteGeom = new THREE.CylinderGeometry(0.1, 0.5, 5, 64);

    var soporteMat = new THREE.MeshPhongMaterial({ color: 'lightblue', side: THREE.DoubleSide });

    var soporte1 = new THREE.Mesh(soporteGeom, soporteMat);

    soporte1.position.set(2.5, 2.5, 1.0);
    soporte1.rotateZ(-20 * Math.PI / 180);
    soporte1.rotateX(20 * Math.PI / 180)

    this.add(soporte1);

    var soporte2 = new THREE.Mesh(soporteGeom, soporteMat);

    soporte2.position.set(2.5, 2.5, -1.0);
    soporte2.rotateZ(-20 * Math.PI / 180);
    soporte2.rotateX(-20 * Math.PI / 180)

    this.add(soporte2);

       

    this.scale.set(0.25, 0.25, 0.25);

  





  }

  update() {
    this.rotation.y += 0.01;
    
  }
}

export { gary };