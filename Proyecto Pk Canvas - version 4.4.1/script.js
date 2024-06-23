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
let ataqueJugadorTercero = "";
let ataqueJugadorCuarto = "";

let ataqueRivalPrimero = "";
let ataqueRivalSegundo = "";
let ataqueRivalTercero = "";
let ataqueRivalCuarto = "";

let ataquesJugador = ["Arañazo", "Ascuas", "Corte furia", "Malicioso"];
let ataquesRival = ["Placaje", "Hoja Afilada", "Bofetón lodo","Reflejo"];
//Tipos de Pokés
let tiposGlobal = ["Planta", "Fuego", "Normal", "Bicho", "Tierra"];
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
let mensajeDiv = document.getElementById("mensajes");
let contenidoMensaje = mensajeDiv.textContent;
let botonesAtaque = document.querySelectorAll(".botonataque");
let palabrasComprobar = ["enemigo", "usó", "enemigo se debilitó"];
//Velocidad
let velocidadJugador = 15;
let velocidadRival = 8;
//Turnos
let turnoActual = velocidadJugador >= velocidadRival ? 1 : 2;
//Comprobación si los Pokémon ya atacaron
let jugadorYaAtaco = false;
let rivalYaAtaco = false;
//Nivel de Pokémon
let nivelJugadorPrimero = 0;
let nivelRivalPrimero = 0;
//Ataque Elegido del Jugador
let ataqueJugadorElegido = 0;
//Estados y Estadísticas alteradas 
let reflejoRivalActivado= false;
let contadorReflejoRival= 0;
//-----------------------------------------------------
//Botón de ESTADO DEL SISTEMA
let btnStatus = document.getElementById("botonStatus");
//-------------------------------------------------------------------------------------------

//FUNCIONES DEL SISTEMA---------------------------------------------------------------------------------------------------------------------------------

//PARA ACTUALIZAR EL MENSAJE

function actualizarMsj(mensaje) {
  mensajeDiv.innerHTML = mensaje;
}

//ENTORNO JUEGO:

pokeRivalPrimero = "Chikorita";
pokeJugadorPrimero = "Cyndaquil";
console.log("--------------------------------------------------------------");
console.log("--SET DEL RIVAL--");

