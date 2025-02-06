<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $jsonData = file_get_contents('php://input');
    $nuevasPreguntas = json_decode($jsonData, true);

    if (json_last_error() === JSON_ERROR_NONE) {
        $archivo = 'preguntas.json';

        // Verifica si el archivo existe y tiene contenido válido
        if (file_exists($archivo)) {
            $contenidoActual = file_get_contents($archivo);
            $preguntas = json_decode($contenidoActual, true);
            if (!is_array($preguntas)) {
                $preguntas = [];
            }
        } else {
            $preguntas = [];
        }

        // Agregar las nuevas preguntas al array existente
        $preguntas = array_merge($preguntas, $nuevasPreguntas);

        // Guardar en el archivo JSON
        file_put_contents($archivo, json_encode($preguntas, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

        echo json_encode(["status" => "success", "message" => "Preguntas guardadas correctamente."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error en el formato JSON."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Método no permitido."]);
}
?>
