// Barras de salud
let maxSaludJugadorPrimero = 0;
let barSaludJugadorPrimero = 0;
let maxSaludRivalPrimero = 0;
let barSaludRivalPrimero = 0;
// Pokémon
let pokeJugadorPrimero = "";
let pokeRivalPrimero = "";
// Ataques
let ataqueJugadorPrimero = "";
let ataqueJugadorSegundo = "";
let ataqueRivalPrimero = "";
let ataqueRivalSegundo = "";
let ataquesJugador = ["Arañazo", "Ascuas"];
let ataquesRival = ["Placaje", "Hoja Afilada"];
let ataqueJugadorElegido="";
//Tipos de Pokés
let tiposGlobal = ["Planta", "Fuego", "Normal"];
let tipoJugadorPrimero = "";
let tipoRivalPrimero = "";
//Daño y tipos de ataque
let dañoAtaqueJugador = 0;
let tipoAtaqueJugador = "";
let dañoAtaqueRival = 0;
let tipoAtaqueRival = "";
//Sprites de Pokes
let imgpkjugador;
let imgpkrival;
//Otras variables importantes
let ventajaJugador = "";
let ventajaRival = "";
let turnoJugador = 1;
let turnoActual = turnoJugador;
const contMensaje = document.getElementById("contmensajes");
const botonAtaque = document.querySelectorAll(
  "#ataqueprimerobtn, #ataquesegundobtn"
);

// let turnoRivalOn = "";
// let turnoIntermedio = true;
// let mensajeBlocked = "";

//ENTORNO JUEGO:

pokeRivalPrimero = "Chikorita";
pokeJugadorPrimero = "Cyndaquil";
console.log("--------------------------------------------------------------");
console.log("--SET DEL RIVAL--");

//MOSTRAR MENSAJE POR DEFECTO
// function queDeseasHacer() {

// }
// queDeseasHacer();

// function comprobacionDeTurno() {
//   if (turnoIntermedio !== true) {
//     if (turnoJugadorOn === true) {
//       turnoRivalOn = false;
//     } else {
//       turnoRivalOn = true;
//     }
//   } else {
//     turnoJugadorOn = false;
//     turnoRivalOn = false;
//   }
// }

// function desbloquearMensaje() {
//   if(turnoIntermedio===true){
//   queDeseasHacer();
//   if(barSaludRivalPrimero>0){
//     turnoIntermedio = false;
//     comprobacionDeTurno();
//     ataqueRival();
//   } else {
//     turnoIntermedio = false;
//     mensajes = document.getElementById("mensajes");
//       mensajes.innerHTML =
//       "¡" + pokeRivalPrimero + " se debilitó!";
//       console.log("¡" + pokeRivalPrimero + " se debilitó!");
//   }
//   } else if (turnoIntermedio===true && turnoJugadorOn===true) {
//     queDeseasHacer();
//   }

// }

// function comprobarBloqueoMsj(){
//   if (mensajeBlocked===true) {
//     mensajeBlocked=false;
//   } else {
//     mensajeBlocked=true;
//   }
// }

//SET DEL RIVAL: ---------------------------------------------------------------------------------------------------------------------------------------
console.log("Pokémon del rival: " + pokeRivalPrimero);
if (pokeRivalPrimero === "Chikorita") {
  // SE ESTABLECE LA BARRA DE SALUD RIVAL
  maxSaludRivalPrimero = 50;
  barSaludRivalPrimero = 50;
  console.log("Barra de Salud del Rival: " + barSaludRivalPrimero);
  // SE ESTABLECE LA IMAGEN DEL POKE RIVAL
  imgpkrival = document.getElementById("imgpkrival");
  imgpkrival.setAttribute("src", "./img/chikorita_sprite.png");
  // console.log(imgpkrival.src);
  // SE ESTABLECE EL NOMBRE DEL POKE RIVAL
  nombrepkrival = document.getElementById("nombrepkrival");
  nombrepkrival.innerHTML = pokeRivalPrimero;
  // SE MUESTRA ESCRITA LA BARRA DE SALUD RIVAL
  litsaludrival = document.getElementById("litsaludrival");
  litsaludrival.innerText = barSaludRivalPrimero + " / " + maxSaludRivalPrimero;
  // SE ESTABLECE EL TIPO DE POKE RIVAL
  tipoRivalPrimero = tiposGlobal[0];
  console.log("El tipo del rival es: " + tipoRivalPrimero);
  // SE ESTABLECE LOS ATAQUES DEL POKE RIVAL
  ataqueRivalPrimero = ataquesRival[0];
  ataqueRivalSegundo = ataquesRival[1];
  console.log(ataqueRivalPrimero);
  actualizarBarraSaludRival();
}
//FUNCIÓN PARA ACTUALIZAR BARRA DE SALUD RIVAL
function actualizarBarraSaludRival() {
  if (barSaludRivalPrimero > 0) {
    barraSaludRival = document.getElementById("barraSaludRival");
    porcentajeRival = (barSaludRivalPrimero / maxSaludRivalPrimero) * 100;
    barraSaludRival.style.width = `${porcentajeRival}%`;
    litsaludrival = document.getElementById("litsaludrival");
    litsaludrival.innerText =
      barSaludRivalPrimero + " / " + maxSaludRivalPrimero;
  } else if (barSaludRivalPrimero === 0) {
    barraSaludRival = document.getElementById("barraSaludRival");
    porcentajeRival = (barSaludRivalPrimero / maxSaludRivalPrimero) * 0;
    barraSaludRival.style.width = `${porcentajeRival}%`;
    litsaludrival = document.getElementById("litsaludrival");
    litsaludrival.innerText =
      barSaludRivalPrimero + " / " + maxSaludRivalPrimero;
  }
}

