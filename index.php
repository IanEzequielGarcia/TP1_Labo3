<?php 
    include_once "./fabrica.php";
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title id="titulo">Formulario Alta Empleado</title>
        <link rel="stylesheet" href="">
        <script src="./javascript/funciones.js"></script>
    </head>

    <body>
    <form action="./administracion.php" method="POST" enctype="multipart/form-data">
    <table align="center">
        <tr>
            <td><h2 id="h2">Datos personales</h2></td>
        </tr>
        <tr>
            <td colspan="2"><hr /></td>
        </tr>
        <tr>
            <td><label for="inDNI">DNI:</label></td>
            <td><input type="text" id="inDNI" name="dni"><span style="display: none;" id="dDni">*</span></td>
        </tr>
        <tr>
            <td><label for="inApellido">Apellido:</label></td>
            <td><input type="text" id="inApellido" name="apellido"><span style="display: none;" id="dApellido">*</span></td>
        </tr>
        <tr>
            <td><label for="inNombre">Nombre:</label></td>
            <td><input type="text" id="inNombre" name="nombre"><span style="display: none;" id="dNombre">*</span></td>
        </tr>
        <tr>
            <td><label>Sexo</label></td>
            <td>
                <select size=“2” id="sexo" name="sexo" style="padding-right: 0.8em;">
                    <option value=“1” selected disabled >Seleccione</option>
                    <option value=“2”>Hombre</option>
                    <option value=“3”>Mujer</option>
                </select>
            </td>
        </tr>
        <tr>
            <td> <td><span style="display: none;" id="dSexo">*</span></td></td>
        </tr>
        <tr>
            <td><h4 >Datos Laborales</h4></td>
        </tr>
        <tr>
            <td colspan="2"><hr /></td>
        </tr>
        <tr>
            <td><label for="inLegajo">Legajo:</label></td>
            <td><input type="text" id="inLegajo" name="legajo"><span style="display: none;" id="dLegajo">*</span></td>  
        </tr>
        <br>
        <tr>
            <td><label for="inSueldo">Sueldo</label></td>
            <td><input type="text" id="inSueldo" name="sueldo"><span style="display: none;" id="dSueldo">*</span></td>
        </tr>
        <tr>
            <td><H5>Turno:</H5></td>
            <td><span style="display: none;" id="dTurno">*</span></td>
        </tr>
        <tr style="text-align: center;">
            <td><label for="radioM" >Mañana</label></td>
            <td><input name="radTurno" id="radioM" type="radio" value="mañana"></td>
        </tr>
        <tr style="text-align: center;">
            <td><label for="radioT">Tarde </label></td>
            <td><input name="radTurno" id="radioT" type="radio" value="tarde"></td>
        </tr>
        <tr style="text-align: center;">
            <td><label for="radioN">Noche</label> </td>
            <td><input name="radTurno" id="radioN" type="radio" value="noche"></td>
        </tr>
        <tr>
            <td align="center"><input type="file" id="inFoto" name="foto" accept=".png, .jpg, .jpeg, .gif, .bmp"></td>
            <td><span style="display: none;" id="dFoto">*</span></td>
        </tr>
        <hr>
        <tr>
            <td colspan="2" align="right"><input type="reset"  value="Limpiar"></td>
        </tr>
        <tr>
            <td colspan="2" align="right"><input type="submit" value="Enviar" id="btnEnviar" onclick="AdministrarValidaciones()"></td>
        </tr>
        <tr>
            <td colspan="2" align="center"><A href="./backend/cerrarSesion.php">Cerrar Sesión</A></td>
        </tr>
    </table>
    </form>
    </body>
</html>
<?php
    if(isset($_POST["dniH"]))
    {
        Modificar();
    }
    function Modificar()
    {
        $DNIEmpleado=($_POST["dniH"]);
        $ar = fopen("./archivos/empleados.txt",'r');
        $arrayElementos = array();
        while(!feof($ar))
        {
            $misEmpleados=fgets($ar);
            $arrayElementos=explode("-",$misEmpleados);
            if($arrayElementos[0]!="<br>" && sizeof($arrayElementos)>=7
            && $arrayElementos[2]==$DNIEmpleado)
            {
                $nuevoEmpelado = new Empleado($arrayElementos[0],$arrayElementos[1],$arrayElementos[2],
                $arrayElementos[3],$arrayElementos[4],$arrayElementos[5],$arrayElementos[6]);
                $nuevoEmpelado->SetFoto($arrayElementos[7]."-".$arrayElementos[8]);
                break;
            }
            $fabrica = new Fabrica("Modificar");
            $fabrica->TraerDeArchivo("./archivos/empleados.txt");
        }
    ?>   
        <script type="text/javascript">
            var miarray = "<?php echo $arrayElementos;?>";
            document.getElementById("h2").innerHTML = "Modificar";
            document.getElementById("titulo").innerHTML = "HTML5 Formulario Modificar Empleado";
            document.getElementById("btnEnviar").innerHTML = "Modificar";

            document.getElementById("inApellido").innerHTML = miarray[0];
            document.getElementById("inNombre").innerHTML = miarray[1];
            document.getElementById("inDNI").innerHTML = miarray[2];
            document.getElementById("inSexo").innerHTML = miarray[3];
            document.getElementById("radTurno").innerHTML = miarray[4];
            document.getElementById("inSueldo").innerHTML = miarray[5];
            document.getElementById("inLegajo").innerHTML = miarray[6];

            (document.getElementById("inLegajo")).setAttribute("readonly");
            (document.getElementById("inDni")).setAttribute("readonly");
            console.log("listo");
        </script>
<?php
    }
?>