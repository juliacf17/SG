

import * as THREE from '../libs/three.module.js'

class Sphere extends THREE.Object3D {
    constructor(gui, titleGui) {
        super(); // Llama al constructor de la clase Object3D
    
        // Se crea la parte de la interfaz que corresponde a la esfera
        // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
        this.createGUI(gui, titleGui);
    
        // Un Mesh se compone de geometría y material
        this.sphereGeom = new THREE.SphereGeometry(0.5, 32.0, 32.0);
        // Como material se crea uno a partir de un color
        var sphereMat = new THREE.MeshNormalMaterial();
    
        // Ya podemos construir el Mesh
        this.sphere = new THREE.Mesh(this.sphereGeom, sphereMat);

        this.sphereAxes = new THREE.AxesHelper(2); // Crear un AxesHelper con una longitud de 1
        this.sphere.add(this.sphereAxes); // Añadir el AxesHelper como hijo de la esfera
    
        // Y añadirlo como hijo del Object3D (el this)
        this.add(this.sphere);
    
        // Las geometrías se crean centradas en el origen.
        // Como queremos que el sistema de referencia esté en la base,
        // subimos el Mesh de la esfera la mitad de su altura
    
        // Esfera centrada en el origen
        this.sphere.position.y = 0.5;
        this.sphere.position.z = 3.0; // Trasladamos la esfera 3 unidades en el eje Z
    }

    createGUI (gui,titleGui) {
        // Controles para el tamaño, la orientación y la posición de la esfera
        this.guiControls = {
        radius: 0.5,
        widthSegments: 32.0,
        heightSegments: 32.0,
        
        reset : () => {
            this.guiControls.radius = 0.5;
            this.guiControls.widthSegments = 32.0;
            this.guiControls.heightSegments = 32.0;
            
          }
        }
        
        // Se crea una sección para los controles de la esfera
        var folder = gui.addFolder (titleGui);
        
        // Establecemos un control para el radio de la esfera
        // Se le puede dar un valor mínimo y máximo
        folder.add (this.guiControls, 'radius', 0.5, 2.5, 0.1).name ('Radio : ').listen(); // El método listen() permite que el valor se actualice en la interfaz
        
        // Y otro control para los segmentos de la esfera
        folder.add (this.guiControls, 'widthSegments', 3, 32.0, 1).name ('Segmentos de ancho : ').listen();
        folder.add (this.guiControls, 'heightSegments', 2, 32.0, 1).name ('Segmentos de alto : ').listen();
        folder.add (this.guiControls, 'reset').name ('[ Reset ]');
    }
    
    update () {

        this.sphere.geometry.dispose();  // Liberar la memoria de la geometría antigua
        // Cambiamos la geometría de la esfera
        this.sphere.geometry = new THREE.SphereGeometry(this.guiControls.radius, this.guiControls.widthSegments, this.guiControls.heightSegments);
    }
}

export { Sphere };