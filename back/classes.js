class Ponto
{
    constructor(x, y, z)
    {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
    }

    CalculoVetor(outro)
    {
        let vetor = new Vetor();

        vetor.i = this.x - outro.x;
        vetor.j = this.y - outro.y;
        vetor.k = this.z - outro.z;

        return vetor;
    }

    Desloca(Tx, Ty, Tz)
    {
        this.x += Tx;
        this.y += Ty;
        this.z += Tz;
    }

    Imprime()
    {
        console.log("x: " + this.x + "\ny: " + this.y + "\nz: " + this.z);
    };
}

class Aresta
{
    constructor(p, q)
    {
        this.p = p || new Point();
        this.q = q || new Point();
    }

    get vetor()
    {
        return Jorge.CalculoVetorEntre2Pontos(this.p, this.q);
    }

    Imprime()
    {
        console.log("Ponto p:");
        this.p.Imprime();

        console.log("Ponto q:");
        this.q.Imprime();

        console.log("");
    }
}


class Face
{
    constructor(a, b, c)
    {
        this.a = a || new Aresta();
        this.b = b || new Aresta();
        this.c = c || new Aresta();
    }

    // TODO: expressar a regra da mao direita para obter a normal da face
    get normal()
    {
        return 0;
    }

    Imprime()
    {
        console.log("Aresta A-B");
        this.a.Imprime();

        console.log("Aresta B-C");
        this.b.Imprime();

        console.log("Aresta C-A");
        this.c.Imprime();
    }
}

class SuperFace
{
    constructor()
    {
        this.faces = new Map();
    }

    AddConjuntoFaces(nomeConjunto, conjunto)
    {
        this.faces.set(nomeConjunto, conjunto);
    }

    Imprime(nomeConjunto)
    {
        let arrayFaces;

        if (arrayFaces = this.faces.get(nomeConjunto))
        {
            arrayFaces.forEach((f) => f.Imprime());
        }
    }
}



class Vetor
{
    constructor(i, j, k)
    {
        this.i = i || 0;
        this.j = j || 0;
        this.k = k || 0;

        this.norm_i;
        this.norm_j;
        this.norm_k;

        this.modulo;
    }

    Normaliza()
    {
        let vetor = new Vetor();

        this.modulo = Math.pow(this.i, 2) + Math.pow(this.j, 2) + Math.pow(this.k, 2);
        this.modulo = Math.sqrt(this.modulo);

        vetor.i = this.i / this.modulo;
        vetor.j = this.j / this.modulo;
        vetor.k = this.k / this.modulo;

        return vetor;
    }

    ProdutoVetorial(outro)
    {
        let produto = new Vetor();

        produto.i = (this.j * outro.z) - (this.z * outro.y);
        produto.j = (this.z * outro.x) - (this.x * outro.z);
        produto.k = (this.x * outro.y) - (this.y * outro.z);

        return produto;
    }

    Subtracao (outro)
    {
        return new Vetor (this.i - outro.i,
                          this.j - outro.j,
                          this.k - outro.k);
    }

    Imprimi()
    {
        console.log("VETOR NAO-NORMALIZADO:");
        console.log("i: " + this.i + "\nj: " + this.j + "\nk: " + this.k);
    }

    ImprimiNormalizado()
    {
        console.log("VETOR NORMALIZADO:");
        console.log("i: " + this.norm_i + "\nj: " + this.norm_j + "\nk: " + this.norm_k);
    }
}

// TODO: TERMINAR O VRP
class VRP extends Vetor
{
    constructor(x, y, z, _pontoFocal)
    {
        super(x, y, z);

        this.pontoFocal = _pontoFocal || new Vetor (0, 0, -10);

        this.n;
        this.v;
        this.u;
    }

    GetN()
    {
        if (!this.n)
        {
            this.n = this.Subtracao(this.pontoFocal);
            this.n.Normaliza();
        }

        return this.n;
    }

    GetV()
    {
        if (!this.v)
        {
            v.x = this.n.norm_j * this.n.norm_i;
            v.y = this.n.norm_j * this.n.norm_j;
            v.z = this.n.norm_j * this.n.norm_k;

            v.x = 0 - v.x;
            v.y = 1 - v.y;
            v.z = 0 - v.z;
        }

        return this.v;
    }

    // get v (Nnormalizado)
    // {
    //     let v = new Ponto();

    //     v.x = Nnormalizado.y * Nnormalizado.x;
    //     v.y = Nnormalizado.y * Nnormalizado.y;
    //     v.z = Nnormalizado.y * Nnormalizado.z;

    //     v.x = 0 - v.x;
    //     v.y = 1 - v.y;
    //     v.z = 0 - v.z;
    //     return CalculaNormal(v);

    // }

    // get u (N, V)
    // {
    //     let produto = new Ponto();
    //     produto.x = (V.y * N.z) - (V.z * N.y);
    //     produto.y = (V.z * N.x) - (V.x * N.z);
    //     produto.z = (V.x * N.y) - (V.y * N.x);

    //     return CalculaNormal(produto);
    // }
}


class Jorge
{
    // TODO IMPLEMENTAR A MULTIPLICACAO
    MultiplicaMatriz (matrizA, matrizB) {}
}
