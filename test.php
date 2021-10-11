<!DOCTYPE html>
<?php
    include_once "./fabrica.php";
    include_once "./backend/validarSesion.php";
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
            <h2>Ian Garcia</h2>
            <table style='border:1px solid black;'>
                <tr>
                    <div id="Index" style="border:1px solid black;">
                    </div>
                    <input type="button" onclick="Main.Testear()" value="Test">
                </tr>
                <?php
                if(isset($_REQUEST["dniH"]))
                {
                    var_dump($_REQUEST["dniH"]);
                    $DNIEmpleado=$_REQUEST["dniH"];
                    $ar = fopen("./archivos/empleados.txt",'r');
                    $fabrica = new Fabrica("Modificar");
                    $fabrica->TraerDeArchivo("./archivos/empleados.txt");
                    foreach($fabrica->GetEmpelados() as $empleados)
                    {
                        if($empleados->GetDni()==$_REQUEST["dniH"])
                        {
                            echo "Entro";
                            $Enviado = array($empleados->GetApellido(),$empleados->GetNombre(),
                            $empleados->GetDni(),$empleados->GetSexo(),$empleados->GetSueldo(),$empleados->GetLegajo(),$empleados->GetTurno(),$empleados->GetFoto());
                            var_dump($Enviado);
                            //echo '<script type="text/javascript">Main.Modificar('.json_encode($Enviado).')</script>';
                            echo '<script type="text/javascript"> document.write(Modificar('.json_encode($Enviado).'))</script>';
                            ?>
                            <script type="text/javascript">
                            let id=<?php echo json_encode($Enviado);?>;
                            alert(id);
                            //Main.Modificar(id);
                            //Modificar(id);
                            </script><?php
                            echo '<input type="hidden" id="hdnModificar" name="dniI" value='.$empleados->GetDni().'>';
                        }
                    }
                }?>
            </table>