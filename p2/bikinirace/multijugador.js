
// Clases de la biblioteca

import * as THREE from '../../libs/three.module.js'
import { TrackballControls } from '../../libs/TrackballControls.js'
import { Stats } from '../../libs/stats.module.js'

// Clases de mi proyecto

import { circuito } from '../objetos circuito/circuito/circuito.js'
import { medusa } from '../objetos circuito/medusa/medusa.js'
import { bob_hambur } from '../objetos circuito/bob_hambur/bob_hambur.js'
import { gary } from '../objetos circuito/gary/gary.js'
import { hamburguesa } from '../objetos circuito/hamburguesa/hamburguesa.js'
import { pinia } from '../objetos circuito/piña/pinia.js'
import { plancton_multi } from '../objetos circuito/plancton_multi/plancton.js'




/// La clase fachada del modelo
/**
 * Usaremos una clase derivada de la clase Scene de Three.js para llevar el control de la escena y de todo lo que ocurre en ella.
 */

class multijugador extends THREE.Scene {
  constructor (myCanvas) {
    super();
    
    // Lo primero, crear el visualizador, pasándole el lienzo sobre el que realizar los renderizados.
    this.renderer = this.createRenderer(myCanvas);
    

    this.initVelocidadBob(); // Para mostrar información de la velocidad
    this.initVelocidadPlancton(); 
    
    
    this.marcadorFinal(); 
    
    // Construimos los distinos elementos que tendremos en la escena
    
    this.createCamera();
    this.createAxis();
    
    this.mouse = new THREE.Vector2(); // Vector que almacena la posición del ratón
    this.raycaster = new THREE.Raycaster(); // Raycaster para detectar picking en los objetos voladores

    // Creación de los modelos 
    this.createModels(); 
    this.createVariablesControl(); 

    //Creamos las luces
    this.createLights(); 

    //this.createCubeTexture(); 
    this.createSkySphere(); // Crea la esfera que simula el cielo
  }


  createObstacles() {
    this.obstaculo1 = new gary (this.circuito.geometry, 0.2); 
    this.obstaculo2 = new gary (this.circuito.geometry, 0.4); 
    this.obstaculo3 = new gary (this.circuito.geometry, 0.6); 
  }

  createFlyingObjects() {
    this.volador1 = new medusa(this.circuito.geometry, 0.15);
    this.volador2 = new medusa(this.circuito.geometry, 0.25);
    this.volador3 = new medusa(this.circuito.geometry, 0.40);
    this.volador4 = new medusa(this.circuito.geometry, 0.65);
    this.volador5 = new medusa(this.circuito.geometry, 0.75);
  }

  createPrizes() {
    this.premio1 = new hamburguesa(this.circuito.geometry, 0.1);
    this.premio2 = new hamburguesa(this.circuito.geometry, 0.3);
    this.premio3 = new hamburguesa(this.circuito.geometry, 0.6);
  }

  createModels() {
    this.circuito = new circuito();
    this.createObstacles();
    this.createFlyingObjects();
    this.createPrizes();
    this.pinia = new pinia(this.circuito.geometry, 0);

    
    this.candidatosPlancton = [this.obstaculo1, this.obstaculo2, this.obstaculo3, this.premio1, this.premio2, this.premio3]; 
    this.voladores = [this.volador1, this.volador2, this.volador3, this.volador4, this.volador5];

    this.jugador2 = new plancton_multi(this.circuito.geometry, this.candidatosPlancton, 0.5);

    this.candidatosBob = [this.obstaculo1, this.obstaculo2, this.obstaculo3, this.premio1, this.premio2, this.premio3, this.jugador2]; 

    this.protagonista = new bob_hambur(this.circuito.geometry, this.candidatosBob, 0);

    this.jugador2.addCandidato(this.protagonista);
    
    //this.jugador2 = new bob_hambur(this.circuito.geometry, this.candidatos, 0.5);
    this.addObjectsToScene();
  }

  addObjectsToScene(){
    this.circuito.add(this.protagonista);
    this.circuito.add(this.jugador2);
    this.circuito.add (this.obstaculo1); 
    this.circuito.add(this.obstaculo2);
    this.circuito.add(this.obstaculo3);
    this.circuito.add(this.volador1);
    this.circuito.add(this.volador2);
    this.circuito.add(this.volador3);
    this.circuito.add(this.volador4);
    this.circuito.add(this.volador5);
    this.circuito.add(this.premio1);
    this.circuito.add(this.premio2);
    this.circuito.add(this.pinia); 
    this.add(this.circuito);
  }


  createVariablesControl(){
    // Variable que indica qué camara usamos - la vista general por defecto
    this.general = false; 
    
    //Modo de valocidad
    this.modoVelocidadBob = "Media"; 
    this.modoVelocidadPlancton = "Media";

    //Control de fin de juego
    this.finJuego = false; 
  }

  createAxis(){
    this.axis = new THREE.AxesHelper (2);
    this.add (this.axis);
  }


