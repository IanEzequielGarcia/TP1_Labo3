<?php 
    include_once "./fabrica.php";

    $dni       = "";
    //$foto      = null;
    $nombre    = "";
    $apellido  = "";
    $legajo    = "";
    $sueldo    = "";
    $sexo      = "Seleccione";
    $boton     = "Enviar";
    $turno     = "Mañana";
    $h2        = "HTML 5 – Formulario Alta Empleado";
    $h4        = "Formulario Alta de empleado";

    if(isset($_POST["dniH"]))
    {
        $DNIEmpleado=$_POST["dniH"];
        $fabrica = new Fabrica("Modificar",100);
        $fabrica->TraerDeArchivo("../archivos/empleados.txt");
        foreach($fabrica->GetEmpelados() as $empleados)
        {
            if($empleados->GetDni()==$_POST["dniH"])
            {
                $dni       = $empleados->GetDni();
                $nombre    = $empleados->GetNombre();
                $apellido  = $empleados->GetApellido();
                //$foto      = $empleados->GetFoto();
                $sueldo    = $empleados->GetSueldo();
                $legajo    = $empleados->GetLegajo();
                $sexo      = $empleados->GetSexo();
                $boton     = "Modificar";
                $turno     = $empleados->GetTurno();
                $h4        = "Formulario Modificar empleado";
                $h2        = "HTML 5 – Formulario Modificar Empleado";
                //$Enviado = array($empleados->GetApellido(),$empleados->GetNombre(),
                //$empleados->GetDni(),$empleados->GetSexo(),$empleados->GetSueldo(),$empleados->GetLegajo(),$empleados->GetTurno(),$empleados->GetFoto());
                //echo '<script type="text/javascript">Main.Modificar('.json_encode($Enviado).')</script>';
                //echo '<script type="text/javascript">Modificar('.json_encode($Enviado).')</script>';
                echo '<input type="hidden" id="hdnModificar" name="dniI" value='.$empleados->GetDni().'>';
            }
        }
    }
