
import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'

class hamburcarro extends THREE.Object3D {
  constructor() {
    
    super();

    this.hamburcarro = new THREE.Group();

    
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

    // -------------------------------- PAN INFERIOR -------------------------------- //

    cuboGeom.translate(0,-0.6,0); 
    esferaGeom.translate(0,-0.5, 0); 
    
    var pan_inferior = new CSG(); 
    pan_inferior.union([esfera]);
    pan_inferior.subtract([cubo]); 

    cuboGeom.translate(0,1.2,0); 
    pan_inferior.subtract([cubo]); 

    var pan_inferior = pan_inferior.toMesh(); 

    this.hamburcarro.add(pan_inferior);

    // -------------------------------- CARNE -------------------------------- //

    var carneGeom = pan_inferior.geometry.clone(); 
    const carneMat = new THREE.MeshStandardMaterial({ color:  0x873709 });

    carneGeom.translate(0,0.2,0); 
    carneGeom.scale(1.15,0.75,1.15);

    var carne = new THREE.Mesh(carneGeom, carneMat); 

    this.hamburcarro.add(carne); 

    // -------------------------------- QUESO -------------------------------- //
     
    const quesoGeom = new THREE.BoxGeometry(1.0, 0.05, 1.0);
    var quesoMat = new THREE.MeshPhongMaterial({ color: 'yellow', side: THREE.DoubleSide });
    const queso = new THREE.Mesh(quesoGeom, quesoMat);

    queso.geometry.rotateY(45); 
    queso.geometry.translate(0,0.25,0);

    this.hamburcarro.add(queso);

    

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
        //steps: 1.5,
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

    // -------------------------------- TOMATE -------------------------------- //

    var shapeTomate = new THREE.Shape();

    shapeTomate.moveTo(0.55, 0); // Mover al primer punto del círculo
    shapeTomate.absarc(0, 0, 0.55, 0, Math.PI * 2, false); // Añadir un arco al path

    var extrudeSettings = {
      //steps: 1.5,
      depth: 0.1,
      bevelEnabled: false,
    };


    var tomateGeom = new THREE.ExtrudeGeometry( shapeTomate, extrudeSettings );

    var tomateMat = new THREE.MeshPhongMaterial({ color: 'red', side: THREE.DoubleSide });

    var tomate = new THREE.Mesh(tomateGeom, tomateMat);

    tomate.geometry.rotateX(Math.PI/2);

    tomate.geometry.translate(0,0.41,0);

    
    //this.add(tomate);




    // -------------------------------- RUEDAS -------------------------------- //


    var matAdorno = new THREE.MeshBasicMaterial({color: 0x565157});
    var matRueda = new THREE.MeshBasicMaterial({color: 0x000000});
    var matTapiceria = new THREE.MeshBasicMaterial({color: 0x3a3a3a});

    // ------------RUEDAS DELANTERAS --------- //

    //Rueda 1
    var geomRueda1 = new THREE.CylinderGeometry(0.2, 0.2, 0.1, 20);
    var rueda1 = new THREE.Mesh(geomRueda1, matRueda);
    rueda1.geometry.rotateZ(Math.PI/2); 
    rueda1.geometry.translate(0.57, 0, 0); 

    var geomAdornoRueda1 = new THREE.CylinderGeometry(0.1, 0.1, 0.05, 20);
    var adornoRueda1 = new THREE.Mesh(geomAdornoRueda1, matAdorno);
    adornoRueda1.geometry.rotateZ(Math.PI/2); 
    adornoRueda1.geometry.translate(0.6, 0, 0); 


    //Rueda 2
    var geomRueda2 = new THREE.CylinderGeometry(0.2, 0.2, 0.1, 20);
    var rueda2 = new THREE.Mesh(geomRueda2, matRueda);
    rueda2.geometry.rotateZ(Math.PI/2); 
    rueda2.geometry.translate(-0.57, 0, 0);

    var geomAdornoRueda2 = new THREE.CylinderGeometry(0.1, 0.1, 0.05, 20);
    var adornoRueda2 = new THREE.Mesh(geomAdornoRueda2, matAdorno);
    adornoRueda2.geometry.rotateZ(Math.PI/2); 
    adornoRueda2.geometry.translate(-0.6, 0, 0); 

    //Radio unión de dos ruedas
    var geomRadio1 = new THREE.CylinderGeometry(0.04, 0.04, 1.2, 20);
    var radio1 = new THREE.Mesh(geomRadio1, matRueda);
    radio1.geometry.rotateZ(Math.PI/2); 


    //Agrupando elementos 
    var conjuntoRuedas1 = new CSG();
    conjuntoRuedas1.union([rueda1, rueda2,radio1]);

    var conjuntoAdornos1 = new CSG(); 
    conjuntoAdornos1.union([adornoRueda1, adornoRueda2])


    var ruedas1 = conjuntoRuedas1.toMesh();
    ruedas1.geometry.translate(0,0,0.3); 

    var adornos1 = conjuntoAdornos1.toMesh(); 
    adornos1.geometry.translate(0,0,0.3); 

    this.hamburcarro.add(ruedas1); 
    this.hamburcarro.add(adornos1); 


    // ------------RUEDAS TRASERAS --------- //

    //Rueda 3
    var geomRueda3 = new THREE.CylinderGeometry(0.2, 0.2, 0.1, 20);
    var rueda3 = new THREE.Mesh(geomRueda3, matRueda);
    rueda3.geometry.rotateZ(Math.PI/2); 
    rueda3.geometry.translate(0.57, 0, 0); 

    var geomAdornoRueda3 = new THREE.CylinderGeometry(0.1, 0.1, 0.05, 20);
    var adornoRueda3 = new THREE.Mesh(geomAdornoRueda3, matAdorno);
    adornoRueda3.geometry.rotateZ(Math.PI/2); 
    adornoRueda3.geometry.translate(0.6, 0, 0); 


    //Rueda 4
    var geomRueda4 = new THREE.CylinderGeometry(0.2, 0.2, 0.1, 20);
    var rueda4 = new THREE.Mesh(geomRueda4, matRueda);
    rueda4.geometry.rotateZ(Math.PI/2); 
    rueda4.geometry.translate(-0.57, 0, 0);

    var geomAdornoRueda4 = new THREE.CylinderGeometry(0.1, 0.1, 0.05, 20);
    var adornoRueda4 = new THREE.Mesh(geomAdornoRueda4, matAdorno);
    adornoRueda4.geometry.rotateZ(Math.PI/2); 
    adornoRueda4.geometry.translate(-0.6, 0, 0); 

    //Radio unión de dos ruedas
    var geomRadio2 = new THREE.CylinderGeometry(0.04, 0.04, 1.2, 20);
    var radio2 = new THREE.Mesh(geomRadio2, matRueda);
    radio2.geometry.rotateZ(Math.PI/2); 


    //Agrupando elementos 
    var conjuntoRuedas2 = new CSG();
    conjuntoRuedas2.union([rueda3, rueda4, radio2]);

    var conjuntoAdornos2 = new CSG(); 
    conjuntoAdornos2.union([adornoRueda3, adornoRueda4])


    var ruedas2 = conjuntoRuedas2.toMesh();
    ruedas2.geometry.translate(0,0,-0.3); 

    var adornos2 = conjuntoAdornos2.toMesh(); 
    adornos2.geometry.translate(0,0,-0.3); 


    this.hamburcarro.add(ruedas2); 
    this.hamburcarro.add(adornos2);


    // -------------------------------- INTERIOR COCHE -------------------------------- //

    var geomHueco = new THREE.CylinderGeometry(0.4, 0.4, 0.8, 20);
    var hueco = new THREE.Mesh(geomHueco, matRueda);
    hueco.geometry.translate(0,0.6,0); 

    var panHueco = new CSG();
    panHueco.subtract([pan_superior, hueco]); 
    var panConHueco = panHueco.toMesh();

    var tomateHueco = new CSG();
    tomateHueco.subtract([tomate, hueco]); 
    var tomateConHueco = tomateHueco.toMesh();

    var lechugaHueco = new CSG();
    lechugaHueco.subtract([lechuga, hueco]); 
    var lechugaConHueco = lechugaHueco.toMesh();
    
    this.hamburcarro.add(panConHueco); 
    this.hamburcarro.add(tomateConHueco); 
    this.hamburcarro.add(lechugaConHueco); 


    const tapiceriaGeom = new THREE.CylinderGeometry(0.4, 0.4, 0.1, 20);
    const tapiceria = new THREE.Mesh(tapiceriaGeom, matTapiceria);

    tapiceria.geometry.translate(0,0.26,0);

    this.hamburcarro.add(tapiceria);

    // -------------------------------- VOLANTE -------------------------------- //

    var geomVolante = new THREE.CylinderGeometry(0.2, 0.2, 0.05, 20);
    var volante = new THREE.Mesh(geomVolante, matRueda);
    volante.geometry.translate(1,0,0); 

    //PRIMER HUECO
    var geomCilindro = new THREE.CylinderGeometry(0.15, 0.15, 0.1, 20);
    var cilindro = new THREE.Mesh(geomCilindro, matRueda);
    cilindro.geometry.translate(1,0,0); 
    
    var geomQuitar = new THREE.BoxGeometry(1,1,1); 
    var quitar = new THREE.Mesh(geomQuitar, matRueda);
    quitar.geometry.translate(1,0,0.47); 

    var medioCilindro = new CSG();
    medioCilindro.subtract([cilindro, quitar]); 
    var medio_Cilindro = medioCilindro.toMesh();


    //SEGUNDO HUECO
    var geomCilindro2 = new THREE.CylinderGeometry(0.15, 0.15, 0.1, 20);
    var cilindro2 = new THREE.Mesh(geomCilindro2, matRueda);
    cilindro2.geometry.translate(1,0,0); 
    
    var geomQuitar2 = new THREE.BoxGeometry(1,1,1); 
    var quitar2 = new THREE.Mesh(geomQuitar2, matRueda);
    quitar2.geometry.translate(1,0,-0.47); 

    var geomQuitar3 = new THREE.BoxGeometry(1,1,1); 
    var quitar3 = new THREE.Mesh(geomQuitar3, matRueda);
    quitar3.geometry.translate(1.47,0,0); 

    var cuartoCilindro = new CSG();
    cuartoCilindro.subtract([cilindro2, quitar2, quitar3]); 
    var cuarto_Cilindro = cuartoCilindro.toMesh();

    //TERCER HUECO
    var geomCilindro3 = new THREE.CylinderGeometry(0.15, 0.15, 0.1, 20);
    var cilindro3 = new THREE.Mesh(geomCilindro3, matRueda);
    cilindro3.geometry.translate(1,0,0); 

    var geomQuitar4 = new THREE.BoxGeometry(1,1,1); 
    var quitar4 = new THREE.Mesh(geomQuitar4, matRueda);
    quitar4.geometry.translate(0.53,0,0); 

    var cuartoCilindro2 = new CSG();
    cuartoCilindro2.subtract([cilindro3, quitar2, quitar4]); 
    var cuarto_Cilindro2 = cuartoCilindro2.toMesh();

    //VOLANTE FINAL

    var volanteHuecos = new CSG();
    volanteHuecos.subtract([volante, medio_Cilindro, cuarto_Cilindro, cuarto_Cilindro2]); 
    var volanteConHuecos = volanteHuecos.toMesh();

    volanteConHuecos.geometry.rotateX(Math.PI/4); 
    volanteConHuecos.geometry.translate(-1,0.65,-0.2); 


    this.hamburcarro.add(volanteConHuecos); 

    //ENGANCHE DEL VOLANTE
    var geomEnganche = new THREE.CylinderGeometry(0.04, 0.04, 0.3, 20);
    var enganche = new THREE.Mesh(geomEnganche, matRueda);
    enganche.geometry.rotateX(Math.PI/4); 
    enganche.geometry.translate(0,0.54,-0.3); 

    this.hamburcarro.add(enganche); 

    this.add(this.hamburcarro);

    this.hamburcarro.scale.set(1.1,1.1,1.1);
    this.hamburcarro.rotateY(Math.PI);
    this.hamburcarro.translateY(0.2);

  }

  update() {
    this.rotation.y += 0.01;
    
  }
}

export { hamburcarro };