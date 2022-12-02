const moneda = "USD";
const precioMetroCuadradoTextura = {
    liso: 20,
    arrugado: 30,
    poroso: 20,
    perforado: 25,
    micorPerforado: 35,
    combinado: 40,
    cuerina: 10
};

const metrosCuadradosMinimo = 5;
const metrosCuadradosMaximo = 12;
const metrosCuadradoPromedioPorAsiento = (metrosCuadradosMinimo+metrosCuadradosMaximo)/2;


function validarCupon (descuento){
    switch (descuento){
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

function factorDePrecioPorColor (color) {
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

function darBienvenida (saludo) {
    alert("Bienvenido "+saludo+". Usted esta por hacer un presupuesto");
}

let nombreIngresado   = "";
let apellidoIngresado = "";


do {
    nombreIngresado   = prompt("Ingresar nombre");
    apellidoIngresado = prompt("Ingresar apellido");
    if((nombreIngresado !="") && (apellidoIngresado !="")){
        darBienvenida(nombreIngresado+" "+apellidoIngresado); 
    }else{
        alert("Error: Debe ingresar nombre y apellido");
    }
    
} while (nombreIngresado===""||apellidoIngresado==="");


function hacerPresupuesto() {
    const cuponDeDescuento = window.document.getElementById("cupon").value;
    const descuento = validarCupon(cuponDeDescuento);
    window.document.getElementById("descuento").innerHTML = descuento;
    const asientos = window.document.getElementById("asientos").value;
    if (asientos==="nada") { 
        alert("Seleccione cantidad de asientos");
        return;
    }
    const textura = window.document.getElementById("textura").value;
    if (textura==="nada") { 
        alert("Seleccione textura");
        return;
    }
    const colorTapizado = window.document.getElementById("colorTapizado").value;
    if (colorTapizado==="nada") { 
        alert("Seleccione color de tapizado");
        return;
    }
    let precioSubTotal = precioMetroCuadradoTextura[textura]*asientos*factorDePrecioPorColor(colorTapizado)*metrosCuadradoPromedioPorAsiento;
    window.document.getElementById("sub-total").innerHTML = precioSubTotal;
    let precioTotal = (100-descuento)*precioSubTotal/100;
    window.document.getElementById("total").innerHTML = precioTotal;
}

