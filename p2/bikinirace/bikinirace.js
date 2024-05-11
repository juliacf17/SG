
// Clases de la biblioteca

import * as THREE from '../../libs/three.module.js'
import { GUI } from '../../libs/dat.gui.module.js'
import { TrackballControls } from '../../libs/TrackballControls.js'
import { Stats } from '../../libs/stats.module.js'

// Clases de mi proyecto

import { circuito } from '../circuito/circuito.js'
import { medusa } from '../medusa/medusa.js'
import { MyBox } from './MyBox.js'
import {MyBoxColision} from './colisiones.js' 
import { MyBoxVolador } from './voladores.js'
import { bob_hambur } from '../bob_hambur/bob_hambur.js'
import { gary } from '../gary/gary.js'  
import { hamburguesa } from '../hamburguesa/hamburguesa.js'
import { pinia } from '../piña/pinia.js'
import { plancton } from '../plancton/plancton.js'


/// La clase fachada del modelo
/**
 * Usaremos una clase derivada de la clase Scene de Three.js para llevar el control de la escena y de todo lo que ocurre en ella.
 */

class bikinirace extends THREE.Scene {
  constructor (myCanvas) {
    super();
    
    // Lo primero, crear el visualizador, pasándole el lienzo sobre el que realizar los renderizados.
    this.renderer = this.createRenderer(myCanvas);
    
    // Se añade a la gui los controles para manipular los elementos de esta clase
    this.gui = this.createGUI ();
    
    this.initStats(); // Para mostrar información de rendimiento
    this.initPuntos(); // Para mostrar información de los puntos conseguidos
    
    // Construimos los distinos elementos que tendremos en la escena
    
    this.createLights (); 

    this.createCamera ();
    
    this.axis = new THREE.AxesHelper (2);
    this.add (this.axis);
    
 
    // Creación de los modelos 

    // Circuito

    this.circuito = new circuito(this.gui, "Controles del Circuito");

    // Obstáculos (Garys)

    this.obstaculo1 = new gary (this.circuito.geometry, 0.2); 
    this.obstaculo2 = new gary (this.circuito.geometry, 0.4); 
    this.obstaculo3 = new gary (this.circuito.geometry, 0.6); 

    // Objetos voladores (Medusas)
    
    this.volador1 = new medusa(this.circuito.geometry, 0.01);
    this.volador2 = new medusa(this.circuito.geometry, 0.15);
    this.volador3 = new medusa(this.circuito.geometry, 0.25);
    this.volador4 = new medusa(this.circuito.geometry, 0.40);
    this.volador5 = new medusa(this.circuito.geometry, 0.55);
    this.volador6 = new medusa(this.circuito.geometry, 0.65);
    this.volador7 = new medusa(this.circuito.geometry, 0.75);
    this.volador8 = new medusa(this.circuito.geometry, 0.90);

    // Premios (Hamburguesas)

    this.premio1 = new hamburguesa(this.circuito.geometry, 0.1);
    this.premio2 = new hamburguesa(this.circuito.geometry, 0.3);

    // "Casilla de salida" (Piña)

    this.pinia = new pinia(this.circuito.geometry, 0);


    // Variables 

    // Control de la cámara y las vistas 

    this.general = false; // Variable que indica qué camara usamos - la vista general por defecto
    this.multiplayer = false; // Variable que indica si estamos en modo multijugador
    this.mouse = new THREE.Vector2(); // Vector que almacena la posición del ratón
    this.raycaster = new THREE.Raycaster(); // Raycaster para detectar picking en los objetos voladores

    // Colisiones

    this.plancton = new plancton(this.circuito.geometry);

    
    this.candidatos = [this.obstaculo1, this.obstaculo2, this.obstaculo3, this.plancton]; 
    this.premios = [this.premio1, this.premio2]; 

    // Objetos voladores

    this.voladores = [this.volador1, this.volador2, this.volador3, this.volador4, this.volador5, this.volador6, this.volador7, this.volador8];

    // Protagonista/s

    this.protagonista = new bob_hambur(this.circuito.geometry, this.candidatos, this.premios, 0);
    this.jugador2 = new bob_hambur(this.circuito.geometry, this.candidatos, this.premios, 0.5);

    
    // Control de la puntuación
    
    this.puntos = 0;


    // Añadimos los elementos a la escena
  
    this.circuito.add(this.protagonista);
    this.circuito.add(this.jugador2);
    this.circuito.add(this.plancton);
    this.circuito.add (this.obstaculo1); 
    this.circuito.add(this.obstaculo2);
    this.circuito.add(this.obstaculo3);
    this.circuito.add(this.volador1);
    this.circuito.add(this.volador2);
    this.circuito.add(this.volador3);
    this.circuito.add(this.volador4);
    this.circuito.add(this.volador5);
    this.circuito.add(this.volador6);
    this.circuito.add(this.volador7);
    this.circuito.add(this.volador8);
    this.circuito.add(this.premio1);
    this.circuito.add(this.premio2);
    this.circuito.add(this.pinia); 
    this.add(this.circuito);

    //this.background = textureCube;
    
    this.background = new THREE.CubeTextureLoader()
    .setPath( '../imgs/' )
    .load( [
          'cielo.png',
          'cielo.png',
          'cielo.png',
          'cielo.png',
          'cielo.png',
          'cielo.png'
        ] );


    this.background = new THREE.Color( 'lightblue' );

  }

  
  initStats() {
  
    var stats = new Stats(); // Crea la gráfica de rendimiento
    
    stats.setMode(0); // 0: fps, 1: ms 
    
    // Align top-left 
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    
    $("#Stats-output").append( stats.domElement ); // Añade la gráfica al div ya existente
    
    this.stats = stats;
  }

