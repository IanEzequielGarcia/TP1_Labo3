"use strict";
exports.__esModule = true;
exports.Main = void 0;
/// <reference path="validaciones.ts" />
window.onload = function () {
    Main.ActualizarIndex();
    Main.ActualizarEmpleados();
};
var Main;
(function (Main) {
    function AgregarEmpleados() {
        if (AdministrarValidaciones()) {
            var xmlhttp_1 = new XMLHttpRequest();
            xmlhttp_1.open("POST", "./administracion.php", true);
            var formD = new FormData();
            xmlhttp_1.setRequestHeader("enctype", "multipart/form-data");
            if (document.getElementById("hdnModificar")) {
                var modificar = document.getElementById("hdnModificar").value;
                formD.append('dniI', modificar);
            }
            var dni = document.getElementById("inDNI").value;
            var nombre = document.getElementById("inNombre").value;
            var sexo = document.getElementById("sexo").value;
            var legajo = document.getElementById("inLegajo").value;
            var sueldo = document.getElementById("inSueldo").value;
            var apellido = document.getElementById("inApellido").value;
            var foto = document.getElementById("inFoto");
            var turno = ObtenerTurnoSeleccionado();
            formD.append('dni', dni);
            formD.append('apellido', apellido);
            formD.append('nombre', nombre);
            formD.append('sexo', sexo);
            formD.append('sueldo', sueldo);
            formD.append('legajo', legajo);
            formD.append('legajo', legajo);
            formD.append('radTurno', turno);
            formD.append('foto', foto.files[0]);
            xmlhttp_1.send(formD);
            xmlhttp_1.onreadystatechange = function () {
                if (xmlhttp_1.readyState === 4) {
                    if (xmlhttp_1.status === 200) {
                        setTimeout(Main.ActualizarEmpleados, 500);
                    }
                }
            };
        }
    }
    Main.AgregarEmpleados = AgregarEmpleados;
    function ActualizarIndex() {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", "./index.php", true);
        xmlhttp.send();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4) {
                if (xmlhttp.status === 200) {
                    if (document.getElementById("IndexAjax")) {
                        document.getElementById("IndexAjax").innerHTML = xmlhttp.responseText;
                    }
                }
            }
        };
    }
    Main.ActualizarIndex = ActualizarIndex;
    function ActualizarEmpleados() {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", "../backend/mostrar.php", true);
        xmlhttp.send();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4) {
                if (xmlhttp.status === 200) {
                    if (document.getElementById("MostrarAjax")) {
                        document.getElementById("MostrarAjax").innerHTML = xmlhttp.responseText;
                    }
                }
            }
        };
    }
    Main.ActualizarEmpleados = ActualizarEmpleados;
    function EliminarEmpleados(legajo) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", "./eliminar.php?legajo=" + legajo, true);
        xmlhttp.send();
        setTimeout(ActualizarEmpleados, 500);
    }
    Main.EliminarEmpleados = EliminarEmpleados;
    function ModificarEmpleados(dni, desdeMostrar) {
        var xmlhttp = new XMLHttpRequest();
        var boolRedirect = false;
        if (desdeMostrar) {
            xmlhttp.open("POST", "../php/index.php", true);
            boolRedirect = true;
        }
        else {
            xmlhttp.open("POST", "./index.php", true);
        }
        var formD = new FormData();
        formD.append("dniH", dni);
        xmlhttp.send(formD);
        xmlhttp.onreadystatechange = function () {
            if (document.getElementById("IndexAjax")) {
                document.getElementById("IndexAjax").innerHTML = xmlhttp.responseText;
            }
        };
        return boolRedirect;
    }
    Main.ModificarEmpleados = ModificarEmpleados;
})(Main = exports.Main || (exports.Main = {}));
