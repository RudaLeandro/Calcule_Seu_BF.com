let genero = "";

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
    }

}

