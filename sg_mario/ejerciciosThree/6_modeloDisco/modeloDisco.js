
import * as THREE from '../libs/three.module.js'
import { MTLLoader } from '../libs/MTLLoader.js'
import { OBJLoader } from '../libs/OBJLoader.js'
 

class modeloDisco extends THREE.Object3D {
  constructor() {
    
    super();
    
    var materialLoader = new MTLLoader();
    var objectLoader = new OBJLoader();
    materialLoader.load('../models/porsche911/911.mtl', (materials) => {
      objectLoader.setMaterials(materials);
      objectLoader.load('../models/porsche911/Porsche_911_GT2.obj', (object) => {
        this.add(object); 
      }, null, null); 
    });
  }
  
  

  createGUI(gui, titleGui) {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = {
      sizeX: 1.0,
      sizeY: 1.0,
      sizeZ: 1.0,

      rotX: 0.0,
      rotY: 0.0,
      rotZ: 0.0,

      posX: 0.0,
      posY: 0.0,
      posZ: 0.0,

      // Un botón para dejarlo todo en su posición inicial
      // Cuando se pulse se ejecutará esta función.
      reset: () => {
        this.guiControls.sizeX = 1.0;
        this.guiControls.sizeY = 1.0;
        this.guiControls.sizeZ = 1.0;

        this.guiControls.rotX = 0.0;
        this.guiControls.rotY = 0.0;
        this.guiControls.rotZ = 0.0;

        this.guiControls.posX = 0.0;
        this.guiControls.posY = 0.0;
        this.guiControls.posZ = 0.0;
      }
    }

    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder(titleGui);

    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento.
    // El método listen() permite que si se cambia el valor de la variable en este código, el deslizador de la interfaz gráfica se actualice.
    folder.add(this.guiControls, 'sizeX', 1, 30, 0.1).name('Tamaño X : ').listen();
    folder.add(this.guiControls, 'sizeY', 1, 30, 0.1).name('Tamaño Y : ').listen();
    folder.add(this.guiControls, 'sizeZ', 1, 30, 0.1).name('Tamaño Z : ').listen();

    folder.add(this.guiControls, 'rotX', 0, 2 * Math.PI, 0.1).name('Rotación X : ').listen();
    folder.add(this.guiControls, 'rotY', 0, 2 * Math.PI, 0.1).name('Rotación Y : ').listen();
    folder.add(this.guiControls, 'rotZ', 0, 2 * Math.PI, 0.1).name('Rotación Z : ').listen();

    folder.add(this.guiControls, 'posX', -20, 20, 0.1).name('Posición X : ').listen();
    folder.add(this.guiControls, 'posY', -20, 20, 0.1).name('Posición Y : ').listen();
    folder.add(this.guiControls, 'posZ', -20, 20, 0.1).name('Posición Z : ').listen();

    folder.add(this.guiControls, 'reset').name('[ Reset ]');
  }

  update() {
    this.rotation.y += 0.01;
  }


}

export { modeloDisco };