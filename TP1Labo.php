<?php
    include_once "./fabrica.php";
    $emp = new Empleado("Peralta","Matias","43143332","h",15000,421,"tarde");
    $emp2 = new Empleado("Magallan","Lucia","384143392","m",20000,455,"mañana");
    $emp3 = new Empleado("Gonzales","Juan","35148342","h",18000,53,"noche");
    echo $emp->Hablar(array("Ingles","Portugues","Español"));
    echo "<br>";
    echo $emp->__toString();
    $fab = new Fabrica("Chicles");
    $fab->AgregarEmpleado($emp);
    $fab->AgregarEmpleado($emp);
    $fab->AgregarEmpleado($emp2);
    $fab->AgregarEmpleado($emp3);
    echo $fab->__toString();
    $fab->EliminarEmpleado($emp);
    $fab->EliminarEmpleado($emp);
?>