const moneda = "USD";
const precioMetroCuadradoTextura = {
  liso: { precio: 20, label: "Cuero Liso" },
  arrugado: { precio: 30, label: "Cuero Texturado" },
  poroso: { precio: 20, label: "Cuero Poroso" },
  perforado: { precio: 25, label: "Cuero Perforado" },
  micorPerforado: { precio: 35, label: "Cuero Micro-Perforado" },
  combinado: { precio: 40, label: "Cuero Combinado" },
  cuerina: { precio: 10, label: "Cuerina" },
};

const usuarios = {
  "andreapennisi04@gmail.com": { password: "12345678", displayName: "Andrea Pennisi" },
};

const loginModal = new bootstrap.Modal(document.getElementById("loginModal"), {
  keyboard: false,
  backdrop: "static",
});

let texturaHTML = Object.keys(precioMetroCuadradoTextura).map((key) => {
  return `<option value= "${key}" > ${precioMetroCuadradoTextura[key].label}</option>`;
});

texturaHTML = [`<option value="nada">Seleccione una opcion</option>`, ...texturaHTML];

window.document.getElementById("textura").innerHTML = texturaHTML.join("");

const metrosCuadradosMinimo = 5;
const metrosCuadradosMaximo = 12;
const metrosCuadradoPromedioPorAsiento = (metrosCuadradosMinimo + metrosCuadradosMaximo) / 2;

function factorDePrecioPorColor(color) {
  switch (color) {
    case "negro":
      return 1;
    case "blanco":
      return 1.5;
    case "crema":
      return 2;
    case "grafito":
      return 1;
    case "gris":
      return 1.2;
    case "combinado":
      return 2.5;
    default:
      return 0;
  }
}

function factorDePrecioPorEstiloCostura(estiloDeCostura) {
  const estilos = ["nada", "simpleRecta", "dobleDobleRecta", "zigzag", "punto"];
  const factoresEstilos = [0, 1, 1.3, 1.2, 1.15];
  const posicionDelPrecio = estilos.indexOf(estiloDeCostura);
  return factoresEstilos[posicionDelPrecio];
}

const factorDePrecioPorColorCostura = (colorCostura) => {
  switch (colorCostura) {
    case "negrosCostura":
      return 1.1;
    case "cremaCostura":
    case "blancoCostura":
      return 1.15;
    case "grafitoCostura":
      return 1.2;
    case "grisCostura":
      return 1.18;
    case "combinadoCostura":
      return 1.25;
    default:
      return 0;
  }
};

function validarCupon(descuento) {
  switch (descuento) {
    case "FELIZNAVIDAD":
      return 5;
    case "FELIZANIONUEVO":
      return 15;
    case "BLACKFRIDAY":
      return 10;
    default:
      return 0;
  }
}

function limpiarValidacion(name) {
  const element = window.document.getElementById(name);
  if (element.value !== "nada") {
    element.classList.remove("is-invalid");
  }
}

function validarFormulario() {
  const estiloDeCostura = window.document.getElementById("estiloDeCostura");
  const colorCostura = window.document.getElementById("colorCostura");
  const asientos = window.document.getElementById("asientos");
  const textura = window.document.getElementById("textura");
  const colorTapizado = window.document.getElementById("colorTapizado");
  let formValido = true;

  estiloDeCostura.classList.remove("is-invalid");
  colorCostura.classList.remove("is-invalid");
  asientos.classList.remove("is-invalid");
  textura.classList.remove("is-invalid");
  colorTapizado.classList.remove("is-invalid");

  if (estiloDeCostura.value === "nada") {
    estiloDeCostura.classList.add("is-invalid");
    formValido = false;
  }
  if (colorCostura.value === "nada") {
    colorCostura.classList.add("is-invalid");
    formValido = false;
  }
  if (asientos.value === "nada") {
    asientos.classList.add("is-invalid");
    formValido = false;
  }
  if (textura.value === "nada") {
    textura.classList.add("is-invalid");
    formValido = false;
  }
  if (colorTapizado.value === "nada") {
    colorTapizado.classList.add("is-invalid");
    formValido = false;
  }

  return formValido;
}

function login() {
  const email = window.document.getElementById("inputEmail").value;
  const password = window.document.getElementById("inputPassword");
  const user = usuarios[email];
  if (user && user.password === password.value) {
    localStorage.setItem(
      "user",
      JSON.stringify({
        email: email,
        displayName: user.displayName,
      })
    );
    window.document.getElementById("nombre").innerText = user.displayName;
    window.document.getElementById("email").innerText = email;
    loginModal.hide();
  } else {
    password.classList.add("is-invalid");
  }
}

function logout() {
  localStorage.removeItem("user");
  window.document.getElementById("nombre").innerText = "";
  window.document.getElementById("email").innerText = "";
  loginModal.show();
}

function hacerPresupuesto() {
  const cuponDeDescuento = window.document.getElementById("cupon").value;
  const descuento = validarCupon(cuponDeDescuento);
  window.document.getElementById("descuento").innerHTML = descuento;

  if (!validarFormulario()) {
    return;
  }

  const estiloDeCostura = window.document.getElementById("estiloDeCostura").value;
  const colorCostura = window.document.getElementById("colorCostura").value;
  const asientos = window.document.getElementById("asientos").value;
  const textura = window.document.getElementById("textura").value;
  const colorTapizado = window.document.getElementById("colorTapizado").value;

  let precioSubTotal =
    precioMetroCuadradoTextura[textura].precio *
    asientos *
    factorDePrecioPorColor(colorTapizado) *
    metrosCuadradoPromedioPorAsiento *
    factorDePrecioPorEstiloCostura(estiloDeCostura) *
    factorDePrecioPorColorCostura(colorCostura);

  precioSubTotal = Math.round(precioSubTotal);

  let precioTotal = ((100 - descuento) * precioSubTotal) / 100;

  precioTotal = Math.round(precioTotal);

  window.document.getElementById("sub-total").innerHTML = precioSubTotal;
  window.document.getElementById("total").innerHTML = precioTotal;
}

const userItem = localStorage.getItem("user");
if (!userItem) {
  loginModal.show();
} else {
  const user = JSON.parse(userItem);
  window.document.getElementById("nombre").innerText = user.displayName;
  window.document.getElementById("email").innerText = user.email;
}
