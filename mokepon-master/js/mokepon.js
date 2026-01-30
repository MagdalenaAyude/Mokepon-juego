const sectionSeleccionarAtaque = document.getElementById('pantalla-ataque')
const botonReiniciar = document.getElementById('reiniciar')
const botonMascota = document.getElementById('boton-mascota')
const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const spanMascotaJugador = document.getElementById('mascota-jugador')
const spanMascotaEnemigo = document.getElementById('mascota-enemigo')
const sectionVerMapa = document.getElementById('ver-mapa')
const contenedorTarjetas = document.getElementById('contenedor-tarjetas')
const contenedorAtaques = document.getElementById('contenedor-ataques')
const mensajes = document.getElementById('mensajes')
const canvas = document.getElementById('mapa')
const lienzo = canvas.getContext('2d')
const backgroundMapa = new Image()
backgroundMapa.src = './assets/Mapa.png'


canvas.width = 900
canvas.height = 600

let corazonesJugador
let corazonesEnemigo
let vidasJugador = 3
let vidasEnemigo = 3

let juegoTerminado = false
let ataques =[]
let ataqueMokeponJugador =[]
let ataquesMokeponEnemigo=[]
let botones = []
let mokeponEnemigos = []
let enemigo = null
let mascotaJugadorObjeto = null
let mokepones = []
let mokeponElegido
let enemigos = []
let intervalo
let resolverturno


class Mokepon {
    constructor(nombre, foto, vida) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.x = 0
        this.y = 0
        this.velocidadX = 0
        this.velocidadY = 0
        this.ancho = 40
        this.alto = 40
        this.imagen = new Image()
        this.imagen.src = foto
    }
}
let hipodoge = new Mokepon('Hipodoge', './assets/hipodoge.png', 5)
let capipepo = new Mokepon('Capipepo', './assets/capipepo.png', 5)
let ratigueya = new Mokepon('Ratigueya', './assets/ratigueya.png', 5)
let langostelvis = new Mokepon('Langostelvis', './assets/langostelvis.png', 5)
let tucapalma = new Mokepon('Tucapalma', './assets/tucapalma.png', 5)
let pydos = new Mokepon('Pydos', './assets/pydosa.png', 5)

mokepones.push(hipodoge, capipepo, ratigueya, langostelvis, tucapalma, pydos)

hipodoge.ataques = [
  { nombre: '🔥', class: 'boton-fuego' },
  { nombre: '🔥', class: 'boton-fuego' },
  { nombre: '🔥', class: 'boton-fuego' },
  { nombre: '💧', class: 'boton-agua' },
  { nombre: '🌱', class: 'boton-tierra' }
]

capipepo.ataques = [
  { nombre: '🔥', class: 'boton-fuego' },
  { nombre: '🔥', class: 'boton-fuego' },
  { nombre: '🔥', class: 'boton-fuego' },
  { nombre: '💧', class: 'boton-agua' },
  { nombre: '🌱', class: 'boton-tierra' }
]

ratigueya.ataques = [
  { nombre: '💧', class: 'boton-agua' },
  { nombre: '💧', class: 'boton-agua'},
  { nombre: '💧', class: 'boton-agua'},
  { nombre: '🔥', class: 'boton-fuego' },
  { nombre: '🌱', class: 'boton-tierra'}
]

langostelvis.ataques = [
  { nombre: '💧', class: 'boton-agua'},
  { nombre: '💧', class: 'boton-agua' },
  { nombre: '💧', class: 'boton-agua' },
  { nombre: '🔥', class: 'boton-fuego' },
  { nombre: '🌱', class: 'boton-tierra'}
]

tucapalma.ataques = [
  { nombre: '🌱', class: 'boton-tierra' },
  { nombre: '🌱', class: 'boton-tierra' },
  { nombre: '🌱', class: 'boton-tierra' },
  { nombre: '🔥', class: 'boton-fuego' },
  { nombre: '💧', class: 'boton-agua' }
]

