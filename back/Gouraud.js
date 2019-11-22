function normalMedio(face) // ver de passar face com seus vetores
{
    let VetNormal = [face.lenght];

    for (var i = 0; i < face.lenght; i++) {
        VetNormal[i] = face[i].a + face[i].b + face[i].c;
    }

}

function IluminacaoDifusa(Il, ponto, L, VetNormal, Kd) {
    let Lx = new vector();
    Lx.calculoVetor(L, ponto);
    Lx.normaliza();

    let taxa = Lx.produtoEscalar(VetNormal);

    if (taxa > 0) {
        let Id = Il * Kd * taxa;
        return Id;
    }


}

function IluminacaoEspecular(Il, Ks, VRP, ponto, VetNormal, L) {
    let Lx = new vector(L, ponto);
    Lx.calculoVetor();
    Lx.normaliza();

    let Rx = new vector();
    let a = 2 * (Rx.produtoEscalar(VetNormal));

    Rx[0] = a * (VetNormal[0] - Lx[0]);
    Rx[1] = a * (VetNormal[1] - Lx[1]);
    Rx[2] = a * (VetNormal[2] - Lx[2]);

    let Sx = new vector();
    Sx.calculoVetor(VRP, ponto);

    let taxa = Sx.produtoEscalar(Rx);

    if (taxa > 0) {
        let Is = Il * Ks * Math.pow(taxa);
        return Is;
    }

}

function calculoIluminacao(Ila, Ka, face) {
    let Ia;
    Ia = Ila * Ka; //iluminação ambiente
}


function produtoEscalar(p1, p2) {
    var total = p1[0] * p2[0] + p1[1] * p2[1] + p1[2] * p2[2];
    return total;
}

function produtoVetorial(p1, p2) {
    var total = [3];

    total[0] = p1[1] * p2[2] - p1[2] * p2[1];
    total[1] = p1[2] * p2[0] - p1[0] * p2[2];
    total[2] = p1[0] * p2[1] - p1[1] * p2[0];

    return total;
}