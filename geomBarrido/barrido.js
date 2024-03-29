
import * as THREE from '../libs/three.module.js'
 

class Barrido extends THREE.Object3D {
  constructor() {
    
    super();
    
                //SHAPE
    /*---------------------------------*/
    //moveTo( x, y): Mover el lápiz a ese punto sin dibujar nada. 
    //lineTo( x, y ): Crear una línea entre dos puntos. 
    //absarc( aX, aY, aRadius, aStartAngle, aEndAngle, aClockwise ): Dibuja un arco (circular) con centro aX, aY, con el ángulo indicado. 
    //absellipse( aX, aY, xRadius, yRadius, aStartAngle, aEndAngle, aClockwise, aRotation ): Dibuja una elipse. 
    //quadraticCurveTo( aCPx, aCPy, aX, aY ): Dibuja una curva cuadrática Bézier. 
    //bezierCurveTo( aCP1x, aCP1y, aCP2x, aCP2y, aX, aY ): Dibuja una curva cúbica Bézier. 
    //splineThru( pts ): Dibuja una curva suave a través de una serie de puntos (pts), Vector2.
    //holes: Actúan como agujeros en la shape formada. 
 
    //CUADRADO
    var shape = new THREE.Shape();
    var lado = 5; // Puedes ajustar el tamaño según necesites
    shape.moveTo(0, 0);
    shape.lineTo(lado, 0);
    shape.lineTo(lado, lado);
    shape.lineTo(0, lado);
    shape.lineTo(0, 0);

    //CIRCULO
    /*var shape = new THREE.Shape();

    var centerX = 0; // Centro del círculo en el eje X
    var centerY = 0; // Centro del círculo en el eje Y
    var radius = 5; // Radio del círculo
    var startAngle = 0; // Ángulo de inicio en radianes
    var endAngle = Math.PI * 2; // Ángulo de fin en radianes (un círculo completo)
    var clockwise = true; // Dirección en la que se dibuja el círculo

    shape.absarc(centerX, centerY, radius, startAngle, endAngle, clockwise);*/

    //ELIPSE
    /*var shape = new THREE.Shape();

    var centerX = 0; // Centro del círculo en el eje X
    var centerY = 0; // Centro del círculo en el eje Y
    var radiusX = 5; // Radio del círculo
    var radiusY = 7; // Radio del círculo
    var startAngle = 0; // Ángulo de inicio en radianes
    var endAngle = Math.PI * 2; // Ángulo de fin en radianes (un círculo completo)
    var clockwise = true; // Dirección en la que se dibuja el círculo

    shape.absellipse(centerX, centerY, radiusX, radiusY, startAngle, endAngle, clockwise);*/

    //CURVA CUADRÁTICA BÉZIER               //UNA CURVA REGULAR
    /*var shape = new THREE.Shape();

    shape.moveTo(0, 0);
    shape.lineTo(0, 5);
    shape.quadraticCurveTo(5, 10, 10, 5);       //Primero el punto de control (como es la curva, la barriga) y luego el punto fin (x,y) de la curva
    shape.lineTo(10, 0);
    shape.lineTo(0, 0);*/

    //CURVA CÚBICA BÉZIER                   //UNA CURVA QUE PUEDES MODIFICAR UNA MITAD Y LA OTRA
    /*var shape = new THREE.Shape();

    shape.moveTo(0, 0);
    shape.lineTo(0, 5);
    shape.bezierCurveTo(2.5, 10, 5, 10, 10, 5);   //Dos puntos de control (uno para cada mitad de la curva) y el punto final de la curva. 
    shape.lineTo(10, 0);
    shape.lineTo(0, 0);*/


    //FORMA CON UNA SPLINE
    /*var shape = new THREE.Shape();

    shape.moveTo(0, 0);
    
    var points = [
      new THREE.Vector2(2, 2),
      new THREE.Vector2(4, 4),
      new THREE.Vector2(6, 0),
      new THREE.Vector2(8, -2)
    ];

    shape.splineThru(points);
    shape.lineTo(0, 0);*/
    
    //CARA RARA
    /*var shape = new THREE.Shape();
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
    shape.holes.push(hole);*/

                //PATHS
    /*---------------------------------*/

    //LÍNEA RECTA
    /*var pts = [];
    var altura = 50; // Altura del camino
    var pasos = 10; // Número de puntos en el camino
    for (var i = 0; i <= pasos; i++) {
        var x = (i / pasos) * altura;
        var y = 0;
        var z = 0;
        pts.push(new THREE.Vector3(x, y, z));
    }*/

    //CAMINO CIRCULAR
    /*var pts = [];
    var radio = 50; // Radio del círculo                    //Cuánto más aumentas, más finito el semicirculo. 
    var pasos = 100; // Número de puntos en el camino
    for (var i = 0; i <= pasos; i++) {
        var t = i / pasos * Math.PI ;       //Media circunferencia, para círculo completo MATH.PI * 2
        var x = Math.sin(t) * radio;
        var y = 0;
        var z = Math.cos(t) * radio;
        pts.push(new THREE.Vector3(x, y, z));
    }*/

    //CAMINO EN FORMA DE ONDA
    /*var pts = [];
    var altura = 10; // Altura de la onda
    var longitud = 200; // Longitud del camino
    var pasos = 100; // Número de puntos en el camino
    for (var i = 0; i <= pasos; i++) {
        var x = (i / pasos) * longitud - longitud / 2;
        var y = Math.sin(i / pasos * Math.PI * 4) * altura;
        var z = 0;
        pts.push(new THREE.Vector3(x, y, z));
    }*/

    //CAMINO EN ESPIRAL
    var pts = [];
    var altura = 100; // Altura de la espiral
    var vueltas = 10; // Número de vueltas completas
    var pasos = 100; // Número de puntos en el camino
    for (var i = 0; i <= pasos; i++) {
        var t = i / pasos * vueltas * Math.PI * 2; // ángulo actual
        var x = Math.sin(t) * 20;
        var y = (i / pasos) * altura - altura / 2;
        var z = Math.cos(t) * 20;
        pts.push(new THREE.Vector3(x, y, z));
    }

    //CAMINO EN FORMA DE MUELLE     (espiral alargada)
    /*var pts;
    for(var i = 0; i < 200; i++){
      var x = Math.sin(i/10)*10;
      var y = -i;
      var z = Math.cos(i/10)*10;
      if(i == 0){
        pts = [new THREE.Vector3(x, y, z)];
      } else {
        pts.push(new THREE.Vector3(x, y, z));
      }
    }*/

    //CAMINO EN ZIG ZAG     (un poco pocho)
    /*var pts = [];
    var altura = 100; // Altura total del zigzag
    var ancho = 10; // Ancho del zigzag
    var pasos = 10; // Número de puntos en el camino (debe ser par)
    for (var i = 0; i <= pasos; i++) {
        var x = i % 2 == 0 ? ancho : -ancho;
        var y = (i / pasos) * altura;
        var z = 0;
        pts.push(new THREE.Vector3(x, y, z));
    }*/

    //CAMINO DENTADO  (chuchurrío)
    /*var pts = [];
    var longitud = 50; // Altura del camino
    var pasos = 3; // Número de puntos en el camino
    for (var i = 0; i <= pasos; i++) {
        pts.push(new THREE.Vector3(i*longitud*2, 0, 0));
        pts.push(new THREE.Vector3(i*longitud*2, longitud, 0));
        pts.push(new THREE.Vector3(i*longitud*2+longitud, longitud, 0));
        pts.push(new THREE.Vector3(i*longitud*2+longitud, 0, 0));
        pts.push(new THREE.Vector3(i*longitud*2+longitud, -longitud, 0));
        pts.push(new THREE.Vector3(i*longitud*2+2*longitud, -longitud, 0));
    }*/

            //FORMAR OBJETO
    /*---------------------------------*/


    var path = new THREE.CatmullRomCurve3(pts);     //Crea el camino
    
    var options = {
        steps: 150,     //La suavidad de la extrusión, cuanto más pasos más suave.   
        curveSegments: 6, // Mejora la resolución de las curvas cuanto mayor es. 
        extrudePath: path // La trayectoria a lo largo de la cual se extruirá la forma
    };

    var geometry = new THREE.ExtrudeGeometry( shape, options );     //Crear la geometría
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
    
  }


}

export { Barrido };