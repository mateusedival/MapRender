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

export class SuperFace
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
        this.modulo = Math.pow(this.i, 2) + Math.pow(this.j, 2) + Math.pow(this.k, 2);
        this.modulo = Math.sqrt(this.modulo);

        console.log (this.modulo);
        this.norm_i = this.i / this.modulo;
        this.norm_j = this.j / this.modulo;
        this.norm_k = this.k / this.modulo;
    }

    ProdutoVetorial(outro)
    {
        let produto = new Vetor();

        produto.i = (this.j * outro.z) - (this.z * outro.y);
        produto.j = (this.z * outro.x) - (this.x * outro.z);
        produto.k = (this.x * outro.y) - (this.y * outro.z);

        return produto;
    }

    ProdutoEscalar(outro) 
    {
        if (outro instanceof Vetor)
            return ((this.i * outro.i) + (this.j * outro.j) + (this.k * outro.k));
        else
            return ((this.i * outro.x) + (this.j * outro.y) + (this.k * outro.z));

    }

    Subtracao (outro)
    {
        if (outro instanceof Ponto)
            return new Vetor (this.i - outro.x, this.j - outro.y, this.k - outro.z);
        else
            return new Vetor (this.i - outro.i, this.j - outro.j, this.k - outro.k);
    }

    // normalizado é uma booleana para qual versao do vetor vc quer ver
    // true = vetor NORMALIZADO
    // false = vetor NAO NORMALIZADO
    Imprimi(normalizado)
    {
        if (!normalizado)
            console.log("i: " + this.i + ", j: " + this.j + ", k: " + this.k);
        else
            console.log("i: " + this.norm_i + "\nj: " + this.norm_j + "\nk: " + this.norm_k);
    }
}

class VRP extends Vetor
{
    constructor(x, y, z, _pontoFocal)
    {
        super(x, y, z);

        this.pontoFocal = _pontoFocal || new Vetor (0, 0, -10);

        this.CalculaNVU();
        
        this.n;
        this.v;
        this.u;
    }

    CalculaN()
    {
        if (!this.n)
            this.n = new Vetor();
        
        this.n = this.Subtracao(this.pontoFocal);
        this.n.Normaliza();

        return this.n;
    }

    CalculaV()
    {
        if (!this.v)
            this.v = new Vetor();
        
        this.v.i = this.n.norm_j * this.n.norm_i;
        this.v.j = this.n.norm_j * this.n.norm_j;
        this.v.k = this.n.norm_j * this.n.norm_k;

        this.v.i = 0 - this.v.i;
        this.v.j = 1 - this.v.j;
        this.v.k = 0 - this.v.k;

        this.v.Normaliza();

        return this.v;
    }

    CalculaU ()
    {
        if (!this.u)
            this.u = new Vetor ();
            
        this.u.norm_i = (this.v.norm_j * this.n.norm_k) - (this.v.norm_k * this.n.norm_j);
        this.u.norm_j = (this.v.norm_k * this.n.norm_i) - (this.v.norm_i * this.n.norm_k);
        this.u.norm_k = (this.v.norm_i * this.n.norm_j) - (this.v.norm_j * this.n.norm_i);

        return this.u;
    }

    CalculaNVU ()
    {
        this.CalculaN();
        this.CalculaV();
        this.CalculaU();
    }

    ImprimiNVU ()
    {
        console.log ("N: {" + this.n.norm_i + ", " + this.n.norm_j + ", " + this.n.norm_k + "}");
        console.log ("V: {" + this.v.norm_i + ", " + this.v.norm_j + ", " + this.v.norm_k + "}");
        console.log ("U: {" + this.u.norm_i + ", " + this.u.norm_j + ", " + this.u.norm_k + "}");
    }
}

//DANIZITA COMEÇOU A ALTERAR ISSO
class Jorge {