pydos.ataques = [
  { nombre: '🌱', class: 'boton-tierra' },
  { nombre: '🌱', class: 'boton-tierra' },
  { nombre: '🌱', class: 'boton-tierra' },
  { nombre: '💧', class: 'boton-agua' },
  { nombre: '🔥', class: 'boton-fuego' }
]
function iniciarJuego() {
    sectionSeleccionarAtaque.style.display = 'none'
    sectionVerMapa.style.display = 'none'
    contenedorTarjetas.innerHTML = ''

    mokepones.forEach((mokepon) => {
        const opcion = `
            <input type="radio" name="mascota" id="${mokepon.nombre}" />
            <label class="tarjeta-mokepon" for="${mokepon.nombre}">
                <p>${mokepon.nombre}</p>
                <img src="${mokepon.foto}" alt="${mokepon.nombre}">
            </label>
        `
        contenedorTarjetas.innerHTML += opcion
    })
        botonMascota.addEventListener('click', seleccionarMascotaJugador)
        botonReiniciar.addEventListener('click', reiniciarJuego)
}
function seleccionarMascotaJugador() {
    mokeponElegido = mokepones.find(m => document.getElementById(m.nombre).checked)

    if (!mokeponElegido) {
        alert("Seleccioná una mascota")
        return
    }
    mascotaJugadorObjeto = mokeponElegido
    mokeponElegido.imagen = new Image()
    mokeponElegido.imagen.src = mokeponElegido.foto
    


    spanMascotaJugador.innerHTML = mokeponElegido.nombre
    sectionSeleccionarMascota.style.display = 'none'
    sectionVerMapa.style.display = 'flex'

    crearEnemigos()
    iniciarMapa()
}
function crearEnemigos() {
    mokepones.forEach(mokepon => {
        if (mokepon !== mascotaJugadorObjeto) {
            mokepon.imagen = new Image()
            mokepon.imagen.src = mokepon.foto

            mokepon.x = Math.random() * (canvas.width - 50)
            mokepon.y = Math.random() * (canvas.height - 50)

            enemigos.push(mokepon)
        }
    })
}
function iniciarMapa() {
    mascotaJugadorObjeto.x = 30
    mascotaJugadorObjeto.y = 30

    intervalo = setInterval(pintarCanvas, 50)
   
}
function pintarCanvas() {
    lienzo.clearRect(0, 0, canvas.width, canvas.height)
    lienzo.drawImage(backgroundMapa, 0, 0, canvas.width, canvas.height)

    mascotaJugadorObjeto.x += mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y += mascotaJugadorObjeto.velocidadY

    limitarMovimiento()

   lienzo.drawImage(
        mascotaJugadorObjeto.imagen,
        mascotaJugadorObjeto.x,
        mascotaJugadorObjeto.y,
        mascotaJugadorObjeto.ancho,
        mascotaJugadorObjeto.alto
    )

    enemigos.forEach(enemigo => {
        lienzo.drawImage(
            enemigo.imagen,
            enemigo.x,
            enemigo.y,
            enemigo.ancho,
            enemigo.alto
        )
        revisarColision(enemigo)
    
    })
}
function revisarColision(enemigo) {
    const arribaJugador = mascotaJugadorObjeto.y
    const abajoJugador = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const izquierdaJugador = mascotaJugadorObjeto.x
    const derechaJugador = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho

    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const izquierdaEnemigo = enemigo.x
    const derechaEnemigo = enemigo.x + enemigo.ancho

    if (
        abajoJugador < arribaEnemigo ||
        arribaJugador > abajoEnemigo ||
        derechaJugador < izquierdaEnemigo ||
        izquierdaJugador > derechaEnemigo
    ) {
        return
    }
    clearInterval(intervalo)
    sectionVerMapa.style.display = 'none'
    sectionSeleccionarAtaque.style.display = 'flex'
  
    rival = enemigo
    seleccionarMascotaEnemigo(enemigo)
   
}
function moverMascota(event) {
    switch(event.key) {
        case "ArrowUp":
            mascotaJugadorObjeto.velocidadY = -5
            break
        case "ArrowDown":
            mascotaJugadorObjeto.velocidadY = 5
            break
        case "ArrowLeft":
            mascotaJugadorObjeto.velocidadX = -5
            break
        case "ArrowRight":
            mascotaJugadorObjeto.velocidadX = 5
            break 
        }
    }
        window.addEventListener("keydown", moverMascota)
        window.addEventListener("keyup", detenerMascota)

function detenerMascota(event) {
    switch(event.key) {
        case "ArrowUp":
        case "ArrowDown":
            mascotaJugadorObjeto.velocidadY = 0
            break
        case "ArrowLeft":
        case "ArrowRight":
            mascotaJugadorObjeto.velocidadX = 0
            break
    }
}
function limitarMovimiento() {
    if (mascotaJugadorObjeto.x < 0) mascotaJugadorObjeto.x = 0
    if (mascotaJugadorObjeto.y < 0) mascotaJugadorObjeto.y = 0
    if (mascotaJugadorObjeto.x > canvas.width - mascotaJugadorObjeto.ancho)
        mascotaJugadorObjeto.x = canvas.width - mascotaJugadorObjeto.ancho
    if (mascotaJugadorObjeto.y > canvas.height - mascotaJugadorObjeto.alto)
        mascotaJugadorObjeto.y = canvas.height - mascotaJugadorObjeto.alto
}


