const caracterBlanco = 'ß';
var cabecera = undefined;

//
$(function() {
    //Funcionalidad del boton ingresar
    $('#ingresar').click(function(){
        if($('#texto').val() == ""){
            //Muestra un mensaje return falso si no hay valor y true al reves
            $(this).popover('show');
            return false;
        }else{
            var inpObj = document.getElementById("texto");
            if (!inpObj.checkValidity()) {
                alert("Error datos incorrectos");
            } else {
                $(this).popover('hide');
                leerCaracteresDeEntrada();
                main();
                return true;
            }
            
        }
    });
    //Funcionalidad del boton verificar
    $('#verificar').click(
        function(){
            tiempo = 1000 - $("#rango").val();
            cabecera = setInterval(function(){evaluarEntrada(1)}, tiempo);
        }

    );
});
//Muestra el mensaje de error en caso de que este vacio el input
function main() {
    $('[data-toggle="popover"]').popover();
}

//Agrega los caractes que estan en el input
function agregarCaracteres(valor, id_valor, clase){

    contenedor = $('#tabla tbody');
    elemento = `<td id='${id_valor}' class='${clase}'>
                ${valor}
            </td>`
     contenedor.append(elemento);
    return true
}
//Esta funcion resetea la tabla para agregar nuevos datos
function eliminarTabla(){
    $('#tabla  tbody td').remove();
    return true
}
//Crear la tabla apartir de la entrada de datos 
function leerCaracteresDeEntrada(){
    var cadena = $('#texto').val();
        eliminarTabla();
        cadena = caracterBlanco+cadena+caracterBlanco;
        for(i = 0; i < cadena.length; i++){
            agregarCaracteres(cadena.charAt(i), i, "");
        }
        return true;
}
//Evalua toda la cinta y reemplazarlos por a
//En desarrollo
/*function evaluarEntrada(i) {
    var cadena = $('#texto').val();
    cadena = caracterBlanco+cadena+caracterBlanco;
    var bandera=false
    if(cadena[i] == 'a' || cadena[i] == 'b'){
        document.getElementById(i).innerHTML = "a";
        i++;
        if(cadena.length==i){
            detenerMaquina();
        }else{
            evaluarEntrada(i++);
        } 
    }
    
}*/

function evaluarEntrada(i) {
    var cadena = $('#texto').val();
    cadena = caracterBlanco+cadena+caracterBlanco;
    /*for(i=0;i<cadena.length;i++){
        for(x=0;x<cadena.length;i++){

        }
    }*/
    if(cadena[i] == 'a' || cadena[i] == 'b'){
        document.getElementById(i).innerHTML = "a";
        setInterval(function(){i++},2000);
        if(cadena.length==i){
            detenerMaquina();
        }else{
            evaluarEntrada(i++);
        } 
    }
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
     if ((new Date().getTime() - start) > milliseconds) {
      break;
     }
    }
   }

   function demo(i) {
        var cualquiera = $('#'+ i).text();
        console.log(typeof cualquiera);
        sleep(2000);
        console.log($('#'+ i).text());
   }
   
//Detiene el indice
function detenerMaquina(){
    clearInterval(cabecera);
}