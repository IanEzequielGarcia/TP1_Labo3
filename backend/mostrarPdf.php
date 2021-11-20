<?php
    include_once "validarSesion.php";
    include_once "../php/fabrica.php";
    require_once '../archivos/vendor/autoload.php';
    header('content-type:application/pdf');
    $mifabrica = new Fabrica("mostrar",100);
    $mifabrica->TraerDeArchivo("../archivos/empleados.txt");
    $mpdf = new \Mpdf\Mpdf(['orientation' => 'P']);
    $html="";
    ob_start();
    $html.='<table style="width:40%;text-align:center">';
    $html.='<thead>';
    $html.='<tr>'."<th>Listado de Empleados</th>".'</tr>';
    $html.='<tr>'."<th>Info</th>".'</tr>';
    $html.='</thead>';
    foreach($mifabrica->GetEmpelados() as $misEmpleados)
    {
        $html.='<tr>';
            $html.="<td>".$misEmpleados->__toString()."<td>";
            $html.='<td><img src="'.$misEmpleados->GetFoto().'" width="90" height="90"></td  style="max-width: 100px;">';
        $html.='</tr>';
    }
    $html.='</table>';
    ob_end_clean();
    $mpdf->SetProtection(array(), $_SESSION['DNIEmpleado'], '3050');
    $mpdf->SetHeader('GARCIA IAN PAGINA {PAGENO} DE {nbpg}');
    $mpdf->WriteHTML($html);
    $mpdf->SetFooter('https://tpneiner.000webhostapp.com/php/ajax.php');
    $mpdf->Output();
?>
