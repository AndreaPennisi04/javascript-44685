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

let texturaHTML = Object.keys(precioMetroCuadradoTextura).map((key) => {
  return `<option value= "${key}" > ${precioMetroCuadradoTextura[key].label}</option>`;
});

texturaHTML = [
  `<option value="nada">Seleccione una opcion</option>`,
  ...texturaHTML,
];

window.document.getElementById("textura").innerHTML = texturaHTML.join("");

const metrosCuadradosMinimo = 5;
const metrosCuadradosMaximo = 12;
const metrosCuadradoPromedioPorAsiento =
  (metrosCuadradosMinimo + metrosCuadradosMaximo) / 2;

function factorDePrecioPorColor(color) {
  switch (color) {
    case "negro":
      return 1;
      break;
    case "blanco":
      return 1.5;
      break;
    case "crema":
      return 2;
      break;
    case "grafito":
      return 1;
      break;
    case "gris":
      return 1.2;
      break;
    case "combinado":
      return 2.5;
      break;
    default:
      return 0;
      break;
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
      break;
    case "cremaCostura":
    case "blancoCostura":
      return 1.15;
      break;
    case "grafitoCostura":
      return 1.2;
      break;
    case "grisCostura":
      return 1.18;
      break;
    case "combinadoCostura":
      return 1.25;
      break;
    default:
      return 0;
      break;
  }
};

function validarCupon(descuento) {
  switch (descuento) {
    case "FELIZNAVIDAD":
      return 5;
      break;
    case "FELIZANIONUEVO":
      return 15;
      break;
    case "BLACKFRIDAY":
      return 10;
      break;
    default:
      return 0;
      break;
  }
}

function hacerPresupuesto() {
  const estiloDeCostura =
    window.document.getElementById("estiloDeCostura").value;
  if (estiloDeCostura === "nada") {
    alert("Seleccione estilo de costura");
    return;
  }

  const colorCostura = window.document.getElementById("colorCostura").value;
  if (colorCostura === "nada") {
    alert("Seleccione color de costura");
    return;
  }

  const cuponDeDescuento = window.document.getElementById("cupon").value;
  const descuento = validarCupon(cuponDeDescuento);
  window.document.getElementById("descuento").innerHTML = descuento;

  const asientos = window.document.getElementById("asientos").value;
  if (asientos === "nada") {
    alert("Seleccione cantidad de asientos");
    return;
  }

  const textura = window.document.getElementById("textura").value;
  if (textura === "nada") {
    alert("Seleccione textura");
    return;
  }

  const colorTapizado = window.document.getElementById("colorTapizado").value;
  if (colorTapizado === "nada") {
    alert("Seleccione color de tapizado");
    return;
  }

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