//FUNCIÓN PARA REDUCIR SALUD RIVAL
function reducirSaludRival(cantidad) {
  if (tipoAtaqueJugador !== tipoJugadorPrimero) {
    //Comprobando si el ataque del jugador NO es del mismo tipo que el jugador
    comprobarVentajaJugador(); //Comprobando si hay ventaja
    //Acciones según ventaja
    if (ventajaJugador === true) {
      //EN CASO HAYA VENTAJA...
      console.log("¡Es super efectivo!");
      barSaludRivalPrimero = Math.max(0, barSaludRivalPrimero - cantidad * 2);
      // Asegurarse de que no baje de 0
      actualizarBarraSaludRival();
      console.log("La salud del rival es: " + barSaludRivalPrimero);
      ventajaJugador = "";
    } else {
      //SI NO HAY VENTAJA...
      barSaludRivalPrimero = Math.max(0, barSaludRivalPrimero - cantidad);
      // Asegurarse de que no baje de 0
      actualizarBarraSaludRival();
      console.log("La salud del rival es: " + barSaludRivalPrimero);
      ventajaJugador = "";
    }
  } else if (tipoAtaqueJugador === tipoJugadorPrimero) {
    //Comprobando si el ataque del jugador SI es del mismo tipo que el jugador
    comprobarVentajaJugador(); //Comprobando si hay ventaja
    //Acciones según ventaja
    if (ventajaJugador === true) {
      //EN CASO HAYA VENTAJA...
      console.log("¡Es super efectivo!");
      barSaludRivalPrimero = Math.max(
        0,
        barSaludRivalPrimero - cantidad * 1.5 * 2
      );
      redondeadoRival = Math.round(barSaludRivalPrimero);
      barSaludRivalPrimero = redondeadoRival;
      // Asegurarse de que no baje de 0
      actualizarBarraSaludRival();
      console.log("La salud del rival es: " + barSaludRivalPrimero);
      ventajaJugador = "";
    } else {
      //SI NO HAY VENTAJA...
      barSaludRivalPrimero = Math.max(0, barSaludRivalPrimero - cantidad * 1.5);
      redondeadoRival = Math.round(barSaludRivalPrimero);
      barSaludRivalPrimero = redondeadoRival;
      // Asegurarse de que no baje de 0
      actualizarBarraSaludRival();
      console.log("La salud del rival es: " + barSaludRivalPrimero);
      ventajaJugador = "";
    }
  }
}

//FUNCIÓN PARA QUE ACCIONE EL ATAQUE EL RIVAL
function ataqueRival() {
  // if (turnoRivalOn === true) {
  if (barSaludRivalPrimero > 0) {
    let ataqueAleatorio = obtenerAtaqueAleatorioRival();
    ataqueAleatorio();
    console.log("La salud del jugador es: " + barSaludJugadorPrimero);
    turnoRivalOn = false;
    turnoJugadorOn = true;
  } else {
    console.log("¡" + pokeRivalPrimero + " se debilitó!");
  }
  // }
}

//FUNCION PARA ACTIVAR ATAQUE1 DEL RIVAL
function activarAtaqueRivalPrimero() {
  if (ataqueRivalPrimero === ataquesRival[0]) {
    placajeRival();
    mensajes = document.getElementById("mensajes");
    mensajes.innerHTML =
      "¡" + pokeRivalPrimero + " usó " + ataquesRival[0] + "!";
    turnoIntermedio = true;
    // comprobacionDeTurno();
  }
}

