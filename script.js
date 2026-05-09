let genero = "";
let infoAberta = false;
let multiplicadorAtividade = 0;
let ultimoResultado = "";
let ultimoLBM = 0;
let ultimoBF = 0;
let ultimoPeso = 0;
let manutencao =0;
let ultimoBotaoInfo = null;
let manutencaoAberta =false; 

function mostrarHomem(){

    let form = document.getElementById("formMasculino");

    if (form.style.display === "block"){

    form.style.display = "none";

    document.getElementById("btnCalcular").style.display = "none";
    document.getElementById("btnSalvar").style.display = "none";
    document.getElementById("btnLimpar").style.display = "none";

    genero = "";

    } else {

        form.style.display = "block";

    document.getElementById("formFeminino").style.display = "none";

    document.getElementById("btnCalcular").style.display = "block";
    document.getElementById("btnSalvar").style.display = "block";
    document.getElementById("btnLimpar").style.display = "block";

        genero = "formMasculino";
    }
}

function mostrarMulher(){
    let form = document.getElementById("formFeminino");

    if (form.style.display === "block"){
        form.style.display = "none";
        document.getElementById("btnCalcular").style.display = "none";
        document.getElementById("btnSalvar").style.display = "none";
        document.getElementById("btnLimpar").style.display = "none";

        genero = "";

    } else {

        form.style.display = "block";

        document.getElementById("formMasculino").style.display = "none";

        document.getElementById("btnCalcular").style.display = "block";
        document.getElementById("btnSalvar").style.display = "block";
        document.getElementById("btnLimpar").style.display = "block";

        genero = "formFeminino";
    }
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

    ultimoBF = BfM;
    ultimoPeso = Number(document.getElementById("PesoM").value);

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

        ultimoBF = BfF;
        ultimoPeso = Number(document.getElementById("PesoF").value);

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
        p.innerText = item.nome + " → BF: " + item.bf.toFixed(2) + "%";

        let botaoExcluir = document.createElement("button");
        botaoExcluir.innerText = "Excluir";

        botaoExcluir.onclick = function(){
            excluirItem(index);
        };

        let botaoInfo = document.createElement("button");
        botaoInfo.innerText = "Mais informações";

        botaoInfo.onclick = function(){
            mostrarInfo(item, botaoInfo);
        };

        divItem.appendChild(p);
        divItem.appendChild(botaoExcluir);
        divItem.appendChild(botaoInfo);

        div.appendChild(divItem);

    });
}

function mostrarInfo(item, botao){

    let painel = document.getElementById("painelInfo");

    if (ultimoBotaoInfo && ultimoBotaoInfo !== botao){
        ultimoBotaoInfo.innerText = "Mais informações";
    }

    if(infoAberta){
        painel.style.display = "none";
        botao.innerText = "Mais informações"
        infoAberta = false;

    } else {

    let lbm = item.peso * (1 - item.bf / 100);

    let pesoLb = item.peso * 2.20462;

    let manutencao = pesoLb * multiplicadorAtividade;

    painel.innerHTML = `
        <h2>${item.nome}</h2>

        <p>BF: ${item.bf.toFixed(2)}%</p>

        <p>LBM: ${lbm.toFixed(2)} kg</p>

        <p>Peso: ${item.peso} kg</p>

        <p>Manutenção: ${manutencao.toFixed(0)} Kcal</p>

        <button id="btnverManutencao" onclick="verManutencao(${manutencao}, ${item.peso}, ${lbm}, this)">
            Ver Manutenção
        </button>
        <div id="infoManutencao"></div>
        `;
        painel.style.display = "block";
        botao.innerText = "Menos informações"
        ultimoBotaoInfo = botao;
        infoAberta = true;

    }
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

    let nome = prompt("De um nome para esse resultado:");

    if(!nome || nome.trim() === ""){
        alert("Nome inválido!!");
        return;
    }

    let historico = JSON.parse(localStorage.getItem("historico")) || [];

    let registro = {
        nome: nome,
        bf: ultimoBF,
        peso: ultimoPeso
    };

    historico.push(registro);

    localStorage.setItem("historico", JSON.stringify(historico));

    alert("Salvo no historico!!");
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

function nivelAtividade(valor, botao){

    multiplicadorAtividade = valor;

    let botoes = document.querySelectorAll(".btnAtividade");
    botoes.forEach(btn => {
        btn.innerText = btn.innerText.replace("◀ ", "")
        .replace(" ▶", "");
    });
    botao.innerText = "◀ " + botao.innerText + " ▶";
}

function verManutencao(manutencao, peso, lbm, botao){

    let div = document.getElementById("infoManutencao");
    
    if(manutencaoAberta){
        div.innerHTML = "";
        botao.innerText = "Ver manutenção";
        manutencaoAberta = false;

    } else{
        let PTN = lbm * 2.2;
        let LIP = peso * 0.8;
        let caloriasProteina = PTN * 4;
        let caloriasGordura = LIP * 9;

        let CHO = (
            manutencao - caloriasProteina - caloriasGordura) / 4;
    
    div.innerHTML = `
        <h3>Detalhes da Manutenção</h3>

        <p>Calorias diárias: ${manutencao.toFixed(0)} kcal</p>
        <p>Cutting leve: ${(manutencao - 300).toFixed(0)} kcal</p>
        <p>Cutting agressivo: ${(manutencao - 500).toFixed(0)} kcal</p>
        <p>Bulking leve: ${(manutencao + 300).toFixed(0)} kcal</p>
        <p>Bulking agressivo: ${(manutencao + 500).toFixed(0)} kcal</p>

        <p>Calorias: ${manutencao.toFixed(0)} kcal</p>
        <p>PTN: ${PTN.toFixed(0)} g</p>
        <p>LIP: ${LIP.toFixed(0)} g</p>
        <p>CHO: ${CHO.toFixed(0)} g</p>
    `;

    botao.innerText = "Fechar manutenção";
    manutencaoAberta = true;
    }
}

