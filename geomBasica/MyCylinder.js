import * as THREE from '../libs/three.module.js'

class MyCylinder extends THREE.Object3D {
    constructor(gui, titleGui) {
        super();
        // Se crea la parte de la interfaz que corresponde al cilindro
        this.createGUI(gui, titleGui);
        
        this.axis = new THREE.AxesHelper(0.1);
        this.add(this.axis);

        // Un Mesh se compone de geometría y material
        // Para un cilindro, usamos CylinderGeometry en lugar de ConeGeometry
        var cylinderGeom = new THREE.CylinderGeometry(0.2, 0.2, 0.4, 3); // radioTop, radioBottom, altura, segmentosRadiales
        // Como material se crea uno a partir de un color
        var cylinderMat = new THREE.MeshNormalMaterial({color: 0xCF0000});
        cylinderMat.flatShading = true;
        cylinderMat.needsUpdate = true;
        
        // Construimos el Mesh
        this.cylinder = new THREE.Mesh(cylinderGeom, cylinderMat);
        
        // Añadirlo como hijo del Object3D (el this)
        this.add(this.cylinder);
        // Las geometrías se crean centradas en el origen.
    }

    crearNuevo() {
        this.cylinder.geometry.dispose();
        var nuevaGeometria = new THREE.CylinderGeometry(this.guiControls.radius_top, this.guiControls.radius_bottom, this.guiControls.height, this.guiControls.segmentosRadiales);
        this.cylinder.geometry = nuevaGeometria;
    }

    createGUI(gui, titleGui) {
        // Controles para el tamaño, la orientación y la posición del cilindro
        this.guiControls = new function () {
            this.radius_top = 0.2;
            this.radius_bottom = 0.2;
            this.height = 0.4;
            // Ajuste en la nomenclatura para coherencia
            this.segmentosRadiales = 3; // Más segmentos radiales para un cilindro suave
        }
        // Se crea una sección para los controles del cilindro
        var folder = gui.addFolder(titleGui);
        var that = this;
        // Estas líneas son las que añaden los componentes de la interfaz
        folder.add(this.guiControls, 'radius_top', 0.05, 1, 0.01)
              .name('Radio superior:').listen()
              .onChange(function(value) {that.crearNuevo();});

        folder.add(this.guiControls, 'radius_bottom', 0.05, 1, 0.01)
              .name('Radio inferior:').listen()
              .onChange(function(value) {that.crearNuevo();});
        
        folder.add(this.guiControls, 'height', 0.1, 1, 0.01)
              .name('Altura:').listen()
              .onChange(function(value) {that.crearNuevo();});

        folder.add(this.guiControls, 'segmentosRadiales', 3, 30, 1)
              .name('Resolución:').listen()
              .onChange(function(value) {that.crearNuevo();});
    }

    update() {
        this.cylinder.rotation.z += 0.01;
        this.cylinder.rotation.y += 0.01;
    }
}

export { MyCylinder };
