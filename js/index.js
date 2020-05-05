const caracterBlanco = 'ß';
var cabecera = undefined;

$(function() {

    $('#ingresar').click(function(){
        if($('#texto').val() == ""){
            $(this).popover('show');
            return false;
        }else{
            $(this).popover('hide');
            leerCaracteresDeEntrada();
            main();
            return true;
        }
    });

    $('#verificar').click(
        function(){
            tiempo = 1000 - $("#rango").val();
            cabecera = setInterval(function(){evaluarEntrada()}, tiempo);
        }

    );
});

function main() {
    $('[data-toggle="popover"]').popover();
}

function agregarCaracterBlanco(){
    for(i = 0; i < 10; i++){
        agregarCaracteres(caracterBlanco, "", "");
    }
    return true;
}

function agregarCaracteres(valor, id_valor, clase){

    contenedor = $('#tabla tbody');
    elemento = `<td id='${id_valor}' class='${clase}'>
                ${valor}
            </td>`
     contenedor.append(elemento);
    
    
    return true
}
function eliminarTabla(){
    $('#tabla  tbody td').remove();
    return true
}
function leerCaracteresDeEntrada(){
    var cadena = $('#texto').val();
        eliminarTabla();
        agregarCaracterBlanco();
        agregarCaracteres(cadena.charAt(0), "active-row", "bg-info text-light");
        for(i = 1; i < cadena.length; i++){
            agregarCaracteres(cadena.charAt(i), "", "");
        }
        agregarCaracterBlanco();
        return true;
}
function evaluarEntrada() {
  console.log('A evaluar.');
}