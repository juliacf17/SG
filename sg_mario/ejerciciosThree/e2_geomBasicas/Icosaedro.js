import * as THREE from '../libs/three.module.js'

class Icosaedro extends THREE.Object3D {
    constructor(gui,titleGui) {
        super();
        // Se crea la parte de la interfaz que corresponde a la caja
        // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
        this.createGUI(gui,titleGui);

        this.axis = new THREE.AxesHelper (1.0);
        this.add (this.axis);

        // Un Mesh se compone de geometría y material
        var isoGeom = new THREE.IcosahedronGeometry(0.5, 0); //radio, detalle
        var isoMat = new THREE.MeshNormalMaterial;
        isoMat.flatShading = true;
        isoMat.needsUpdate = true;

        // Ya podemos construir el Mesh
        this.isocaedro = new THREE.Mesh (isoGeom, isoMat);
        
        // Y añadirlo como hijo del Object3D (el this)
        this.add (this.isocaedro);
        // Las geometrías se crean centradas en el origen.
        // Como queremos que el sistema de referencia esté en la base,
        // subimos el Mesh de la caja la mitad de su altura
        //this.box.position.y = 1;
    }
    createGUI (gui,titleGui) {
        // Controles para el tamaño, la orientación y la posición de la caja
        this.guiControls = {
            radio: 0.5,
            detalle: 0,
            rotation: 0.0,

            reset : () => {
                this.guiControls.radio = 0.5;
                this.guiControls.detalle = 0;
            }
        }
        // Se crea una sección para los controles de la caja
        var folder = gui.addFolder (titleGui);
      
        folder.add (this.guiControls, 'radio', 0.05, 1, 0.01)
            .name ('Radio : ')
            .listen()
            .onChange( () => { this.createIsocaedro() } );

        folder.add (this.guiControls, 'detalle', 0, 3, 1) // (min, max, step)
            .name ('Detalle : ')
            .listen()
            .onChange( () => { this.createIsocaedro() } );

        folder.add (this.guiControls, 'reset')
            .name ('[ Reset ]');
    }
    update () {

        this.isocaedro.geometry.dispose();  // Liberar la memoria de la geometría antigua
        this.isocaedro.geometry = new THREE.IcosahedronGeometry(this.guiControls.radio, this.guiControls.detalle);
     

        this.isocaedro.rotation.z += 0.01;
        this.isocaedro.rotation.y += 0.01;
    }
}

export { Icosaedro };

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