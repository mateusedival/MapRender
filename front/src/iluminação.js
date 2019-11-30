function SomConstante(Ka, Kd, Ks, Il, Ila, n, face, LVetor, N) {
    let Centro = new Ponto();
    Centro = CalculaCentroGeo(face);

    let Ia = Ila * Ka;
    let Id = CalculaDifusa(LVetor, N, Centro);
    let Is = CalculaEspecular(Lvetor, N, VRP, Centro);

    let It = Ia + Id + Is;
    return It;
}

function CalculaCentroGeo(face) {
    let CentroMax = new Ponto(Math.max(face.aresta.ponto.x), Math.max(face.aresta.ponto.y), Math.max(face.aresta.ponto.z)); //nao sei
    let CentroMin = new Ponto(Math.min(face.aresta.ponto.x), Math.min(face.aresta.ponto.y), Math.min(face.aresta.ponto.z));
    let Centro = new Ponto(((CentroMax.x + CentroMin.x) / 2), ((CentroMax.y + CentroMin.y) / 2), ((CentroMax.z + CentroMin.z) / 2));

    return Centro;
}

function CalculaL(V, Centro) {
    let L = new Vetor((V.x - Centro.x, V.y - Centro.y, V.z - Centro.z));

    Vetor = Vetor.Normaliza();

    return Vetor;
}

function CalculaEspecular(LVetor, N, VRP, Centro) {
    let R = new Vetor();
    let taxa;
    taxa = 2 * (ProdutoEscalar(N, LVetor));
    R = N.Subtracao(LVetor);
    R = ((taxa * R.x), (taxa * R.y), (taxa * R.z));

    let S = new Vetor();
    S = VPR.Subtracao(Centro);
    S = S.Normaliza();

    let Is = ProdutoEscalar(R, S);
    return Is;
}

function CalculaDifusa(LVetor, N, Centro) {
    let L = new Vetor();

    L = CalculaL(LVetor, Centro);
    let lzinho = L.ProdutoEscalar(N);
    let Id = Il - Kd(lzinho);

    return Id;
}


ProdutoEscalar(outro) {
    let produto;

    produto = (this.i * outro.i) + (this.j * outro.j) + (this.k * outro.k);

    return produto;
}