//FUNCION PARA ACTIVAR ATAQUE2 DEL RIVAL
function activarAtaqueRivalSegundo() {
  if (ataqueRivalSegundo === ataquesRival[1]) {
    hojaAfiladaRival();
    mensajes = document.getElementById("mensajes");
    mensajes.innerHTML =
      "¡" + pokeRivalPrimero + " usó " + ataquesRival[1] + "!";
    turnoIntermedio = true;
    // comprobacionDeTurno();
  }
}

//FUNCIONES DE ATAQUES INDIVIDUALES DEL RIVAL
//ACTIVA ATAQUE PLACAJE DEL RIVAL
function placajeRival() {
  tipoAtaqueRival = tiposGlobal[3];
  reducirSaludJugador(6);
  actualizarBarraSaludJugador();
  console.log("¡" + pokeRivalPrimero + " usó " + ataquesRival[0] + "!");
}

//ACTIVA ATAQUE HOJA AFILADA DEL RIVAL
function hojaAfiladaRival() {
  tipoAtaqueRival = tiposGlobal[0];
  reducirSaludJugador(3);
  actualizarBarraSaludJugador();
  console.log("¡" + pokeRivalPrimero + " usó " + ataquesRival[1] + "!");
}

//OBTENER UN ATAQUE ALEATORIO EL RIVAL
let funcionesDeAtaques = [activarAtaqueRivalPrimero, activarAtaqueRivalSegundo];
function obtenerAtaqueAleatorioRival() {
  let indiceAleatorio = Math.floor(Math.random() * funcionesDeAtaques.length);
  return funcionesDeAtaques[indiceAleatorio];
}
//LLAMAR LA FUNCIÓN DE ATAQUE ALEATORIO DEL RIVAL

console.log("-------------------------------------------------------------");
console.log("--SET DEL JUGADOR--");
console.log("Pokémon del jugador: " + pokeJugadorPrimero);

//SET DEL JUGADOR:---------------------------------------------------------------------------------------------------------------------------------------
if (pokeJugadorPrimero === "Cyndaquil") {
  // SE ESTABLECE LA BARRA DE SALUD JUGADOR
  maxSaludJugadorPrimero = 65;
  barSaludJugadorPrimero = 65;
  console.log("Barra de Salud del Jugador: " + barSaludJugadorPrimero);
  // SE ESTABLECE LA IMAGEN DEL POKE JUGADOR
  imgpkjugador = document.getElementById("imgpkjugador");
  imgpkjugador.setAttribute("src", "./img/cyndaquil_back_sprite.png");
  // SE ESTABLECE EL NOMBRE DEL POKE JUGADOR
  nombrepkjugador = document.getElementById("nombrepkjugador");
  nombrepkjugador.innerHTML = pokeJugadorPrimero;
  // SE MUESTRA ESCRITA LA BARRA DE SALUD JUGADOR
  litsaludjugador = document.getElementById("litsaludjugador");
  litsaludjugador.innerText =
    barSaludJugadorPrimero + " / " + maxSaludJugadorPrimero;
  // SE ESTABLECE EL TIPO DE POKE JUGADOR
  tipoJugadorPrimero = tiposGlobal[1];
  console.log("El tipo del jugador es: " + tipoJugadorPrimero);
  // SE ESTABLECE LOS ATAQUES DEL POKE JUGADOR
  ataqueJugadorPrimero = ataquesJugador[0];
  ataqueJugadorSegundo = ataquesJugador[1];
  actualizarBarraSaludJugador();
}
console.log(ataqueJugadorPrimero);
console.log(ataqueJugadorSegundo);
console.log("-------------------------------------------------------------");

//FUNCIONES DE ACTIVACIÓN DE ATAQUES-------------------------------------------------------------

//ESTABLECE EL ATAQUE1 DEL JUGADOR EN UN BOTÓN (ESCRITO)
if (ataqueJugadorPrimero === ataquesJugador[0]) {
  ataqueprimerobtn = document.getElementById("ataqueprimerobtn");
  ataqueprimerobtn.innerHTML = ataquesJugador[0];
}
//ESTABLECE EL ATAQUE2 DEL JUGADOR EN UN BOTÓN (ESCRITO)
if (ataqueJugadorSegundo === ataquesJugador[1]) {
  ataquesegundobtn = document.getElementById("ataquesegundobtn");
  ataquesegundobtn.innerHTML = ataquesJugador[1];
}

//ACCIONA EL ATAQUE 1 DEL JUGADOR DESDE EL BOTON

botonAtaque[0].addEventListener("click", () => {
  if(turnoActual===1){
  ataqueJugador1();
  }else{
    ataqueRival();
  } 
});

