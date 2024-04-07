
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

    this.resultadoMesh = csg.toMesh();

    this.resultadoMesh.scale.set(0.1,0.1,0.1);

    this.add(this.resultadoMesh);

    this.resultadoMesh.position.x = -2;

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

    this.resultadoMesh2 = this.csg.toMesh();

    this.add(this.resultadoMesh2);

    this.resultadoMesh2.position.x = 2;


    //this.add(this.cilindro1);
    //this.add(this.cilindro2);
    //this.extrusion.translate(-0.20,-0.20,0);

    
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
    var material = new THREE.MeshPhongMaterial({ color: 'red', side: THREE.DoubleSide });
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

    this.resultadoMesh.rotation.y += 0.01;
    this.resultadoMesh.rotation.z += 0.01;
    this.result.rotation.y += 0.01;
    this.result.rotation.z += 0.01;
    this.resultadoMesh2.rotation.y += 0.01;
    this.resultadoMesh2.rotation.z += 0.01;
    
    
  }


}

export { geometria_constructiva };