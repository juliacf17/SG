
import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'

class geometria_constructiva extends THREE.Object3D {
  constructor() {
    
    super();

    
    
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

    
/*
    // Definimos el material
    var material = new THREE.MeshPhongMaterial({ color: 'lightpink', side: THREE.DoubleSide });

    // Previamente se crean las geometrías
    var cilExt = new THREE.CylinderGeometry(5,5,10,24,1);
    var cilInt = new THREE.CylinderGeometry(4.7,4.7,10,24,1);
    var toro = new THREE.TorusGeometry(3,0.5,24,24);

    // Se posicionan y orientan -> atención! Estas transformaciones, que se aplican a la geometría y no al Mesh,
    // SÍ se aplican en el mismo orden en el que se escriben en el código

    cilInt.translate(0,0.3,0);
    toro.translate(-5,0,0);

    // Se contstruyen los Meshes

    var cilExtMesh = new THREE.Mesh(cilExt, material);
    var cilIntMesh = new THREE.Mesh(cilInt, material);
    var toroMesh = new THREE.Mesh (toro,material);

    // Se crea el objeto CSG y se opera con él
    var csg = new CSG();
    csg.union([cilExtMesh, toroMesh]);
    csg.subtract([cilIntMesh]);

    // Y finalmente
    var resultadoMesh = csg.toMesh();

    resultadoMesh.scale.set(0.1,0.1,0.1);

    this.add(resultadoMesh);
*/
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
    
  }


}

export { geometria_constructiva };