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

        
        this.points = [];
        
        /*this.points.push(
            new THREE.Vector2(1, 0),
            new THREE.Vector2(1, 1),
            new THREE.Vector2(0.5, 2),
        );*/

        //PEON
        
        this.points.push(new THREE.Vector2(0.001,-1.5));
        this.points.push(new THREE.Vector2(1.0,-1.45));
        this.points.push(new THREE.Vector2(1.0,-1.1));
        this.points.push(new THREE.Vector2(0.5,-0.7));
        this.points.push(new THREE.Vector2(0.4,-0.4));
        this.points.push(new THREE.Vector2(0.4,0.5));
        this.points.push(new THREE.Vector2(0.5,0.6));
        this.points.push(new THREE.Vector2(0.3,0.6));
        this.points.push(new THREE.Vector2(0.5,0.8));
        this.points.push(new THREE.Vector2(0.55,1.0));
        this.points.push(new THREE.Vector2(0.5,1.2));
        this.points.push(new THREE.Vector2(0.3,1.45));
        this.points.push(new THREE.Vector2(0.001,1.5));



        



        var shape = new THREE.Shape();
        shape.moveTo(this.points[0].x, this.points[0].y);

        for (var i = 1; i < this.points.length; i++) {
            shape.lineTo(this.points[i].x, this.points[i].y);
        }

        

        //this.points = shape.getPoints(5);


        this.revolucionGeom = new THREE.LatheGeometry(this.points,20,0,Math.PI*2);

        // Añadir las partes al objeto con this.add(this.parte)
        this.revolucion = new THREE.Mesh(this.revolucionGeom, RevolucionMat); 
        this.add(this.revolucion);

        var geometry = new THREE.ShapeGeometry(shape);

        var edgesGeometry = new THREE.EdgesGeometry(geometry);

        // Crear un material para los bordes (puedes personalizar el color y el grosor)
        var edgesMaterial = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 2 });

        // Crear el objeto de los bordes
        var contorno = new THREE.LineSegments(edgesGeometry, edgesMaterial);
        
        // Agregar el contorno a la escena
        this.add(contorno);


        contorno.position.x = -2;
        
        contorno.rotation.y = -Math.PI/2;

        // Agregar ejes al contorno
        var axesHelper = new THREE.AxesHelper(2);
        axesHelper.rotation.y = Math.PI/2;
        contorno.add(axesHelper);








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
