<?php
    include_once "./fabrica.php";
    $legajo = $_GET["legajo"];
    $ar = fopen("../archivos/empleados.txt",'r');
    $fab = new Fabrica("Chicles",100);
    $banderaEncontrado=0;
    while(!feof($ar))
    {
        $misEmpleados=fgets($ar);
        $arrayElementos=explode("-",$misEmpleados);
        if($arrayElementos[0]!="<br>" && sizeof($arrayElementos)>=7 && $arrayElementos[2]==$legajo)
        {
            $nuevoEmpelado = new Empleado($arrayElementos[0],$arrayElementos[1],$arrayElementos[2],
            $arrayElementos[3],$arrayElementos[4],$arrayElementos[5],$arrayElementos[6]);
            $nuevoEmpelado->SetFoto($arrayElementos[7]."-".$arrayElementos[8]);
            $fab->TraerDeArchivo("../archivos/empleados.txt");
            if($fab->EliminarEmpleado($nuevoEmpelado))
            {
                $fab->GuardarEnArchivo("../archivos/empleados.txt");
                echo "<br>Empelado eliminado con exito<br>";
                fclose($ar);
                $banderaEncontrado=1;
                break;
            }
        }
    }
    if($banderaEncontrado==0)
    {   
        echo "<br>Ese empleado no se encuentra en la fabrica<br>";
    }
    echo "<br>";
    echo '<a href="../backend/mostrar.php">Al Mostrar</a>';
    echo "<br>";
    echo '<a href="./index.php">Al index</a>';
?>