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
                    <div id="IndexAjax" style="border:1px solid black;">
                    </div>
                </tr>
                <tr>
                    <div id="MostrarAjax" style="border:1px solid black;">
                    </div>
                </tr>
                <tr style="border:1px solid black; top:-100px">
                    <A href="./cerrarSesion.php">Cerrar Sesión</A>
                </tr>
            </table>
        </body>
    </html>
    