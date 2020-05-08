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
            evaluarEntrada(tiempo);
            
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



function evaluarEntrada(tiempo) {
    let cadena = caracterBlanco + $('#texto').val() + caracterBlanco;
    let i = 1;
    let estado='Q1';
    var con = 0;
    cabecera = setInterval(()=>{
        while(estado != 'Q3' ){
            if ((cadena[i] == 'a' || cadena[i] == 'b') && estado == 'Q1'){
                $('#'+i).text('a');
                $('#contador').text(con);
                i++;
                con++
                console.log(i);
                break;
            }
            if(cadena[i] == caracterBlanco && estado == 'Q1'){
                estado='Q2';
                $('#estado').text(estado);
                $('#contador').text(con);
                con++
                console.log(estado);
                break;
            }
            if(estado == 'Q2' ){
                if (i>1) {
                    $('#contador').text(con);
                    con++
                    i--;
                    console.log(i);
                    $('#'+i).text('b');
                    break;
                    
                }
                if (i==1) {
                    $('#contador').text(con);
                    con++
                    i--;
                    $('#'+i).text(caracterBlanco);
                    console.log(i);
                    i=1;
                    console.log(i);
                    estado = 'Q3';
                    $('#estado').text(estado);
                    console.log(estado);
                    break; 
                }
                
            }
        }
    },tiempo);
}

    //Detiene el indice
    function detenerMaquina(){
        clearInterval(cabecera);
    }
