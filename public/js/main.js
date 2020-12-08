var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");

$(document).ready(function(){
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    $("#botao-reiniciar").click(reiniciaJogo);
    atualizaPlacar();
});

function atualizaTempoInicial (tempo){
    tempoInicial = tempo;
    $("#tempo-digitacao").text(tempo);
}

function atualizaTamanhoFrase() {
    var frase = $(".frase").text();
    //Contar o numero de palavras
    var numeroPalavras = frase.split(" ").length;
    var tamanhoFrase = $("#tamanho-frase");
    tamanhoFrase.text(numeroPalavras);
}

function inicializaContadores() {
    campo.on("input", function() {
        //conteudo da frase (Campos de digitacao)
        var conteudo = campo.val();
        //Utilizando expressão regular para contar exatamente
        var qtdePalavras = conteudo.split(/\S+/).length - 1;
        $("#contador-palavras").text(qtdePalavras);
        var qtdeCaracteres = conteudo.length;
        $("#contador-caracteres").text(qtdeCaracteres);
    });
}

function inicializaCronometro() {
    //one apenas uma vez
    campo.one("focus", function() {
        var tempoRestante = $("#tempo-digitacao").text();
        //Adicionando reiniciar
        // $("#botao-reiniciar").attr("disabled", true);
        var cronometroId = setInterval(function() {
            tempoRestante--;
            //console.log(tempoRestante);
            $("#tempo-digitacao").text(tempoRestante);
            //console.log("Valor do atributo:" + campo.attr("rows"));
            if(tempoRestante < 1) {
                clearInterval(cronometroId);
                finalizaJogo();
            }
        }, 1000);
    });
}

function finalizaJogo() {
    campo.attr("disabled", true);
    
    $("#botao-reiniciar").attr("disabled", false);
    //campo.css("background-color", "lightgray");
    //campo.addClass("campo-desativado");
    campo.toggleClass("campo-desativado");
    inserePlacar();
}

function inicializaMarcadores() {
    campo.on("input", function() {
        var frase = $(".frase").text();
        var digitado = campo.val();
        var comparavel = frase.substr(0, digitado.length);
        // console.log("Digitado:" + digitado);
        // console.log("Frase C.:" + comparavel);
        // var digitouCorreto = frase.startsWith(digitado);
    
        if(digitado == comparavel) { //usando ECMA SCRIPT 5
        // if(frase.startsWith(digitado)) { //usando ECMA SCRIPT 6
            //console.log("Está certo");
            campo.addClass("borda-verde");
            campo.removeClass("borda-vermelha");
        } else {
            //console.log("Está errado");
            campo.addClass("borda-vermelha");
            campo.removeClass("borda-verde");
        }
    });
}

function reiniciaJogo() {
    campo.attr("disabled", false);
    campo.val("");
    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
    $("#tempo-digitacao").text(tempoInicial);
    inicializaCronometro();
    //campo.removeClass("campo-desativado");
    campo.toggleClass("campo-desativado");
    campo.removeClass("borda-vermelha");
    campo.removeClass("borda-verde");
}
