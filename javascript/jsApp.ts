///<reference path="validaciones.ts" />

class MiAjax 
{
    private _xhr: XMLHttpRequest;

    private static DONE : number;
    private static OK : number;

    public constructor() {
        this._xhr = new XMLHttpRequest();
        MiAjax.DONE = 4;
        MiAjax.OK = 200;
    }

    public Get = (ruta: string, params: string = ""):void => {
    
        let parametros:string = params.length > 0 ? params : "";
        ruta = params.length > 0 ? ruta + "?" + parametros : ruta;

        this._xhr.open('GET', ruta);
        this._xhr.setRequestHeader("enctype", "multipart/form-data");
        this._xhr.send();
    };

    public Post = (parametros:string,ruta:string):void =>{

        this._xhr.open('POST', ruta, true);
        this._xhr.setRequestHeader("enctype", "multipart/form-data");
        this._xhr.send(parametros);
    };
}

namespace Main{
    const xmlhttp : XMLHttpRequest = new XMLHttpRequest();
    const ajax : MiAjax = new MiAjax();
    export function AgregarEmpleados():void {
        AdministrarValidaciones();
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
        setTimeout(ActualizarEmpleados,500);
    }
    export function MostrarEmpleados():void {
        setTimeout(function(){
            
            xmlhttp.open("GET","./mostrar.php",true);
            xmlhttp.send();
            xmlhttp.onreadystatechange = () => {
                (<HTMLInputElement> document.getElementById("Mostrar")).innerHTML=xmlhttp.responseText;
            }
        },5000);
    }
    export function ActualizarEmpleados():void {
        xmlhttp.open("GET","./mostrar.php",true);
        xmlhttp.send();
        xmlhttp.onreadystatechange = () => {
            (<HTMLInputElement> document.getElementById("Mostrar")).innerHTML=xmlhttp.responseText;
        }
    }
    export function EliminarEmpleados(legajo:number):void {
        xmlhttp.open("GET", "./eliminar.php?legajo=" + legajo, true);
        xmlhttp.send();
        setTimeout(ActualizarEmpleados,500);
    }

    export function ModificarEmpleados(arrayElementos:string[]):void {
        Modificar(arrayElementos);
        setTimeout(ActualizarEmpleados,500);
        AgregarEmpleados();
    }
}