
const container = document.querySelector('#container')
const scene = new THREE.Scene()
scene.background = new THREE.Color( 0x333F47, 1 )
const WIDTH = window.innerWidth
const HEIGHT = window.innerHeight
const FOV= 45
const ASPECT = WIDTH / HEIGHT
const NEAR = 0.1
const FAR = 10000
const camera = new THREE.PerspectiveCamera(FOV, ASPECT, NEAR, FAR)
camera.position.set( 0, 0, 500 )
scene.add(camera)
const renderer = new THREE.WebGLRenderer()
renderer.setSize(WIDTH, HEIGHT)
container.appendChild(renderer.domElement)
const RADIUS = 200
const SEGMENTS = 50
const RINGS = 50
const globe = new THREE.Group()
scene.add(globe)
var loader = new THREE.TextureLoader()
loader.load('https://kittentoob.com/wp-content/uploads/2018/01/A-fluffy-cat-looking-funny-surprised-or-concerned.jpg', function ( texture ) {
    //create the sphere
    var sphere = new THREE.SphereGeometry( RADIUS, SEGMENTS, RINGS )

    //map the texture to the material. Read more about materials in three.js docs
    var material = new THREE.MeshBasicMaterial( { map: texture, overdraw: 0.5 } )

    //create a new mesh with sphere geometry.
    var mesh = new THREE.Mesh( sphere, material )

    //add mesh to globe group
    globe.add(mesh)
} )
globe.position.z = -300
const pointLight = new THREE.PointLight(0xFFFFFF)
pointLight.position.x = 10
pointLight.position.y = 50
pointLight.position.z = 400

function update () {

  //Render:
  renderer.render(scene, camera)

  // Schedule the next frame:
  requestAnimationFrame(update)
}

// Schedule the first frame:
requestAnimationFrame(update)
var lastMove = [window.innerWidth/2, window.innerHeight/2]
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
document.addEventListener('mousemove', rotateOnMouseMove)
