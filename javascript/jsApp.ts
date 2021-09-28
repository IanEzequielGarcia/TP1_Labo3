///<reference path="validaciones.ts" />

export class Ajax
{
    private xhr: XMLHttpRequest;
    private static DONE : number;
    private static OK : number;

    public constructor()
    {
        this.xhr = new XMLHttpRequest();
        Ajax.DONE = 4;
        Ajax.OK = 200;
    }

    public Get = (ruta: string, success: Function, params: string = "", error?: Function): void =>
    {
        let parametros = params.length > 0 ? params : "";

        ruta = params.length > 0 ? ruta + "?" + parametros : ruta;

        this.xhr.open('GET', ruta);
        this.xhr.send();

        this.xhr.onreadystatechange = (): void => {

            if (this.xhr.readyState === Ajax.DONE)
            {
                if (this.xhr.status === Ajax.OK)
                {
                    success(this.xhr.responseText);
                }
                else
                {
                    if (error !== undefined)
                    {
                        error(this.xhr.status);
                    }
                }
            }
        };
    };

    public Post = (ruta: string, success: Function, params: string | FormData = "", error?: Function):void => 
    {
        this.xhr.open('POST', ruta, true);
        
        if(typeof(params) == "string")
        {
            this.xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
        }
        else
        {
            this.xhr.setRequestHeader("enctype","multipart/form-data");
        }
        this.xhr.send(params);

        this.xhr.onreadystatechange = ():void => {

            if (this.xhr.readyState === Ajax.DONE)
            {
                if (this.xhr.status === Ajax.OK)
                {
                    success(this.xhr.responseText);
                }
                else
                {
                    if (error !== undefined)
                    {
                        error(this.xhr.status);
                    }
                }
            }
        };
    };
}
namespace Main{
    const xmlhttp : XMLHttpRequest = new XMLHttpRequest();
    function Success(retorno:string):void {
        console.clear();
        console.log(retorno);
    }

    function Fail(retorno:string):void {
        console.clear();
        console.log(retorno);
    }
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
    export function ActualizarEmpleados():void {
        xmlhttp.open("GET","./mostrar.php",true);
        xmlhttp.send();
        xmlhttp.onreadystatechange = () => {
            if(<HTMLInputElement> document.getElementById("Mostrar"))
            {
                (<HTMLInputElement> document.getElementById("Mostrar")).innerHTML=xmlhttp.responseText;
            }
        }
    }
    export function EliminarEmpleados(legajo:number):void {
        xmlhttp.open("GET", "./eliminar.php?legajo=" + legajo, true);
        xmlhttp.send();
        setTimeout(ActualizarEmpleados,500);
    }

    export function ModificarEmpleados(dni:string):boolean {
        //(<HTMLInputElement> document.getElementById("inDniHidden")).value=dni;
        //var myForm = <HTMLFormElement>document.getElementById('modForm');
        //myForm.submit();
        let param:string = "dniH="+dni;
        let miAjax:Ajax = new Ajax();
        miAjax.Post("./ajax.php",Success,param,Fail);
        
        xmlhttp.open("POST", "./ajax.php", true);
        var formD = new FormData();
        formD.append("dniH",dni);
        xmlhttp.send(formD);
        if(<HTMLInputElement> document.getElementById("Index"))
        {
            (<HTMLInputElement> document.getElementById("Index")).innerHTML=xmlhttp.responseText;
        }
        else { console.log(xmlhttp.responseText);}
        ActualizarEmpleados();
        //echo "<form method='POST' action='./index.php' id='modForm'>";
        //echo "<form method='POST' action='./ajax.php' id='modForm'>";
        //echo '<input type="hidden" id="inDniHidden" name="dniH">';
        //echo "</form>";
        //Modificar(arrayElementos);
        //AgregarEmpleados();
        return false;
    }
}