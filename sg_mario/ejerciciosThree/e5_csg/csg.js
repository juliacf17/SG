
import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'

class geometria_constructiva extends THREE.Object3D {
  constructor() {
    
    super();

    /**** EJEMPLO SIMPLE ***************************************************************************/

    
    this.cubo = this.createCubo();
    this.esfera = this.createEsfera();
    // Perform the CSG operation
    var csg = new CSG();
    csg.union([this.cubo]);
    csg.subtract([this.esfera]);

    this.result = csg.toMesh();

    // Add the result to the scene
    this.add(this.result);


    /**** TAZA ***************************************************************************/

    var material = new THREE.MeshPhongMaterial({ color: 'lightpink', side: THREE.DoubleSide });

    this.cilExt = new THREE.CylinderGeometry(5,5,10,26,1); // radio_sup, radio_inf, altura, n_segmentos, n_alturas
    this.cilInt = new THREE.CylinderGeometry(4.7,4.7,10,24,1);
    this.toro = new THREE.TorusGeometry(3,0.5,24,24); // radio, tubo, n_radial, n_tubular

    this.cilInt.translate(0,0.3,0);
    this.toro.translate(-5,0,0);

    var cilExtMesh = new THREE.Mesh(this.cilExt, material);
    var cilIntMesh = new THREE.Mesh(this.cilInt, material);
    var toroMesh = new THREE.Mesh (this.toro,material);

    var csg = new CSG();
    csg.union([cilExtMesh, toroMesh]);
    csg.subtract([cilIntMesh]);

    this.taza = csg.toMesh();

    this.taza.scale.set(0.1,0.1,0.1);

    this.add(this.taza);

    this.taza.position.x = -2;

    /**** "APOYO ESTANTERÍA" ***************************************************************************/

    this.extrusion = this.createExtrusion();
    this.caja = this.createBox(1,1,0.5);
    this.cilindro1 = this.createCilindro(0.1,0.05,0.2,6);
    this.cilindro2 = this.createCilindro(0.1,0.05,0.2,6);

    this.extrusion.position.x = 0.3;
    this.extrusion.position.y = -0.25;
    this.extrusion.position.z = -0.5;

    this.cilindro1.rotation.z = Math.PI;
    this.cilindro1.position.x = 0.25;
    this.cilindro1.position.y = 0.45;

    this.cilindro2.rotation.z = 3* Math.PI/2;
    this.cilindro2.position.x = -0.4;
    this.cilindro2.position.y = -0.25;

    this.csg = new CSG();
    this.csg.union([this.caja]);
    this.csg.subtract([this.extrusion]);
    this.csg.subtract([this.cilindro1]);
    this.csg.subtract([this.cilindro2]);

    this.estanteria = this.csg.toMesh();

    this.add(this.estanteria);

    this.estanteria.position.x = 2;
  //this.add(this.cilindro1);
  //this.add(this.cilindro2);
  //this.extrusion.translate(-0.20,-0.20,0);


    /**** TUERCA ***************************************************************************/

    
    //this.cuerpo = this.createExtrusion();

    this.cuerpo = this.createCilindro(0.6,0.6,0.5,6);

    //this.add(this.cuerpo);

    this.cilindro1 = this.createCilindro(0.3,0.3,1,64);

    //this.add(this.cilindro1);

    this.espiral = this.createEspiral();

    //this.add(this.espiral);

    this.toro = this.createTorus(0.66,0.15,64,64);

    this.toro.translateY(0.35);

    //this.add(this.toro);

    this.toro2 = this.createTorus(0.66,0.15,64,64);

    this.toro2.translateY(-0.35);

    //this.add(this.toro2);

    this.csg = new CSG();

    this.csg.union([this.cuerpo]);
    this.csg.subtract([this.cilindro1]);
    this.csg.subtract([this.espiral]);
    this.csg.subtract([this.toro]);
    this.csg.subtract([this.toro2]);
  
    this.tuerca = this.csg.toMesh();
    this.add(this.tuerca);

    this.tuerca.position.y = 2;
    

  }

