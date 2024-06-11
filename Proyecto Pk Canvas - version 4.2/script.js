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
let ventajaJugador = false;
let ventajaRival = false;
//----------------------------
//Variables nuevas
let velocidadJugador = 10;
let velocidadRival = 8;
let turnoActual = velocidadJugador >= velocidadRival ? 1 : 2;
let jugadorYaAtaco = false;
let rivalYaAtaco = false;

let mensajeDiv = document.getElementById("mensajes");
let contenidoMensaje = mensajeDiv.textContent;
let botonesAtaque = document.querySelectorAll(".botonataque");
let palabrasComprobar = ["enemigo", "usó"];
//-------------------------------------------------------------------------------------------

//PARA ACTUALIZAR EL MENSAJE

function actualizarMsj(mensaje) {
  mensajeDiv.textContent = mensaje;
}

//ENTORNO JUEGO:

pokeRivalPrimero = "Chikorita";
pokeJugadorPrimero = "Cyndaquil";
console.log("--------------------------------------------------------------");
console.log("--SET DEL RIVAL--");

//COMPROBAR TURNOS
function comprobarTurnos() {
  if (velocidadJugador >= velocidadRival) {
    turnoActual = 1;
  } else {
    turnoActual = 2;
  }
}

//COMPROBAR VENTAJA DEL JUGADOR
function comprobarVentajaJugador() {
  if (
    tipoAtaqueJugador === tiposGlobal[1] &&
    tipoRivalPrimero === tiposGlobal[0]
  ) {
    ventajaJugador = true;
  }
}

//FUNCIÓN PARA RESETEAR VENTAJAS
function resetearVentajas() {
  ventajaJugador = false;
}

//COMPROBAR DESVENTAJA DE ATAQUES DEL RIVAL HACIA EL JUGADOR
function NoEsMuyEfectivo(tipoAtaque,tipoPokemon){
  let relacionesTipos= {
  "Planta": ["Fuego", "Acero", "Veneno"]
  };

  return relacionesTipos[tipoAtaque]?.includes(tipoPokemon);
}

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

// if (ventajaJugador) {
//   // Crear un elemento <br> y un <span> para el mensaje adicional
//   let br = document.createElement("br");
//   let span = document.createElement("span");
//   span.textContent = "¡Es súper efectivo!";
//   // Agregar el <br> y el <span> al mensajeDiv
//   mensajeDiv.appendChild(br);
//   mensajeDiv.appendChild(span);
//   resetearVentajas();
// }

//FUNCIÓN PARA REDUCIR SALUD RIVAL
function reducirSaludRival(cantidad) {
  if (tipoAtaqueJugador !== tipoJugadorPrimero) {
    //Comprobando si el ataque del jugador NO es del mismo tipo que el jugador
    comprobarVentajaJugador(); //Comprobando si hay ventaja
    //Acciones según ventaja
    if (ventajaJugador === true) {
      //EN CASO HAYA VENTAJA...
      //Se crean elementos con etiquetas <br> y <span>
      let br = document.createElement("br");
      let span = document.createElement("span");
      span.textContent = "¡Es súper efectivo!";
      // Agregar el <br> y el <span> al mensajeDiv
      mensajeDiv.appendChild(br);
      mensajeDiv.appendChild(span);
      console.log("¡Es super efectivo!");
      barSaludRivalPrimero = Math.max(0, barSaludRivalPrimero - cantidad * 2);
      // Asegurarse de que no baje de 0
      actualizarBarraSaludRival();
      console.log("La salud del rival es: " + barSaludRivalPrimero);
    } else {
      //SI NO HAY VENTAJA...
      barSaludRivalPrimero = Math.max(0, barSaludRivalPrimero - cantidad);
      // Asegurarse de que no baje de 0
      actualizarBarraSaludRival();
      console.log("La salud del rival es: " + barSaludRivalPrimero);
    }
  } else if (tipoAtaqueJugador === tipoJugadorPrimero) {
    //Comprobando si el ataque del jugador SI es del mismo tipo que el jugador
    comprobarVentajaJugador(); //Comprobando si hay ventaja
    //Acciones según ventaja
    if (ventajaJugador === true) {
      //EN CASO HAYA VENTAJA...
      let br = document.createElement("br");
      let span = document.createElement("span");
      span.textContent = "¡Es súper efectivo!";
      // Agregar el <br> y el <span> al mensajeDiv
      mensajeDiv.appendChild(br);
      mensajeDiv.appendChild(span);
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
    } else {
      //SI NO HAY VENTAJA...
      barSaludRivalPrimero = Math.max(0, barSaludRivalPrimero - cantidad * 1.5);
      redondeadoRival = Math.round(barSaludRivalPrimero);
      barSaludRivalPrimero = redondeadoRival;
      // Asegurarse de que no baje de 0
      actualizarBarraSaludRival();
      console.log("La salud del rival es: " + barSaludRivalPrimero);
    }
  }
}

