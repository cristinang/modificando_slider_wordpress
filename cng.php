 <?php
 # documento php que recibirá datos en post y los guardará en un fichero con nombre valores.text en el mismo directorio
 # se puede usar la función file_put_contents
    $contenido .= "\n";
    $contenido = $_POST['pagina'];
    $contenido .= "\n";
    $contenido .= $_POST['height'];
    $contenido .= "\n";
    $contenido .= $_POST['transform'];
file_put_contents(__DIR__.'/valores.txt', $contenido, FILE_APPEND);
echo __DIR__;

    # el fichero valores.txt se creará en el mismo directorio que este fichero
    # si se quiere que se cree en otro directorio, se puede indicar la ruta completa
    # file_put_contents('/ruta/completa/al/fichero/valores.txt', $contenido, FILE_APPEND);
    # si se quiere que se cree en el directorio donde está este fichero, se puede usar la constante __DIR__
    # file_put_contents(__DIR__ . '/valores.txt', $contenido, FILE_APPEND);
    # si se quiere que se cree en el directorio donde está el fichero que incluye este fichero, se puede usar la constante __DIR__
    # file_put_contents(dirname(__DIR__) . '/valores.txt', $contenido, FILE_APPEND);