  createEspiral(){
    // shape cuadrado para barrerlo
    var shape = new THREE.Shape();
    var lado = 5; // Puedes ajustar el tamaño según necesites
    shape.moveTo(0, 0);
    shape.lineTo(lado, 0);
    shape.lineTo(lado, lado);
    shape.lineTo(0, lado);
    shape.lineTo(0, 0);

     // camino en espiral
     var pts = [];
     var altura = 100; // Altura de la espiral
     var vueltas = 10; // Número de vueltas completas
     var pasos = 100; // Número de puntos en el camino
     for (var i = 0; i <= pasos; i++) {
         var t = i / pasos * vueltas * Math.PI * 2; // ángulo actual
         var x = Math.sin(t) * 20;
         var y = (i / pasos) * altura - altura / 2;
         var z = Math.cos(t) * 20;
         pts.push(new THREE.Vector3(x, y, z));
     }

     var path = new THREE.CatmullRomCurve3(pts);     //Crea el camino
     //new THREE.LinearCurve3(pts); 	//Pasa por los puntos en linea recta
     
     var options = {
         steps: 500,     //La suavidad de la extrusión, cuanto más pasos más suave.   
         curveSegments: 64, // Mejora la resolución de las curvas cuanto mayor es. 
         extrudePath: path // La trayectoria a lo largo de la cual se extruirá la forma
     };
 
     var geometry = new THREE.ExtrudeGeometry( shape, options );     //Crear la geometría
     var material = new THREE.MeshPhongMaterial({ color: 'lightpink', side: THREE.DoubleSide });
 
     var espiral = new THREE.Mesh(geometry, material); 
     espiral.scale.set(0.013, 0.0075, 0.013);

     return espiral;
  }
  createTorus(radio, tubo, n_radial, n_tubular){
    var geometry = new THREE.TorusGeometry(radio, tubo, n_radial, n_tubular); // radio, tubo, n_radial, n_tubular
    var material = new THREE.MeshPhongMaterial({ color: 'lightpink', side: THREE.DoubleSide });
    var mesh = new THREE.Mesh(geometry, material);
    geometry.rotateX(Math.PI/2);
    return mesh;
  }
  createBox( width, height, depth ) {
    var geometry = new THREE.BoxGeometry( width, height, depth );
    var material = new THREE.MeshNormalMaterial();
    var mesh = new THREE.Mesh( geometry, material );
    return mesh;
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
      depth: 4, // Profundidad de la extrusión
      bevelEnabled: true, // Activa el biselado
      bevelThickness: 0.05, // Grosor del biselado
      bevelSize: 0.02, // Tamaño del biselado
      bevelSegments: 100 // Segmentos del biselado
    };

    var geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    var material = new THREE.MeshPhongMaterial({ color: 'lightpink', side: THREE.DoubleSide });
    var mesh = new THREE.Mesh(geometry, material);

    geometry.scale(0.2,0.2,0.2);
    return mesh;
  }

  createCilindro(radio_sup, radio_inf, altura, n_segmentos){
    var geometry = new THREE.CylinderGeometry(radio_sup, radio_inf, altura, n_segmentos, 1);
    var material = new THREE.MeshPhongMaterial({ color: 'grey', side: THREE.DoubleSide });
    //var material = new THREE.MeshNormalMaterial();
    var mesh = new THREE.Mesh(geometry, material);
    return mesh;
  }

  createCubo(){
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshPhongMaterial({ color: 'red', side: THREE.DoubleSide });
    var mesh = new THREE.Mesh(geometry, material);
    return mesh;
  }

  createEsfera(){
    var geometry = new THREE.SphereGeometry(0.5, 32, 32);
    var material = new THREE.MeshBasicMaterial({ color: 'blue' });
    var mesh = new THREE.Mesh(geometry, material);
    geometry.translate(0,0.5,0);

    return mesh;
  }


  createGUI(gui, titleGui) {
    // Create a folder for the GUI
    const folder = gui.addFolder(titleGui);

    // Add GUI controls
    folder.add(this.guiControls, 'lightPower', 0, 1000, 20)
      .name('Light power: ')
      .onChange((value) => this.setLightPower(value));

    // Return the folder
    return folder;
  }

  update() {

    this.taza.rotation.y += 0.01;
    this.taza.rotation.z += 0.01;
    this.result.rotation.y += 0.01;
    this.result.rotation.z += 0.01;
    this.estanteria.rotation.y += 0.01;
    this.estanteria.rotation.z += 0.01;
    this.tuerca.rotation.y += 0.01;
    this.tuerca.rotation.z += 0.01;
    
    
  }


}

export { geometria_constructiva };