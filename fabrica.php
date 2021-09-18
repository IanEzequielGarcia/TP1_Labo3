<?php
include_once dirname(__FILE__)."./empleado.php";
include_once dirname(__FILE__)."./interfaces.php";

class Fabrica implements Iarchivo
{
    private $cantidadMaxima;
    private $empleados;
    private $razonSocial;

    public function __construct($razon)
    {
        $this->razonSocial=$razon;
        $this->cantidadMaxima=7;
        $this->empleados=array();
    }
    public function AgregarEmpleado(Empleado $empleado)
    {
        if($this->cantidadMaxima>sizeof($this->empleados)+1)
        {
            array_push($this->empleados,$empleado);
            $this->EliminarEmpleadoRepetido();
        }else{
            echo "La fabrica esta llena";
        }
    }
    public function CalcularSueldos()
    {
        $sueldoTotal=0;
        foreach($this->empleados as $sueldito)
        {
            $sueldoTotal+=$sueldito->GetSueldo();
        }
        return $sueldoTotal;
    }
    public function EliminarEmpleado($empleado)
    {
        if(array_search($empleado,$this->empleados,false)!==false)
        {
            unlink(trim($empleado->GetFoto()));
            unset($this->empleados[array_search($empleado,$this->empleados)]);
            return true;
        }
        else
        {
            return false;
        }
    }
    private function EliminarEmpleadoRepetido()
    {
        $this->empleados=array_unique($this->empleados);
    }
    public function __toString()
    {
        echo "<br>"."Fabrica de ".$this->razonSocial.", total de sueldos ".$this->CalcularSueldos().", empleados:"."<br>";
        foreach($this->empleados as $emp)
        {
            echo $emp->__toString();
            echo "<br>";
        }
    }
    function TraerDeArchivo(string $ar)
    {
        $ar=fopen("./archivos/empleados.txt","r");
        while(!feof($ar))
        {
            $misEmpleados=fgets($ar);
            $arrayElementos=explode("-",$misEmpleados);
            if($arrayElementos[0]!="<br>" && sizeof($arrayElementos)>=7)
            {
                $nuevoEmpelado = new Empleado($arrayElementos[0],$arrayElementos[1],$arrayElementos[2],
                $arrayElementos[3],$arrayElementos[4],$arrayElementos[5],$arrayElementos[6]);
                $nuevoEmpelado->SetFoto($arrayElementos[7]."-".$arrayElementos[8]);
                $this->AgregarEmpleado($nuevoEmpelado);
            }
        }
        fclose($ar);
    }
    function GuardarEnArchivo(string $stringIngresado)
    {
        $ar = fopen($stringIngresado,'w');
        foreach($this->empleados as $empleado)
        {
            if(fwrite($ar,$empleado->__toString())==false)
            {
                return false;
            }
        }
        return true;
    }
}
?>