function revisarColision(enemigo) {
    const arribaJugador = mascotaJugadorObjeto.y
    const abajoJugador = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const izquierdaJugador = mascotaJugadorObjeto.x
    const derechaJugador = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const izquierdaEnemigo = enemigo.x
    const derechaEnemigo = enemigo.x + enemigo.ancho

    if (
        abajoJugador < arribaEnemigo ||
        arribaJugador > abajoEnemigo ||
        derechaJugador < izquierdaEnemigo ||
        izquierdaJugador > derechaEnemigo
    ) {
        return
    }
    clearInterval(intervalo)
    sectionVerMapa.style.display = 'none'

    
    seleccionarMascotaEnemigo(enemigo)
}
function seleccionarMascotaEnemigo(enemigo) {
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques
    sectionSeleccionarAtaque.style.display = 'flex'
    mostrarAtaques(mascotaJugadorObjeto)
}
function mostrarAtaques(mokepon) {
    contenedorAtaques.innerHTML = '' 
    botones = [] 

    mokepon.ataques.forEach(ataque => {
        const boton = document.createElement('button')
        boton.innerText = ataque.nombre
        boton.className = ataque.class

        boton.addEventListener('click', () => {
            ataqueMokeponJugador.push(ataque.nombre)
            boton.disabled = true 

       
            ataqueAleatorioEnemigo() 
        })

        contenedorAtaques.appendChild(boton)
        botones.push(boton)
    })
}
function ataqueAleatorioEnemigo() {
    const ataque =
        ataquesMokeponEnemigo[
            Math.floor(Math.random() * ataquesMokeponEnemigo.length)
        ]
          mostrarMensajeTurno(
            
          
          ataqueMokeponJugador[ataqueMokeponJugador.length - 1],
          ataque.nombre
          )
          
}
function mostrarMensajeTurno(jugador, enemigo) {
    mensajes.innerHTML = ''  

    const mensajeJugador = document.createElement('p')
    mensajeJugador.classList.add('mensaje-jugador')
    mensajeJugador.innerText = `Tu jugador atacó con ${jugador}`

    const mensajeEnemigo = document.createElement('p')
    mensajeEnemigo.classList.add('mensaje-enemigo')
    mensajeEnemigo.innerText = `Tu enemigo atacó con ${enemigo}`

    const mensajeResultado = document.createElement('p')
    mensajeResultado.classList.add('mensaje-turno')

    if (jugador === enemigo) {
        mensajeResultado.innerText = '🤝 EMPATE'
    } 
    else if (
        (jugador === '🔥' && enemigo === '🌱') ||
        (jugador === '💧' && enemigo === '🔥') ||
        (jugador === '🌱' && enemigo === '💧')
    ) {
        mensajeResultado.innerText = '🏆 GANASTE ESTE TURNO'
        vidasEnemigo--
        actualizarVidasEnemigo()
    } 
    else {
        mensajeResultado.innerText = '💀 PERDISTE ESTE TURNO'
        vidasJugador--
        actualizarVidasJugador()
    }
      mensajes.appendChild(mensajeJugador)
      mensajes.appendChild(mensajeEnemigo)
      mensajes.appendChild(mensajeResultado)

     if (ataqueMokeponJugador.length === 5) {
        setTimeout(resolverTurno, 500)
    }
}
function actualizarVidasJugador() {
  const corazones = document.querySelectorAll("#vidas-jugador img")
  corazones[vidasJugador]?.classList.add("perdido")
}
function actualizarVidasEnemigo() {
  const corazones = document.querySelectorAll("#vidas-enemigo img")
  corazones[vidasEnemigo]?.classList.add("perdido")
}
function resolverTurno() {
    mensajes.innerHTML = ''

    if (vidasJugador > vidasEnemigo) {
        mensajes.innerHTML = '<p>🏆 FELICITACIONES! DERROTASTE AL ENEMIGO 🔥</p>'
    } 
    else if (vidasJugador < vidasEnemigo) {
        mensajes.innerHTML = '<p>💀 GAME OVER — TU MOKEPON FUE DERROTADO 💔</p>'
    } 
   botones.forEach(boton => boton.disabled = true)

    botonReiniciar.style.display = 'block'
    }
function reiniciarJuego() {
    location.reload()

}
window.addEventListener('load', iniciarJuego)


