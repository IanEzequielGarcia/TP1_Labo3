/*
Crear en TypeScript las funciones necesarias para verificar que todos los campos de la página, index.html, sean enviados correctamente.
Para ello, asociar al evento click del botón Enviar (btnEnviar) una función que administre dicha tarea, mostrando mensajes de error o permitiendo el “envio”, según corresponda.
La función se llamará AdministrarValidaciones y será la encargada de invocar a otras funciones que verifiquen: Campos no vacíos.
oValidarCamposVacios(string): boolean. Recibe como parámetro el valor del atributoid del campo a ser validado. Retorna true si no está vacío o false caso contrario.
Rangos numéricos correctos. oValidarRangoNumerico(number, number, number): boolean. Recibe como parámetro el valor a ser validado y los valores mínimos y máximos del rango.
Retorna true si el valor pertenece al rango o false caso contrario.Selección del sexo. oValidarCombo(string, string): boolean.
Recibe como parámetro el valor del atributo id del combo a ser validado y el valor que no debe de tener.
Retorna true si no coincide o false caso contrario.Verificación del tuno y sueldo máximo.oObtenerTurnoSeleccionado(): string.
Retorna el valor del elemento (type=radio) seleccionado por el usuario. Verificar atributo checked.oObtenerSueldoMaximo(string): number.
Recibe como parámetro el valor del turno elegido y retornará el valor del sueldo máximo.Según corresponda, se mostrarán mensajes (por consola y alerts) informando el error encontrado.
Estas funciones estarán en el archivo validaciones.ts, que luego de ser transpilado, se agregarán al index.html como funciones.js (utilizar el comando --outfile).
*/
function AdministrarValidaciones() {
    var dni = document.getElementById("inDNI").value;
    var nombre = document.getElementById("inNombre").value;
    var sexo = document.getElementById("sexo").value;
    var legajo = document.getElementById("inLegajo").value;
    var sueldo = document.getElementById("inSueldo").value;
    var apellido = document.getElementById("inApellido").value;
    var foto = document.getElementById("inFoto").value;
    AdministrarSpanError("dApellido", ValidarCamposVacios(apellido));
    AdministrarSpanError("dFoto", ValidarCamposVacios(foto));
    AdministrarSpanError("dNombre", ValidarCamposVacios(nombre));
    AdministrarSpanError("dDni", ValidarCamposVacios(dni) && ValidarRangoNumerico(parseInt(dni), 1000000, 55000000));
    AdministrarSpanError("dLegajo", ValidarCamposVacios(legajo) && ValidarRangoNumerico(parseInt(legajo), 100, 550));
    AdministrarSpanError("dSueldo", ValidarCamposVacios(sueldo) && ValidarRangoNumerico(parseInt(sueldo), 1, ObtenerSueldoMaximo(sueldo)));
    sexo = sexo.slice(1, 2);
    if (sexo == "2") {
        sexo = "H";
    }
    else if (sexo == "3") {
        sexo = "M";
    }
    else {
        sexo = "Seleccione";
    }
    AdministrarSpanError("dSexo", ValidarCombo(sexo.toString(), "Seleccione"));
    AdministrarSpanError("dTurno", ValidarCombo(ObtenerTurnoSeleccionado(), "ninguno"));
    VerificarValidaciones();
}
function VerificarValidaciones() {
    if (document.getElementById("dDni").style.display == "none"
        && document.getElementById("dApellido").style.display == "none"
        && document.getElementById("dNombre").style.display == "none"
        && document.getElementById("dSueldo").style.display == "none"
        && document.getElementById("dSexo").style.display == "none"
        && document.getElementById("dLegajo").style.display == "none"
        && document.getElementById("dTurno").style.display == "none"
        && document.getElementById("dFoto").style.display == "none") {
        return true;
    }
    else {
        return false;
    }
}
function ValidarCamposVacios(ingresado) {
    if (ingresado != "" || ingresado == null) {
        return true;
    }
    return false;
}
function ValidarRangoNumerico(num, min, maxNum) {
    if (num > min && num < maxNum) {
        return true;
    }
    return false;
}
function ValidarCombo(str, str2) {
    if (str !== str2) {
        return true;
    }
    else {
        return false;
    }
}
function ObtenerTurnoSeleccionado() {
    var mañana = document.getElementById("radioM").checked;
    var tarde = document.getElementById("radioT").checked;
    var noche = document.getElementById("radioN").checked;
    if (mañana) {
        return "mañana";
    }
    else if (tarde) {
        return "tarde";
    }
    else if (noche) {
        return "noche";
    }
    else {
        return "ninguno";
    }
}
function ObtenerSueldoMaximo(str) {
    if (str === "Mañana") {
        return 20000;
    }
    else if (str === "Tarde") {
        return 18500;
    }
    else {
        return 25000;
    }
}
function AdministrarValidacionesLogin() {
    var dni = document.getElementById("dniInput").value;
    var apellido = document.getElementById("apellidoInput").value;
    AdministrarSpanError("displayDni", ValidarCamposVacios(dni) && ValidarRangoNumerico(parseInt(dni), 1000000, 55000000));
    AdministrarSpanError("displayApellido", ValidarCamposVacios(apellido));
    VerificarValidacionesLogin();
}
function AdministrarSpanError(string, boolean) {
    if (!boolean) {
        document.getElementById(string).style.setProperty("display", "block");
    }
    else {
        document.getElementById(string).style.setProperty("display", "none");
    }
}
function VerificarValidacionesLogin() {
    if (document.getElementById("displayDni").style.display == "none"
        && document.getElementById("displayApellido").style.display == "none") {
        return true;
    }
    else {
        return false;
    }
}
function AdministrarModificar(dni) {
    document.getElementById("inDniHidden").value = dni;
    var myForm = document.getElementById('modForm');
    myForm.submit();
}
function Modificar(arrayElementos) {
    document.getElementById("h2").innerHTML = "Modificar";
    document.getElementById("titulo").innerHTML = "HTML5 Formulario Modificar Empleado";
    document.getElementById("btnEnviar").innerHTML = "Modificar";
    document.getElementById("inApellido").value = arrayElementos[0];
    document.getElementById("inNombre").value = arrayElementos[1];
    document.getElementById("inDNI").value = arrayElementos[2];
    if (arrayElementos[3] == "H") {
        arrayElementos[3] = "“2”";
    }
    else if (arrayElementos[3] == "M") {
        arrayElementos[3] = "“3”";
    }
    document.getElementById("sexo").value = arrayElementos[3];
    document.getElementById("inSueldo").value = arrayElementos[4];
    document.getElementById("inLegajo").value = arrayElementos[5];
    document.getElementById("inDNI").setAttribute("readonly", "readonly");
    document.getElementById("inLegajo").setAttribute("readonly", "readonly");
    if (arrayElementos[6] == "mañana") {
        document.getElementById("radioM").checked = true;
    }
    else if (arrayElementos[6] == "tarde") {
        document.getElementById("radioT").checked = true;
    }
    else {
        document.getElementById("radioN").checked = true;
    }
    //(<HTMLInputElement> document.getElementById("inFoto")).value = arrayElementos[7]+arrayElementos[8];
}
