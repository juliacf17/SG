import * as THREE from '../libs/three.module.js'

class MyTorus extends THREE.Object3D {
    constructor(gui,titleGui) {
        super();
        // Se crea la parte de la interfaz que corresponde a la caja
        // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
        this.createGUI(gui,titleGui);


        this.axis = new THREE.AxesHelper (0.1);
        this.add (this.axis);
        
        // Definimos la geometría y el material
        var torusGeom = new THREE.TorusGeometry(0.15, 0.05, 3, 3); //radio, grosor tubo, segmentos radiales (resolución ancho) y segmentos tubulares (forma)
        var torusMat = new THREE.MeshNormalMaterial({color: 0xCF0000});
        torusMat.flatShading = true;
        torusMat.needsUpdate = true;
        
        // Ya podemos construir el Mesh
        this.torus = new THREE.Mesh (torusGeom, torusMat);
        
        // Y añadirlo como hijo del Object3D (el this)
        this.add (this.torus);
        // Las geometrías se crean centradas en el origen.
        // Como queremos que el sistema de referencia esté en la base,
        // subimos el Mesh de la caja la mitad de su altura
        //this.torus.position.y = 0.11;
    }

    crearNuevo(){
        this.torus.geometry.dispose();  //Libera la geometría anterior
        var nuevaGeometria = new THREE.TorusGeometry(this.guiControls.radius,this.guiControls.tube,this.guiControls.segmentos_tubulares, this.guiControls.segmentos_radiales);
        this.torus.geometry = nuevaGeometria;
    }

    createGUI (gui,titleGui) {
        // Controles para el tamaño, la orientación y la posición de la caja
        this.guiControls = new function () {
            this.radius = 0.15;
            this.tube = 0.05;
            this.segmentos_tubulares = 3;
            this.segmentos_radiales = 3;
        }
        // Se crea una sección para los controles de la caja
        var folder = gui.addFolder (titleGui);
        
        var that = this; //asegura que se acceda al contexto original

        // El método listen() permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
        //La alternativa es (value) en vez de funtion(value) y this.crearNuevo();
        folder.add (this.guiControls, 'radius', 0.01, 1, 0.01)
            .name ('Radio principal:').listen()
            .onChange(function(value){that.crearNuevo()}); //this alude a function(value).
        
        folder.add (this.guiControls, 'tube', 0.01, 0.5, 0.01)
            .name ('Radio Tubo :').listen()
            .onChange(function(value){that.crearNuevo()});;

        folder.add (this.guiControls, 'segmentos_radiales', 3, 25, 1)
            .name ('Resolución Toro :').listen()
            .onChange(function(value){that.crearNuevo()});;

        folder.add (this.guiControls, 'segmentos_tubulares', 3, 15, 1)
            .name ('Resolución Tubo :').listen()
            .onChange(function(value){that.crearNuevo()});;
    }

    update () {
        // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que seaplican las transformaciones es:
        // Primero, el escalado
        // Segundo, la rotación en Z
        // Después, la rotación en Y
        // Luego, la rotación en X
        // Y por último la traslación
        //this.position.set (this.guiControls.posX,this.guiControls.posY,this.guiControls.posZ);
        //this.rotation.set (this.guiControls.rotX,this.guiControls.rotY,this.guiControls.rotZ);
        //this.scale.set (this.guiControls.sizeX,this.guiControls.sizeY,this.guiControls.sizeZ);
        this.torus.rotation.z += 0.01;
        this.torus.rotation.y += 0.01;
    }
}

export { MyTorus };