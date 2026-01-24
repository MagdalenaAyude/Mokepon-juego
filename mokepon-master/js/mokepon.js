
const botonReiniciar = document.getElementById('boton-reiniciar')
const pantallaMascota = document.getElementById("seleccionar-mascota")
const pantallaAtaque = document.getElementById("pantalla-ataque")
const botonMascota = document.getElementById("boton-mascota")
const mensajes = document.getElementById("mensajes")
const contenedorTarjetas = document.getElementById("contenedor-tarjetas")
const contenedorAtaques = document.getElementById("contenedor-ataques")
const spanMascotaJugador = document.getElementById("mascota-jugador")
const spanMascotaEnemigo = document.getElementById("mascota-enemigo")
botonReiniciar.addEventListener('click', reiniciarJuego)

let ataquesMokepon
let ataquesMokeponEnemigo
let mascotaJugador
let mokepones = []
let botones = []

let vidasJugador = 3
let vidasEnemigo = 3

pantallaMascota.style.display = "flex"
pantallaAtaque.style.display = "none"

class Mokepon {
  constructor(nombre, foto) {
    this.nombre = nombre
    this.foto = foto
    this.ataques = []
  }
}

let hipodoge = new Mokepon("Hipodoge", "./assets/hipodoge.png")
let capipepo = new Mokepon("Capipepo", "./assets/capipepo.png")
let ratigueya = new Mokepon("Ratigueya", "./assets/ratigueya.png")
let langostelvis = new Mokepon("Langostelvis", "./assets/langostelvis.png")
let tucapalma = new Mokepon("Tucapalma", "./assets/tucapalma.png")
let pydos = new Mokepon("Pydos", "./assets/pydosa.png")

hipodoge.ataques = [
  { nombre: "🔥" },
  { nombre: "🔥" },
  { nombre: "🔥" },
  { nombre: "💧" },
  { nombre: "🌱" }
]

capipepo.ataques = [...hipodoge.ataques]
ratigueya.ataques = [...hipodoge.ataques]
langostelvis.ataques = [...hipodoge.ataques]
tucapalma.ataques = [...hipodoge.ataques]
pydos.ataques = [...hipodoge.ataques]

mokepones.push(
  hipodoge,
  capipepo,
  ratigueya,
  langostelvis,
  tucapalma,
  pydos
)

function iniciarJuego() {
  contenedorTarjetas.innerHTML = ""

  mokepones.forEach((mokepon) => {
    contenedorTarjetas.innerHTML += `
      <input type="radio" name="mascota" id="${mokepon.nombre}">
      <label class="tarjeta-mokepon" for="${mokepon.nombre}">
        <img src="${mokepon.foto}">
        <p>${mokepon.nombre}</p>
      </label>
    `
  })

  botonMascota.addEventListener("click", seleccionarMascotaJugador)
}

function seleccionarMascotaJugador() {
  pantallaMascota.style.display = "none"
  pantallaAtaque.style.display = "flex"

  mokepones.forEach((mokepon) => {
    if (document.getElementById(mokepon.nombre).checked) {
      mascotaJugador = mokepon.nombre
      ataquesMokepon = mokepon.ataques
    }
  })

  if (!mascotaJugador) {
    alert("Seleccioná una mascota")
    return
  }

  spanMascotaJugador.innerHTML = mascotaJugador
  seleccionarMascotaEnemigo()
  mostrarAtaques()
}

function seleccionarMascotaEnemigo() {
  let aleatoria = aleatorio(0, mokepones.length - 1)
  spanMascotaEnemigo.innerHTML = mokepones[aleatoria].nombre
  ataquesMokeponEnemigo = mokepones[aleatoria].ataques
}

function mostrarAtaques() {
  contenedorAtaques.innerHTML = ""

  ataquesMokepon.forEach((ataque) => {
    contenedorAtaques.innerHTML += `
      <button class="boton-ataque">${ataque.nombre}</button>
    `
  })

  botones = document.querySelectorAll(".boton-ataque")
  secuenciaAtaque()
}

function secuenciaAtaque() {
  botones.forEach((boton) => {
    boton.addEventListener("click", () => {
      const ataqueJugador = boton.textContent
      const ataqueEnemigo =
        ataquesMokeponEnemigo[aleatorio(0, 4)].nombre

      boton.disabled = true
      // Borra los mensajes anteriores y muestra solo este ataque
      mensajes.innerHTML = ""
      crearMensaje(`Tu mascota atacó con ${ataqueJugador} | Enemigo atacó con ${ataqueEnemigo}`)
      
      resolverTurno(ataqueJugador, ataqueEnemigo)
    })
  })
}

function resolverTurno(jugador, enemigo) {
  if (jugador === enemigo) {
    crearMensaje("EMPATE 😐")
  } else {
    vidasEnemigo--
    actualizarCorazones("enemigo")
    crearMensaje("GANASTE 🥳")
  }

  if (vidasEnemigo === 0 || vidasJugador === 0 || todosBotonesUsados()) {
    terminarJuego()
  }
}

function todosBotonesUsados() {
  return Array.from(botones).every((b) => b.disabled)
}

function actualizarCorazones(quien) {
  const corazones = document.querySelectorAll(`#vidas-${quien} img`)
  corazones[corazones.length - 1]?.classList.add("perdido")
}

function crearMensaje(texto) {
  const p = document.createElement("p")
  p.classList.add("mensaje")
  p.textContent = texto
  mensajes.appendChild(p)
}

function crearMensajeFinal(texto) {
  mensajes.innerHTML = "" 
  const p = document.createElement("p")
  p.classList.add("mensaje-final")
  p.textContent = texto
  mensajes.appendChild(p)
}

function terminarJuego() {
  botones.forEach((boton) => (boton.disabled = true))
  document.getElementById("reiniciar").style.display = "block"

  if (vidasEnemigo === 0) {
    crearMensajeFinal(" 🥳 GANASTE, FELICITACIONES 🥳")
  } else {
    crearMensajeFinal("😣 PERDISTE , INTENTALO NUEVAMENTE 😣")
  }
}

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function reiniciarJuego() {
  location.reload()
}

window.addEventListener("load", iniciarJuego)