  initPuntos() {
    // Crea un elemento para mostrar los puntos
    var marcador = document.createElement('div');

    marcador.id = 'Marcador';
    marcador.style.position = 'absolute';
    marcador.style.left = '100px'; 
    marcador.style.top = '0px'; // Espacio debajo de los stats
    marcador.style.color = 'black'; // Color del texto
    marcador.style.fontSize = 40 + 'px'; // Tamaño de la fuente
    marcador.textContent = 'Probando'; // Mostrar cero puntos por defecto
    
    $("#Marcador").append(marcador); // Añade el elemento al div ya existente

    this.marcador = marcador;
}

  
  createCamera () {
    // Para crear una cámara le indicamos
    //   El ángulo del campo de visión en grados sexagesimales
    //   La razón de aspecto ancho/alto
    //   Los planos de recorte cercano y lejano
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 50);
    // Recuerda: Todas las unidades están en metros
    // También se indica dónde se coloca
    this.camera.position.set (0,16,32);
    // Y hacia dónde mira
    var look = new THREE.Vector3 (0,1.5,0);
    this.camera.lookAt(look);
    this.add (this.camera);
    
    // Para el control de cámara usamos una clase que ya tiene implementado los movimientos de órbita
    this.cameraControl = new TrackballControls (this.camera, this.renderer.domElement);
    // Se configuran las velocidades de los movimientos
    this.cameraControl.rotateSpeed = 5;
    this.cameraControl.zoomSpeed = -2;
    this.cameraControl.panSpeed = 0.5;
    // Debe orbitar con respecto al punto de mira de la cámara
    this.cameraControl.target = look;

  }
  
  createGUI () {
    // Se crea la interfaz gráfica de usuario
    var gui = new GUI();
    
    // La escena le va a añadir sus propios controles. 
    // Se definen mediante un objeto de control
    // En este caso la intensidad de la luz y si se muestran o no los ejes
    this.guiControls = {
      // En el contexto de una función   this   alude a la función
      lightPower : 1000.0,  // La potencia de esta fuente de luz se mide en lúmenes
      ambientIntensity : 1.0,   
      axisOnOff : true
    }

    // Se crea una sección para los controles de esta clase
    var folder = gui.addFolder ('Luz y Ejes');
    
    // Se le añade un control para la potencia de la luz puntual
    folder.add (this.guiControls, 'lightPower', 0, 1000, 20)
      .name('Luz puntual : ')
      .onChange ( (value) => this.setLightPower(value) );
    
    // Otro para la intensidad de la luz ambiental
    folder.add (this.guiControls, 'ambientIntensity', 0, 1, 0.05)
      .name('Luz ambiental: ')
      .onChange ( (value) => this.setAmbientIntensity(value) );
      
    // Y otro para mostrar u ocultar los ejes
    folder.add (this.guiControls, 'axisOnOff')
      .name ('Mostrar ejes : ')
      .onChange ( (value) => this.setAxisVisible (value) );
    
    return gui;
  }
  
  createLights () {
    // Se crea una luz ambiental, evita que se vean complentamente negras las zonas donde no incide de manera directa una fuente de luz
    // La luz ambiental solo tiene un color y una intensidad
    // Se declara como   var   y va a ser una variable local a este método
    //    se hace así puesto que no va a ser accedida desde otros métodos
    this.ambientLight = new THREE.AmbientLight('white', this.guiControls.ambientIntensity);
    // La añadimos a la escena
    this.add (this.ambientLight);
    
    // Se crea una luz focal que va a ser la luz principal de la escena
    // La luz focal, además tiene una posición, y un punto de mira
    // Si no se le da punto de mira, apuntará al (0,0,0) en coordenadas del mundo
    // En este caso se declara como   this.atributo   para que sea un atributo accesible desde otros métodos.
    this.pointLight = new THREE.PointLight( 0xffffff ); 
    this.pointLight.power = this.guiControls.lightPower;
    this.pointLight.position.set( 0, 4, 4 );
    this.add (this.pointLight);
  }
  
  setLightPower (valor) {
    this.pointLight.power = valor;
  }

  setAmbientIntensity (valor) {
    this.ambientLight.intensity = valor;
  }  
  
  setAxisVisible (valor) {
    this.axis.visible = valor;
  }
  
  createRenderer (myCanvas) {
    // Se recibe el lienzo sobre el que se van a hacer los renderizados. Un div definido en el html.
    
    // Se instancia un Renderer   WebGL
    var renderer = new THREE.WebGLRenderer();
    
    // Se establece un color de fondo en las imágenes que genera el render
    renderer.setClearColor(new THREE.Color(0xEEEEEE), 1.0);
    
    // Se establece el tamaño, se aprovecha la totalidad de la ventana del navegador
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // La visualización se muestra en el lienzo recibido
    $(myCanvas).append(renderer.domElement);
    
    return renderer;  
  }
  
  getCamera () {
    // Devuelve la cámara determinada por la variable "general"
    // Si general es true, devuelve la cámara general, con la que vemos toda la escena
    // Si general es false, devuelve la cámara en tercera persona del protagonista

    if (this.general){
      return this.camera;
    }else{
      return this.protagonista.getCamara3aPersona();
    }
    
  }
  
  setCameraAspect (ratio) {
    // Cada vez que el usuario modifica el tamaño de la ventana desde el gestor de ventanas de
    // su sistema operativo hay que actualizar el ratio de aspecto de la cámara
    this.camera.aspect = ratio;
    // Y si se cambia ese dato hay que actualizar la matriz de proyección de la cámara
    this.camera.updateProjectionMatrix();
  }

  onWindowResize () {
    // Este método es llamado cada vez que el usuario modifica el tamaño de la ventana de la aplicación
    // Hay que actualizar el ratio de aspecto de la cámara

    var camara = this.getCamera();
    var nuevaRatio = window.innerWidth / window.innerHeight;
    if (camara.isOrthographicCamera) {
      var altoVista = camara.top - camara.bottom;
      var centroAncho = (camara.left + camara.right) / 2;
      camara.left = centroAncho - (altoVista * nuevaRatio) / 2;
      camara.right = centroAncho + (altoVista * nuevaRatio) / 2;
    }else{
      camara.aspect = nuevaRatio;
    }

    camara.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);

  }

  onKeyDown(event) {
    var key = event.key;
    switch (key) {
      case ' ':
        this.general = !this.general; // Cambia la cámara general por la del protagonista y viceversa con la barra espaciadora
        break;

      case 'ArrowLeft':
        this.protagonista.izquierda = true; // Mueve al protagonista a la izquierda con la flecha izquierda
        break;

      case 'ArrowRight':
        this.protagonista.derecha = true; // Mueve al protagonista a la derecha con la flecha derecha
        break;

      case 'a':
        if(this.multiplayer){
          this.jugador2.izquierda = true; // Mueve al jugador 2 a la izquierda con la tecla 'a'
        }
        else{
          this.protagonista.izquierda = true; // Mueve al protagonista a la izquierda con la tecla 'a'
        }
        break;

      case 'd':
        if(this.multiplayer){
          this.jugador2.derecha = true; // Mueve al jugador 2 a la derecha con la tecla 'd'
        }else{
          this.protagonista.derecha = true; // Mueve al protagonista a la derecha con la tecla 'd'
        }
        break;


    }
  }

  onKeyUp(event) {
    var key = event.key;
    switch (key) {
      case 'ArrowLeft':
        this.protagonista.izquierda = false; // Deja de mover al protagonista a la izquierda al soltar la flecha izquierda
        break;

      case 'ArrowRight':
        this.protagonista.derecha = false; // Deja de mover al protagonista a la derecha al soltar la flecha derecha
        break;

      case 'a':
        if(this.multiplayer){
          this.jugador2.izquierda = false; // Deja de mover al jugador 2 a la izquierda al soltar la tecla 'a'
        }else{
          this.protagonista.izquierda = false; // Deja de mover al protagonista a la izquierda al soltar la tecla 'a'
        }
        break;

      case 'd':
        if(this.multiplayer){
          this.jugador2.derecha = false; // Deja de mover al jugador 2 a la derecha al soltar la tecla 'd'
        }else{
          this.protagonista.derecha = false; // Deja de mover al protagonista a la derecha al soltar la tecla 'd'
        }
        break;

      case 'p':
        this.protagonista.velocidad = 0; // Frena al protagonista y al jugador 2 al pulsar la tecla 'p' (para pruebas)
        if(this.multiplayer){
          this.jugador2.velocidad = 0; 
        }
        break;

      case 'r':
        this.protagonista.velocidad = 0.02; // Reanuda la velocidad del protagonista y del jugador 2 al pulsar la tecla 'r' (para pruebas)
        this.jugador2.velocidad = 0.02;
        break;

      case 'm':
        this.multiplayer = !this.multiplayer; // Cambia el modo multijugador al pulsar la tecla 'm' (cambio de vista)
        break;



    }
  }

  onDocumentMouseDown(event) { // Método para detectar clics en los objetos voladores
    event.preventDefault(); 
    console.log("click")
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1; // Normaliza la posición del ratón
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  
    this.raycaster.setFromCamera(this.mouse, this.getCamera());
  
    var pickedObjects = this.raycaster.intersectObjects(this.voladores, true); // Detecta si se ha hecho clic en un objeto volador
  
    if (pickedObjects.length > 0) { // Si se ha hecho clic en un objeto volador
      var selectedObject = pickedObjects[0].object; // Se selecciona el objeto

      //console.log(selectedObject);  
      if(selectedObject.userData){ // Si el objeto tiene un userData
        selectedObject.userData.recibeClic(selectedObject); // Se llama al método recibeClic del objeto
      }

      //var selectedPoint = pickedObjects[0].point;

      //console.log(selectedObject);
      //console.log(selectedPoint);
  
      // Aumenta la puntuación si se ha hecho clic en un objeto volador
      this.puntos++; // Aumenta la puntuación

    }
  }

  onTouchStart(event) { // Método para detectar pulsaciones táctiles en la pantalla
    var touch = event.touches[0]; 
    var touchX = touch.clientX;

    if (touchX < window.innerWidth / 2) {
      this.protagonista.izquierda = true;
    }
    else {
      this.protagonista.derecha = true;
    }
  }

  onTouchMove(event) {
    var touch = event.touches[0];
    var touchX = touch.clientX;

    if (touchX < window.innerWidth / 2) {
      this.protagonista.izquierda = true;
    }
    else {
      this.protagonista.derecha = true;
    }
  }

  onTouchEnd(event) {
    this.protagonista.izquierda = false;
    this.protagonista.derecha = false;
  }


  renderViewport (escena, camara, left, top, width, height) { // Método para renderizar la vista de la cámara en un viewport

    var l = left * window.innerWidth;
    var t = top * window.innerHeight;
    var w = width * window.innerWidth;
    var h = height * window.innerHeight;

    this.renderer.setViewport(l, t, w, h);
    this.renderer.setScissor(l, t, w, h);
    this.renderer.setScissorTest(true);

    camara.aspect = w / h;
    camara.updateProjectionMatrix();

    this.renderer.render(escena, camara);
  }


  update () {
    
    if (this.stats) this.stats.update();

    if(this.protagonista.getColisionConPlancton()){ // Si el protagonista colisiona con el plancton
      this.puntos = 0; // Aumenta la puntuación en 10 puntos
    }

    if (this.marcador) {
      this.marcador.textContent = 'Puntos: ' + this.puntos; // Muestra la puntuación en la pantalla
    }
    
    // Se actualizan los elementos de la escena para cada frame
    
    // Se actualiza la posición de la cámara según su controlador
    this.cameraControl.update();
    
    // Se actualiza el resto del modelo
    this.circuito.update();
    this.protagonista.update();
    this.jugador2.update();
    this.plancton.update();
    this.obstaculo1.update(); 
    this.obstaculo2.update();
    this.obstaculo3.update();
    this.volador1.update();
    this.volador2.update();
    this.volador3.update();
    this.volador4.update();
    this.volador5.update();
    this.volador6.update();
    this.volador7.update();
    this.volador8.update();
    this.premio1.update();
    this.premio2.update(); 
    this.pinia.update(); 

    
    // Le decimos al renderizador "visualiza la escena que te indico usando la cámara que te estoy pasando"

    if(this.multiplayer){ // Si estamos en modo multijugador, se renderizan dos vistas
      this.renderViewport(this, this.jugador2.getCamara3aPersona(), 0, 0, 0.5, 1);
      this.renderViewport(this, this.protagonista.getCamara3aPersona(), 0.5, 0, 0.5, 1);
    }else if(this.general){ // Si estamos en vista general, se renderiza una vista
      this.renderViewport(this, this.camera, 0, 0, 1, 1);
      
    }else{ // Si estamos en vista en tercera persona, se renderizan dos vistas
      this.renderViewport(this, this.protagonista.getCamara3aPersona(), 0, 0, 1, 1);
      this.renderViewport(this, this.camera, 0.75, 0.75, 0.25, 0.25);
    }
  
    requestAnimationFrame(() => this.update())
  }
  }



$(function () {

  var scene = new bikinirace("#WebGL-output");


  window.addEventListener ("resize", () => scene.onWindowResize()); // Se añade un listener para el evento resize

  window.addEventListener('keydown', (event) => scene.onKeyDown(event)); // Se añaden listeners para los eventos de teclado
  window.addEventListener('keyup', (event) => scene.onKeyUp(event));
  window.addEventListener('mousedown', (event) => scene.onDocumentMouseDown(event)); // Se añade un listener para el evento de clic

  window.addEventListener('touchstart', (event) => scene.onTouchStart(event)); // Se añaden listeners para los eventos táctiles
  window.addEventListener('touchmove', (event) => scene.onTouchMove(event));
  window.addEventListener('touchend', (event) => scene.onTouchEnd(event));


  scene.update();
});
