
import * as THREE from '../libs/three.module.js'

class Icosahedron extends THREE.Object3D {

    constructor(gui, guiTitle){

        super();

        this.createGUI(gui,guiTitle);

        this.icosahedronGeom = new THREE.IcosahedronGeometry(0.5,0);

        var texture = new THREE.TextureLoader().load('../imgs/wood.jpg');
        var icosahedronMat = new THREE.MeshStandardMaterial ({map: texture});

        //var icosahedronMat = new THREE.MeshNormalMaterial();

        this.icosahedrom = new THREE.Mesh(this.icosahedronGeom,icosahedronMat);

        this.icoAxes = new THREE.AxesHelper(2); // Crear un AxesHelper con una longitud de 1
        this.icosahedrom.add(this.icoAxes); // Añadir el AxesHelper como hijo de la esfera

        this.add(this.icosahedrom);

        this.icosahedrom.position.y = 0.5;
        this.icosahedrom.position.x = 3.0;
    }

    createGUI(gui,guiTitle){

        this.guiControls = {
            radius: 0.5,
            detail: 0,

            reset: () => {
                this.guiControls.radius = 0.5;
                this.guiControls.detail = 0.0;
            },


            
        }

        var folder = gui.addFolder(guiTitle);

        folder.add(this.guiControls,'radius',0.1,2.0,0.1).name('Radius: ').listen();
        folder.add(this.guiControls,'detail',0.0,5.0,1.0).name('Details: ').listen();
        folder.add(this.guiControls,'reset').name('[ Reset ]');
        

    }

    update(){

        this.icosahedrom.geometry.dispose();  // Liberar la memoria de la geometría antigua

        this.icosahedrom.geometry = new THREE.IcosahedronGeometry(this.guiControls.radius,this.guiControls.detail);

    }   

}

export { Icosahedron };