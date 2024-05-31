
import * as THREE from '../../libs/three.module.js'
import { CSG } from '../../libs/CSG-v2.js'

class hamburguesa extends THREE.Object3D {
  constructor(circuitoGeometry, _t) {
    
    super();

    this.hamburguesa = new THREE.Group();

    
    // -------------------------------- PAN SUPERIOR -------------------------------- //

    // Creamos un cubo
    const cuboGeom = new THREE.BoxGeometry(1, 1, 1);
    var cuboMat = new THREE.MeshPhongMaterial({ color: 'lightpink', side: THREE.DoubleSide });
    const cubo = new THREE.Mesh(cuboGeom, cuboMat);

    // Creamos una esfera
    const esferaGeom = new THREE.SphereGeometry(0.5, 32, 32);
    const esferaMat = new THREE.MeshStandardMaterial({ color:  0xa7780a });
    const esfera = new THREE.Mesh(esferaGeom, esferaMat);

    esferaGeom.translate(0,0.45,0);
    var pan_superior = new CSG();
    pan_superior.union([esfera]);
    pan_superior.subtract([cubo]);

    var pan_superior = pan_superior.toMesh();
    pan_superior.geometry.translate(0,-0.1,0);
    //this.add(pan_superior);

    this.hamburguesa.add(pan_superior);

    // -------------------------------- PAN INFERIOR -------------------------------- //

    cuboGeom.translate(0,-0.6,0); 
    esferaGeom.translate(0,-0.5, 0); 
    
    var pan_inferior = new CSG(); 
    pan_inferior.union([esfera]);
    pan_inferior.subtract([cubo]); 

    cuboGeom.translate(0,1.2,0); 
    pan_inferior.subtract([cubo]); 

    var pan_inferior = pan_inferior.toMesh(); 

    //this.add(pan_inferior);

    this.hamburguesa.add(pan_inferior);

    // -------------------------------- CARNE -------------------------------- //

    var carneGeom = pan_inferior.geometry.clone(); 
    const carneMat = new THREE.MeshStandardMaterial({ color:  0x873709 });

    carneGeom.translate(0,0.2,0); 
    carneGeom.scale(1.15,0.75,1.15);

    var carne = new THREE.Mesh(carneGeom, carneMat); 

    //this.add(carne); 

    this.hamburguesa.add(carne);  

    // -------------------------------- QUESO -------------------------------- //
     
    const quesoGeom = new THREE.BoxGeometry(1.0, 0.05, 1.0);
    var quesoMat = new THREE.MeshPhongMaterial({ color: 'yellow', side: THREE.DoubleSide });
    const queso = new THREE.Mesh(quesoGeom, quesoMat);

    queso.geometry.rotateY(45); 
    queso.geometry.translate(0,0.25,0);

    //this.add(queso);

    this.hamburguesa.add(queso);

    

    // -------------------------------- LECHUGA -------------------------------- //

    var shapeLechuga = new THREE.Shape();

    shapeLechuga.moveTo(0, -0.6);
    shapeLechuga.quadraticCurveTo(-0.3,-0.6,-0.2,-0.4);
    shapeLechuga.quadraticCurveTo(-0.3,-0.6,-0.4,-0.35);
    shapeLechuga.quadraticCurveTo(-0.6,-0.3,-0.3,-0.1);
    shapeLechuga.quadraticCurveTo(-0.6,-0.3,-0.6,0.0);
    shapeLechuga.quadraticCurveTo(-0.6,0.3,-0.3,0.1);
    shapeLechuga.quadraticCurveTo(-0.6,0.3,-0.4,0.35);
    shapeLechuga.quadraticCurveTo(-0.3,0.6,-0.2,0.4);
    shapeLechuga.quadraticCurveTo(-0.3,0.6,0,0.6);

    shapeLechuga.quadraticCurveTo(0.3,0.6,0.2,0.4);
    shapeLechuga.quadraticCurveTo(0.3,0.6,0.4,0.35);
    shapeLechuga.quadraticCurveTo(0.6,0.3,0.3,0.1);
    shapeLechuga.quadraticCurveTo(0.6,0.3,0.6,0.0);
    shapeLechuga.quadraticCurveTo(0.6,-0.3,0.3,-0.1);
    shapeLechuga.quadraticCurveTo(0.6,-0.3,0.4,-0.35);
    shapeLechuga.quadraticCurveTo(0.3,-0.6,0.2,-0.4);
    shapeLechuga.quadraticCurveTo(0.3,-0.6,0,-0.6);


    var extrudeSettings = {
        depth: 0.1,
        bevelEnabled: false,
    };

    var lechugaGeom = new THREE.ExtrudeGeometry( shapeLechuga, extrudeSettings );

    var lechugaMat = new THREE.MeshPhongMaterial({ color: 'green', side: THREE.DoubleSide });

    var lechuga = new THREE.Mesh(lechugaGeom, lechugaMat);

    lechuga.geometry.rotateX(Math.PI/2);
    lechuga.geometry.scale(1.1,1.0,1.1);
    lechuga.geometry.translate(0,0.34,0);

    //this.add(lechuga);

    this.hamburguesa.add(lechuga);
    // -------------------------------- TOMATE -------------------------------- //

    var shapeTomate = new THREE.Shape();

    shapeTomate.moveTo(0.55, 0); // Mover al primer punto del círculo
    shapeTomate.absarc(0, 0, 0.55, 0, Math.PI * 2, false); // Añadir un arco al path

    var extrudeSettings = {
      depth: 0.1,
      bevelEnabled: false,
    };


    var tomateGeom = new THREE.ExtrudeGeometry( shapeTomate, extrudeSettings );

    var tomateMat = new THREE.MeshPhongMaterial({ color: 'red', side: THREE.DoubleSide });

    var tomate = new THREE.Mesh(tomateGeom, tomateMat);

    tomate.geometry.rotateX(Math.PI/2);

    tomate.geometry.translate(0,0.41,0);

    //this.add(tomate);

    this.hamburguesa.add(tomate);

    this.hamburguesa.translateY(0.1); 
    this.hamburguesa.scale.set(0.15, 0.15, 0.15);


    this.add(this.hamburguesa); 

    // ---------------------------- VARIABLES ---------------------------- //
    
  
    this.circuito = circuitoGeometry;
    this.path = circuitoGeometry.parameters.path;
    this.radio = circuitoGeometry.parameters.radius;
    this.segmentos = circuitoGeometry.parameters.tubularSegments;

    this.t = _t;

    this.rotacion = 0;
    this.cajaFigura = new THREE.Box3();

    var cajaVisible = new THREE.Box3Helper(this.cajaFigura, 'black');
    
    this.add(cajaVisible);

    cajaVisible.visible = false;
    
    this.nodoPosOrientTubo = new THREE.Object3D();
    this.movLateral = new THREE.Object3D();
    this.posSuper = new THREE.Object3D();

    this.posSuper.translateY(this.radio);

    this.add(this.nodoPosOrientTubo);
    this.nodoPosOrientTubo.add(this.movLateral);
    this.movLateral.add(this.posSuper);
    this.posSuper.add(this.hamburguesa);
  }

  update() {
    this.rotacion += 0.01;


    this.cajaFigura.setFromObject(this.hamburguesa);
        
    
    this.movLateral.rotation.y = this.rotacion;
       
    var posTmp = this.path.getPointAt(this.t);
    this.nodoPosOrientTubo.position.copy(posTmp);
    
    var tangente = this.path.getTangentAt(this.t);
    posTmp.add(tangente);
    var segmentoActual = Math.floor(this.t * this.segmentos);
    this.nodoPosOrientTubo.up = this.circuito.binormals[segmentoActual];
    this.nodoPosOrientTubo.lookAt(posTmp);    
  }
}

export { hamburguesa };