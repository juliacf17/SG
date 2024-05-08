
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
    this.initPuntos(); // Para mostrar información de puntos
    
    // Construimos los distinos elementos que tendremos en la escena
    
    // Todo elemento que se desee sea tenido en cuenta en el renderizado de la escena debe pertenecer a esta. Bien como hijo de la escena (this en esta clase) o como hijo de un elemento que ya esté en la escena.
    // Tras crear cada elemento se añadirá a la escena con   this.add(variable)
    this.createLights ();
    
    // Tendremos una cámara con un control de movimiento con el ratón
    this.createCamera ();
    
    // Un suelo 
    //this.createGround ();
    
    // Y unos ejes. Imprescindibles para orientarnos sobre dónde están las cosas
    // Todas las unidades están en metros
    this.axis = new THREE.AxesHelper (2);
    this.add (this.axis);
    
    
    // Por último creamos el modelo.
    // El modelo puede incluir su parte de la interfaz gráfica de usuario. Le pasamos la referencia a 
    // la gui y el texto bajo el que se agruparán los controles de la interfaz que añada el modelo.
    

    this.general = false; // Variable que indica qué camara usamos - la vista general por defecto
    this.multiplayer = false; // Variable que indica si estamos en modo multijugador

    this.circuito = new circuito(this.gui, "Controles del Circuito");


    this.obstaculo1 = new MyBoxColision (this.circuito.geometry, 0.2); 
    //this.obstaculo1 = new gary (this.circuito.geometry, 0.2); 
    this.obstaculo2 = new MyBoxColision (this.circuito.geometry, 0.4);
    this.obstaculo3 = new MyBoxColision (this.circuito.geometry, 0.6);
    
    this.volador1 = new medusa(this.circuito.geometry, 0.01);
    this.volador2 = new MyBoxVolador(this.circuito.geometry, 0.15);


    this.premio1 = new hamburguesa(this.circuito.geometry, 0.1);
    this.premio2 = new hamburguesa(this.circuito.geometry, 0.3);


    
    this.candidatos = [this.obstaculo1, this.obstaculo2, this.obstaculo3];
    this.premios = [this.premio1, this.premio2]; 

    this.voladores = [this.volador1, this.volador2];


    this.protagonista = new bob_hambur(this.circuito.geometry, this.candidatos, this.premios, 0);
    //this.protagonista = new MyBox(this.circuito.geometry, this.candidatos,0 , 'lightpink');
    this.box2 = new MyBox(this.circuito.geometry, this.candidatos,0.5 , 'lightblue');


    this.mouse = new THREE.Vector2();
    this.raycaster = new THREE.Raycaster();

    this.puntos = 0;

    

