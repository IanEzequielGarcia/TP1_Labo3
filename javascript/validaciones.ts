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
function AdministrarValidaciones():boolean
{
    let dni : string = (<HTMLInputElement> document.getElementById("inDNI")).value;
    let nombre : string = (<HTMLInputElement> document.getElementById("inNombre")).value;
    let sexo: string = (<HTMLInputElement> document.getElementById("sexo")).value;
    let legajo : string = (<HTMLInputElement> document.getElementById("inLegajo")).value;
    let sueldo : string = (<HTMLInputElement> document.getElementById("inSueldo")).value;
    let apellido : string = (<HTMLInputElement> document.getElementById("inApellido")).value;
    let foto : string = (<HTMLInputElement> document.getElementById("inFoto")).value;

    AdministrarSpanError("dApellido",ValidarCamposVacios(apellido));
    AdministrarSpanError("dFoto",ValidarCamposVacios(foto));
    AdministrarSpanError("dNombre",ValidarCamposVacios(nombre));
    AdministrarSpanError("dDni", ValidarCamposVacios(dni)&&ValidarRangoNumerico(parseInt(dni),1000000,55000000));
    AdministrarSpanError("dLegajo", ValidarCamposVacios(legajo)&&ValidarRangoNumerico(parseInt(legajo),100,550));
    AdministrarSpanError("dSueldo", ValidarCamposVacios(sueldo)&&ValidarRangoNumerico(parseInt(sueldo),1,ObtenerSueldoMaximo(ObtenerTurnoSeleccionado())) );
    AdministrarSpanError("dSexo",ValidarCombo(sexo.toString(),"Seleccione"));
    AdministrarSpanError("dTurno",ValidarCombo(ObtenerTurnoSeleccionado(),"ninguno"));
    if(VerificarValidaciones())
    {
        return true;
    }
    return false;
}
function VerificarValidaciones():boolean
{
    if(document.getElementById("dDni")!.style.display == "none"
        &&document.getElementById("dApellido")!.style.display == "none"
        &&document.getElementById("dNombre")!.style.display == "none"
        &&document.getElementById("dSueldo")!.style.display == "none"
        &&document.getElementById("dSexo")!.style.display == "none"
        &&document.getElementById("dLegajo")!.style.display == "none"
        &&document.getElementById("dTurno")!.style.display == "none"
        &&document.getElementById("dFoto")!.style.display == "none"
    ){
        return true;
    }else{
        return false;
    }
}
function ValidarCamposVacios(ingresado:string):boolean
{
    if(ingresado != "" || ingresado == null)
    {
        return true;
    }
    return false;
}
function ValidarRangoNumerico(num:number, min:number, maxNum:number): boolean
{
    if(num>min&&num<maxNum)
    {return true;}
    return false;
}
function ValidarCombo(str:string, str2:string): boolean
{
    if(str!==str2)
    { return true;}
    else
    { return false;}
}
function ObtenerTurnoSeleccionado(): string
{
    var mañana:boolean = (<HTMLInputElement> document.getElementById("radioM")).checked;
    var tarde:boolean = (<HTMLInputElement> document.getElementById("radioT")).checked;
    var noche:boolean = (<HTMLInputElement> document.getElementById("radioN")).checked;

    if(mañana)
    {
        return "mañana";
    }
    else if(tarde)
    {
        return "tarde";
    }else if(noche){
        return "noche";
    }else{
        return "ninguno";
    }
}
function ObtenerSueldoMaximo(str:string): number
{
    if(str==="mañana")
    {
        return 20000;
    }else if(str==="tarde")
    {
        return 18500;
    }else{return 25000;}
}



function AdministrarValidacionesLogin()
{
    let dni : string = (<HTMLInputElement> document.getElementById("dniInput")).value;
    let apellido : string = (<HTMLInputElement> document.getElementById("apellidoInput")).value;

    AdministrarSpanError("displayDni", ValidarCamposVacios(dni)&&ValidarRangoNumerico(parseInt(dni),1000000,55000000));
    AdministrarSpanError("displayApellido", ValidarCamposVacios(apellido));
    VerificarValidacionesLogin();
}
function AdministrarSpanError(string:string, boolean:boolean):void
{
    if(!boolean)
    {
        document.getElementById(string)!.style.setProperty("display","block");
    }else{
        document.getElementById(string)!.style.setProperty("display","none");
    }
}
function  VerificarValidacionesLogin():boolean
{
    if(document.getElementById("displayDni")!.style.display == "none"
    &&document.getElementById("displayApellido")!.style.display == "none")
    {
        return true;
    }else{
        return false;
    }
}
function AdministrarModificar(dni:string){
    (<HTMLInputElement> document.getElementById("inDniHidden")).value=dni;
    var myForm = <HTMLFormElement>document.getElementById('modForm');
    myForm.submit();
}
function Modificar(arrayElementos:string[])
{
    (<HTMLInputElement> document.getElementById("h2")).innerHTML = "Modificar";
    (<HTMLInputElement> document.getElementById("titulo")).innerHTML = "HTML5 Formulario Modificar Empleado";
    (<HTMLInputElement> document.getElementById("btnEnviar")).value = "Modificar";

    (<HTMLInputElement> document.getElementById("inApellido")).value = arrayElementos[0];
    (<HTMLInputElement> document.getElementById("inNombre")).value = arrayElementos[1];
    (<HTMLInputElement> document.getElementById("inDNI")).value = arrayElementos[2];
    (<HTMLInputElement> document.getElementById("sexo")).value = arrayElementos[3];

    (<HTMLInputElement> document.getElementById("inSueldo")).value = arrayElementos[4];
    (<HTMLInputElement> document.getElementById("inLegajo")).value = arrayElementos[5];
    (<HTMLInputElement> document.getElementById("inDNI")).setAttribute("readonly","readonly");
    (<HTMLInputElement> document.getElementById("inLegajo")).setAttribute("readonly","readonly");

    if(arrayElementos[6]=="mañana")
    {
        (<HTMLInputElement> document.getElementById("radioM")).checked = true;
    }else if(arrayElementos[6]=="tarde"){
        (<HTMLInputElement> document.getElementById("radioT")).checked= true;
    }else{
        (<HTMLInputElement> document.getElementById("radioN")).checked= true;
    }
}