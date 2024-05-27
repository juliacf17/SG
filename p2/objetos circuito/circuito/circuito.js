
import * as THREE from '../../libs/three.module.js'
import { CSG } from '../../libs/CSG-v2.js'
import { color } from '../../libs/dat.gui.module.js';




class circuito extends THREE.Object3D {
  constructor() {
    
    super();


    //const torusKnotGeom = new THREE.TorusKnotGeometry(9,1,300,12,6,8,);
    const torusKnotGeom = new THREE.TorusKnotGeometry(9,1,300,12,2,3);
    const torusKnotMat = new THREE.MeshBasicMaterial( { color: 'lightblue' } ); 
    const torusKnot = new THREE.Mesh( torusKnotGeom, torusKnotMat ); 
    
    //this.add( torusKnot );

    const spline = this.getPathFromTorusKnot(torusKnot);

    // Creamos un tubo a partir de la spline
    this.geometry = new THREE.TubeGeometry(spline, 600, 0.5, 80, true);
    var textureArena = new THREE.TextureLoader().load('../imgs/arena3.png', function (texture) {
      // Configura la textura para que se repita
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(100, 4); // Ajusta los valores de repetición según tus necesidades
    });

    var material = new THREE.MeshStandardMaterial({ map: textureArena,
                                                      side: THREE.DoubleSide, opacity: 1.0, transparent: true});



    //const material = new THREE.MeshStandardMaterial({ color: 0x00ff00, side: THREE.DoubleSide, opacity: 1.0, transparent: true})

    material.map.repeat.set(1, 1); 
    var tube = new THREE.Mesh(this.geometry, material);

    tube.castShadow = true;
    tube.receiveShadow = true;

    this.add(tube);
    // Añade edges al tubo
    const edges = new THREE.EdgesGeometry(this.geometry);
    const edgesMaterial = new THREE.LineBasicMaterial({ color: 'grey' });
    const edgesMesh = new THREE.LineSegments(edges, edgesMaterial);
    //tube.add(edgesMesh);

  

    var points = spline.getPoints(600);
    var geometry2 = new THREE.BufferGeometry().setFromPoints(points);
    var material2 = new THREE.LineBasicMaterial({ color: 0xff0000 });
    var curveObject = new THREE.Line(geometry2, material2);
    //tube.add(curveObject);


  }




  update() {
      //this.rotation.y += 0.01;
      
  }

  getPathFromTorusKnot (torusKnot) {
    // La codificación de este método está basado
    //   en el código fuente de la página oficial de Three.js
    // https://github.com/mrdoob/three.js/blob/master/src/geometries/TorusKnotGeometry.js
    const p = torusKnot.geometry.parameters.p;
    const q = torusKnot.geometry.parameters.q;
    const radius = torusKnot.geometry.parameters.radius;
    const resolution = torusKnot.geometry.parameters.tubularSegments;
    var u, cu, su, quOverP, cs;
    var x,y,z;
    // En  points  se almacenan los puntos que extraemos del torusKnot
    const points = [];
    for ( let i = 0; i < resolution; ++ i ) {
      u = i / resolution * p * Math.PI * 2;
      cu = Math.cos( u );
      su = Math.sin( u );
      quOverP = q / p * u;
      cs = Math.cos( quOverP );
  
      x = radius * ( 2 + cs ) * 0.5 * cu;
      y = radius * ( 2 + cs ) * su * 0.5;
      z = radius * Math.sin( quOverP ) * 0.5;
  
      points.push (new THREE.Vector3 (x,y,z));
    }
    // Una vez tenemos el array de puntos 3D construimos y devolvemos el CatmullRomCurve3
    return new THREE.CatmullRomCurve3 (points, true);
  }
}

export { circuito };