<html>
    <h2>Listado de Empleados</h2>
    <h4>Info</h4>
    <hr>
    <script src="./javascript/funciones.js"></script>
    <script src="./javascript/jsApp.js"></script>

<?php
    include_once "./backend/validarSesion.php";
    include_once "./fabrica.php";
    $ar=fopen("./archivos/empleados.txt","r");
    while(!feof($ar))
    {
        $misEmpleados=fgets($ar);
        $arrayElementos=explode("-",$misEmpleados);
        if($arrayElementos[0]!="<br>"&& sizeof($arrayElementos)>=7)
        {
?>
        <table style="width:40%">
        <tr>
            <?php
            echo '<td style="width: 90%;">';
                $nuevoEmpelado = new Empleado($arrayElementos[0],$arrayElementos[1],$arrayElementos[2],
                $arrayElementos[3],$arrayElementos[4],$arrayElementos[5],$arrayElementos[6]);
                $nuevoEmpelado->SetFoto($arrayElementos[7]."-".$arrayElementos[8]);
                echo $nuevoEmpelado->__toString();
                
                echo '<td>'.'<img src="'.$arrayElementos[7]."-".$arrayElementos[8].'" width="90px" height="90px">'."</td>";
                //echo '<td>'.'<a href="../eliminar.php?legajo='.$arrayElementos[2].'"</a>[Eliminar]'.'<td>';
                echo '<td>'.'<a href="#" onclick="Main.EliminarEmpleados('.$arrayElementos[2].')"</a>[Eliminar]'.'</td>';
                //echo '<td><input type="button" value="Modificar" onclick="ModificarEmpleados('.json_encode($arrayElementos).')"></td>';
                echo '<td><input type="button" value="Modificar" onclick="AdministrarModificar('.$arrayElementos[2].')"></td>';
            echo "</td>";
            ?> 
        </tr>
        </table>
<?php
        }
    }
    fclose($ar);
    //echo "<form method='POST' action='./index.php' id='modForm'>";
    echo "<form method='POST' action='./ajax.php' id='modForm'>";
    echo '<input type="hidden" id="inDniHidden" name="dniH">';
    echo "</form>";
?>

<hr>
<A href="./index.php">Al Index</A>
<br>
<A href="./backend/cerrarSesion.php">Cerrar Sesión</A>
</html>