import * as THREE from '../libs/three.module.js'

class MyCone extends THREE.Object3D {
    constructor(gui,titleGui) {
        super();
        // Se crea la parte de la interfaz que corresponde a la caja
        // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
        this.createGUI(gui,titleGui);
        
        this.axis = new THREE.AxesHelper (0.1);
        this.add (this.axis);

        // Un Mesh se compone de geometría y material
        var coneGeom = new THREE.ConeGeometry( 0.2, 0.4, 3); //radio, altura y segmentos radiales
        // Como material se crea uno a partir de un color
        var coneMat = new THREE.MeshNormalMaterial({color: 0xCF0000});
        coneMat.flatShading = true;
        coneMat.needsUpdate = true;
        
        // Ya podemos construir el Mesh
        this.cone = new THREE.Mesh (coneGeom, coneMat);
        
        // Y añadirlo como hijo del Object3D (el this)
        this.add (this.cone);
        // Las geometrías se crean centradas en el origen.
        // Como queremos que el sistema de referencia esté en la base,
        // subimos el Mesh de la caja la mitad de su altura
        //this.cone.position.y = 1.5;
    }

    crearNuevo(){
        this.cone.geometry.dispose();
        var nuevaGeometria = new THREE.ConeGeometry(this.guiControls.radius,this.guiControls.height,this.guiControls.segmentos_radiales);
        this.cone.geometry = nuevaGeometria;
    }

    createGUI (gui,titleGui) {
        // Controles para el tamaño, la orientación y la posición de la caja
        this.guiControls = new function () {
            this.radius = 0.2;
            this.height = 0.4;
            this.segmentos_radiales = 3;
        }
        // Se crea una sección para los controles de la caja
        var folder = gui.addFolder (titleGui);
        var that = this;
        // Estas lineas son las que añaden los componentes de la interfaz
        // Las tres cifras indican un valor mínimo, un máximo y el incremento
        // El método listen() permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
        folder.add (this.guiControls, 'radius', 0.1, 1, 0.01)
            .name ('Radio:').listen()
            .onChange(function(value){that.crearNuevo()}); //this alude a function(value).
        
        folder.add (this.guiControls, 'height', 0.1, 1, 0.01)
            .name ('Altura:').listen()
            .onChange(function(value){that.crearNuevo()});;

        folder.add (this.guiControls, 'segmentos_radiales', 3, 10, 1)
            .name ('Definición:').listen()
            .onChange(function(value){that.crearNuevo()});;
    }

    update () {
        this.cone.rotation.z += 0.01;
        this.cone.rotation.y += 0.01;
    }
}

export { MyCone };