/*  COLISIONES POR CAJAS ENGLOBANTES
    this.meshBox = new THREE.Box3().setFromObject(this.protagonista);
    this.meshObstaculo1 = new THREE.Box3().setFromObject(this.obstaculo1);
    this.meshObstaculo2 = new THREE.Box3().setFromObject(this.obstaculo2);


    this.meshBoxVisible = new THREE.BoxHelper(this.meshBox, 0x00ff00);
    this.meshObstaculo1Visible = new THREE.BoxHelper(this.meshObstaculo1, 0x00ff00);
    this.meshObstaculo2Visible = new THREE.BoxHelper(this.meshObstaculo2, 0x00ff00);

    this.add(this.meshBoxVisible, this.meshObstaculo1Visible, this.meshObstaculo2Visible);

    this.meshBoxVisible.visible = true;
    this.meshObstaculo1Visible.visible = true;
    this.meshObstaculo2Visible.visible = true;*/


    this.circuito.add(this.protagonista);
    this.circuito.add(this.box2);
    this.circuito.add (this.obstaculo1); 
    this.circuito.add(this.obstaculo2);
    this.circuito.add(this.obstaculo3);
    this.circuito.add(this.volador1);
    this.circuito.add(this.volador2);
    this.circuito.add(this.premio1);
    this.circuito.add(this.premio2);
    this.add(this.circuito);


  
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
    // En principio se devuelve la única cámara que tenemos
    // Si hubiera varias cámaras, este método decidiría qué cámara devuelve cada vez que es consultado
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
        this.general = !this.general;
        break;

      case 'ArrowLeft':
        this.protagonista.izquierda = true;
        break;

      case 'ArrowRight':
        this.protagonista.derecha = true;
        break;

      case 'a':
        if(this.multiplayer){
          this.box2.izquierda = true;
        }
        break;

      case 'd':
        if(this.multiplayer){
          this.box2.derecha = true;
        }
        break;


    }
  }

  onKeyUp(event) {
    var key = event.key;
    switch (key) {
      case 'ArrowLeft':
        this.protagonista.izquierda = false;
        break;

      case 'ArrowRight':
        this.protagonista.derecha = false;
        break;

      case 'a':
        if(this.multiplayer){
          this.box2.izquierda = false;
        }
        break;

      case 'd':
        if(this.multiplayer){
          this.box2.derecha = false;
        }
        break;

      case 'p':
        this.protagonista.velocidad = 0;
        if(this.multiplayer){
          this.box2.velocidad = 0;
        }
        break;

      case 'r':
        this.protagonista.velocidad = 0.01;
        break;

      case 'm':
        this.multiplayer = !this.multiplayer;
        break;



    }
  }

  onDocumentMouseDown(event) {
    event.preventDefault();
    console.log("click")
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  
    this.raycaster.setFromCamera(this.mouse, this.getCamera());
  
    var pickedObjects = this.raycaster.intersectObjects(this.voladores, true);
  
    if (pickedObjects.length > 0) {
      var selectedObject = pickedObjects[0].object;

      console.log(selectedObject);
      if(selectedObject.userData){
        selectedObject.userData.recibeClic(selectedObject);
      }

      var selectedPoint = pickedObjects[0].point;

      console.log(selectedObject);
      console.log(selectedPoint);
  
      // Cambiar la opacidad del material del objeto intersectado
      this.puntos++; // Aumenta la puntuación
      //intersectedObject.material.transparent = true;
  
      //this.puntos++; // Aumenta la puntuación
    }
  }

  onTouchStart(event) {
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




  renderViewport (escena, camara, left, top, width, height) {
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

    if (this.marcador) {
      this.marcador.textContent = 'Puntos: ' + this.puntos;
    }
    
    // Se actualizan los elementos de la escena para cada frame
    
    // Se actualiza la posición de la cámara según su controlador
    this.cameraControl.update();
    
    // Se actualiza el resto del modelo
    this.circuito.update();
    this.protagonista.update();
    this.box2.update();
    this.obstaculo1.update(); 
    this.obstaculo2.update();
    this.obstaculo3.update();
    this.volador1.update();
    this.volador2.update();
    this.premio1.update();
    this.premio2.update(); 


    
    // Le decimos al renderizador "visualiza la escena que te indico usando la cámara que te estoy pasando"
    //this.renderer.render (this, this.getCamera());

    if(this.multiplayer){
      this.renderViewport(this, this.box2.getCamara3aPersona(), 0, 0, 0.5, 1);
      this.renderViewport(this, this.protagonista.getCamara3aPersona(), 0.5, 0, 0.5, 1);
    }else if(this.general){
      this.renderViewport(this, this.camera, 0, 0, 1, 1);
    }else{
      this.renderViewport(this, this.protagonista.getCamara3aPersona(), 0, 0, 1, 1);
      this.renderViewport(this, this.camera, 0.75, 0.75, 0.25, 0.25);
    }
  

    // Este método debe ser llamado cada vez que queramos visualizar la escena de nuevo.
    // Literalmente le decimos al navegador: "La próxima vez que haya que refrescar la pantalla, llama al método que te indico".
    // Si no existiera esta línea,  update()  se ejecutaría solo la primera vez.
    requestAnimationFrame(() => this.update())
  }
  }



/// La función   main
$(function () {
  
  // Se instancia la escena pasándole el  div  que se ha creado en el html para visualizar
  var scene = new bikinirace("#WebGL-output");

  // Se añaden los listener de la aplicación. En este caso, el que va a comprobar cuándo se modifica el tamaño de la ventana de la aplicación.
  window.addEventListener ("resize", () => scene.onWindowResize());

  window.addEventListener('keydown', (event) => scene.onKeyDown(event));
  window.addEventListener('keyup', (event) => scene.onKeyUp(event));
  window.addEventListener('mousedown', (event) => scene.onDocumentMouseDown(event));

  window.addEventListener('touchstart', (event) => scene.onTouchStart(event));
  window.addEventListener('touchmove', (event) => scene.onTouchMove(event));
  window.addEventListener('touchend', (event) => scene.onTouchEnd(event));

  
  
  // Que no se nos olvide, la primera visualización.
  scene.update();
});
