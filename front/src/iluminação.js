///FUNCAO DE SOMBREAMENTO CONSTANTE PRINCIPAL
function SomConstante(Ka, Kd, Ks, Il, Ila, n, face, LVetor, N) {
    let Centro = new Ponto();
    let a = face.centroide;
    let b = face.normal;

    let Ia = Ila * Ka;
    let Id = CalculaDifusa(LVetor, N, a, Il, Kd);
    let Is = CalculaEspecular(Lvetor, N, VRP, a, Il, Ks, n);

    let It = Ia + Id + Is;
    return It;
}

function CalculaL(V, Ponto) {
    let L = new Vetor((V.i - Ponto.x, V.j - Ponto.y, V.k - Ponto.z));
    L = L.Normaliza();

    return L;
}

function CalculaEspecular(LVetor, face, VRP, Centro, Il, Ks, n) {
    let R = new Vetor();
    let taxa;
    let a = face.normal;

    taxa = 2 * (ProdutoEscalar(a, LVetor));
    R = ((taxa * a.i), (taxa * a.j), (taxa * a.k));
    R = R.Subtracao(LVetor);

    let S = new Vetor();
    S = VRP.Subtracao(Centro);
    S = S.Normaliza();

    let RS = ProdutoEscalar(R, S);

    if (RS > 0) {
        RS = Math.pow(RS, n);
        return (Il * Ks * RS);
    } else
        return 0;


}

function CalculaDifusa(LVetor, N, a, Il, Kd) {
    let L = new Vetor();
    L = CalculaL(LVetor, a);
    L = L.Normaliza();
    L = L.ProdutoEscalar(N);

    if (L > 0)
        return (Il * Kd * L);
    else
        return 0;
}


function ProdutoEscalar(outro) {
    let produto;

    produto = (this.i * outro.i) + (this.j * outro.j) + (this.k * outro.k);

    return produto;
}