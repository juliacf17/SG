import * as THREE from '../libs/three.module.js'

class Torus extends THREE.Object3D {
    constructor(gui,titleGui) {
        super();
        // Se crea la parte de la interfaz que corresponde a la caja
        // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
        this.createGUI(gui,titleGui);

        this.axis = new THREE.AxesHelper (1.0);
        this.add (this.axis);

        // Un Mesh se compone de geometría y material
        var torusGeom = new THREE.TorusGeometry (0.5, 0.2, 16, 100); //radio, tubo, segmentos radiales, segmentos tubulares
        var torusMat = new THREE.MeshNormalMaterial;
        torusMat.flatShading = true;
        torusMat.needsUpdate = true;

        // Ya podemos construir el Mesh
        this.torus = new THREE.Mesh (torusGeom, torusMat);
        
        // Y añadirlo como hijo del Object3D (el this)
        this.add (this.torus);
        // Las geometrías se crean centradas en el origen.
        // Como queremos que el sistema de referencia esté en la base,
        // subimos el Mesh de la caja la mitad de su altura
        //this.box.position.y = 1;
    }
    createGUI (gui,titleGui) {
        // Controles para el tamaño, la orientación y la posición de la caja
        this.guiControls = {
            radio: 0.5,
            tubo: 0.1,
            resRadial: 3,
            resTubular: 3,
            rotation: 0.0,

            reset : () => {
                this.guiControls.radio = 0.5;
                this.guiControls.tubo = 0.1;
                this.guiControls.resRadial = 3;
                this.guiControls.resTubular = 3;
            }
        }



        var folder = gui.addFolder (titleGui);

        folder.add (this.guiControls, 'radio', 0.05, 1, 0.01)
            .name ('Radio : ')
            .listen()
            .onChange( () => { this.createTorus() } );

        folder.add (this.guiControls, 'tubo', 0.05, 1, 0.01)
            .name ('Tubo : ')
            .listen()
            .onChange( () => { this.createTorus() } );

        folder.add (this.guiControls, 'resRadial', 3, 64, 1) // (min, max, step)
            .name ('Res. Radial : ') 
            .listen()
            .onChange( () => { this.createTorus() } );

        folder.add (this.guiControls, 'resTubular', 3, 64, 1)
            .name ('Res. Tubular : ')
            .listen()
            .onChange( () => { this.createTorus() } );
    
        folder.add (this.guiControls, 'reset')
            .name ('[ Reset ]');
    }
    update () {

        this.torus.geometry.dispose();  // Liberar la memoria de la geometría antigua
        this.torus.geometry = new THREE.TorusGeometry(this.guiControls.radio, this.guiControls.tubo, this.guiControls.resRadial, this.guiControls.resTubular);
     

        this.torus.rotation.z += 0.01;
        this.torus.rotation.y += 0.01;
    }
}

export { Torus };

/*

OTRA FORMA DE CAMBIAR POSICIÓN / ESCALADO / ROTACIÓN -> CON UN SET

createGUI (gui,titleGui) {
    // Controles para el movimiento de la parte móvil
    this.guiControls = {
    escalado : 1        //Valor inicial del escalado. 
    } 
    
    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder (titleGui);
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    folder.add (this.guiControls, 'escalado', 0.5, 5, 0.1)
    .name ('Escalado : ')
    .onChange ( (value) => this.setTamanio(value));
}

setTamanio(value){
    this.cubo.scale.set(value, value, value); 
}


*/