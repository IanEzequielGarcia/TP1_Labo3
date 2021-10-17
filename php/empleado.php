<?php
include_once dirname(__FILE__)."./persona.php";
class Empleado extends Persona
{
    protected $sueldo;
    protected $legajo;
    protected $turno;
    protected $pathFoto;
    public function __construct($ape,$nom,$dni,$sexo,$sue,$leg,$tur)
    {
        parent::__construct($ape,$nom,$dni,$sexo);
        $this->sueldo=$sue;
        $this->legajo=$leg;
        $this->turno=$tur;
    }
    public function GetSueldo()
    {
        return $this->sueldo;
    }
    public function GetLegajo()
    {
        return $this->legajo;
    }
    public function GetTurno()
    {
        return $this->turno;
    }
    public function GetFoto()
    {
        return $this->pathFoto;
    }
    public function SetFoto($path)
    {
        return $this->pathFoto=$path;
    }
    function Hablar(array $idioma)
    {
        $auxString="";
        foreach($idioma as $array)
        {
            $auxString.=$array.", ";
        }
        return "El empleado habla ".$auxString;
    }
    public function __toString()
    {
        return parent::__toString()."-".$this->GetSueldo()."-"
        .$this->GetLegajo()."-".$this->GetTurno()."-".$this->pathFoto."\n";
    }
}
?>