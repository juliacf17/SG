import * as THREE from '../libs/three.module.js'

class MySphere extends THREE.Object3D {
    constructor(gui,titleGui) {
        super();
        // Se crea la parte de la interfaz que corresponde a la caja
        // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
        this.createGUI(gui,titleGui);
        // Un Mesh se compone de geometría y material
        var sphereGeom = new THREE.SphereGeometry(0.15, 4, 4); //radio, paralelos y meridianos (norte a sur)
        var sphereMat = new THREE.MeshNormalMaterial({color: 0xCF0000});
        sphereMat.flatShading = true;
        sphereMat.needsUpdate = true;

        this.axis = new THREE.AxesHelper (0.1);
        this.add (this.axis);
        
        // Ya podemos construir el Mesh
        this.sphere = new THREE.Mesh (sphereGeom, sphereMat);
        
        // Y añadirlo como hijo del Object3D (el this)
        this.add (this.sphere);
        
        // Las geometrías se crean centradas en el origen.
        // Como queremos que el sistema de referencia esté en la base,
        // subimos el Mesh de la caja la mitad de su altura

    }
    crearNuevo(){
        this.sphere.geometry.dispose();
        var nuevaGeometria = new THREE.SphereGeometry(this.guiControls.radius,this.guiControls.paralelos,this.guiControls.meridianos);
        this.sphere.geometry = nuevaGeometria;
    }

    createGUI (gui,titleGui) {
        // Controles para el tamaño, la orientación y la posición de la caja
        this.guiControls = new function () {
            this.radius = 0.15;
            this.paralelos = 4;
            this.meridianos = 4;
        }

        // Se crea una sección para los controles de la caja
        var folder = gui.addFolder (titleGui);
        var that = this;


        // Estas lineas son las que añaden los componentes de la interfaz
        // Las tres cifras indican un valor mínimo, un máximo y el incremento
        // El método listen() permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
        folder.add (this.guiControls, 'radius', 0.01, 1, 0.01)
            .name ('Radio:').listen()
            .onChange((value) => {this.crearNuevo()}); //this alude a function(value).
        
        folder.add (this.guiControls, 'paralelos', 3, 25, 1)
            .name ('Paralelos:').listen()
            .onChange((value) => {this.crearNuevo()});;

        folder.add (this.guiControls, 'meridianos', 3, 25, 1)
            .name ('Meridianos:').listen()
            .onChange((value) => {this.crearNuevo()});;
    }

    update () {
        this.sphere.rotation.z += 0.01;
        this.sphere.rotation.y += 0.01;
    }
}

export { MySphere };