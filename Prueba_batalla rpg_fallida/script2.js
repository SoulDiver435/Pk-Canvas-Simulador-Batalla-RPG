let saludJugador;
let saludRival;
let turnoJugadorOn;
let turnoRivalOn;
let turnoIntermedio1 = "";
let turnoIntermedio2 = "";
let mostrarMsjPredet = true;
let finDeTurnos;
let turnos = [1, 2];
let turnoJugador;
let turnoRival;
let bloqueoboton = false;

saludJugador = 100;
saludRival = 100;
turnoJugadorOn = true;
turnoJugador = turnos[0];

// Inicializar elementos del DOM
let mostrarHpRival = document.getElementById("hpRivalTxt");
let mostrarHpJugador = document.getElementById("hpJugadorTxt");
let textoBatalla = document.getElementById("textoBatalla");

mostrarHpRival.innerHTML = saludRival;
mostrarHpJugador.innerHTML = saludJugador;

function actualizarHpRival() {
  mostrarHpRival.innerHTML = saludRival > 0 ? saludRival : 0;
}

function actualizarHpJugador() {
  mostrarHpJugador.innerHTML = saludJugador > 0 ? saludJugador : 0;
}

function ataqueJugador() {
  if (!bloqueoboton && mostrarMsjPredet) {
    if ((turnoIntermedio1 === true && turnoIntermedio2 === true) || (turnoIntermedio1 === "" && turnoIntermedio2 === "")) {
      if (turnoJugadorOn && turnoJugador === turnos[0]) {
        saludRival -= 7;
        textoBatalla.innerHTML = "¡Atacaste!";
        actualizarHpRival();
        turnoJugadorOn = false;
        turnoIntermedio1 = true;
        turnoIntermedio2 = false;
        mostrarMsjPredet = false;
        bloqueoboton = true;
      }
    }
  } else {
    textoBatalla.onclick = ActMensajePredet;
  }
}

function ataqueRival() {
  if (turnoRivalOn && turnoRival === turnos[1]) {
    saludJugador -= 5;
    textoBatalla.innerHTML = "¡Te Atacó!";
    actualizarHpJugador();
    turnoRivalOn = false;
    turnoIntermedio1 = true;
    turnoIntermedio2 = false;
  }
}

function ActMensajePredet() {
  if (!mostrarMsjPredet && bloqueoboton) {
    textoBatalla.onclick = siguienteBatalla;
  } else {
    textoBatalla.innerHTML = "¿Qué deseas hacer?";
    mostrarMsjPredet = false;
  }
}

function siguienteBatalla() {
  if (mostrarMsjPredet) {
    ActMensajePredet();
  } else {
    textoBatalla.onclick = siguienteBatalla;
    if (turnoJugador === turnos[0] && turnoIntermedio1 && !turnoIntermedio2 && !turnoJugadorOn && !turnoRivalOn) {
      turnoRivalOn = true;
      turnoIntermedio2 = true;
      ataqueRival();
      mostrarMsjPredet = true;
      bloqueoboton = true;
    } else if (turnoJugador === turnos[1] && turnoIntermedio1 && !turnoIntermedio2 && !turnoJugadorOn && !turnoRivalOn) {
      turnoJugadorOn = true;
      turnoIntermedio2 = true;
      ataqueJugador();
      mostrarMsjPredet = true;
      bloqueoboton = true;
    }
  }
}