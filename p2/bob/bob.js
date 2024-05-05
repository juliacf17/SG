
import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'
import { MTLLoader } from '../libs/MTLLoader.js'
import { OBJLoader } from '../libs/OBJLoader.js'

class bob extends THREE.Object3D {
  constructor(circuitoGeometry, candidatosColision, _t) {
    
    super();


    this.bob = new THREE.Group();


    // ---------------------------- TRONCO ---------------------------- //

    var cuerpoGeom = new THREE.BoxGeometry(2.5, 2.5, 1.0);
    cuerpoGeom.translate(0,2.25,0.0);

    var textureBob = new THREE.TextureLoader().load('../imgs/textura-bob.png');
    var cuerpoMat = new THREE.MeshStandardMaterial ({map: textureBob});

    var cuerpo = new THREE.Mesh(cuerpoGeom, cuerpoMat);

    var ropaGeom = new THREE.BoxGeometry(2.5, 1, 1.0);
    ropaGeom.translate(0,0.5,0.0);

    var textureRopa = new THREE.TextureLoader().load('../imgs/ropa-bob.png');
    var ropaMat = new THREE.MeshStandardMaterial ({map: textureRopa});

    var ropa = new THREE.Mesh(ropaGeom, ropaMat);

    var narizGeom = new THREE.CylinderGeometry(0.1, 0.1, 0.5, 20, 20);

    narizGeom.rotateX(Math.PI/2);
    narizGeom.translate(0,2,0.75);
    var nariz = new THREE.Mesh(narizGeom, cuerpoMat);

    this.bob.add(nariz);

    this.bob.add(cuerpo);
    this.bob.add(ropa);

    // ---------------------------- PIERNAS ---------------------------- //
    
    var piernaGeom = new THREE.CylinderGeometry(0.1, 0.1, 1.5, 20, 20);
    piernaGeom.translate(0,-0.75,0.0);
    
    var piernaMat = new THREE.MeshStandardMaterial ({map: textureBob});
    
    var pierna1 = new THREE.Mesh(piernaGeom, piernaMat);

    pierna1.translateX(-0.5);

    var pierna2 = new THREE.Mesh(piernaGeom, piernaMat);

    pierna2.translateX(0.5);

    this.bob.add(pierna1);
    this.bob.add(pierna2);

    // ---------------------------- ZAPATOS ---------------------------- //

    var zapatoGeom = new THREE.BoxGeometry(0.5, 0.2, 0.75);
    zapatoGeom.translate(0,-1.5,0.25);

    var zapatoMat = new THREE.MeshPhongMaterial({ color: 'black', side: THREE.DoubleSide });

    var zapato1 = new THREE.Mesh(zapatoGeom, zapatoMat);

    zapato1.translateX(-0.5);

    var zapato2 = new THREE.Mesh(zapatoGeom, zapatoMat);

    zapato2.translateX(0.5);

    this.bob.add(zapato1);
    this.bob.add(zapato2);


    // ---------------------------- BRAZOS ---------------------------- //

    // Mangas

    var mangaGeom = new THREE.CylinderGeometry(0.1, 0.2, 0.5, 20, 20);
    
    var mangaMat = new THREE.MeshPhongMaterial({ color: 'white', side: THREE.DoubleSide });

    var manga1 = new THREE.Mesh(mangaGeom, mangaMat);
    manga1.rotateZ(-30 * Math.PI/180);
    manga1.translateX(-1.75);
    manga1.translateY(0.5);

    var manga2 = new THREE.Mesh(mangaGeom, mangaMat);
    manga2.rotateZ(30 * Math.PI/180);
    manga2.translateX(1.75);
    manga2.translateY(0.5);


    this.bob.add(manga1);
    this.bob.add(manga2);
    



    var brazoGeom = new THREE.CylinderGeometry(0.1, 0.1, 1.5, 20, 20);
    var brazoMat = new THREE.MeshStandardMaterial ({map: textureBob});

    var brazo1 = new THREE.Mesh(brazoGeom, brazoMat);
    brazo1.rotateZ(-30 * Math.PI/180);
    brazo1.translateX(-1.75);

    var brazo2 = new THREE.Mesh(brazoGeom, brazoMat); 
    brazo2.rotateZ(30 * Math.PI/180);
    brazo2.translateX(1.75);

    //this.add(brazo1);
    //this.add(brazo2);

    // ---------------------------- MANOS ---------------------------- //

    var manoGeom = new THREE.SphereGeometry(0.2, 20, 20);
    var manoMat = new THREE.MeshStandardMaterial ({map: textureBob});

    var mano1 = new THREE.Mesh(manoGeom, manoMat);
    mano1.translateX(-1.9);
    mano1.translateY(0.15);

    var mano2 = new THREE.Mesh(manoGeom, manoMat);
    mano2.translateX(1.9);
    mano2.translateY(0.15);

    var csgBrazo1 = new CSG();
    csgBrazo1.union([brazo1,mano1]);
    var brazo1 = csgBrazo1.toMesh();

    
    this.bob.add(brazo1);

    var csgBrazo2 = new CSG();
    csgBrazo2.union([brazo2,mano2]);
    var brazo2 = csgBrazo2.toMesh();

    this.bob.add(brazo2);
    

   
    // ---------------------------- OJOS ---------------------------- //

    var ojosGeom = new THREE.SphereGeometry(0.4, 20, 20);
    ojosGeom.translate(-0.7,2.5,0.4);
    var ojosMat = new THREE.MeshStandardMaterial ({color: 'white'});

    var ojo1 = new THREE.Mesh(ojosGeom, ojosMat);

    var ojosGeom2 = new THREE.SphereGeometry(0.4, 20, 20);
    ojosGeom2.translate(0.7,2.5,0.4);
    var ojo2 = new THREE.Mesh(ojosGeom2, ojosMat);

    this.bob.add(ojo1);
    this.bob.add(ojo2);

    // Pupilas

    var pupilaGeom = new THREE.SphereGeometry(0.2, 20, 20);
    pupilaGeom.translate(-0.7,2.5,0.7);
    var pupilaMat = new THREE.MeshStandardMaterial ({color: 'black'});
    var pupila1 = new THREE.Mesh(pupilaGeom, pupilaMat);

    var pupilaGeom2 = new THREE.SphereGeometry(0.2, 20, 20);
    pupilaGeom2.translate(0.7,2.5,0.7);
    var pupila2 = new THREE.Mesh(pupilaGeom2, pupilaMat);

    this.bob.add(pupila1);
    this.bob.add(pupila2);

    // Pestañas

    var pestaniaMat = new THREE.MeshStandardMaterial ({color: 'black'});

    var pestaniaGeom = new THREE.BoxGeometry(0.1, 0.2, 0.1);
    pestaniaGeom.translate(-0.7,2.95,0.5);
    var pestania1 = new THREE.Mesh(pestaniaGeom, pestaniaMat);

    var pestaniaGeom2 = new THREE.BoxGeometry(0.1, 0.2, 0.1);
    pestaniaGeom2.rotateZ(30 * Math.PI/180);
    pestaniaGeom2.translate(-0.9,2.9,0.5);
    var pestania2 = new THREE.Mesh(pestaniaGeom2, pestaniaMat);

    var pestaniaGeom3 = new THREE.BoxGeometry(0.1, 0.2, 0.1);
    pestaniaGeom3.rotateZ(-30 * Math.PI/180);
    pestaniaGeom3.translate(-0.5,2.9,0.5);
    var pestania3 = new THREE.Mesh(pestaniaGeom3, pestaniaMat);


    var pestaniaGeom4 = new THREE.BoxGeometry(0.1, 0.2, 0.1);
    pestaniaGeom4.translate(0.7,2.95,0.5);
    var pestania4 = new THREE.Mesh(pestaniaGeom4, pestaniaMat);

    var pestaniaGeom5 = new THREE.BoxGeometry(0.1, 0.2, 0.1);
    pestaniaGeom5.rotateZ(-30 * Math.PI/180);
    pestaniaGeom5.translate(0.9,2.9,0.5);
    var pestania5 = new THREE.Mesh(pestaniaGeom5, pestaniaMat);

    var pestaniaGeom6 = new THREE.BoxGeometry(0.1, 0.2, 0.1);
    pestaniaGeom6.rotateZ(30 * Math.PI/180);
    pestaniaGeom6.translate(0.5,2.9,0.5);
    var pestania6 = new THREE.Mesh(pestaniaGeom6, pestaniaMat);



    this.bob.add(pestania1);
    this.bob.add(pestania2);
    this.bob.add(pestania3);
    this.bob.add(pestania4);
    this.bob.add(pestania5);
    this.bob.add(pestania6);

    // ---------------------------- BOCA ---------------------------- //

    var shapeBoca = new THREE.Shape();
    shapeBoca.moveTo(-0.8,0.0);
    shapeBoca.quadraticCurveTo(0.0, -1.2, 0.8, 0.0);
    shapeBoca.lineTo(0.8, 0.0);

    var options = {
      depth: 0.1,
      bevelEnabled: false
    };


    var bocaGeom = new THREE.ExtrudeGeometry(shapeBoca, options);
    bocaGeom.translate(0,1.75,0.5);
    var bocaMat = new THREE.MeshStandardMaterial ({color: 'pink'});
    var boca = new THREE.Mesh(bocaGeom, bocaMat);

    this.bob.add(boca);


    var paletaGeom = new THREE.BoxGeometry(0.2, 0.3, 0.05);
    paletaGeom.translate(-0.15,1.6,0.6);
    var paletaMat = new THREE.MeshStandardMaterial ({color: 'white'});
    var paleta1 = new THREE.Mesh(paletaGeom, paletaMat);

    var paleta2 = new THREE.Mesh(paletaGeom, paletaMat);
    paleta2.translateX(0.3);

    this.bob.add(paleta1);
    this.bob.add(paleta2);

    this.add(this.bob);

    this.bob.scale.set(0.05,0.05,0.05);
    
    this.bob.translateY(0.08);

    // ---------------------------- VARIABLES ---------------------------- //

    
    this.circuito = circuitoGeometry;
    this.path = circuitoGeometry.parameters.path;
    this.radio = circuitoGeometry.parameters.radius;
    this.segmentos = circuitoGeometry.parameters.tubularSegments;

    this.t = _t; // Longitud recorrida del spline - entre 0 y 1

    this.reloj = new THREE.Clock(); // reloj para aumentar la velocidad

    this.rotacion = 0; // rotación en el tubo

    this.velocidad = 0.05; // velocidad del personaje
    

    this.nuevoTarget = new THREE.Vector3(); // nuevo target para la cámara

    this.createCamara3aPersona(); // crear cámara en 3a persona

    // Movimientos a la izquierda y derecha
    this.izquierda = false; 
    this.derecha = false;

    // Colisiones por Raycasting

    this.candidatos = candidatosColision;
    var distancia = 0.5; 
    this.posicion = new THREE.Vector3();
    this.direccion = new THREE.Vector3();
    
    this.rayo = new THREE.Raycaster(this.posicion, new THREE.Vector3(0,0,1), 0, distancia);

    this.hasImpacted = false;

    this.impacto = null;

    this.cajaFigura = new THREE.Box3();

    var cajaVisible = new THREE.Box3Helper(this.cajaFigura, 'black');
    
    this.add(cajaVisible);

    cajaVisible.visible = true;



  }

