<?Php
abstract class Persona
{
    private $apellido;
    private $nombre;
    private $dni;
    private $sexo;

    public function __construct($ape,$nom,$dni,$sexo)
    {
        $this->apellido=$ape;
        $this->nombre=$nom;
        $this->dni=$dni;
        $this->sexo=$sexo;
    }
    public function GetDni()
    {
        return $this->dni;
    }
    public function GetApellido()
    {
        return $this->apellido;
    }
    public function GetNombre()
    {
        return $this->nombre;
    }
    public function GetSexo()
    {
        return $this->sexo;
    }
    public function __toString()
    {
        return $this->GetApellido()."-".$this->GetNombre()."-".$this->GetDni()."-".$this->GetSexo();
    }
    public abstract function Hablar(array $idioma);
}
?>