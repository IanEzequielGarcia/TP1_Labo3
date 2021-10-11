"use strict";
exports.__esModule = true;
exports.Main = exports.Ajax = void 0;
/// <reference path="validaciones.ts" />
window.onload = function () {
    Main.ActualizarIndex();
    Main.ActualizarEmpleados();
};
var Ajax = /** @class */ (function () {
    function Ajax() {
        var _this = this;
        this.Get = function (ruta, success, params, error) {
            if (params === void 0) { params = ""; }
            var parametros = params.length > 0 ? params : "";
            ruta = params.length > 0 ? ruta + "?" + parametros : ruta;
            _this.xhr.open('GET', ruta);
            _this.xhr.send();
            _this.xhr.onreadystatechange = function () {
                if (_this.xhr.readyState === Ajax.DONE) {
                    if (_this.xhr.status === Ajax.OK) {
                        success(_this.xhr.responseText);
                    }
                    else {
                        if (error !== undefined) {
                            error(_this.xhr.status);
                        }
                    }
                }
            };
        };
        this.Post = function (ruta, success, params, error) {
            if (params === void 0) { params = ""; }
            _this.xhr.open('POST', ruta, true);
            if (typeof (params) == "string") {
                _this.xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            }
            else {
                _this.xhr.setRequestHeader("enctype", "multipart/form-data");
            }
            _this.xhr.send(params);
            _this.xhr.onreadystatechange = function () {
                if (_this.xhr.readyState === Ajax.DONE) {
                    if (_this.xhr.status === Ajax.OK) {
                        success(_this.xhr.responseText);
                    }
                    else {
                        if (error !== undefined) {
                            error(_this.xhr.status);
                        }
                    }
                }
            };
        };
        this.xhr = new XMLHttpRequest();
        Ajax.DONE = 4;
        Ajax.OK = 200;
    }
    return Ajax;
}());
exports.Ajax = Ajax;
var Main;
(function (Main) {
    function Success(retorno) {
        console.clear();
        console.log(retorno);
    }
    function Fail(retorno) {
        console.clear();
        console.log(retorno);
    }
    function AgregarEmpleados() {
        if (AdministrarValidaciones()) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("POST", "./administracion.php", true);
            var formD = new FormData();
            xmlhttp.setRequestHeader("enctype", "multipart/form-data");
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
            formD.append('foto', dni);
            formD.append('apellido', apellido);
            formD.append('nombre', nombre);
            formD.append('dni', dni);
            formD.append('sexo', sexo);
            formD.append('sueldo', sueldo);
            formD.append('legajo', legajo);
            formD.append('legajo', legajo);
            formD.append('radTurno', turno);
            formD.append('foto', foto.files[0]);
            xmlhttp.send(formD);
            Main.ActualizarEmpleados();
        }
    }
    Main.AgregarEmpleados = AgregarEmpleados;
    function Testear() {
        var xmlhttp = new XMLHttpRequest();
        //(<HTMLInputElement> document.getElementById("inDniHidden")).value=dni;
        //var myForm = <HTMLFormElement>document.getElementById('modForm');
        //myForm.submit();
        var param = "dniH=" + "1000001";
        var miAjax = new Ajax();
        miAjax.Post("./index.php", Success, param, Fail);
        xmlhttp.open("POST", "./index.php", true);
        var formD = new FormData();
        formD.append("dniH", "1000001");
        xmlhttp.send(formD);
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4) {
                if (xmlhttp.status === 200) {
                    //let index = document.open("./index.php");
                    //index.write(xmlhttp.responseText);
                    document.write(xmlhttp.responseText);
                    //(<HTMLInputElement> document.getElementById("Index")).innerHTML=xmlhttp.responseText;
                    //console.log(xmlhttp.responseText);
                }
            }
        };
    }
    Main.Testear = Testear;
    function ActualizarIndex() {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", "./index.php", true);
        xmlhttp.send();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4) {
                if (xmlhttp.status === 200) {
                    document.getElementById("IndexAjax").innerHTML = xmlhttp.responseText;
                }
            }
        };
    }
    Main.ActualizarIndex = ActualizarIndex;
    function ActualizarEmpleados() {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", "./backend/mostrar.php", true);
        xmlhttp.send();
        xmlhttp.onreadystatechange = function () {
            if (document.getElementById("MostrarAjax")) {
                document.getElementById("MostrarAjax").innerHTML = xmlhttp.responseText;
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
    function ModificarEmpleados(dni) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", "./index.php", true);
        var formD = new FormData();
        formD.append("dniH", dni);
        xmlhttp.send(formD);
        xmlhttp.onreadystatechange = function () {
            if (document.getElementById("IndexAjax")) {
                document.getElementById("IndexAjax").innerHTML = xmlhttp.responseText;
                console.log(xmlhttp.responseText);
            }
        };
        return false;
    }
    Main.ModificarEmpleados = ModificarEmpleados;
})(Main = exports.Main || (exports.Main = {}));