  createCamara3aPersona() {
    this.camara = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.bob.add(this.camara);

    
    this.camara.position.set(0,10,-20);

    var puntoDeMiraRelativo = new THREE.Vector3(0,-0.1,0.5);

    var target = new THREE.Vector3();
    this.camara.getWorldPosition(target);

    target.add(puntoDeMiraRelativo);

    this.camara.lookAt(puntoDeMiraRelativo);

   }

   getCamara3aPersona() {
    return this.camara;
  }

  update() {
    this.cajaFigura.setFromObject(this.bob);

    // MODIFICAR CON LA VELOCIDAD
    this.t += this.reloj.getDelta() * this.velocidad;
    //console.log(this.t);

    if(this.t >= 1){
        this.t = 0;
        this.velocidad *= 2;
    }

    //console.log("Izquierda: " + this.izquierda);
    //console.log("Derecha: " + this.derecha);

    
    if (this.izquierda) {
        this.rotacion -= Math.PI * 2 / 180;
        if (this.rotacion < -Math.PI / 3) {
        this.rotacion = -Math.PI / 3;
        }
    } else if (this.derecha) {
        this.rotacion += Math.PI * 2 / 180;
        if (this.rotacion > Math.PI / 3) {
        this.rotacion = Math.PI / 3;
        }
    }

    
    //this.rotacion += Math.PI * 2 /180;


    //console.log(this.velocidad);

    this.nodoPosOrientTubo = new THREE.Object3D();
    this.movLateral = new THREE.Object3D();
    this.posSuper = new THREE.Object3D();

    this.posSuper.translateY(this.radio);
    this.movLateral.rotateZ(this.rotacion);
        
    var posTmp = this.path.getPointAt(this.t);
    this.nodoPosOrientTubo.position.copy(posTmp);
    
    var tangente = this.path.getTangentAt(this.t);
    posTmp.add(tangente);
    var segmentoActual = Math.floor(this.t * this.segmentos);
    this.nodoPosOrientTubo.up = this.circuito.binormals[segmentoActual];
    this.nodoPosOrientTubo.lookAt(posTmp);
    
                      
    this.add(this.nodoPosOrientTubo);
    this.nodoPosOrientTubo.add(this.movLateral);
    this.movLateral.add(this.posSuper);
    this.posSuper.add(this.bob); 


    this.bob.getWorldPosition(this.nuevoTarget);

    this.camara.lookAt(this.nuevoTarget); 
    
    this.bob.getWorldPosition(this.posicion);

    this.nodoPosOrientTubo.getWorldDirection(this.direccion);

    for (var i = 0; i < this.candidatos.length; i++) {
        if(this.cajaFigura.intersectsBox(this.candidatos[i].cajaFigura) && !this.hasImpacted && this.candidatos[i] != this.impacto){
            console.log("COLISIÓN");
            this.velocidad =  this.velocidad * 0.5;
            this.impacto = this.candidatos[i];
            this.hasImpacted = true;
            console.log(this.hasImpacted);
        }else{
            //console.log("NO COLISIÓN");
            this.hasImpacted = false;
        }
    }
    
  }
}

export { bob };