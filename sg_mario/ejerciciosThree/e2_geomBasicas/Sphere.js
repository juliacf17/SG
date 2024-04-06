import * as THREE from '../libs/three.module.js'

class Sphere extends THREE.Object3D {
    constructor(gui,titleGui) {
        super();
        // Se crea la parte de la interfaz que corresponde a la caja
        // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
        this.createGUI(gui,titleGui);

        this.axis = new THREE.AxesHelper (1.0);
        this.add (this.axis);

        // Un Mesh se compone de geometría y material
        var sphereGeom = new THREE.SphereGeometry (0.5, 32, 32); //radio, segmentos horizontales, segmentos verticales
        var sphereMat = new THREE.MeshNormalMaterial();
        sphereMat.flatShading = true;
        sphereMat.needsUpdate = true;

        // Ya podemos construir el Mesh
        this.sphere = new THREE.Mesh (sphereGeom, sphereMat);
        
        // Y añadirlo como hijo del Object3D (el this)
        this.add (this.sphere);
        // Las geometrías se crean centradas en el origen.
        // Como queremos que el sistema de referencia esté en la base,
        // subimos el Mesh de la caja la mitad de su altura
        //this.sphere.position.y = 1;
    }
    createGUI (gui,titleGui) {
        // Controles para el tamaño, la orientación y la posición de la caja
        this.guiControls = {
            radio: 0.5,
            resEcuador: 32,
            resMeridiano: 32,
            rotation: 0.0,


            reset : () => {
                this.guiControls.radio = 0.5;
                this.guiControls.resEcuador = 64;
                this.guiControls.resMeridiano = 64;
            }

        }

        var folder = gui.addFolder (titleGui);

        folder.add (this.guiControls, 'radio', 0.05, 1, 0.01)
            .name ('Radio : ')
            .listen()
            .onChange( () => { this.createSphere() } );

        folder.add (this.guiControls, 'resEcuador', 3, 64, 2) // (min, max, step)
            .name ('Res. Ecuador : ')
            .listen()
            .onChange( () => { this.createSphere() } );

        folder.add (this.guiControls, 'resMeridiano', 3, 64, 2)
            .name ('Res. Meridiano : ')
            .listen()
            .onChange( () => { this.createSphere() } );

        folder.add (this.guiControls, 'reset')
            .name ('[ Reset ]');
    }
    update () {


        this.sphere.geometry.dispose();  // Liberar la memoria de la geometría antigua
        this.sphere.geometry = new THREE.SphereGeometry(this.guiControls.radio, this.guiControls.resEcuador, this.guiControls.resMeridiano);

        this.sphere.rotation.z += 0.01;
        this.sphere.rotation.y += 0.01;
    }
}

export { Sphere };