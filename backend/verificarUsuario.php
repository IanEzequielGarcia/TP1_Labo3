<?php
    session_start();
    $DNIEmpleado=$_POST["dni"];
    $_SESSION['DNIEmpleado']=$DNIEmpleado;
    $apellido = $_POST["apellido"];
    $ar = fopen("../archivos/empleados.txt",'r');
    $banderaEncontrado=0;
    while(!feof($ar))
    {
        $misEmpleados=fgets($ar);
        $arrayElementos=explode("-",$misEmpleados);
        if($arrayElementos[0]!="<br>" && sizeof($arrayElementos)>=7 
        && $arrayElementos[0]==$apellido && $arrayElementos[2]==$DNIEmpleado)
        {
            $banderaEncontrado=1;
            header("Location: ./mostrar.php");
            break;
        }
    }
    fclose($ar);
    if($banderaEncontrado==0)
    {
        echo "<br>Ese empleado no se encuentra en la fabrica<br>";
        echo '<a href="../php/login.html">Al login</a>';
    }
?>