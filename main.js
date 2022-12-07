var camera, scene, renderer, meshes = [], materials = [], geometries = [];
const mouse = new THREE.Vector2();
const target = new THREE.Vector2();

// read data_TV.csv into array 
let tv_data = [];

d3.csv("data_TV.csv").then(function (data) {
    for (var i = 0; i < data.length; i++) {
        let show_data = {};
        show_data['Name'] = data[i].name;
        show_data['Popularity'] = data[i].popularity;
        tv_data.push(show_data);
    }
});

init();

function init() {
    // Renderer.
    renderer = new THREE.WebGLRenderer();
    // renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth - 100, window.innerHeight - 100);
    // Add renderer to page
    document.body.appendChild(renderer.domElement);

    // Create scene.
    scene = new THREE.Scene();

    // Create camera.
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(0, 0, 600);
    scene.add(camera);

    // Create materials
    var mat = new THREE.MeshPhongMaterial({ color: 0xff6208 });   // material 1
    materials.push(mat);
    mat = new THREE.MeshPhongMaterial({ color: 0xc9c42e });       // material 2
    materials.push(mat);
    mat = new THREE.MeshPhongMaterial({ color: 0x3424bf });       // material 3
    materials.push(mat);
    mat = new THREE.MeshPhongMaterial({ color: 0xff010 });       // material 4
    materials.push(mat);
    mat = new THREE.MeshPhongMaterial({ color: 0x700099 });       // material 5
    materials.push(mat)

    // Create geometry obejcts
    var geometry = new THREE.BoxGeometry(100, 100, 100);    // geometry object 1
    geometries.push(geometry);
    geometry = new THREE.BoxGeometry(100, 100, 100);        // geometry object 2
    geometries.push(geometry);
    geometry = new THREE.BoxGeometry(100, 100, 100);        // geometry object 3
    geometries.push(geometry);
    geometry = new THREE.BoxGeometry(100, 100, 100);        // geometry object 4
    geometries.push(geometry);
    geometry = new THREE.BoxGeometry(100, 100, 100);        // geometry object 5
    geometries.push(geometry)

    // Add objects to scene
    for (var i = 0; i < 5; i++) {
        mesh = new THREE.Mesh(geometries[i], materials[i]);
        mesh.position.set((200 * i) - 300, -450, 0);
        scene.add(mesh);
        meshes.push(mesh);
    }

    // Create lights and add to scene
    var ambientLight = new THREE.AmbientLight(0x404040);                        // ambient light
    scene.add(ambientLight);
    var directionalLight = new THREE.DirectionalLight(0xffffff, 1.25);          // directional light 1
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);
    directionalLight = new THREE.DirectionalLight(0xf7bd52, 0.75);              // directional light 2
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);
    var hemisphereLight = new THREE.HemisphereLight(0x95ebf0, 0xed9118, 0.5);   // hemisphere light
    scene.add(hemisphereLight);

    // Add ground (plane geometry object)
    var geometry = new THREE.PlaneGeometry(2000, 2000, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x089c1e });
    var ground = new THREE.Mesh(geometry, material);
    ground.material.side = THREE.DoubleSide;
    ground.rotation.x = 1.5708;
    ground.position.set(0, -500, 0)
    scene.add(ground);

    // Add background (plane geometry object)
    var material = new THREE.MeshBasicMaterial({color: 0x87CEEB, side: THREE.DoubleSide});
    geometry = new THREE.SphereGeometry(2000, 2000, 2000);
    const sky = new THREE.Mesh(geometry, material);
    scene.add(sky);

    // Add listener for window resize.
    window.addEventListener('resize', onWindowResize, false);

    // Add listener for keyboard
    document.body.addEventListener('keydown', onkeyPressed, false);

    //document.addEventListener for mouse zoom;
    document.addEventListener('wheel', onMouseWheel, false);

    render();
}

function onMouseWheel(e) {
    camera.position.z += e.deltaY * 0.2;
}

function onkeyPressed(e) {
    switch (e.key) {
        case 'ArrowUp':
            camera.rotateX(0.1);
            break;
        case 'ArrowDown':
            camera.rotateX(-0.1);
            break;
        case 'ArrowLeft':
            camera.rotateY(0.1);
            break;
        case 'ArrowRight':
            camera.rotateY(-0.1);
            break;
        case 'w':
            camera.position.z -= 10;
            break;
        case 's':
            camera.position.z += 10;
            break;
        case 'a':
            camera.position.x -= 10;
            break;
        case 'd':
            camera.position.x += 10;
            break;
    }
    e.preventDefault();
    render();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
}

function render() {
    renderer.render(scene, camera);
}