//ACCIONA EL ATAQUE DEL RIVAL
function ataqueRival() {
  // actualizarMsj("¡Te atacaron!");
  //   reducirSaludJugador(7);
  //   rivalYaAtaco = true;
  //   toggleBotonesAtaque(true);
  if (barSaludRivalPrimero > 0) {
    let ataqueAleatorio = obtenerAtaqueAleatorioRival();
    ataqueAleatorio();
    if(NoEsMuyEfectivo(tipoAtaqueRival,tipoJugadorPrimero)){
      let br = document.createElement("br");
      let span = document.createElement("span");
      span.textContent = "No es muy efectivo...";
      // Agregar el <br> y el <span> al mensajeDiv
      mensajeDiv.appendChild(br);
      mensajeDiv.appendChild(span);
    }
    rivalYaAtaco = true;
    toggleBotonesAtaque(true);
    console.log("La salud del jugador es: " + barSaludJugadorPrimero);
    tipoAtaqueRival="";
  } else {
    console.log("¡" + pokeRivalPrimero + " se debilitó!");
    toggleBotonesAtaque(true);
  }

 
}

//FUNCION PARA ACTIVAR ATAQUE1 DEL RIVAL
function activarAtaqueRivalPrimero() {
  if (ataqueRivalPrimero === ataquesRival[0]) {
    placajeRival();
    mensajes = document.getElementById("mensajes");
    actualizarMsj(
      "¡" + pokeRivalPrimero + " enemigo" + " usó " + ataquesRival[0] + "!"
    );
  }
  let contenidoMensaje = mensajeDiv.textContent;
  // console.log("Mensaje:" + contenidoMensaje);
}

//FUNCION PARA ACTIVAR ATAQUE2 DEL RIVAL
function activarAtaqueRivalSegundo() {
  if (ataqueRivalSegundo === ataquesRival[1]) {
    hojaAfiladaRival();
    actualizarMsj(
      "¡" + pokeRivalPrimero + " enemigo" + " usó " + ataquesRival[1] + "!"
    );
  }
  let contenidoMensaje = mensajeDiv.textContent;
  // console.log("Mensaje:" + contenidoMensaje);
}

//FUNCIONES DE ATAQUES INDIVIDUALES DEL RIVAL

//ACTIVA ATAQUE PLACAJE DEL RIVAL
function placajeRival() {
  console.log("¡" + pokeRivalPrimero + " usó " + ataquesRival[0] + "!");
  tipoAtaqueRival = tiposGlobal[3];
  reducirSaludJugador(7);
  actualizarBarraSaludJugador();
  
}

//ACTIVA ATAQUE HOJA AFILADA DEL RIVAL
function hojaAfiladaRival() {
  console.log("¡" + pokeRivalPrimero + " usó " + ataquesRival[1] + "!");
  tipoAtaqueRival = tiposGlobal[0];
  reducirSaludJugador(7);
  actualizarBarraSaludJugador();
  
}

//OBTENER UN ATAQUE ALEATORIO EL RIVAL
let funcionesDeAtaques = [activarAtaqueRivalPrimero, activarAtaqueRivalSegundo];
function obtenerAtaqueAleatorioRival() {
  let indiceAleatorio = Math.floor(Math.random() * funcionesDeAtaques.length);
  return funcionesDeAtaques[indiceAleatorio];
}

//FUNCIÓN PARA REDUCIR SALUD JUGADOR
function reducirSaludJugador(cantidad) {
  if(NoEsMuyEfectivo(tipoAtaqueRival,tipoJugadorPrimero)){
    console.log("No es muy efectivo...");
    barSaludJugadorPrimero = Math.max(0,barSaludJugadorPrimero - (cantidad/2));
    redondeadoJugador = Math.round(barSaludJugadorPrimero);
    barSaludJugadorPrimero = redondeadoJugador;
    actualizarBarraSaludJugador();
  }else {
    barSaludJugadorPrimero = barSaludJugadorPrimero - cantidad;
    actualizarBarraSaludJugador();
  }
  }

//SET DEL JUGADOR:---------------------------------------------------------------------------------------------------------------------------------------

console.log("-------------------------------------------------------------");
console.log("--SET DEL JUGADOR--");
console.log("Pokémon del jugador: " + pokeJugadorPrimero);

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

//HP-------------------------------------------------------------------------------------------
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

//ACTIVA EL ATAQUE 1 DEL JUGADOR DESDE EL BOTÓN
function ataqueJugador1() {
  if (barSaludRivalPrimero > 0 && barSaludJugadorPrimero > 0) {
    // reducirSaludRival(10);
    // actualizarMsj("¡Atacaste!");
    // let contenidoMensaje = mensajeDiv.textContent;
    // jugadorYaAtaco = true;
    // toggleBotonesAtaque(true);
    // console.log("Mensaje:" + contenidoMensaje);
    if (barSaludRivalPrimero > 0) {
      if (ataqueJugadorPrimero === ataquesJugador[0]) {
        aranazoJugador();
        jugadorYaAtaco = true;
        toggleBotonesAtaque(true);
        // console.log("Mensaje:" + contenidoMensaje);
        console.log("Hay ventaja?: " + ventajaJugador);
      }
    }
  }
}


