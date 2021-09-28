<!DOCTYPE html>
<?php
    include_once "./fabrica.php";
    include_once "./backend/validarSesion.php";
echo "<table style='border:1px solid black;'>";
    echo "<tr>";
        echo "<td>";
            echo "<h2>Ian Garcia</h2>";
        echo "</td>";
    echo "</tr>";
    echo "<tr>";
    ?>
        <html>
            <head>
                <meta charset="utf-8">
                <title id="titulo">Formulario Alta Empleado</title>
                <script>var exports = {};</script>
                <script src="./javascript/funciones.js"></script>
                <script>var exports = {};</script>
                <script src="./javascript/jsApp.js"></script>
            </head>
            <body>
            <div id="Index">
            <form enctype="multipart/form-data" id="frmIngreso">
            <table align="left" style="border:1px solid black;">
                <tr>
                    <td><h2 id="h2">Datos personales</h2></td>
                </tr>
                <tr>
                    <td colspan="2"><hr /></td>
                </tr>
                <tr>
                    <td><label for="inDNI">DNI:</label></td>
                    <td><input type="number" min="1000000" max="55000000" id="inDNI" name="dni" required><span style="display: none;" id="dDni">*</span></td>
                </tr>
                <tr>
                    <td><label for="inApellido">Apellido:</label></td>
                    <td><input type="text" id="inApellido" name="apellido" required><span style="display: none;" id="dApellido">*</span></td>
                </tr>
                <tr>
                    <td><label for="inNombre">Nombre:</label></td>
                    <td><input type="text" id="inNombre" name="nombre" required><span style="display: none;" id="dNombre">*</span></td>
                </tr>
                <tr>
                    <td><label>Sexo</label></td>
                    <td>
                        <select size=“2” id="sexo" name="sexo" style="padding-right: 0.8em;" required>
                            <option value=“1” selected disabled>Seleccione</option>
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
                    <td><input type="number" min="100" max="550" id="inLegajo" name="legajo" required><span style="display: none;" id="dLegajo">*</span></td>  
                </tr>
                <br>
                <tr>
                    <td><label for="inSueldo">Sueldo</label></td>
                    <td><input type="number" min="8000" step="500" max="25000" id="inSueldo" name="sueldo" required><span style="display: none;" id="dSueldo" >*</span></td>
                </tr>
                <tr>
                    <td><H4>Turno:</H4></td>
                    <td><span style="display: none;" id="dTurno">*</span></td>
                </tr>
                <tr>
                    <td><label for="radioM" >Mañana</label></td>
                    <td><input name="radTurno" id="radioM" type="radio" value="mañana" checked></td>
                </tr>
                <tr>
                    <td><label for="radioT">Tarde </label></td>
                    <td><input name="radTurno" id="radioT" type="radio" value="tarde"></td>
                </tr>
                <tr>
                    <td><label for="radioN">Noche</label> </td>
                    <td><input name="radTurno" id="radioN" type="radio" value="noche"></td>
                </tr>
                <tr>
                    <td align="center"><input type="file" id="inFoto" name="foto" accept=".png, .jpg, .jpeg, .gif, .bmp" required></td>
                    <td><span style="display: none;" id="dFoto">*</span></td>
                </tr>
                <tr>
                    <td colspan="2" align="right"><input type="reset"  value="Limpiar"></td>
                </tr>
                <tr>
                    <td colspan="2" align="right"><input type="submit" value="Enviar" id="btnEnviar" onclick="Main.AgregarEmpleados()"></td>
                </tr>
            </table>
                <?php
                if(isset($_POST["dniH"]))
                {
                    $DNIEmpleado=($_POST["dniH"]);
                    $ar = fopen("./archivos/empleados.txt",'r');
                    $fabrica = new Fabrica("Modificar");
                    $fabrica->TraerDeArchivo("./archivos/empleados.txt");
                    foreach($fabrica->GetEmpelados() as $empleados)
                    {
                        if($empleados->GetDni()==$_POST["dniH"])
                        {
                            $Enviado = array($empleados->GetApellido(),$empleados->GetNombre(),
                            $empleados->GetDni(),$empleados->GetSexo(),$empleados->GetSueldo(),$empleados->GetLegajo(),$empleados->GetTurno(),$empleados->GetFoto());
                            echo '<script>Modificar('.json_encode($Enviado).');</script>';
                            echo '<input type="hidden" id="hdnModificar" name="dniI" value='.$empleados->GetDni().'>';
                        }
                    }
                    ?>  <script>Main.ActualizarEmpleados();alert("entro");</script><?php
                }
                ?>
            </form>
            </body>
            </div>
        </html>
            <?php
    echo "</tr>";
    ?>
    <html>
        <head>
                <script>var exports = {};</script>
                <script src="./javascript/funciones.js"></script>
                <script>var exports = {};</script>
                <script src="./javascript/jsApp.js"></script>
        </head>
    <tr>
        <div id="Mostrar" style="border:1px solid black;">
        <script>
            Main.ActualizarEmpleados();
        </script>
        </div>
    </tr>
    <tr style="border:1px solid black; top:-100px">
        <A href="./cerrarSesion.php">Cerrar Sesión</A>
    </tr>
    </table>
    </html>
    