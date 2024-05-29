
import * as THREE from '../../../libs/three.module.js'
import { CSG } from '../../../libs/CSG-v2.js'
import { MTLLoader } from '../../../libs/MTLLoader.js'
import { OBJLoader } from '../../../libs/OBJLoader.js'

import { bob } from './bob.js'
import { hamburcarro } from './hamburcarro.js'

class bob_hambur extends THREE.Object3D {
  constructor() {
    
    super();

    // ---------------------------- MONTAR A BOB EN EL HAMBURCARRO ---------------------------- //

    this.bob_hambur = new THREE.Group();

    this.bob = new bob();

    this.bob_hambur.add(this.bob);

    this.hamburcarro = new hamburcarro();


    let meshes = [];

    this.hamburcarro.traverse((child) => {
        if (child instanceof THREE.Mesh) {
            meshes.push(child);
        }
    });

    meshes.forEach((mesh) => {
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        console.log("Sombra añadida a " + mesh.name);
    });
        
    this.bob_hambur.add(this.hamburcarro);

    this.bob_hambur.scale.set(0.25,0.25,0.25);


    this.add(this.bob_hambur);
  }

  update() {
    this.bob_hambur.rotation.y += 0.01;
    
  
  }
}

export { bob_hambur };