  createSkySphere() {
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('../imgs/cielo.jpg', (texture) => {
      const sphereGeometry = new THREE.SphereGeometry(100, 60, 40);
      const sphereMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide   // Renderizar el interior de la esfera
      });
      const skySphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      this.add(skySphere);
    }, undefined, (error) => {
      console.error('Error loading texture:', error);
    });
  }

  /*createCubeTexture(){
    var path = "../imgs/";
    var format = '.jpg';

    var urls = [
      path + 'cielo' + format, path + 'cielo' + format,
      path + 'cielo' + format, path + 'cielo' + format,
      path + 'cielo' + format, path + 'cielo' + format
    ];

    var textureCube = new THREE.CubeTextureLoader().load(urls);

    this.background = textureCube;

    this.castShadow = true;
    this.receiveShadow = true;
  }

  /*initStats() {
  
    var stats = new Stats(); // Crea la gráfica de rendimiento
    
    stats.setMode(0); // 0: fps, 1: ms 
    
    // Align top-left 
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    
    $("#Stats-output").append( stats.domElement ); // Añade la gráfica al div ya existente
    
    this.stats = stats;
  }

  /*initPuntos() {
    // Crea un elemento para mostrar los puntos
    var marcador = document.createElement('div');

    marcador.id = 'Marcador';
    marcador.style.position = 'absolute';
    marcador.style.left = '100px'; 
    marcador.style.top = '0px'; // Espacio debajo de los stats
    marcador.style.color = 'white'; // Color del texto
    marcador.style.textShadow = '2px 2px 2px black';
    marcador.style.fontSize = 40 + 'px'; // Tamaño de la fuente
    marcador.textContent = 'Probando'; // Mostrar cero puntos por defecto
    
    $("#Marcador").append(marcador); // Añade el elemento al div ya existente

    this.marcador = marcador;
}*/

initVelocidadBob() {
  // Crea un elemento para mostrar los puntos
  var marcador = document.createElement('div');

  marcador.id = 'MarcadorVelocidadBob';
  marcador.style.position = 'absolute';
  marcador.style.left = '1300px'; 
  marcador.style.top = '0px'; // Espacio debajo de los stats
  marcador.style.color = 'white'; // Color del texto
  marcador.style.textShadow = '2px 2px 2px black';
  marcador.style.fontSize = 40 + 'px'; // Tamaño de la fuente
  marcador.textContent = 'Probando'; // Mostrar cero puntos por defecto
  
  $("#MarcadorVelocidadBob").append(marcador); // Añade el elemento al div ya existente

  this.marcadorVelocidad = marcador;
}

