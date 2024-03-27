import * as THREE from '../libs/three.module.js'

class MyRevolution extends THREE.Object3D {
    constructor(gui, titleGui, points){
        super();

        this.createGUI(gui,titleGui);
        // Se crea la parte de la interfaz que corresponde a la grapadora
        // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
        this.mypoints = points; //puntos para la revolucion
        
        // Como material se crea uno a partir de un color
        var mat = new THREE.MeshNormalMaterial();
        //this.material.side = THREE.DoubleSide;        //El material se aplica a los dos lados de la cara. 
        mat.flatShading = true;
        mat.needsUpdate = true;

        // Geometría
        var latheGeom = new THREE.LatheGeometry(points, 3, 0, 2*Math.PI); //Array de perfil,segmentos, angulo inicial y longitud del giro
        
        //Mesh
        this.latheObject = new THREE.Mesh(latheGeom, mat);
        
        // Lo añadimos como hijo del Object3D (this)
        this.add (this.latheObject);
        //this.latheObject.position.y+=1.5;//Lo colocamos sobre plano XZ
    }

    crearNuevo(){
        this.latheObject.geometry.dispose();          //Limpiar la geometría anterior. 
        var nuevaGeometria = new THREE.LatheGeometry(this.mypoints, this.guiControls.resolucion, 0, this.guiControls.angulo);
        this.latheObject.geometry = nuevaGeometria;
    }

    createGUI (gui,titleGui) {
        // Controles para el tamaño, la orientación y la posición de la caja
        this.guiControls = new function () {
            this.resolucion = 3;
            this.angulo = 2*3.1416;
        }
        //Nota RESET es más complicado de lo que esperaba porque hay que declararlo dentro de guicontrol y poner lo que hace
        // Se crea una sección para los controles de la caja
        var folder = gui.addFolder (titleGui);
        // Estas lineas son las que añaden los componentes de la interfaz
        // Las tres cifras indican un valor mínimo, un máximo y el incremento
        // El método listen() permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
        folder.add (this.guiControls, 'resolucion', 2, 25, 1)
            .name ('Resolución:').listen()
            .onChange((value) => {this.crearNuevo()});;

        folder.add (this.guiControls, 'angulo', 0.1, 2*3.1416, 0.1)
            .name ('Angulo:').listen()
            .onChange((value) => {this.crearNuevo()});;
    }

    update () {
        // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
        // Primero, el escalado
        // Segundo, la rotación en Z
        // Después, la rotación en Y
        // Luego, la rotación en X
        // Y por último la traslación
    }
}

export { MyRevolution };