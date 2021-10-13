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
            <style>
                html, body {
                height: 100%;
                }
                td{
                    width: 40%;
                    height: 100%;
                }
            </style>
        </head>
        <body>
            <h2>Ian Garcia</h2>
            <table style='border:1px solid black;' class="tabla">
                <tr style="border: 1px solid black">
                    <td id="tdIndex" style="border: 1px solid black">
                        <div id="IndexAjax">
                        </div>
                    </td>
                    <td style="border: 1px solid black">
                        <div id="MostrarAjax">
                        </div>
                    </td>
                </tr>
                <td style="border:1px solid black;">
                    <A href="./cerrarSesion.php">Cerrar Sesión</A>
                </td>
            </table>
        </body>
    </html>
    