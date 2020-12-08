$("#botao-frase").click(fraseAleatoria);
$("#botao-frase-id").click(buscaFrase);

function fraseAleatoria() {

    $("#spinner").toggle();
    $.get("https://tnkdigitador.herokuapp.com/frases",trocaFraseAleatoria)
    .fail(function() {
        $("#erro").toggle()
        setTimeout(function() {
            $("#erro").toggle();
        }, 2000);
    })
    .always(function() { 
        //sempre escondendo o spinner
        $("#spinner").toggle();
    });
}

function trocaFraseAleatoria(data) {
    var frase = $(".frase");
    var numeroAleatorio = Math.floor(Math.random() * data.length);
    
    frase.text(data[numeroAleatorio].texto);
    atualizaTamanhoFrase();
    atualizaTempoInicial(data[numeroAleatorio].tempo);
}

function buscaFrase() {
    $("#spinner").toggle();
    var fraseId = $("#frase-id").val();
    //console.log("Id da minha frase:" + fraseId);
    var dados = { id: fraseId };

    $.get("https://tnkdigitador.herokuapp.com/frases", dados,trocaFrase)
    .fail(function() {
        $("#erro").toggle();
        setTimeout(function() {
            $("#erro").toggle();
        }, 2000);
    })
    .always(function() {
        $("#spinner").toggle();
    });
}

function trocaFrase(data) {    
    var frase = $(".frase");
    frase.text(data.texto);
    atualizaTamanhoFrase();
    atualizaTempoInicial(data.tempo);
}