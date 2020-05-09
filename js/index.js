const caracterBlanco = 'B';
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
                swal("Datos Incorrectos", "Click para corregir", "error");
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
            $("#verificar").attr('disabled', true);
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
    let estado = 'Q1';
    var con = 0;
    var clase = 'bg-info';
    var pintar = i;
    cabecera = setInterval(()=>{
        while(estado != 'Q3' ){
            if ((cadena[i] == 'a' || cadena[i] == 'b') && estado == 'Q1'){
                $('#estado').text(estado);
                $('#'+i).text('a');
                $('#'+i).addClass(clase);
                $('#contador').text(con);
                //$('#q1v').css({"stroke":"red"});
                efectoGrafo(cadena[i],estado,'a');
                pintar = i-1;
                i++;
                con++
                $('#'+pintar).removeClass(clase);
                break;
            }
            if(cadena[i] == caracterBlanco && estado == 'Q1'){
                estado='Q2';
                $('#estado').text(estado);
                $('#contador').text(con);
                $('#'+i).addClass(clase);
                efectoGrafo(cadena[i],estado,caracterBlanco);
                con++
                pintar = i-1;
                $('#'+pintar).removeClass(clase);
                break;
            }
            if(estado == 'Q2' ){
                if (i>1) {
                    $('#contador').text(con);
                    con++
                    i--;
                    $('#'+i).text('a');
                    $('#'+i).addClass(clase);
                    efectoGrafo('a',estado,'a');
                    pintar = i+1;
                    $('#'+pintar).removeClass(clase);
                    break;
                    
                }
                if (i==1) {
                    $('#contador').text(con);
                    con++
                    i--;
                    pintar = i+1;
                    $('#'+pintar).removeClass(clase);
                    $('#'+i).text(caracterBlanco);
                    efectoGrafo('a',estado,caracterBlanco);
                    $('#'+i).addClass(clase);
                    pintar=0;
                    $('#estado').text(estado);
                    break; 
                }
                if(i==0){
                    $('#'+i).removeClass(clase);
                    $('#'+'1').addClass(clase);
                    estado = 'Q3';
                    $('#estado').text(estado);
                    efectoGrafo(caracterBlanco,estado,caracterBlanco);
                    swal("Proceso terminado correctamente", "", "success");
                    $("#verificar").attr('disabled', false);
                    break;
                }
                
            }
        }
    },tiempo);
}

//Detiene el indice
function detenerMaquina(){
    clearInterval(cabecera);
    swal("Se detuvo el proceso", "", "warning");
    $("#verificar").attr('disabled', false);
    eliminarTabla();
    leerCaracteresDeEntrada();
}
//Función del grafo
function efectoGrafo(oldValue, newState, newValue){
    //console.log("#"+newState + oldValue + newValue);
    $("#Q1aa,#Q1ba,#Q2aa,#Q2BB,#Q3BB").css({"fill":"none"});
    $(".nodo").css({"fill":"#938F8E"});
  
    $("#"+newState + oldValue + newValue).css({"fill":"#d48444"});
    //$("#g"+prevState).css({"fill":"none"});
    $("#g"+newState).css({"fill":"#d48444"});
    if(newState == "Q3"){
      $("#Q1aa,#Q1ba,#Q2aa,#Q2BB,#Q3BB").css({"fill":"black"});
      $("#"+newState + oldValue + newValue).css({"fill":"#d48444"});
    }
  }