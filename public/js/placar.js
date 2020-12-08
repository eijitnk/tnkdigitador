/*ao clicar no botao mostra o placar*/
$("#botao-placar").click(mostraPlacar);
$("#botao-sync").click(sincronizaPlacar);

function inserePlacar() {
    var corpoTabela = $(".placar").find("tbody");
    var usuario = "Douglas";
    var numPalavras = $("#contador-palavras").text();
    //var botaoRemover = "<a href='#'><i class='small material-icons'>delete</i></a>"

    // var linha = "<tr>" +
    //                 "<td>" + usuario + "</td>" +
    //                 "<td>" + numPalavras + "</td>" +
    //                 "<td>" + botaoRemover + "</td>" +
    //             "</tr>";

    var linha = novaLinha(usuario, numPalavras);
    linha.find(".botao-remover").click(removeLinha);
    
    corpoTabela.prepend(linha);
    //corpoTabela.append(linha);

    //Abre o placar após travar na tela pro usuario
    $(".placar").slideDown(500);
    //Da um scrooll na tabela
    scrollPlacar();
}

function scrollPlacar() {
    var posicaoPlacar = $(".placar").offset().top;
    $('body, html').animate({ scrollTop: posicaoPlacar + "px" },1000);
}

function novaLinha(usuario, palavras) {
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(palavras);
    var colunaRemover = $("<td>");

    var link = $("<a>").addClass("botao-remover").attr("href", "#");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

    //Icone dentro do <a>
    link.append(icone);

    //<a> dentro do <td>
    colunaRemover.append(link);

    //Os três <td> dentro do <tr>
    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    // console.log(linha);
    return linha;
}

function removeLinha() {
    // $(".botao-remover").click(function(event) {
    //     event.preventDefault();
    //     $(this).parent().parent().remove();
    // });
    event.preventDefault();
    var linha = $(this).parent().parent();
    linha.fadeOut(1000);
    setTimeout(function() {
        linha.remove();
    },1000);
}

function mostraPlacar() {
    // $(".placar").css("display","block"); /*insere display block reexibe o placar*/
    // $(".placar").show(); /*mostra*/
    // $(".placar").hide(); /*esconde*/
    // $(".placar").toggle(); /*mostra ou esconde*/
    // $(".placar").slideDown(600); /*mostra de forma suave*/
    // $(".placar").slideUp(600); /*esconde de forma suave*/
    $(".placar").stop().slideToggle(600);
}

function sincronizaPlacar() {
    var placar = [];
    var linhas = $("tbody>tr");

    linhas.each(function() {
        var usuario = $(this).find("td:nth-child(1)").text();
        var palavras = $(this).find("td:nth-child(2)").text();
        var score = {
            usuario: usuario,
            pontos: palavras
        };

        placar.push(score);
    });

    var dados = {
        placar: placar
    };

    $.post("https://tnkdigitador.herokuapp.com/placar", dados, function() {
        console.log("Salvou o placar no servidor");
    });
}

function atualizaPlacar() {
    
    $.get("https://tnkdigitador.herokuapp.com/placar", function(data){
        $(data).each(function(){
            var linha = novaLinha(this.usuario, this.pontos);
            linha.find(".botao-remover").click(removeLinha);
            $("tbody").append(linha);
        });
    });
}