
import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'




class circuito extends THREE.Object3D {
  constructor(gui,titleGui) {
    
    super();

    // Se crea la parte de la interfaz que corresponde a la grapadora
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);

    //const torusKnotGeom = new THREE.TorusKnotGeometry(9,1,300,12,6,8,);
    const torusKnotGeom = new THREE.TorusKnotGeometry(9,1,300,12,8,12);
    const torusKnotMat = new THREE.MeshBasicMaterial( { color: 'lightblue' } ); 
    const torusKnot = new THREE.Mesh( torusKnotGeom, torusKnotMat ); 
    
    //this.add( torusKnot );

    const spline = this.getPathFromTorusKnot(torusKnot);

    // Creamos un tubo a partir de la spline
    this.geometry = new THREE.TubeGeometry(spline, 600, 0.5, 8, false);
    var textureArena = new THREE.TextureLoader().load('../imgs/arena.png');
    const material = new THREE.MeshBasicMaterial({ map: textureArena, side: THREE.DoubleSide, opacity: 0.2, transparent: true});
    const tube = new THREE.Mesh(this.geometry, material);

    this.add(tube);
    // Añade edges al tubo
    const edges = new THREE.EdgesGeometry(this.geometry);
    const edgesMaterial = new THREE.LineBasicMaterial({ color: 'grey' });
    const edgesMesh = new THREE.LineSegments(edges, edgesMaterial);
    tube.add(edgesMesh);

  

    var points = spline.getPoints(600);
    var geometry2 = new THREE.BufferGeometry().setFromPoints(points);
    var material2 = new THREE.LineBasicMaterial({ color: 0xff0000 });
    var curveObject = new THREE.Line(geometry2, material2);
    tube.add(curveObject);
/*
    var geometry = new THREE.TubeGeometry(spline, 100, 0.1, 8, false);
    var material = new THREE.MeshBasicMaterial({ color: 'lightpink' , side: THREE.DoubleSide });
    var tube = new THREE.Mesh(geometry, material);

    //this.add(tube);
    */

  

    //this.rotateX(Math.PI/2);
  }

  createGUI (gui,titleGui) {
    // Controles para el movimiento de la parte móvil
    this.guiControls = {
      edgesVisible: true,
      scale : 1,
    } 
    
    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder (titleGui);
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    folder.add (this.guiControls, 'edgesVisible')
      .name ('Mostrar aristas')
      .onChange ( () => this.changeEdgesVisibility() );

    folder.add (this.guiControls, 'scale', 0.1, 2, 0.1)
      .name ('Escala')
      .onChange ( () => this.changeScale() );
  }

  changeEdgesVisibility() {
    this.children.forEach( (child) => {
      if (child instanceof THREE.Mesh) {
        child.children.forEach((edgesMesh) => {
          if (edgesMesh instanceof THREE.LineSegments) {
            edgesMesh.visible = this.guiControls.edgesVisible;
          }
        });
      }
    });
  }

  changeScale() {
    this.children.forEach( (child) => {
      if (child instanceof THREE.Mesh) {
        child.scale.set(this.guiControls.scale, this.guiControls.scale, this.guiControls.scale);
        child.children.forEach((edgesMesh) => {
        });
      }
    });
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