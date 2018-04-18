//import three.js
const THREE = require('three')

//export stateless React component
export default function Root() {
    return null
}

//Setup:

//get the DOM element in which you want to attach the scene
const container = document.querySelector('#container')

//create a WebGL renderer
const renderer = new THREE.WebGLRenderer()

//set the attributes of the renderer
const WIDTH = window.innerWidth
const HEIGHT = window.innerHeight

//set the renderer size
renderer.setSize(WIDTH, HEIGHT)

//Adding a Camera

//set camera attributes
const VIEW_ANGLE = 45
const ASPECT = WIDTH / HEIGHT
const NEAR = 0.1
const FAR = 10000

//create a camera
const camera =
new THREE.PerspectiveCamera(
    VIEW_ANGLE,
    ASPECT,
    NEAR,
    FAR
)

//set the camera position - x, y, z
camera.position.set( 0, 0, 500 )

// Create a scene
const scene = new THREE.Scene()

// hexadecimal representation of color
const backgroundColor = 0x000

//set the scene background
scene.background = new THREE.Color( backgroundColor )

//add the camera to the scene.
scene.add(camera)

// Attach the renderer to the DOM element.
container.appendChild(renderer.domElement)

//Three.js uses geometric meshes to create primitive 3D shapes like spheres, cubes, etc. I’ll be using a sphere.

// Set up the sphere attributes
const RADIUS = 200
const SEGMENTS = 50
const RINGS = 50

//Create a group (which will later include our sphere and its texture meshed together)
const globe = new THREE.Group()
//add it to the scene
scene.add(globe)

//Let's create our globe using TextureLoader

// instantiate a loader
var loader = new THREE.TextureLoader()
loader.load( 'land_ocean_ice_cloud_2048.jpg', function ( texture ) {
    //create the sphere
    var sphere = new THREE.SphereGeometry( RADIUS, SEGMENTS, RINGS )

    //map the texture to the material. Read more about materials in three.js docs
    var material = new THREE.MeshBasicMaterial( { map: texture, overdraw: 0.5 } )

    //create a new mesh with sphere geometry. 
    var mesh = new THREE.Mesh( sphere, material )

    //add mesh to globe group
    globe.add(mesh)
} )

// Move the sphere back (z) so we can see it.
globe.position.z = -300

//Lighting

//create a point light (won't make a difference here because our material isn't affected by light)
const pointLight =
new THREE.PointLight(0xFFFFFF)

//set its position
pointLight.position.x = 10
pointLight.position.y = 50
pointLight.position.z = 400

//add light to the scene
scene.add(pointLight)

//Update

//set update function to transform the scene and view
function update () {
    //render
    renderer.render(scene, camera)

    //schedule the next frame.
    requestAnimationFrame(update)
}

//schedule the first frame.
requestAnimationFrame(update)

//Rotate on Mouse Move

//store our previous mouse move start value is at center
var lastMove = [window.innerWidth/2, window.innerHeight/2]

//callback function for mouse move event listener
function rotateOnMouseMove(e) {
    e = e || window.event

    //calculate difference between current and last mouse position
    const moveX = ( e.clientX - lastMove[0])
    const moveY = ( e.clientY - lastMove[1])

    //rotate the globe based on distance of mouse moves (x and y)
    globe.rotation.y += ( moveX * .005)
    globe.rotation.x += ( moveY * .005)

    //store new position in lastMove
    lastMove[0] = e.clientX
    lastMove[1] = e.clientY
}

//on mousemove, call rotateOnMouseMove
document.addEventListener('mousemove', rotateOnMouseMove)
