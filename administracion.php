<!DOCTYPE html>
<html>
<?php
    include_once "./fabrica.php";
    
    if(isset(($_POST["dniI"])))
    {
        $dniModificar=($_POST["dniI"]);
        $ar = fopen("./archivos/empleados.txt",'r');
        $fabrica = new Fabrica("Modificar");
        $fabrica->TraerDeArchivo("./archivos/empleados.txt");
        foreach($fabrica->GetEmpelados() as $empleados)
        {
            if($empleados->GetDni()==$_POST["dniI"])
            {
                $fabrica->EliminarEmpleado($empleados);
            }
        }
    }

    $sexo=($_POST["sexo"]);
    $sexo = str_ireplace(array('”','“'),'',$sexo);
    if($sexo=="2")
    {$sexo="H";}
    else if($sexo=="3")
    {$sexo="M";}
    else{$sexo="Seleccione";}

    $ext = pathinfo($_FILES["foto"]["name"],PATHINFO_EXTENSION);
    $foto="./fotos/".$_POST["dni"]."-".$_POST["apellido"].".".$ext;
    
    if (!file_exists($_POST["dni"]."-".$_POST["apellido"].$ext) && $_FILES["foto"]["size"] < 1048576 
    && move_uploaded_file($_FILES["foto"]["tmp_name"],$foto)) 
    {
        $empleado = new Empleado($_POST["apellido"],$_POST["nombre"],$_POST["dni"],
        $sexo,$_POST["sueldo"],$_POST["legajo"],$_POST["radTurno"]);
        $empleado->SetFoto($foto);
        $fabrica = new Fabrica("Papeles");
        $fabrica->TraerDeArchivo("./archivos/empleados.txt");
        $fabrica->AgregarEmpleado($empleado);
        if($fabrica->GuardarEnArchivo("./archivos/empleados.txt"))
        {
           echo '<a href="./backend/mostrar.php">Al Mostrar</a>';
        }
        else
        {
            echo '<a href="./index.html">Al index</a>';
        }
    }else{
        echo "error al cargar la foto";
    }
    ?>
</html>