let saludJugador;
let saludRival;
let turnoJugadorOn;
let turnoRivalOn;
let turnoIntermedio1 = "";
let turnoIntermedio2 = "";
let bloquearMensaje;
let mostrarMsjPredet=true;
let finDeTurnos;
let turnos = [1, 2];
let turnoJugador;
let turnoRival;
let bloqueoboton=false;

saludJugador = 100;
saludRival = 100;
turnoJugadorOn = true;
turnoJugador = turnos[0];

// function comprobarTurnos(){
//     if (turnoJugador === turnos[0] && turnoJugadorOn===false) {

//       } else if (turnoRival===turnos[1] && turnoRivalOn===true){

//       }
// }

mostrarHpRival = document.getElementById("hpRivalTxt");
mostrarHpRival.innerHTML = saludRival;
mostrarHpJugador = document.getElementById("hpJugadorTxt");
mostrarHpJugador.innerHTML = saludJugador;

function actualizarHpRival() {
  if (saludRival > 0) {
    mostrarHpRival = document.getElementById("hpRivalTxt");
    mostrarHpRival.innerHTML = saludRival;
  } else {
    saludRival = 0;
    mostrarHpRival = document.getElementById("hpRivalTxt");
    mostrarHpRival.innerHTML = saludRival;
  }
}

function actualizarHpJugador() {
  if (saludJugador > 0) {
    mostrarHpJugador = document.getElementById("hpJugadorTxt");
    mostrarHpJugador.innerHTML = saludJugador;
  } else {
    saludJugador = 0;
    mostrarHpJugador = document.getElementById("hpJugadorTxt");
    mostrarHpJugador.innerHTML = saludJugador;
  }
}

function ataqueJugador() {

if(bloqueoboton!==true){
    if (mostrarMsjPredet===true) {
        if (
            (turnoIntermedio1 === true && turnoIntermedio2 === true) ||
            (turnoIntermedio1 === "" && turnoIntermedio2 === "")
          ) {
            
            if (turnoJugadorOn === true) {
              if (turnoJugador === turnos[0]) {
                saludRival = saludRival - 7;
                textoBatalla = document.getElementById("textoBatalla");
                textoBatalla.innerHTML = "¡Atacaste!";
                actualizarHpRival();
                turnoJugadorOn = false;
                turnoIntermedio1 = true;
                turnoIntermedio2 = false;
                mostrarMsjPredet===false;
                bloqueoboton=true;
                
                
                
              }
            }
          }
    }
} else{
    textoBatalla = document.getElementById("textoBatalla");
    textoBatalla.setAttribute.onclick= ActMensajePredet();
}



  
}

function ataqueRival() {
  if (turnoRivalOn === true) {
    if (turnoRival === turnos[1]) {
      saludJugador = saludJugador - 5;
      textoBatalla = document.getElementById("textoBatalla");
      textoBatalla.innerHTML = "¡Te Atacó!";
      actualizarHpJugador();
      turnoRivalOn = false;
      turnoIntermedio1 = true;
      turnoIntermedio2 = false;
    }
  }
}

function ActMensajePredet() {
  
  if(mostrarMsjPredet===false&&bloqueoboton===true){
    textoBatalla.onclick= siguienteBatalla();
} else {
    textoBatalla = document.getElementById("textoBatalla");
    textoBatalla.innerHTML = "¿Qué deseas hacer?";
    mostrarMsjPredet=false;
}
}

function siguienteBatalla() {
  if (mostrarMsjPredet === true) {
    ActMensajePredet();
  } else {
    textoBatalla.onclick= siguienteBatalla();
      if (turnoJugador === turnos[0]) {
      if (
        turnoIntermedio1 === true &&
        turnoIntermedio2 === false &&
        turnoJugadorOn === false &&
        turnoRivalOn === false
      ) {
        turnoRivalOn = true;
        turnoIntermedio2 = true;
        ataqueRival();
        mostrarMsjPredet=true;
        bloqueoboton=true;
        
      }
    } else {
      if (turnoJugador === turnos[1]) {
        if (
            turnoIntermedio1 === true &&
            turnoIntermedio2 === false &&
            turnoJugadorOn === false &&
            turnoRivalOn === false
          ){
            turnoJugadorOn=true;
            turnoIntermedio2=true;
            ataqueJugador();
            mostrarMsjPredet=true;
            bloqueoboton=true;
          }
      }
    }
  }
}

//DIFERENCIAR mostrandoMsjPredeter y puedeMostrarMsjPred

//Declarar findeTurnos
//