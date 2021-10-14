
/// <reference path="validaciones.ts" />
window.onload = function(){
    Main.ActualizarIndex();
    Main.ActualizarEmpleados();
}
export namespace Main{

    export function AgregarEmpleados():void 
    {
        if(AdministrarValidaciones())
        {
            const xmlhttp : XMLHttpRequest = new XMLHttpRequest();
            xmlhttp.open("POST","./administracion.php",true);
            var formD = new FormData();
            xmlhttp.setRequestHeader("enctype", "multipart/form-data");
            if((<HTMLInputElement> document.getElementById("hdnModificar"))){
                let modificar:string= (<HTMLInputElement> document.getElementById("hdnModificar")).value
                formD.append('dniI',modificar);
            }
            let dni : string        = (<HTMLInputElement> document.getElementById("inDNI")).value;
            let nombre : string     = (<HTMLInputElement> document.getElementById("inNombre")).value;
            let sexo: string        = (<HTMLInputElement> document.getElementById("sexo")).value;
            let legajo : string     = (<HTMLInputElement> document.getElementById("inLegajo")).value;
            let sueldo : string     = (<HTMLInputElement> document.getElementById("inSueldo")).value;
            let apellido : string   = (<HTMLInputElement> document.getElementById("inApellido")).value;
            let foto : any          = (<HTMLInputElement> document.getElementById("inFoto"));
            let turno:string        = ObtenerTurnoSeleccionado();
            
            formD.append('dni', dni);
            formD.append('apellido', apellido);
            formD.append('nombre', nombre);
            formD.append('sexo', sexo);
            formD.append('sueldo', sueldo);
            formD.append('legajo', legajo);
            formD.append('legajo', legajo);
            formD.append('radTurno', turno);
            formD.append('foto', foto.files[0]);
            xmlhttp.send(formD);
            xmlhttp.onreadystatechange = () => {
                if (xmlhttp.readyState === 4)
                {
                    if (xmlhttp.status === 200)
                    {
                        setTimeout(Main.ActualizarEmpleados,500);
                    }
                }
            }
        }
    }
    export function ActualizarIndex():void {
        const xmlhttp : XMLHttpRequest = new XMLHttpRequest();
        xmlhttp.open("GET","./index.php",true);
        xmlhttp.send();
        xmlhttp.onreadystatechange = () => {
            if (xmlhttp.readyState === 4)
            {
                if (xmlhttp.status === 200)
                {
                    (<HTMLInputElement> document.getElementById("IndexAjax")).innerHTML=xmlhttp.responseText;
                }
            }
        }
    }
    export function ActualizarEmpleados():void {
        const xmlhttp : XMLHttpRequest = new XMLHttpRequest();
        xmlhttp.open("GET","./backend/mostrar.php",true);
        xmlhttp.send();
        xmlhttp.onreadystatechange = () => {
            if (xmlhttp.readyState === 4)
            {
                if (xmlhttp.status === 200)
                {
                    if(<HTMLInputElement> document.getElementById("MostrarAjax"))
                    {
                        (<HTMLInputElement> document.getElementById("MostrarAjax")).innerHTML=xmlhttp.responseText;
                    }
                }
            }
        }
    }
    export function EliminarEmpleados(legajo:number):void {
        const xmlhttp : XMLHttpRequest = new XMLHttpRequest();
        xmlhttp.open("GET", "./eliminar.php?legajo=" + legajo, true);
        xmlhttp.send();
        setTimeout(ActualizarEmpleados,500);
    }

    export function ModificarEmpleados(dni:string):boolean {
        const xmlhttp : XMLHttpRequest = new XMLHttpRequest();
        xmlhttp.open("POST", "./index.php", true);
        var formD = new FormData();
        formD.append("dniH",dni);
        xmlhttp.send(formD);
        xmlhttp.onreadystatechange = () => {
        if(<HTMLInputElement> document.getElementById("IndexAjax"))
        {
            (<HTMLInputElement> document.getElementById("IndexAjax")).innerHTML=xmlhttp.responseText;
        }}
        return false;
    }
}