    MultiplicaMatriz(matrizA, matrizB) {
        let MatrizR = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                for (let k = 0; k < 4; k++)
                    MatrizR[i][j] += MatrizA[i][k] * MatrizB[k][j];
            }
        }

        return MatrizR
    }

    //Função para pegar os pontos da face e ja organizar eles em uma matriz
    GeraMatriz(Face) {
        let MatrizR = [
            [Face.a.x, Face.b.x, Face.c.x],
            [Face.a.y, Face.b.y, Face.c.y],
            [Face.a.z, Face.b.z, Face.c.z],
            [1, 1, 1, 1]
        ]
        return MatrizR;
    }

    //Não sei se ta funfando
    NormalizaMatriz(Matriz) {
        let MatrizR = [
            [(Matriz[0][0] / Matriz[3][0]), (Matriz[0][1] / Matriz[3][1]), (Matriz[0][2] / Matriz[3][2])],
            [(Matriz[1][0] / Matriz[3][0]), (Matriz[1][1] / Matriz[3][1]), (Matriz[1][2] / Matriz[3][2])],
            [(Matriz[2][0] / Matriz[3][0]), (Matriz[2][1] / Matriz[3][1]), (Matriz[2][2] / Matriz[3][2])],
            [(Matriz[3][0] / Matriz[3][0]), (Matriz[3][1] / Matriz[3][1]), (Matriz[3][2] / Matriz[3][2])]
        ]
        return MatrizR;
    }

}

class SRT {

    MatrizSRC(n, VRP) {

        let v = new Ponto();
        v = CalculaV(n);


        let u = new Ponto();
        u = CalculaU(n, v);

        let matriz = [
            [u.x, u.y, u.z, ((-VRP.x * u.x) + (-VRP.y * u.y) + (-VRP.z * u.z))],
            [v.x, v.y, v.z, ((-VRP.x * v.x) + (-VRP.y * v.y) + (-VRP.z * v.z))],
            [n.x, n.y, n.z, ((-VRP.x * n.x) + (-VRP.y * n.y) + (-VRP.z * n.z))],
            [0, 0, 0, 1]
        ]

        return matriz;
    }

    MatrizPerspep(d) {
        let matriz = [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, -1 / d, 0]
        ]

        return matriz;
    }


    MatrizJP(xmax, xmin, ymax, ymin, umax, umin, vmax, vmin) {
        let matriz = [
            [(umax - umin) / (xmax - xmin), 0, 0, (-xmin * ((umax - umin) / (xmax - xmin)) + umin)],
            [0, (vmin - vmax) / (ymax - ymin), 0, (ymin * ((vmax - vmin) / (ymax - ymin)) + vmax)],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ]
        return matriz;
    }

    MatrizSRTPersp(n, VRP, d, xmax, xmin, ymax, ymin, umax, umin, vmax, vmin) {

        let MSRC = MatrizSRC(n, VRP);
        let MP = MatrizPerspep(d);
        let Mjp = MatrizJP(xmax, xmin, ymax, ymin, umax, umin, vmax, vmin);

        let MSRT = MultiplicaMatriz(Mjp, MP);
        MSRT = MultiplicaMatriz(MSRT, MSRC);
        return MSRT;
    }

    MatrizSRTAxo(n, VRP, xmax, xmin, ymax, ymin, umax, umin, vmax, vmin) {

        let MSRC = MatrizSRC(n, VRP);
        let Mjp = MatrizJP(xmax, xmin, ymax, ymin, umax, umin, vmax, vmin);
        let MSRT = MultiplicaMatriz(Mjp, MSRC);

        return MSRT;
    }

    Converte(MSRT, face) {
        let MatrizPonto = GeraMatriz(face);
        MatrizPonto = MultiplicaMatriz(MSRT, MatrizPonto);
        MatrizPonto = NormalizaMatriz(MatrizPonto);

        return MatrizPonto;
    }

}
//<<<<<<< HEAD
//=======
const VPR = new Ponto(50, 15, 30);
const P = new Ponto(20, 6, 15);
const dp = 17;
const xmin = -8,
    xmax = 8,
    ymin = -5,
    ymax = 5;
const umin = 0,
    umax = 320,
    vmin = 0,
vmax = 240;

let vrpp = new Ponto();
let VetorVRP = vrpp.CalculoVetor(VPR);
VetorVRP = VetorVRP.Normaliza();

//MatrizSRT(vrpp, VRP, dp, xmax, xmin, ymax, ymin, umax, umin, vmax, vmin);

let pa = new Ponto(1, 2, 3);
let qa = new Ponto(3, 2, 1);
let a = new Aresta(pa, qa);

let pb = new Ponto(4, 5, 6);
let qb = new Ponto(1, 2, 4);
let b = new Aresta(pb, qb);

let pc = new Ponto(9, 8, 4);
let qc = new Ponto(1, 7, 3);
let c = new Aresta(pc, qc);

let face = new Face(a, b, c);
let arrayFaces = [];
arrayFaces.push(face);

//sf = new SuperFace();
//sf.AddConjuntoFaces("sru", arrayFaces);

//sf.Imprime("sru");
//>>>>>>> 81872e51b2750c29db6252713de6d5898726f652