initVelocidadPlancton() {
  // Crea un elemento para mostrar los puntos
  var marcador = document.createElement('div');

  marcador.id = 'MarcadorVelocidadPlancton';
  marcador.style.position = 'absolute';
  marcador.style.left = '300px'; 
  marcador.style.top = '0px'; // Espacio debajo de los stats
  marcador.style.color = 'white'; // Color del texto
  marcador.style.textShadow = '2px 2px 2px black';
  marcador.style.fontSize = 40 + 'px'; // Tamaño de la fuente
  marcador.textContent = 'Probando'; // Mostrar cero puntos por defecto
  
  $("#MarcadorVelocidadPlancton").append(marcador); // Añade el elemento al div ya existente

  this.marcadorVelocidad = marcador;
}

  marcadorFinal(){
    // Crea un elemento para mostrar los puntos
    var marcador = document.createElement('div');

    marcador.id = 'MarcadorFinal';
    marcador.style.textShadow = '2px 2px 2px black';
    marcador.textContent = 'Probando'; // Mostrar cero puntos por defecto
    
    $("#MarcadorFinal").append(marcador); // Añade el elemento al div ya existente

    this.marcadorF = marcador;
  }

  //Muestra la pantalla de fin de juego. 
  finDelJuego() {
    this.finJuego = true;
    // Muestra la pantalla de fin de juego

    var ganador = "Bob Esponja";  //DETERMINAR QUIEN GANA


    if (this.marcadorF) {
      this.marcadorF.textContent = 'Ha ganado: ' + ganador; // Muestra la puntuación en la pantalla
    }

    this.protagonista.pararPersonaje(); // Parar al protagonista
    document.getElementById("game-over-screen-multi").style.display = "flex";
  }
  
  createCamera () {
    // Para crear una cámara le indicamos
    //   El ángulo del campo de visión en grados sexagesimales
    //   La razón de aspecto ancho/alto
    //   Los planos de recorte cercano y lejano
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 300);
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
  
  createLights() {
    this.ambientLight = new THREE.AmbientLight('white', 1);
    this.add(this.ambientLight);

    this.directionalLight1 = new THREE.DirectionalLight('white', 1.5);
    this.directionalLight1.position.set(0, 20, 0);
    this.directionalLight1.castShadow = true;
    this.directionalLight1.shadow.mapSize.width = 2048;
    this.directionalLight1.shadow.mapSize.height = 2048;
    this.directionalLight1.shadow.camera.near = 0.1;
    this.directionalLight1.shadow.camera.far = 100;
    this.directionalLight1.shadow.camera.left = -50;
    this.directionalLight1.shadow.camera.right = 50;
    this.directionalLight1.shadow.camera.bottom = -50;
    this.directionalLight1.shadow.camera.top = 50;
    this.add(this.directionalLight1);

    this.directionalLight2 = new THREE.DirectionalLight('white', 1.5);
    this.directionalLight2.position.set(0, -20, 0);
    this.directionalLight2.castShadow = true;
    this.directionalLight2.shadow.mapSize.width = 2048;
    this.directionalLight2.shadow.mapSize.height = 2048;
    this.directionalLight2.shadow.camera.near = 0.1;
    this.directionalLight2.shadow.camera.far = 100;
    this.directionalLight2.shadow.camera.left = -50;
    this.directionalLight2.shadow.camera.right = 50;
    this.directionalLight2.shadow.camera.bottom = -50;
    this.directionalLight2.shadow.camera.top = 50;
    this.add(this.directionalLight2);

    const helper = new THREE.DirectionalLightHelper(this.directionalLight1);
    const helper2 = new THREE.DirectionalLightHelper(this.directionalLight2);
    this.add(helper);
    this.add(helper2);
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

    // Sombras arrojadas
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; 
    
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
          this.jugador2.izquierda = true; // Mueve al jugador 2 a la izquierda con la tecla 'a'
        break;

      case 'd':
          this.jugador2.derecha = true; // Mueve al jugador 2 a la derecha con la tecla 'd'
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
          this.jugador2.izquierda = false; // Deja de mover al jugador 2 a la izquierda al soltar la tecla 'a'
        break;

      case 'd':
          this.jugador2.derecha = false; // Deja de mover al jugador 2 a la derecha al soltar la tecla 'd'
        break;

      case 'p':
        this.protagonista.velocidad = 0; // Frena al protagonista y al jugador 2 al pulsar la tecla 'p' (para pruebas)
        this.jugador2.velocidad = 0; 
        break;

      case 'r':
        this.protagonista.velocidad = 0.02; // Reanuda la velocidad del protagonista y del jugador 2 al pulsar la tecla 'r' (para pruebas)
        this.jugador2.velocidad = 0.02;
        break;
    }
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
    
    if((this.protagonista.getColisionConPlancton() || this.jugador2.getColisionConBob()) && !this.finJuego){ // Si el protagonista colisiona con el plancton
      this.finDelJuego(); // Se muestra la pantalla de fin de juego
    }

    this.modoVelocidadBob = this.protagonista.getVelocidadInterfaz(); // Obtiene el modo de velocidad del protagonista
    this.modoVelocidadPlancton = this.jugador2.getVelocidadInterfaz(); // Obtiene el modo de velocidad del jugador 2

    if(this.marcadorVelocidadBob){
      this.marcadorVelocidadBob.textContent = 'Velocidad: ' + this.modoVelocidad; // Muestra el modo de velocidad en la pantalla
    }

    if(this.marcadorVelocidadPlancton){
        this.marcadorVelocidadPlancton.textContent = 'Velocidad: ' + this.modoVelocidad; // Muestra el modo de velocidad en la pantalla
    }
    
    // Se actualizan los elementos de la escena para cada frame
    
    // Se actualiza la posición de la cámara según su controlador
    this.cameraControl.update();
    
    // Se actualiza el resto del modelo
    this.circuito.update();
    this.protagonista.update();
    this.jugador2.update();
    this.obstaculo1.update(); 
    this.obstaculo2.update();
    this.obstaculo3.update();
    this.volador1.update();
    this.volador2.update();
    this.volador3.update();
    this.volador4.update();
    this.volador5.update();
    this.premio1.update();
    this.premio2.update(); 
    this.premio3.update();
    this.pinia.update(); 

    // Le decimos al renderizador "visualiza la escena que te indico usando la cámara que te estoy pasando"
    this.renderViewport(this, this.jugador2.getCamara3aPersona(), 0, 0, 0.5, 1);
    this.renderViewport(this, this.protagonista.getCamara3aPersona(), 0.5, 0, 0.5, 1);
  
    requestAnimationFrame(() => this.update())
  }
  }



$(function () {

  var scene = new multijugador("#WebGL-output2");


  window.addEventListener ("resize", () => scene.onWindowResize()); // Se añade un listener para el evento resize

  window.addEventListener('keydown', (event) => scene.onKeyDown(event)); // Se añaden listeners para los eventos de teclado
  window.addEventListener('keyup', (event) => scene.onKeyUp(event));
  window.addEventListener('mousedown', (event) => scene.onDocumentMouseDown(event)); // Se añade un listener para el evento de clic


  scene.update();
});
