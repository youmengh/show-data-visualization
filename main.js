let camera, scene, renderer;
let index = 0;
var showDescriptions = document.createElement('div');

// link data_TV.csv with D3
d3.csv("data_TV.csv").then(function (data) {
    init();

    function init() {
        alert(`3D Bar Graph of the Top 50 Most Popular Shows in the World.
        Press OK to Begin`);
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
        camera.position.set(0, 500, 1000);
        scene.add(camera);

        // Add objects to scene
        for (let i = 0; i < data.length; i++) {
            let pop = data[i].popularity;   // storing popularity value
            mesh = new THREE.Mesh(new THREE.BoxGeometry(100, pop, 100), new THREE.MeshPhongMaterial({ color: 0xff0000 }));
            mesh.position.set((200 * i), pop / 2, 0);
            scene.add(mesh);
        }
        // Add base (plane geometry object)
        let baseLength = (data.length * 200);
        let geometry = new THREE.PlaneGeometry((baseLength + 200), 1000, 1, 1);
        let material = new THREE.MeshBasicMaterial({ color: 0x808080 });
        let ground = new THREE.Mesh(geometry, material);
        ground.material.side = THREE.DoubleSide;
        ground.rotation.x = 1.5708;
        ground.position.set((baseLength / 2) - 100, 0, 0)
        scene.add(ground);

        // Create lights and add to scene
        let ambientLight = new THREE.AmbientLight(0x404040);                        // ambient light
        scene.add(ambientLight);
        let directionalLight = new THREE.DirectionalLight(0xffffff, 1.25);          // directional light 1
        directionalLight.position.set(1, 1, 1).normalize();
        scene.add(directionalLight);
        directionalLight = new THREE.DirectionalLight(0xf7bd52, 0.75);              // directional light 2
        directionalLight.position.set(1, 1, 1).normalize();
        scene.add(directionalLight);
        let hemisphereLight = new THREE.HemisphereLight(0x95ebf0, 0xed9118, 0.5);   // hemisphere light
        scene.add(hemisphereLight);

        // construct descriptions of first show
        constructDes(data[0].name, data[0].first_air_date, data[0].popularity);

        // Add listener for window resize.
        window.addEventListener('resize', onWindowResize, false);

        // Add listener for keyboard
        document.body.addEventListener('keydown', onkeyPressed, false);

        render();
    }
    function onkeyPressed(e) {
        switch (e.key) {
            case 'ArrowUp':
                camera.position.z -= 100;
                break;
            case 'ArrowDown':
                camera.position.z += 100;
                break;
            case 'ArrowLeft':
                if (index > 0) {
                    camera.position.x -= 200;
                    index -= 1;
                    constructDes(data[index].name, data[index].first_air_date, data[index].popularity);
                    break;
                } else {
                    break;
                }
            case 'ArrowRight':
                if (index < (data.length - 1)) {
                    camera.position.x += 200;
                    index += 1;
                    constructDes(data[index].name, data[index].first_air_date, data[index].popularity);
                    break;
                } else {
                    break;
                }
            case 'w':
                camera.position.z -= 100;
                break;
            case 's':
                camera.position.z += 100;
                break;
            case 'a':
                if (index > 0) {
                    camera.position.x -= 200;
                    index -= 1;
                    constructDes(data[index].name, data[index].first_air_date, data[index].popularity);
                    break;
                } else {
                    break;
                }
            case 'd':
                if (index < (data.length - 1)) {
                    camera.position.x += 200;
                    index += 1;
                    constructDes(data[index].name, data[index].first_air_date, data[index].popularity);
                    break;
                } else {
                    break;
                }
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

    // Add show descriptions
    function constructDes(showName, airDate, popValue) {
        showDescriptions.style.position = 'absolute';
        // showDescriptions.style.zIndex = 1;    // if label still missing, try uncommenting this
        showDescriptions.style.width = 100;
        showDescriptions.style.height = 100;
        showDescriptions.style.backgroundColor = "blue";
        showDescriptions.style.backgroundColor = "gray";
        showDescriptions.style.color = "white";
        showDescriptions.innerHTML = "<p>Show Name: " + showName + "</p>"
            + "<p>First Air Date: " + airDate + "</p>"
            + "<p>Popularity: " + popValue + "</p>";
        showDescriptions.style.top = 800 + 'px';
        showDescriptions.style.left = 850 + 'px';
        document.body.appendChild(showDescriptions);
    }

});
