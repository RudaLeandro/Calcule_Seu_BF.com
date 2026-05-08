let genero = "";

let ultimoResultado = "";

function mostrarHomem(){
    document.getElementById("formMasculino").style.display = "block";
    document.getElementById("formFeminino").style.display = "none";
    document.getElementById("btnCalcular").style.display = "block";
    genero = "formMasculino";
}

function mostrarMulher(){
    document.getElementById("formMasculino").style.display = "none";
    document.getElementById("formFeminino").style.display = "block";
    document.getElementById("btnCalcular").style.display = "block";
    genero = "formFeminino";
}


function calcular() {
    if (genero === "formMasculino"){
    let CinturaM = Number(document.getElementById("CinturaM").value);
    if (isNaN(CinturaM) || CinturaM <= 0) {
        alert("Digite um valor válido!!");
        return;
    }
    let AlturaM = Number(document.getElementById("AlturaM").value);
    if (isNaN(AlturaM) || AlturaM <= 0){
        alert("Digite uma altura válida!!");
        return;
    }
    let PescocoM = Number(document.getElementById("PescocoM").value);
    if (isNaN (PescocoM) || PescocoM <= 0){
        alert("Digite um valor válido!!");
        return;
    }
    if (CinturaM <= PescocoM){
        alert("Cintura deve ser maior que o pescoço!!");
        return;
    }

    let BfM = 495 / (
        1.0324 
        - 0.19077 * Math.log10(CinturaM - PescocoM)
        + 0.15456 * Math.log10(AlturaM))
        - 450;

    document.getElementById("resultado").innerText = 
    "Sua Gordura corporal / BF é: " + BfM.toFixed(2) + "%";

    ultimoResultado = "BF: " + BfM.toFixed(2) + "%";
    document.getElementById("resultado").innerText = ultimoResultado;

}
    if (genero === "formFeminino"){

        let CinturaF = Number(document.getElementById("CinturaF").value);
        if (isNaN(CinturaF) || CinturaF <= 0) {
        alert("Digite um valor válido!!");
        return;
        }

        let AlturaF = Number(document.getElementById("AlturaF").value);
        if (isNaN(AlturaF) || AlturaF <= 0){
        alert("Digite uma altura válida!!");
        return;
        }

        let PescocoF = Number(document.getElementById("PescocoF").value);
        if (isNaN(PescocoF) || PescocoF <= 0){
        alert("Digite um valor válido!!");
        return;
        }

        let Quadril = Number(document.getElementById("Quadril").value);
        if (isNaN(Quadril) || Quadril <= 0){
        alert("Digite um valor válido!!");
        return
        }

        if (CinturaF <= PescocoF){
        alert("Cintura deve ser maior que o pescoço!!");
        return;
        }

        if ((CinturaF + Quadril) <= PescocoF){
        alert("Valores inválidos para o cálculo!!");
        return
        }

        let BfF = 495 / (
            1.29579
            - 0.35004 * Math.log10(CinturaF + Quadril - PescocoF)
            +0.22100 * Math.log10(AlturaF)
        ) - 450;

        document.getElementById("resultado").innerText = "Sua Gordura corporal / BF é de: "
        +BfF.toFixed(2) + "%";

        ultimoResultado = "BF: " + BfF.toFixed(2) + "%";
        document.getElementById("resultado").innerText = ultimoResultado;

    }

}


function salvarHistorico(texto){
    let historico = JSON.parse(localStorage.getItem("historico")) || [];

    historico.push(texto);


    localStorage.setItem("historico", JSON.stringify(historico));
}

function atualizarHistorico(){

    let historico = JSON.parse(localStorage.getItem("historico")) || [];

    let div = document.getElementById("historico");
    div.innerHTML = "";

    historico.forEach((item, index) => {
        let divItem = document.createElement("div");
        
        let p = document.createElement("p");
        p.innerText = item;

        let botaoExcluir = document.createElement("button");
        botaoExcluir.innerText = "Excluir";

        botaoExcluir.onclick = function(){
            excluirItem(index);
        };

        divItem.appendChild(p);
        divItem.appendChild(botaoExcluir);

        div.appendChild(divItem);
    });
}

function mostrarHistorico(){

    let div = document.getElementById("historico");
    let botao = document.getElementById("botaoHistorico");
    
    if (div.style.display === "none"){
        div.style.display = "block";

        botao.innerText = "Fechar historico";

        atualizarHistorico();

    }else {
        div.style.display = "none";

        botao.innerText = "Ver historico";
    }
}

function excluirItem(index) {

    let historico = JSON.parse(localStorage.getItem("historico")) || [];
    historico.splice(index, 1);
    localStorage.setItem("historico", JSON.stringify(historico));

    atualizarHistorico();
}


function salvarResultado(){
    if (ultimoResultado === ""){
        alert("Calcule primeiro!!");
        return;
    }

    let historico = JSON.parse(localStorage.getItem("historico")) || [];

    historico.push(ultimoResultado);

    localStorage.setItem("historico", JSON.stringify(historico));

    alert("Salvo no historico!!");
}

function salvarResultado(){
    if (ultimoResultado === ""){
        alert("Calcule primeiro!!");
        return;
    }

    let nome = prompt("De um nome para esse resultado:");

    if(!nome || nome.trim() === ""){
        alert("Nome inválido!!");
        return;
    }

    let historico = JSON.parse(localStorage.getItem("historico")) || [];

    let registro = nome + " → " + ultimoResultado;

    historico.push(registro);

    localStorage.setItem("historico", JSON.stringify(historico));

    alert("Salvo com sucesso!!");
}

function limparCampos(){

    let ids = [
        "CinturaM","AlturaM","PescocoM","PescocoM","PesoM",
        "CinturaF","AlturaF","PescocoF","Quadril","PesoF"
    ];

    ids.forEach(id => {
        let el = document.getElementById(id);
        if (el) el.value = "";
    });

    let resultado = document.getElementById("resultado");
    if (resultado) resultado.innerText = "";
}

document.getElementById("btnLimpar").addEventListener("click", limparCampos);


