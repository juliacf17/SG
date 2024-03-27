import * as THREE from '../libs/three.module.js'

class Revolucion extends THREE.Object3D {
    // Declarar variables aquí (diferenciar el objeto en partes).
    constructor(gui, titleGui) {
        super();

        // Crear la interfaz (puede o no hacer falta).
        this.createGUI(gui,titleGui);
        
        var RevolucionMat = new THREE.MeshNormalMaterial({
            side: THREE.DoubleSide // Hacer que el material sea visible desde ambos lados
        });

        // Puntos de la línea a revolucionar.

        this.points = [];
        
        this.points.push(
            new THREE.Vector2(1, 0),
            new THREE.Vector2(1, 1),
            new THREE.Vector2(0.5, 2),
        );

        this.revolucionGeom = new THREE.LatheGeometry(this.points,20,0,Math.PI*2);

        // Añadir las partes al objeto con this.add(this.parte)
        this.revolucion = new THREE.Mesh(this.revolucionGeom, RevolucionMat); 
        this.add(this.revolucion);
    }

    createGUI (gui,titleGui) {
        // Controles para el tamaño, la orientación y la posición de la caja
        this.guiControls = {

            angle: Math.PI*2,
            segments: 3,

          reset : () => {
            this.guiControls.angle = Math.PI*2;
            this.guiControls.segments = 3;            
          }
        } 
        
        // Se crea una sección para los controles de la caja
        var folder = gui.addFolder (titleGui);

        folder.add (this.guiControls, 'angle', 0, Math.PI*2, 0.1).name ('Ángulo : ').listen();
        folder.add (this.guiControls, 'segments', 3, 20, 1).name ('Resolución : ').listen();
        

        folder.add (this.guiControls, 'reset').name ('[ Reset ]');
    }

    update(){

        this.revolucion.geometry.dispose();  // Liberar la memoria de la geometría antigua
        this.revolucion.geometry = new THREE.LatheGeometry(this.points,this.guiControls.segments,0,this.guiControls.angle);
    }

    

}


export { Revolucion };
