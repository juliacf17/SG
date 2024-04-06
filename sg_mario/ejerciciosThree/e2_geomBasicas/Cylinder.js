import * as THREE from '../libs/three.module.js'

class Cylinder extends THREE.Object3D {
    constructor(gui,titleGui) {
        super();
        // Se crea la parte de la interfaz que corresponde a la caja
        // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
        this.createGUI(gui,titleGui);

        this.axis = new THREE.AxesHelper (1.0);
        this.add (this.axis);

        // Un Mesh se compone de geometría y material
        var cilGeom = new THREE.CylinderGeometry (0.5,0.5,1,3); //radio superior, radio inferior, altura, segmentos
        var cilMat = new THREE.MeshNormalMaterial;
        cilMat.flatShading = true;
        cilMat.needsUpdate = true;

        // Ya podemos construir el Mesh
        this.cylinder = new THREE.Mesh (cilGeom, cilMat);
        
        // Y añadirlo como hijo del Object3D (el this)
        this.add (this.cylinder);
        // Las geometrías se crean centradas en el origen.
        // Como queremos que el sistema de referencia esté en la base,
        // subimos el Mesh de la caja la mitad de su altura
        //this.box.position.y = 1;
    }
    createGUI (gui,titleGui) {
        // Controles para el tamaño, la orientación y la posición de la caja
        this.guiControls = {
            radio_sup : 0.25,
            radio_inf : 0.25,
            altura : 0.5,
            segmentos : 64,

            reset : () => {
                this.guiControls.radio_sup = 0.5;
                this.guiControls.radio_inf = 0.5;
                this.guiControls.altura = 0.5;
                this.guiControls.segmentos = 3;
            }
        }
        // Se crea una sección para los controles de la caja
        var folder = gui.addFolder (titleGui);
        // Estas lineas son las que añaden los componentes de la interfaz
        // Las tres cifras indican un valor mínimo, un máximo y el incremento
        // El método listen() permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
       
        folder.add (this.guiControls, 'radio_sup', 0.05, 2, 0.01)
            .name ('Radio Superior : ')
            .listen()
            .onChange( () => { this.createCylinder() } );

        folder.add (this.guiControls, 'radio_inf', 0.05, 2, 0.01)
            .name ('Radio Inferior : ')
            .listen()
            .onChange( () => { this.createCylinder() } );

        folder.add (this.guiControls, 'altura', 0.05, 2, 0.01)
            .name ('Altura : ')
            .listen()
            .onChange( () => { this.createCylinder() } );

        folder.add (this.guiControls, 'segmentos', 3, 64, 1) // (min, max, step)
            .name ('Segmentos : ')
            .listen()
            .onChange( () => { this.createCylinder() } );

        folder.add (this.guiControls, 'reset')
            .name ('[ Reset ]');
    }
    update () {

        this.cylinder.geometry.dispose();  // Liberar la memoria de la geometría antigua
        this.cylinder.geometry = new THREE.CylinderGeometry(this.guiControls.radio_sup, this.guiControls.radio_inf, this.guiControls.altura, this.guiControls.segmentos);
            

        this.cylinder.rotation.z += 0.01;
        this.cylinder.rotation.y += 0.01;
    }
}

export { Cylinder };

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