//ACTIVA EL ATAQUE 1 DEL JUGADOR
function ataqueJugador1() {
// if (turnoJugadorOn === true) {
if (barSaludRivalPrimero > 0) {
  if (ataqueJugadorPrimero === ataquesJugador[0]) {
    ataqueJugadorElegido= ataqueJugadorPrimero;
    aranazoJugador();
    // turnoJugadorOn = false;
    // turnoIntermedio = true;
    // comprobacionDeTurno();
  }
} else {
  console.log("¡" + pokeRivalPrimero + " se debilitó!");
}
// }
}



//ACCIONA EL SIGUIENTE TURNO (ATAQUE DEL JUGADOR O FINALIZAR TURNO)
contMensaje.addEventListener("click", () => {
  if (
    contMensaje.innerText ===
    "¡" + pokeJugadorPrimero + " usó " + ataquesJugador[0] + "!" || contMensaje.innerText === "¡" + pokeJugadorPrimero + " usó " + ataquesJugador[1] + "!"
  ) {
    ataqueRival();
    
  } else if(contMensaje.innerText === "¡" + pokeRivalPrimero + " usó " + ataquesRival[0] + "!" || contMensaje.innerText==="¡" + pokeRivalPrimero + " usó " + ataquesRival[1] + "!"){
    if(ataqueJugadorElegido===ataquesJugador[0]){
      aranazoJugador();
      ataqueJugadorElegido="";
      resetTurn();
      } else if (){
        
      }

      
  }
});

//ACCIONA EL ATAQUE 2 DEL JUGADOR DESDE EL BOTÓN
function ataqueJugador2() {
  // if (turnoJugadorOn === true) {
  if (barSaludRivalPrimero > 0) {
    if (ataqueJugadorSegundo === ataquesJugador[1]) {
      ascuasJugador();
      // turnoJugadorOn = false;
      // turnoIntermedio = true;
      // comprobacionDeTurno();
    }
  } else {
    console.log("¡" + pokeRivalPrimero + " se debilitó!");
  }
  // }
}

//FUNCIONES DE ATAQUES INDIVIDUALES DEL JUGADOR-------------------------------------------------
//ACCIONA ATAQUE ARAÑAZO DEL JUGADOR

function aranazoJugador() {
  mensajes = document.getElementById("mensajes");
  mensajes.innerHTML =
    "¡" + pokeJugadorPrimero + " usó " + ataquesJugador[0] + "!";
  console.log("¡" + pokeJugadorPrimero + " usó " + ataquesJugador[0] + "!");
  tipoAtaqueJugador = tiposGlobal[3];
  reducirSaludRival(7);
  actualizarBarraSaludRival();
}
//ACCIONA ATAQUE ASCUAS DEL JUGADOR
function ascuasJugador() {
  mensajes = document.getElementById("mensajes");
  mensajes.innerHTML =
    "¡" + pokeJugadorPrimero + " usó " + ataquesJugador[1] + "!";
  console.log("¡" + pokeJugadorPrimero + " usó " + ataquesJugador[1] + "!");
  tipoAtaqueJugador = tiposGlobal[1];
  reducirSaludRival(7);
  actualizarBarraSaludRival();
}
//------------------------------------------------------------------------------------------------
//HP--------------------------------------------------------------------------------------------
//ACTUALIZA BARRA DE SALUD DEL JUGADOR

function actualizarBarraSaludJugador() {
  if (barSaludJugadorPrimero > 0) {
    barraSaludJugador = document.getElementById("barraSaludJugador");
    porcentajeJugador = (barSaludJugadorPrimero / maxSaludJugadorPrimero) * 100;
    barraSaludJugador.style.width = `${porcentajeJugador}%`;
    litsaludjugador = document.getElementById("litsaludjugador");
    litsaludjugador.innerText =
      barSaludJugadorPrimero + " / " + maxSaludJugadorPrimero;
  }
}

//FUNCIÓN PARA REDUCIR SALUD JUGADOR
function reducirSaludJugador(cantidad) {
  if (tipoAtaqueRival !== tipoRivalPrimero) {
    barSaludJugadorPrimero = Math.max(0, barSaludJugadorPrimero - cantidad);
    // Asegurarse de que no baje de 0
    actualizarBarraSaludJugador();
  } else if (tipoAtaqueRival === tipoRivalPrimero) {
    barSaludJugadorPrimero = Math.max(0, barSaludJugadorPrimero - cantidad * 2);
    // Asegurarse de que no baje de 0
    actualizarBarraSaludJugador();
  }
}
//--------------------------------------------------------------------------------------------------------------------------------------
function comprobarVentajaJugador() {
  if (
    tipoAtaqueJugador === tiposGlobal[1] &&
    tipoRivalPrimero === tiposGlobal[0]
  ) {
    ventajaJugador = true;
  }
}
