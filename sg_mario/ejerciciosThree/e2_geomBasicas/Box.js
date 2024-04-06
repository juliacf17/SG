import * as THREE from '../libs/three.module.js'

class Box extends THREE.Object3D {
    constructor(gui,titleGui) {
        super();
        // Se crea la parte de la interfaz que corresponde a la caja
        // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
        this.createGUI(gui,titleGui);

        this.axis = new THREE.AxesHelper (1.0);
        this.add (this.axis);

        // Un Mesh se compone de geometría y material
        var boxGeom = new THREE.BoxGeometry (0.5,0.5,0.5); //ancho, alto y largo
        var boxMat = new THREE.MeshNormalMaterial;
        boxMat.flatShading = true;
        boxMat.needsUpdate = true;

        // Ya podemos construir el Mesh
        this.box = new THREE.Mesh (boxGeom, boxMat);
        
        // Y añadirlo como hijo del Object3D (el this)
        this.add (this.box);
        // Las geometrías se crean centradas en el origen.
        // Como queremos que el sistema de referencia esté en la base,
        // subimos el Mesh de la caja la mitad de su altura
        //this.box.position.y = 1;
    }
    createGUI (gui,titleGui) {
        // Controles para el tamaño, la orientación y la posición de la caja
        this.guiControls = {
            sizeX : 1,
            sizeY : 1,
            sizeZ : 1,
            rotX : 0.0,
            rotY : 0.0,
            rotZ : 0.0,
            posX : 0.0,
            posY : 0.0,
            posZ : 0.0,
            // Un botón para dejarlo todo en su posición inicial
            // Cuando se pulse se ejecutará esta función.
            reset : () => {
                this.guiControls.sizeX = 0.5;
                this.guiControls.sizeY = 0.5;
                this.guiControls.sizeZ = 0.5;
                this.guiControls.rotX = 0.0;
                this.guiControls.rotY = 0.0;
                this.guiControls.rotZ = 0.0;
                this.guiControls.posX = 0.0;
                this.guiControls.posY = 0.0;
                this.guiControls.posZ = 0.0;
            }
        }
        // Se crea una sección para los controles de la caja
        var folder = gui.addFolder (titleGui);
        // Estas lineas son las que añaden los componentes de la interfaz
        // Las tres cifras indican un valor mínimo, un máximo y el incremento
        // El método listen() permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
        folder.add (this.guiControls, 'sizeX', 0.05, 2, 0.01)
            .name ('Tamaño X: ').listen();
        folder.add (this.guiControls, 'sizeY', 0.05, 2, 0.01)
            .name ('Tamaño Y: ').listen();
        folder.add (this.guiControls, 'sizeZ', 0.05, 2, 0.01)
            .name ('Tamaño Z: ').listen();

        folder.add (this.guiControls, 'rotX', 0.0, Math.PI/2, 0.1)
            .name ('Rotación X: ').listen();
        folder.add (this.guiControls, 'rotY', 0.0, Math.PI/2, 0.1)
            .name ('Rotación Y: ').listen();
        folder.add (this.guiControls, 'rotZ', 0.0, Math.PI/2, 0.1)
            .name ('Rotación Z: ').listen();

        folder.add (this.guiControls, 'posX', -1, 1, 0.1)
            .name ('Posición X: ').listen();
        folder.add (this.guiControls, 'posY', -1, 1, 0.1)
            .name ('Posición Y: ').listen();
        folder.add (this.guiControls, 'posZ', -1, 1, 0.1)
            .name ('Posición Z: ').listen();

        folder.add (this.guiControls, 'reset')
            .name ('[ Reset ]');
    }
    update () {
        // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
        // Primero, el escalado
        // Segundo, la rotación en Z
        // Después, la rotación en Y
        // Luego, la rotación en X
        // Y por último la traslación
        this.position.set (this.guiControls.posX,this.guiControls.posY,this.guiControls.posZ);
        this.rotation.set (this.guiControls.rotX,this.guiControls.rotY,this.guiControls.rotZ);
        this.scale.set (this.guiControls.sizeX,this.guiControls.sizeY,this.guiControls.sizeZ);
        this.box.rotation.z += 0.01;
        this.box.rotation.y += 0.01;
    }
}

export { Box };

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