//COMPROBAR TURNOS
function comprobarTurnos() {
  if (!jugadorYaAtaco && !rivalYaAtaco) {
    if (velocidadJugador >= velocidadRival) {
      turnoActual = 1;
    } else if (velocidadJugador < velocidadRival) {
      turnoActual = 2;
      if (!jugadorYaAtaco && rivalYaAtaco) {
        turnoActual = 1;
      }
    }
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

//COMPROBAR DESVENTAJA DE ATAQUES
function NoEsMuyEfectivo(tipoAtaque, tipoPokemon) {
  let relacionesTipos = {
    Planta: ["Fuego", "Acero", "Veneno"],
  };

  return relacionesTipos[tipoAtaque]?.includes(tipoPokemon);
}

//COMPROBAR VENTAJA DE ATAQUES

function esSuperEfectivo(tipoAtaque, tipoPokemon) {
  let relacionesTipos = {
    Bicho: ["Planta", "Psíquico"],
    Fuego: ["Planta"],
    Tierra: ["Fuego"],
  };
  return relacionesTipos[tipoAtaque]?.includes(tipoPokemon);
}

//FUNCIÓN PARA REDUCIR SALUD RIVAL

function reducirSaludRival(cantidad) {
  if (tipoAtaqueJugador !== tipoJugadorPrimero) {
    //Comprobando si el ataque del jugador NO es del mismo tipo que el jugador
    if (esSuperEfectivo(tipoAtaqueJugador, tipoRivalPrimero)) {
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
    //Acciones según ventaja
    if (esSuperEfectivo(tipoAtaqueJugador, tipoRivalPrimero)) {
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

//FUNCIÓN PARA REDUCIR SALUD JUGADOR
function reducirSaludJugador(cantidad) {
  if (NoEsMuyEfectivo(tipoAtaqueRival, tipoJugadorPrimero)) {
    console.log("No es muy efectivo...");
    barSaludJugadorPrimero = Math.max(0, barSaludJugadorPrimero - cantidad / 2);
    redondeadoJugador = Math.round(barSaludJugadorPrimero);
    barSaludJugadorPrimero = redondeadoJugador;
    actualizarBarraSaludJugador();
  } else if (esSuperEfectivo(tipoAtaqueRival, tipoJugadorPrimero)) {
    console.log("¡Es súper efectivo!");
    barSaludJugadorPrimero = Math.max(0, barSaludJugadorPrimero - cantidad * 2);
    redondeadoJugador = Math.round(barSaludJugadorPrimero);
    barSaludJugadorPrimero = redondeadoJugador;
    actualizarBarraSaludJugador();
  } else {
    barSaludJugadorPrimero = Math.max(0, barSaludJugadorPrimero - cantidad);
    actualizarBarraSaludJugador();
  }
}

//INICIALIZAR EL MSJ AL INICIAR LA BATALLA

resetTurnos();

//ACTIVAR CONTADOR DE REFLEJO (RIVAL)

function activarContadorReflejoRival(){
  if(contadorReflejoRival<=0){
    contadorReflejoRival=6;
  }
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
  nivelRivalPrimero = 5;
  nombrepkrival.innerHTML =
    `${pokeRivalPrimero}` + `<span> &nbsp; </span>` + `Nv.${nivelRivalPrimero}`;
  // SE MUESTRA ESCRITA LA BARRA DE SALUD RIVAL
  litsaludrival = document.getElementById("litsaludrival");
  litsaludrival.innerText = barSaludRivalPrimero + " / " + maxSaludRivalPrimero;
  // SE ESTABLECE EL TIPO DE POKE RIVAL
  tipoRivalPrimero = tiposGlobal[0];
  console.log("El tipo del rival es: " + tipoRivalPrimero);
  // SE ESTABLECE LOS ATAQUES DEL POKE RIVAL
  ataqueRivalPrimero = ataquesRival[0];
  ataqueRivalSegundo = ataquesRival[1];
  ataqueRivalTercero = ataquesRival[2];
  ataqueRivalCuarto = ataquesRival[3];
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

//ACCIONA EL ATAQUE DEL RIVAL
function ataqueRival() {
  // actualizarMsj("¡Te atacaron!");
  //   reducirSaludJugador(7);
  //   rivalYaAtaco = true;
  //   toggleBotonesAtaque(true);
  if (barSaludRivalPrimero > 0) {
    let ataqueAleatorio = obtenerAtaqueAleatorioRival();
    ataqueAleatorio();
    if (NoEsMuyEfectivo(tipoAtaqueRival, tipoJugadorPrimero)) {
      let br = document.createElement("br");
      let span = document.createElement("span");
      span.textContent = "No es muy efectivo...";
      // Agregar el <br> y el <span> al mensajeDiv
      mensajeDiv.appendChild(br);
      mensajeDiv.appendChild(span);
    } else if (esSuperEfectivo(tipoAtaqueRival, tipoJugadorPrimero)) {
      let br = document.createElement("br");
      let span = document.createElement("span");
      span.textContent = "¡Es súper efectivo!";
      // Agregar el <br> y el <span> al mensajeDiv
      mensajeDiv.appendChild(br);
      mensajeDiv.appendChild(span);
    }
    rivalYaAtaco = true;
    toggleBotonesAtaque(true);
    console.log("La salud del jugador es: " + barSaludJugadorPrimero);
    tipoAtaqueRival = "";
  } else {
    console.log("¡" + pokeRivalPrimero + " se debilitó!");
    toggleBotonesAtaque(true);
  }
  comprobarTurnos();
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

//FUNCION PARA ACTIVAR ATAQUE3 DEL RIVAL
function activarAtaqueRivalTercero() {
  if (ataqueRivalTercero === ataquesRival[2]) {
    bofetonLodoRival();
    actualizarMsj(
      "¡" + pokeRivalPrimero + " enemigo" + " usó " + ataquesRival[2] + "!"
    );
  }
}

//FUNCION PARA ACTIVAR ATAQUE4 DEL RIVAL
function activarAtaqueRivalCuarto() {
  if (ataqueRivalCuarto === ataquesRival[3]) {
    reflejoRival();
    actualizarMsj(
      "¡" + pokeRivalPrimero + " enemigo" + " usó " + ataquesRival[3] + "!"
    + "<br>" + `¡Defensa de ${pokeRivalPrimero} rival aumentó!` );
  }
}

//FUNCIONES DE ATAQUES INDIVIDUALES DEL RIVAL

//ACTIVA ATAQUE PLACAJE DEL RIVAL
function placajeRival() {
  console.log("¡" + pokeRivalPrimero + " usó " + ataquesRival[0] + "!");
  tipoAtaqueRival = tiposGlobal[3];
  reducirSaludJugador(5);
  actualizarBarraSaludJugador();
}

//ACTIVA ATAQUE HOJA AFILADA DEL RIVAL
function hojaAfiladaRival() {
  console.log("¡" + pokeRivalPrimero + " usó " + ataquesRival[1] + "!");
  tipoAtaqueRival = tiposGlobal[0];
  reducirSaludJugador(7);
  actualizarBarraSaludJugador();
}

//ACTIVA ATAQUE BOFETÓN LODO DEL RIVAL
function bofetonLodoRival() {
  console.log("¡" + pokeRivalPrimero + " usó " + ataquesRival[2] + "!");
  tipoAtaqueRival = tiposGlobal[4];
  reducirSaludJugador(4);
  actualizarBarraSaludJugador();
}

//ACTIVA ATAQUE BOFETÓN LODO DEL RIVAL
function reflejoRival() {
  console.log("¡" + pokeRivalPrimero + " usó " + ataquesRival[3] + "!");
  tipoAtaqueRival = tiposGlobal[3];
  activarContadorReflejoRival();
  reducirSaludJugador(0);
  actualizarBarraSaludJugador();
}

//OBTENER UN ATAQUE ALEATORIO EL RIVAL
let funcionesDeAtaques = [
  activarAtaqueRivalPrimero,
  activarAtaqueRivalSegundo,
  activarAtaqueRivalTercero,
  activarAtaqueRivalCuarto
];
function obtenerAtaqueAleatorioRival() {
  let indiceAleatorio = Math.floor(Math.random() * funcionesDeAtaques.length);
  return funcionesDeAtaques[indiceAleatorio];
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
  nivelJugadorPrimero = 6;
  nombrepkjugador.innerHTML =
    `${pokeJugadorPrimero}` +
    `<span> &nbsp; </span>` +
    `Nv.${nivelJugadorPrimero}`;
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
  ataqueJugadorTercero = ataquesJugador[2];
  ataqueJugadorCuarto = ataquesJugador[3];
  actualizarBarraSaludJugador();
}
console.log("-------------------------------------------------------------");
//HP------------------------------------------------------------------------
//ACTUALIZA BARRA DE SALUD DEL JUGADOR

function actualizarBarraSaludJugador() {
  if (barSaludJugadorPrimero > 0) {
    barraSaludJugador = document.getElementById("barraSaludJugador");
    porcentajeJugador = (barSaludJugadorPrimero / maxSaludJugadorPrimero) * 100;
    barraSaludJugador.style.width = `${porcentajeJugador}%`;
    litsaludjugador = document.getElementById("litsaludjugador");
    litsaludjugador.innerText =
      barSaludJugadorPrimero + " / " + maxSaludJugadorPrimero;
  } else if (barSaludJugadorPrimero <= 0) {
    barraSaludJugador = document.getElementById("barraSaludJugador");
    porcentajeJugador = (barSaludJugadorPrimero / maxSaludJugadorPrimero) * 0;
    barraSaludJugador.style.width = `${porcentajeJugador}%`;
    litsaludjugador = document.getElementById("litsaludjugador");
    litsaludjugador.innerText =
      barSaludJugadorPrimero + " / " + maxSaludJugadorPrimero;
  }
}

//FUNCIONES DE ACTIVACIÓN DE ATAQUES-----------------------------------------

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

//ESTABLECE EL ATAQUE3 DEL JUGADOR EN UN BOTÓN (ESCRITO)
if (ataqueJugadorTercero === ataquesJugador[2]) {
  ataquetercerobtn = document.getElementById("ataquetercerobtn");
  ataquetercerobtn.innerHTML = ataquesJugador[2];
}

//ESTABLECE EL ATAQUE4 DEL JUGADOR EN UN BOTÓN (ESCRITO)
if (ataqueJugadorCuarto === ataquesJugador[3]) {
  ataquecuartobtn = document.getElementById("ataquecuartobtn");
  ataquecuartobtn.innerHTML = ataquesJugador[3];
}

//------------------------------------------------------------------------

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

//ACTIVA EL ATAQUE 3 DEL JUGADOR DESDE EL BOTÓN

function ataqueJugador3() {
  if (barSaludRivalPrimero > 0 && barSaludJugadorPrimero > 0) {
    if (barSaludRivalPrimero > 0) {
      if (ataqueJugadorTercero === ataquesJugador[2]) {
        corteFuria();
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

//ACTIVA EL ATAQUE 4 DEL JUGADOR DESDE EL BOTÓN

function ataqueJugador4() {
  if (barSaludRivalPrimero > 0 && barSaludJugadorPrimero > 0) {
    if (barSaludRivalPrimero > 0) {
      if (ataqueJugadorCuarto === ataquesJugador[3]) {
        malicioso();
        jugadorYaAtaco = true;
        toggleBotonesAtaque(true);
        // console.log("Mensaje:" + contenidoMensaje);
        console.log("Hay ventaja?: " + ventajaJugador);
      }
    }
  }
}

//FUNCIONES DE ATAQUES INDIVIDUALES DEL JUGADOR-------------------------------------------------

//ACCIONA ATAQUE ARAÑAZO DEL JUGADOR

function aranazoJugador() {
  console.log("¡" + pokeJugadorPrimero + " usó " + ataquesJugador[0] + "!");
  tipoAtaqueJugador = tiposGlobal[2];
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

//ACCIONA ATAQUE CORTE FURIA DEL JUGADOR
function corteFuria() {
  console.log("¡" + pokeJugadorPrimero + " usó " + ataquesJugador[2] + "!");
  tipoAtaqueJugador = tiposGlobal[3];
  actualizarMsj("¡" + pokeJugadorPrimero + " usó " + ataquesJugador[2] + "!");
  reducirSaludRival(3);
  actualizarBarraSaludRival();
}

//ACCIONA ATAQUE MALICIOSO DEL JUGADOR
function malicioso() {
  console.log("¡" + pokeJugadorPrimero + " usó " + ataquesJugador[3] + "!");
  tipoAtaqueJugador = tiposGlobal[2];
  actualizarMsj(
    "¡" +
      pokeJugadorPrimero +
      " usó " +
      ataquesJugador[3] +
      "!" +
      "<br>" +
      `Defensa de ${pokeRivalPrimero} enemigo disminuyó.`
  );
  reducirSaludRival(0);
  actualizarBarraSaludRival();
}

//--------------------------------------------------------------------------------------------------------------------------------------

//RESETEAR LOS TURNOS

function resetTurnos() {
  actualizarMsj("¿Qué deseas hacer?");
  if(contadorReflejoRival>0){
    contadorReflejoRival--;
  }else{
    contadorReflejoRival=0;
  }
  jugadorYaAtaco = false;
  rivalYaAtaco = false;
  ataqueJugadorElegido=0;
  toggleBotonesAtaque(false);
  comprobarTurnos();
}

//ACTIVAR/DESACTIVAR BOTONES

function toggleBotonesAtaque(disable) {
  botonesAtaque.forEach((button) => {
    button.disabled = disable;
  });
}

//DESACTIVAR MENSAJE
function desactivarMensaje() {
  mensajeDiv.style.pointerEvents = "none";
}

//CONTROLA EL MENSAJE AL HACER CLICK
function manejarClickMensaje() {
  comprobarTurnos();
  let contenidoMensaje = mensajeDiv.textContent;
  if (
    !rivalYaAtaco &&
    jugadorYaAtaco &&
    turnoActual === 1 &&
    barSaludJugadorPrimero > 0 &&
    barSaludRivalPrimero > 0
  ) {
    ataqueRival();
    turnoActual = 2;
  } else if (
    contenidoMensaje.includes(palabrasComprobar[0]) &&
    contenidoMensaje.includes(palabrasComprobar[1]) &&
    rivalYaAtaco &&
    jugadorYaAtaco &&
    turnoActual === 2 &&
    barSaludJugadorPrimero > 0 &&
    barSaludRivalPrimero > 0
  ) {
    resetTurnos();
    resetearVentajas();
  } else if (barSaludRivalPrimero <= 0) {
    actualizarMsj("¡" + pokeRivalPrimero + " enemigo se debilitó!");
    console.log("¡" + pokeRivalPrimero + " se debilitó!");
    toggleBotonesAtaque(true);
    if (contenidoMensaje.includes(palabrasComprobar[2])) {
      actualizarMsj("¡Has ganado la batalla!");
      toggleBotonesAtaque(true);
      desactivarMensaje();
    }
  } else if (barSaludJugadorPrimero <= 0) {
    actualizarMsj("¡" + pokeJugadorPrimero + " se ha debilitado!");
    toggleBotonesAtaque(true);
    if (contenidoMensaje.includes(" se ha debilitado!")) {
      actualizarMsj("Has perdido la batalla.");
      toggleBotonesAtaque(true);
      desactivarMensaje();
    }
  } else if (
    barSaludJugadorPrimero > 0 &&
    barSaludRivalPrimero > 0 &&
    turnoActual === 2 &&
    rivalYaAtaco &&
    !jugadorYaAtaco
  ) {
    if (ataqueJugadorElegido === 1) {
      turnoActual = 1;
      ataqueJugador1();
    } else if (ataqueJugadorElegido === 2) {
      turnoActual = 1;
      ataqueJugador2();
    }else if(ataqueJugadorElegido===3){
      turnoActual =1;
      ataqueJugador3();
    }else if (ataqueJugadorElegido===4){
      turnoActual=1;
      ataqueJugador4();
    }
    resetearVentajas();
  } else if (
    barSaludJugadorPrimero > 0 &&
    barSaludRivalPrimero > 0 &&
    jugadorYaAtaco &&
    rivalYaAtaco &&
    turnoActual === 1
  ) {
    resetTurnos();
    resetearVentajas();
  }
}

//AGREGA EVENT LISTENERS A LOS BOTONES DE ATAQUE

//FUNCION QUE DETECTA QUE ATAQUE DE JUGADOR SE HA ELEGIDO
function detectarAtaqueJugador(numeroDeAtaqueElegido) {
  return (ataqueJugadorElegido = numeroDeAtaqueElegido);
}

//EL PRIMER BOTON DE ATAQUE
document.getElementById("ataqueprimerobtn").addEventListener("click", () => {
  detectarAtaqueJugador(1);
  if (turnoActual === 1 && !jugadorYaAtaco) {
    ataqueJugador1();
  } else if (turnoActual === 2 && !rivalYaAtaco) {
    ataqueRival();
  }
});

//EL SEGUNDO BOTON DE ATAQUE
document.getElementById("ataquesegundobtn").addEventListener("click", () => {
  detectarAtaqueJugador(2);
  if (turnoActual === 1 && !jugadorYaAtaco) {
    ataqueJugador2();
  } else if (turnoActual === 2 && !rivalYaAtaco) {
    ataqueRival();
  }
});

//EL TERCER BOTON DE ATAQUE
document.getElementById("ataquetercerobtn").addEventListener("click", () => {
  detectarAtaqueJugador(3);
  if (turnoActual === 1 && !jugadorYaAtaco) {   
    ataqueJugador3();
  } else if (turnoActual === 2 && !rivalYaAtaco) {
    ataqueRival();
  }
});

//EL CUARTO BOTON DE ATAQUE
document.getElementById("ataquecuartobtn").addEventListener("click", () => {
  detectarAtaqueJugador(4);
  if (turnoActual === 1 && !jugadorYaAtaco) {
    ataqueJugador4();
  } else if (turnoActual === 2 && !rivalYaAtaco) {
    ataqueRival();
  }
});

//AGREGAR EVENT LISTENER AL MENSAJE
mensajeDiv.addEventListener("click", manejarClickMensaje);

//EVENTLISTENER PARA EL BOTON STATUS

btnStatus.addEventListener("click", () => {
  console.log("------Estado:-------");
  console.log("Salud Jugador: " + barSaludJugadorPrimero);
  console.log("Salud Rival: " + barSaludRivalPrimero);
  console.log("¿Jugador ya atacó?: " + jugadorYaAtaco);
  console.log("Rival ya atacó?: " + rivalYaAtaco);
  console.log("Turno actual: " + turnoActual);
  console.log("Ataque Jugador Elegido: " + ataqueJugadorElegido);
  console.log("Contador de Reflejo del rival: " + contadorReflejoRival);
  console.log("------Estado:-------");
});