//ACTIVA EL ATAQUE 2 DEL JUGADOR DESDE EL BOTÓN

function ataqueJugador2() {
  if (barSaludRivalPrimero > 0 && barSaludJugadorPrimero > 0) {
    if (barSaludRivalPrimero > 0) {
      if (ataqueJugadorSegundo === ataquesJugador[1]) {
        ascuasJugador();

        jugadorYaAtaco = true;
        toggleBotonesAtaque(true);
        // console.log("Mensaje:" + contenidoMensaje);
        console.log("Hay ventaja?: " + ventajaJugador);
      }
    }
  }

  // if (barSaludRivalPrimero <= 0) {

  //   // console.log("Mensaje:" + contenidoMensaje);
  //   actualizarMsj("¡" + pokeRivalPrimero + " enemigo se debilitó!");
  //   toggleBotonesAtaque(true);
  // }
}

//FUNCIONES DE ATAQUES INDIVIDUALES DEL JUGADOR-------------------------------------------------

//ACCIONA ATAQUE ARAÑAZO DEL JUGADOR

function aranazoJugador() {
  console.log("¡" + pokeJugadorPrimero + " usó " + ataquesJugador[0] + "!");
  tipoAtaqueJugador = tiposGlobal[3];
  actualizarMsj("¡" + pokeJugadorPrimero + " usó " + ataquesJugador[0] + "!");
  reducirSaludRival(7);
  actualizarBarraSaludRival();
}

//ACCIONA ATAQUE ASCUAS DEL JUGADOR
function ascuasJugador() {
  console.log("¡" + pokeJugadorPrimero + " usó " + ataquesJugador[1] + "!");
  tipoAtaqueJugador = tiposGlobal[1];
  actualizarMsj("¡" + pokeJugadorPrimero + " usó " + ataquesJugador[1] + "!");
  reducirSaludRival(7);
  actualizarBarraSaludRival();
}

//--------------------------------------------------------------------------------------------------------------------------------------

//RESETEAR LOS TURNOS

function resetTurnos() {
  actualizarMsj("¿Qué deseas hacer?");
  jugadorYaAtaco = false;
  rivalYaAtaco = false;
  toggleBotonesAtaque(false);
  comprobarTurnos();
}

//ACTIVAR/DESACTIVAR BOTONES

function toggleBotonesAtaque(disable) {
  botonesAtaque.forEach((button) => {
    button.disabled = disable;
  });
}

//CONTROLA EL MENSAJE AL HACER CLICK
function manejarClickMensaje() {
  let contenidoMensaje = mensajeDiv.textContent;
  if (!rivalYaAtaco && jugadorYaAtaco && turnoActual === 1 && barSaludJugadorPrimero>0 && barSaludRivalPrimero) {
    ataqueRival();
    turnoActual = 2;
    // console.log("Turno actual: " + turnoActual);
    // console.log("Atacó Rival?: " + rivalYaAtaco);
    // console.log("Ataco Jugador?: " + jugadorYaAtaco);
  } else if (
    contenidoMensaje.includes(palabrasComprobar[0]) &&
    contenidoMensaje.includes(palabrasComprobar[1]) &&
    rivalYaAtaco &&
    jugadorYaAtaco &&
    turnoActual === 2 && barSaludJugadorPrimero>0 && barSaludRivalPrimero
  ) {
    resetTurnos();
    resetearVentajas();
    

    // console.log("Turno actual: " + turnoActual);
    // console.log("Atacó Rival?: " + rivalYaAtaco);
    // console.log("Ataco Jugador?: " + jugadorYaAtaco);
  } else if (barSaludRivalPrimero<=0){
      // console.log("Mensaje:" + contenidoMensaje);
      // console.log("Turno actual: " + turnoActual);
      // console.log("Atacó Rival?: " + rivalYaAtaco);
      actualizarMsj("¡" + pokeRivalPrimero + " enemigo se debilitó!");
      toggleBotonesAtaque(true);
  }
}

//AGREGA EVENT LISTENERS A LOS BOTONES DE ATAQUE

//EL PRIMER BOTON DE ATAQUE
document.getElementById("ataqueprimerobtn").addEventListener("click", () => {
  if (turnoActual === 1 && !jugadorYaAtaco) {
    ataqueJugador1();
  } else if (turnoActual === 2 && !rivalYaAtaco) {
    ataqueRival();
  }
});

//AGREGAR EVENT LISTENER AL MENSAJE
mensajeDiv.addEventListener("click", manejarClickMensaje);

//INICIALIZAR EL MSJ AL INICIAR LA BATALLA

resetTurnos();
