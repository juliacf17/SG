
import * as THREE from '../libs/three.module.js'
 

class Barrido extends THREE.Object3D {
  constructor() {
    
    super();
    
    var shape = new THREE.Shape();
    shape.moveTo(-10,-15); // Mueve el "lapiz" a la posición indicada
    shape.lineTo(-10,15); // Dibuja una línea hasta la posición indicada
    shape.bezierCurveTo(-5,0,5,0,10,15); // Dibuja una curva de Bezier cúbica hasta la posición indicada
    shape.splineThru( [ new THREE.Vector2( 12, 5 ), new THREE.Vector2( 8, -5 ), new THREE.Vector2( 10, -15 ) ] );
    shape.quadraticCurveTo(0, -10, -10, -15);

    // un ojo
    var hole = new THREE.Shape();
    hole.absellipse(-4, -1, 2, 3, 0, Math.PI * 2 ); // Dibuja un segmento de elipse
    shape.holes.push(hole);
    
    // el otro ojo
    var hole = new THREE.Shape();
    hole.absellipse(4, -1, 2, 3, 0, Math.PI * 2);
    shape.holes.push(hole);

    // la boca
    hole = new THREE.Shape();
    hole.absarc(0, -9, 2, Math.PI * 2, Math.PI);
    shape.holes.push(hole);


    /*---------------------------------*/

    var pts;
    // pts recorre un camino de "muelle"
    for(var i = 0; i < 200; i++){
      var x = Math.sin(i/10)*10;
      var y = -i;
      var z = Math.cos(i/10)*10;
      if(i == 0){
        pts = [new THREE.Vector3(x, y, z)];
      } else {
        pts.push(new THREE.Vector3(x, y, z));
      }
    }

    var path = new THREE.CatmullRomCurve3(pts);
    
    var options = { steps: 50, curveSegments: 4, extrudePath: path };

    var geometry = new THREE.ExtrudeGeometry( shape, options );
    var material = new THREE.MeshPhongMaterial({ color: 'lightpink', side: THREE.DoubleSide });

    var barrido = new THREE.Mesh(geometry, material);

    this.add(barrido);

    barrido.scale.set(0.05, 0.05, 0.05);

  }


  createGUI(gui, titleGui) {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = {
      sizeX: 1.0,
      sizeY: 1.0,
      sizeZ: 1.0,

      rotX: 0.0,
      rotY: 0.0,
      rotZ: 0.0,

      posX: 0.0,
      posY: 0.0,
      posZ: 0.0,

      // Un botón para dejarlo todo en su posición inicial
      // Cuando se pulse se ejecutará esta función.
      reset: () => {
        this.guiControls.sizeX = 1.0;
        this.guiControls.sizeY = 1.0;
        this.guiControls.sizeZ = 1.0;

        this.guiControls.rotX = 0.0;
        this.guiControls.rotY = 0.0;
        this.guiControls.rotZ = 0.0;

        this.guiControls.posX = 0.0;
        this.guiControls.posY = 0.0;
        this.guiControls.posZ = 0.0;
      }
    }

    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder(titleGui);

    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento.
    // El método listen() permite que si se cambia el valor de la variable en este código, el deslizador de la interfaz gráfica se actualice.
    folder.add(this.guiControls, 'sizeX', 1, 30, 0.1).name('Tamaño X : ').listen();
    folder.add(this.guiControls, 'sizeY', 1, 30, 0.1).name('Tamaño Y : ').listen();
    folder.add(this.guiControls, 'sizeZ', 1, 30, 0.1).name('Tamaño Z : ').listen();

    folder.add(this.guiControls, 'rotX', 0, 2 * Math.PI, 0.1).name('Rotación X : ').listen();
    folder.add(this.guiControls, 'rotY', 0, 2 * Math.PI, 0.1).name('Rotación Y : ').listen();
    folder.add(this.guiControls, 'rotZ', 0, 2 * Math.PI, 0.1).name('Rotación Z : ').listen();

    folder.add(this.guiControls, 'posX', -20, 20, 0.1).name('Posición X : ').listen();
    folder.add(this.guiControls, 'posY', -20, 20, 0.1).name('Posición Y : ').listen();
    folder.add(this.guiControls, 'posZ', -20, 20, 0.1).name('Posición Z : ').listen();

    folder.add(this.guiControls, 'reset').name('[ Reset ]');
  }

  update() {
    //this.rotation.y += 0.01;
  }


}

export { Barrido };