?>
<!DOCTYPE html>
<html>
    <div id="Index">
    <head>
        <meta charset="utf-8">
        <title id="titulo" value="<?php echo $h4?>"></title>
        <script src="../javascript/funciones.js"></script>
        <script>var exports = {};</script>
        <script src="../javascript/jsApp.js"></script>
    </head>

    <body>
        <form enctype="multipart/form-data" id="frmIngreso">
        <!--<form action="./administracion.php" method="POST" enctype="multipart/form-data">-->
        <table align="center">
            <tr>
                <td><h2 id="h2">Datos personales</h2></td>
            </tr>
            <tr>
                <td colspan="2"><hr /></td>
            </tr>
            <tr>
                <td><label for="inDNI">DNI:</label></td>
                <?php
                if($dni=="")
                {
                echo '<td><input type="number" min="1000000" max="55000000" id="inDNI" name="dni" required><span style="display: none;" id="dDni">*</span></td>';
                }else{
                    echo '<td><input type="number" min="1000000" max="55000000" id="inDNI" name="dni" required readonly value="'.$dni.'"><span style="display: none;" id="dDni">*</span></td>';
                }
                ?> 
            </tr>
            <tr>
                <td><label for="inApellido">Apellido:</label></td>
                <td><input type="text" id="inApellido" name="apellido" required value="<?php echo $apellido?>"><span style="display: none;" id="dApellido">*</span></td>
            </tr>
            <tr>
                <td><label for="inNombre">Nombre:</label></td>
                <td><input type="text" id="inNombre" name="nombre" required  value="<?php echo $nombre?>"><span style="display: none;" id="dNombre">*</span></td>
            </tr>
            <tr>
                <td><label>Sexo</label></td>
                <td>
                    <select size=“2” id="sexo" name="sexo" style="padding-right: 0.8em;" required>
                        <?php
                            if($sexo=="H")
                            {
                                echo '<option value="N" disabled>Seleccione</option>';
                                echo '<option value="H" selected>Hombre</option>';
                                echo '<option value="M">Mujer</option>';
                            }else if ($sexo=="M")
                            {
                                echo '<option value="N" disabled>Seleccione</option>';
                                echo '<option value="H">Hombre</option>';
                                echo '<option value="M" selected>Mujer</option>';
                            }else{
                                echo '<option value="N" disabled selected>Seleccione</option>';
                                echo '<option value="H">Hombre</option>';
                                echo '<option value="M">Mujer</option>';
                            }
                        ?>
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
                <?php
                if($legajo=="")
                {
                echo '<td><input type="number" min="100" max="550" id="inLegajo" name="legajo" required><span style="display: none;" id="dLegajo">*</span></td>';
                }else{
                    echo '<td><input type="number" min="100" max="550" id="inLegajo" name="legajo" required readonly value="'.$legajo.'"><span style="display: none;" id="dLegajo">*</span></td>';
                }
                ?> 
            </tr>
            <br>
            <tr>
                <td><label for="inSueldo">Sueldo</label></td>
                <td><input type="number" min="8000" step="500" max="25000" id="inSueldo" name="sueldo" required value="<?php echo $sueldo?>"><span style="display: none;" id="dSueldo" >*</span></td>
            </tr>
            <tr>
                <td><H4>Turno:</H4></td>
                <td><span style="display: none;" id="dTurno">*</span></td>
            </tr>
           
            <?php
                if($turno=="tarde")
                {
                    echo'<tr>
                            <td><label for="radioM" >Mañana</label></td>
                            <td><input name="radTurno" id="radioM" type="radio" value="mañana"></td>
                        </tr>';
                    echo'<tr>
                            <td><label for="radioT">Tarde </label></td>
                            <td><input name="radTurno" id="radioT" type="radio" value="tarde" checked></td>
                        </tr>
                        <tr>
                            <td><label for="radioN">Noche</label> </td>
                            <td><input name="radTurno" id="radioN" type="radio" value="noche"></td>
                        </tr>';
                }else if($turno=="noche"){
                    echo '<tr>
                            <td><label for="radioM" >Mañana</label></td>
                            <td><input name="radTurno" id="radioM" type="radio" value="mañana"></td>
                        </tr>
                        <tr>
                                <td><label for="radioT">Tarde </label></td>
                                <td><input name="radTurno" id="radioT" type="radio" value="tarde"></td>
                        </tr>';
                    echo '<tr>
                            <td><label for="radioN">Noche</label> </td>
                            <td><input name="radTurno" id="radioN" type="radio" value="noche" checked></td>
                        </tr>';
                }else{
                    echo'<tr>
                            <td><label for="radioM" >Mañana</label></td>
                            <td><input name="radTurno" id="radioM" type="radio" value="mañana" checked></td>
                        </tr>';
                        
                    echo'<tr>
                            <td><label for="radioT">Tarde </label></td>
                            <td><input name="radTurno" id="radioT" type="radio" value="tarde"></td>
                        </tr>
                        <tr>
                            <td><label for="radioN">Noche</label> </td>
                            <td><input name="radTurno" id="radioN" type="radio" value="noche"></td>
                        </tr>';
                }
            ?>
            <tr>
                <td align="center"><input type="file" id="inFoto" name="foto" accept=".png, .jpg, .jpeg, .gif, .bmp" required></td>
                <td><span style="display: none;" id="dFoto">*</span></td>
            </tr>
            <tr>
                <td colspan="2" align="right"><input type="reset"  value="Limpiar"></td>
            </tr>
            <tr>
                <!--<td colspan="2" align="right"><input type="submit" value="Enviar" id="btnEnviar" onclick="AdministrarValidaciones()"></td>-->
                <td colspan="2" align="right"><input type="button" value="<?php echo $boton?>" id="btnEnviar" onclick="Main.AgregarEmpleados()"></td>
            </tr>
        </table>
        </form>
    </body>
    </div>
</html>
