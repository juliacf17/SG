

import * as THREE from '../libs/three.module.js'

class Cone extends THREE.Object3D {

    constructor(gui,guiTitle){

        super();

        this.createGUI(gui,guiTitle);

        this.coneGeom = new THREE.ConeGeometry(0.5,1,3.0);
        var coneMat = new THREE.MeshNormalMaterial();

        this.cone = new THREE.Mesh(this.coneGeom,coneMat);

        this.coneAxes = new THREE.AxesHelper(2); // Crear un AxesHelper con una longitud de 1
        this.cone.add(this.coneAxes); // Añadir el AxesHelper como hijo de la esfera

        this.add(this.cone);

        this.cone.position.y = 0.5;

    }

    createGUI (gui,titleGui) {
        // Controles para el tamaño, la orientación y la posición de la caja
        this.guiControls = {
          radius: 0.5,
          height: 1.0,
          radialSegments: 3.0,
          
          // Un botón para dejarlo todo en su posición inicial
          // Cuando se pulse se ejecutará esta función.
          reset : () => {
            this.guiControls.radius = 0.5;
            this.guiControls.height = 1.0;
            this.guiControls.radialSegments = 3.0;
          }
        } 
        
        // Se crea una sección para los controles de la caja
        var folder = gui.addFolder (titleGui);
        

        folder.add (this.guiControls, 'radius', 0.1, 2.0, 0.1).name ('Radio : ').listen();
        folder.add (this.guiControls, 'height', 0.1, 2.0, 0.1).name ('Altura : ').listen();
        folder.add (this.guiControls, 'radialSegments', 3, 64, 1).name ('Segmentos radiales : ').listen();

        folder.add (this.guiControls, 'reset').name ('[ Reset ]');
    }

    update(){

        this.cone.geometry.dispose();  // Liberar la memoria de la geometría antigua
        this.cone.geometry = new THREE.ConeGeometry(this.guiControls.radius,this.guiControls.height,this.guiControls.radialSegments);
    }

}

export { Cone };