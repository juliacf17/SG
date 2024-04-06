
import * as THREE from '../libs/three.module.js'
 

class Barrido extends THREE.Object3D {
  constructor() {
    
    super();

   //*************************************** CORAZONES ***************************************************/
    
    var shape_corazon = new THREE.Shape();
    shape_corazon.moveTo(0, 0);
    shape_corazon.quadraticCurveTo(0.8,0.25,0.8,1.0);
    shape_corazon.quadraticCurveTo(0.7,1.4,0.4,1.44);
    shape_corazon.quadraticCurveTo(0.1,1.4,0.0,1.1);
    shape_corazon.quadraticCurveTo(-0.1,1.4,-0.4,1.44);
    shape_corazon.quadraticCurveTo(-0.7,1.4,-0.8,1.0);
    shape_corazon.quadraticCurveTo(-0.8,0.25,0,0);


    var material = new THREE.MeshStandardMaterial({ 
        color: 'red', // Color de la forma
        roughness: 0.5, // Rugosidad del material
        metalness: 0.5, // Metalicidad del material
        flatShading: false // Activa el sombreado suave
    });

      // Configura los parámetros del biselado
    var extrudeSettings = {
      depth: 0.1, // Profundidad de la extrusión
      bevelEnabled: true, // Activa el biselado
      bevelThickness: 0.05, // Grosor del biselado
      bevelSize: 0.02, // Tamaño del biselado
      bevelSegments: 100 // Segmentos del biselado
    };

  // Crea la geometría extruida con biselado
  this.geometry = new THREE.ExtrudeGeometry(shape_corazon, extrudeSettings);

    
    this.corazon = new THREE.Mesh(this.geometry, material);

    this.add(this.corazon);


    this.corazon.position.x = -1;
    this.corazon.position.y = -0.5

    this.corazon.scale.set(0.75,0.75,0.75);

    this.corazon2 = this.corazon.clone();
    this.add(this.corazon2);


    this.corazon2.position.x = 1;
    this.corazon2.position.y = -0.5

    //*************************************** TRÉBOLES ***************************************************/

    var shape_trebol = new THREE.Shape();
    shape_trebol.moveTo(-0.0001, -0.4);
    shape_trebol.lineTo(-0.2, -0.4);
    shape_trebol.quadraticCurveTo(0.0,-0.4,0.0,-0.2);
    shape_trebol.lineTo(0.0,0.2);
    shape_trebol.quadraticCurveTo(0.0,-0.2,-0.35,-0.1);
    shape_trebol.quadraticCurveTo(-0.6,0.0,-0.6,0.2);
    shape_trebol.quadraticCurveTo(-0.6,0.6,-0.2,0.4);
    shape_trebol.quadraticCurveTo(-0.35,0.45,-0.35,0.7);
    shape_trebol.quadraticCurveTo(-0.35,0.9,0.0001,0.9);

    shape_trebol.quadraticCurveTo(0.35,0.9,0.35,0.7);
    shape_trebol.quadraticCurveTo(0.35,0.45,0.2,0.4);
    shape_trebol.quadraticCurveTo(0.6,0.6,0.6,0.2);
    shape_trebol.quadraticCurveTo(0.6,0.0,0.35,-0.1);
    shape_trebol.quadraticCurveTo(0.0,-0.2,0.0,0.2);
    shape_trebol.lineTo(0.0,-0.2);
    shape_trebol.quadraticCurveTo(0.0,-0.4,0.2,-0.4);
    shape_trebol.lineTo(0.0001,-0.4);
    

    var material2 = new THREE.MeshStandardMaterial({ 
      color: 'blue', // Color de la forma
      roughness: 0.5, // Rugosidad del material
      metalness: 0.5, // Metalicidad del material
      flatShading: false // Activa el sombreado suave
    });


    // Crea la geometría extruida con biselado
    this.geometry2 = new THREE.ExtrudeGeometry(shape_trebol, extrudeSettings);

    this.trebol = new THREE.Mesh(this.geometry2, material2);

    this.add(this.trebol)
    this.trebol.position.y = 1;


    this.trebol2= this.trebol.clone();

    this.add(this.trebol2);

    this.trebol2.position.y = -1;

    //********************************************************************************************************** */


    //*************************************** BARRIDOS VERTICALES ********************************************** */

    

    var pts = [];
    var altura = 10; // Altura de la espiral
    var vueltas = 5; // Número de vueltas completas
    var pasos = 100; // Número de puntos en el camino
    for (var i = 0; i <= pasos; i++) {
        var t = i / pasos * vueltas * Math.PI * 2; // ángulo actual
        var x = Math.sin(t) * 0.1;
        var y = (i / pasos) * altura - altura / 2;
        var z = Math.cos(t) * 0.1;
        pts.push(new THREE.Vector3(x, y, z));
    }

    var path = new THREE.CatmullRomCurve3(pts);
    
    var options = { steps: 100, curveSegments: 100, extrudePath: path };

    this.geometry3 = new THREE.ExtrudeGeometry( shape_corazon, options );
    var material = new THREE.MeshPhongMaterial({ color: 'green', side: THREE.DoubleSide });

    this.barrido1 = new THREE.Mesh(this.geometry3, material);

    this.add(this.barrido1);

    this.barrido1.scale.set(0.25, 0.25, 0.25);

    this.barrido1.position.x = -2.5;
    

    this.barrido2 = this.barrido1.clone();

    this.add(this.barrido2);

    this.barrido2.position.x = 2.5;








  }


  createGUI(gui, titleGui) {
  }

  update() {
    this.corazon.rotation.y += 0.01;
    this.trebol.rotation.y += 0.01;
    this.trebol2.rotation.y -= 0.01;
    this.corazon2.rotation.y -= 0.01;
    this.barrido1.rotation.y -= 0.01;
    this.barrido1.rotation.z -= 0.01;
    this.barrido2.rotation.y += 0.01;
    this.barrido2.rotation.z += 0.01;
    
  }


}

export { Barrido };
