///<reference path="validaciones.ts" />
var MiAjax = /** @class */ (function () {
    function MiAjax() {
        var _this = this;
        this.Get = function (ruta, params) {
            if (params === void 0) { params = ""; }
            var parametros = params.length > 0 ? params : "";
            ruta = params.length > 0 ? ruta + "?" + parametros : ruta;
            _this._xhr.open('GET', ruta);
            _this._xhr.setRequestHeader("enctype", "multipart/form-data");
            _this._xhr.send();
        };
        this.Post = function (parametros, ruta) {
            _this._xhr.open('POST', ruta, true);
            _this._xhr.setRequestHeader("enctype", "multipart/form-data");
            _this._xhr.send(parametros);
        };
        this._xhr = new XMLHttpRequest();
        MiAjax.DONE = 4;
        MiAjax.OK = 200;
    }
    return MiAjax;
}());
var Main;
(function (Main) {
    var xmlhttp = new XMLHttpRequest();
    var ajax = new MiAjax();
    function AgregarEmpleados() {
        AdministrarValidaciones();
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
        setTimeout(ActualizarEmpleados, 500);
    }
    Main.AgregarEmpleados = AgregarEmpleados;
    function MostrarEmpleados() {
        setTimeout(function () {
            xmlhttp.open("GET", "./mostrar.php", true);
            xmlhttp.send();
            xmlhttp.onreadystatechange = function () {
                document.getElementById("Mostrar").innerHTML = xmlhttp.responseText;
            };
        }, 5000);
    }
    Main.MostrarEmpleados = MostrarEmpleados;
    function ActualizarEmpleados() {
        xmlhttp.open("GET", "./mostrar.php", true);
        xmlhttp.send();
        xmlhttp.onreadystatechange = function () {
            document.getElementById("Mostrar").innerHTML = xmlhttp.responseText;
        };
    }
    Main.ActualizarEmpleados = ActualizarEmpleados;
    function EliminarEmpleados(legajo) {
        xmlhttp.open("GET", "./eliminar.php?legajo=" + legajo, true);
        xmlhttp.send();
        setTimeout(ActualizarEmpleados, 500);
    }
    Main.EliminarEmpleados = EliminarEmpleados;
    function ModificarEmpleados(arrayElementos) {
        Modificar(arrayElementos);
        setTimeout(ActualizarEmpleados, 500);
        AgregarEmpleados();
    }
    Main.ModificarEmpleados = ModificarEmpleados;
})(Main || (Main = {}));
