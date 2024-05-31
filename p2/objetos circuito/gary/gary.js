
import * as THREE from '../../libs/three.module.js'
import { CSG } from '../../libs/CSG-v2.js'
import { MTLLoader } from '../../libs/MTLLoader.js'
import { OBJLoader } from '../../libs/OBJLoader.js'

class gary extends THREE.Object3D {
  constructor(circuitoGeometry, _t) {
    
    super();

    this.gary = new THREE.Group();

    // ---------------------------- BABOSA ---------------------------- //

    var shapeBabosa = new THREE.Shape();

    shapeBabosa.moveTo(0,-0.4);
    shapeBabosa.quadraticCurveTo(-0.4,-0.6,-0.4,-0.2);
    shapeBabosa.quadraticCurveTo(-0.4,0.0,-0.6,-0.1);
    shapeBabosa.quadraticCurveTo(-0.8,-0.2,-0.8,0.0);

    shapeBabosa.quadraticCurveTo(-0.8,0.2,-0.6,0.1);
    shapeBabosa.quadraticCurveTo(-0.4,0.0,-0.4,0.2);
    shapeBabosa.quadraticCurveTo(-0.4,0.6,0,0.4);

    shapeBabosa.quadraticCurveTo(0.4,0.6,0.4,0.2);
    shapeBabosa.quadraticCurveTo(0.4,0.0,0.6,0.1);
    shapeBabosa.quadraticCurveTo(0.8,0.2,0.8,0.0);

    shapeBabosa.quadraticCurveTo(0.8,-0.2,0.6,-0.1);
    shapeBabosa.quadraticCurveTo(0.4,0.0,0.4,-0.2);
    shapeBabosa.quadraticCurveTo(0,-0.4,0,-0.4);

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
        steps: 50,     //La suavidad de la extrusión, cuanto más pasos más suave.   
        curveSegments: 5, // Mejora la resolución de las curvas cuanto mayor es. 
        extrudePath: path, // La trayectoria a lo largo de la cual se extruirá la forma
        bevelEnabled: true, // Habilita el biselado
    };

    var babosaGeom = new THREE.ExtrudeGeometry( shapeBabosa, options );     //Crear la geometría
    babosaGeom.scale(1.0,1.0,1.5);
    babosaGeom.translate(0, -0.6, 0);
    var babosaMat = new THREE.MeshPhongMaterial({ color: 'lightblue', side: THREE.DoubleSide });

    var babosa = new THREE.Mesh(babosaGeom, babosaMat);

    // ---------------------------- SOPORTES OJOS ---------------------------- 

    var soporteGeom = new THREE.CylinderGeometry(0.1, 0.5, 5, 64);

    var soporteMat = new THREE.MeshPhongMaterial({ color: 'lightblue', side: THREE.DoubleSide });

    var soporte1 = new THREE.Mesh(soporteGeom, soporteMat);

    soporte1.position.set(3.0, 2, 1.0);
    soporte1.rotateZ(-20 * Math.PI / 180);
    soporte1.rotateX(20 * Math.PI / 180)

    var soporte2 = new THREE.Mesh(soporteGeom, soporteMat);

    soporte2.position.set(3.0, 2, -1.0);
    soporte2.rotateZ(-20 * Math.PI / 180);
    soporte2.rotateX(-20 * Math.PI / 180)


    var unionGeom = new THREE.BoxGeometry(4,1,1);
    unionGeom.translate(-1.0, -0.3, 0);
    var unionMat = new THREE.MeshPhongMaterial({ color: 'lightblue', side: THREE.DoubleSide });

    var union = new THREE.Mesh(unionGeom, unionMat);

    var csg = new CSG();
    csg.union([babosa, soporte1, soporte2, union]);
    var cuerpo = csg.toMesh();

    this.gary.add(cuerpo);    


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

    var csg = new CSG();

    var recorteGeom = new THREE.BoxGeometry(5,5,5);
    recorteGeom.translate(-1.5, -2, 0);
    var recorteMat = new THREE.MeshPhongMaterial({ color: 'red', side: THREE.DoubleSide });

    var recorte = new THREE.Mesh(recorteGeom, recorteMat);

    csg.union([ caparazon]);
    csg.subtract([recorte]);

    caparazon = csg.toMesh();

    this.gary.add(caparazon);

    caparazon.position.x = 0.7;
    caparazon.position.y = -0.3;

    // ---------------------------- OJOS ---------------------------- //

    var materialLoader = new MTLLoader();
    var objectLoader = new OBJLoader();
    materialLoader.load('../../models/ojo/eyeball.mtl', (materials1) => {
      objectLoader.setMaterials(materials1);
      objectLoader.load('../../models/ojo/eyeball.obj', (ojo1) => {
        ojo1.scale.set(0.5,0.5,0.5);
        ojo1.rotateY(Math.PI/2);
        this.gary.add(ojo1); 
        ojo1.position.z = 2;
        ojo1.position.x = 4;
        ojo1.position.y = 5;

      }, null, null); 
    });

    materialLoader.load('../../models/ojo/eyeball.mtl', (materials1) => {
      objectLoader.setMaterials(materials1);
      objectLoader.load('../../models/ojo/eyeball.obj', (ojo2) => {
        ojo2.scale.set(0.5,0.5,0.5);
        ojo2.rotateY(Math.PI/2);
        this.gary.add(ojo2); 
        ojo2.position.z = -2;
        ojo2.position.x = 4;
        ojo2.position.y = 5;

      }, null, null); 
    });
  

    this.gary.translateY(0.03);
    this.gary.scale.set(0.025, 0.025, 0.025);

    let meshes = [];

    this.gary.traverse((child) => {
        if (child instanceof THREE.Mesh) {
            meshes.push(child);
        }
    });

    meshes.forEach((mesh) => {
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        console.log("Sombras añadidas a Gary");
    });

    this.add(this.gary);




    



     // ---------------------------- VARIABLES ---------------------------- //
    
  
    this.circuito = circuitoGeometry;
    this.path = circuitoGeometry.parameters.path;
    this.radio = circuitoGeometry.parameters.radius;
    this.segmentos = circuitoGeometry.parameters.tubularSegments;

    this.t = _t;

    this.rotacion = 0;

    this.cajaFigura = new THREE.Box3();

    var cajaVisible = new THREE.Box3Helper(this.cajaFigura, 'black');
    
    this.add(cajaVisible);

    cajaVisible.visible = false;
    
    this.nodoPosOrientTubo = new THREE.Object3D();
    this.movLateral = new THREE.Object3D();
    this.posSuper = new THREE.Object3D();

    this.posSuper.translateY(this.radio);

    this.add(this.nodoPosOrientTubo);
    this.nodoPosOrientTubo.add(this.movLateral);
    this.movLateral.add(this.posSuper);
    this.posSuper.add(this.gary);


  }

  update() {

    this.cajaFigura.setFromObject(this.gary);
    
    this.rotacion -= 0.05;
    
    this.movLateral.rotation.z = this.rotacion;
       
    var posTmp = this.path.getPointAt(this.t);
    this.nodoPosOrientTubo.position.copy(posTmp);
    
    var tangente = this.path.getTangentAt(this.t);
    posTmp.add(tangente);
    var segmentoActual = Math.floor(this.t * this.segmentos);
    this.nodoPosOrientTubo.up = this.circuito.binormals[segmentoActual];
    this.nodoPosOrientTubo.lookAt(posTmp); 
  }
}

export { gary };