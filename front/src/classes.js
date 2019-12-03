export class Ponto
{
    constructor(x, y, z)
    {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;

        this.facesComum = [];
    }

    get i () { return this.x;}
    get j () { return this.j;}
    get k () { return this.z;}

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
        console.log("{x: " + this.x + ", y: " + this.y + ", z: " + this.z + " }");
    };
}

class Aresta
{
    constructor(p, q)
    {
        this.p = p || new Ponto();
        this.q = q || new Ponto();
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

    get normal() {
        let a = this.Pontos;

        let Aresta1 = new Vetor();
        Aresta1 = a[2].Subtracao(a[1]);

        let Aresta2 = new Vetor();
        Aresta2 = a[0].Subtracao(a[1]);

        let normal = new Vetor();
        normal = Aresta1.produtoEscalar(Aresta2);

        return normal;
    }

    get Pontos ()
    {
        return [this.a.q, this.b.q, this.c.q];
    }

    get Centroide ()
    {
        let p = this.Pontos;

        let x = (Math.max (p[0].x, p[1].x, p[2].x) + Math.min (p[0].x, p[1].x, p[2].x))/2.0;
        let y = (Math.max (p[0].y, p[1].y, p[2].y) + Math.min (p[0].y, p[1].y, p[2].y))/2.0;
        let z = (Math.max (p[0].z, p[1].z, p[2].z) + Math.min (p[0].z, p[1].z, p[2].z))/2.0;

        return new Ponto (x, y, z);
    }

    get Vincula ()
    {
        let pontos = this.Pontos;

        for (let i = 0; i < pontos.length; ++i)
        {
            if (!pontos.find((face) => (face === this)))
                pontos[i].facesComum.push(this);
        }
    }

    Imprime()
    {
        this.Pontos.forEach ((p) => (p.Imprime()));
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

    get x () { return this.i; }
    get y () { return this.j; }
    get z () { return this.k; }

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
        return ((this.i * outro.i) + (this.j * outro.j) + (this.k * outro.k));
    }

    Subtracao (outro)
    {
        return new Vetor (this.i - outro.x, this.j - outro.y, this.k - outro.z);
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

export class VRP extends Vetor
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
    get x(){
      return this.i;
    }
    get y(){
      return this.j;
    }
    get z(){
      return this.k;
    }

    desloca(x,y,z){
      this.i+=x;
      this.j+=y;
      this.k+=z;
    }
    deslocaVRP(x,y,z) {
        this.pontoFocal.Desloca(x,y,z);
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


// PONTOS
let pontoA = new Ponto(30, 2, 25);
let pontoB = new Ponto(35, 2, 25);
let pontoC = new Ponto(25, 3, 18);
let pontoD = new Ponto(20, 1, 23);
let pontoE = new Ponto(30, 10, 22.5);

// ARESTAS
let arestaAB = new Aresta(pontoA, pontoB);
let arestaBA = arestaAB;

let arestaAE = new Aresta(pontoA, pontoE);
let arestaEA = arestaAE;

let arestaAD = new Aresta(pontoA, pontoD);
let arestaDA = arestaAD;

let arestaBC = new Aresta(pontoB, pontoC);
let arestaCB = arestaBC;

let arestaBE = new Aresta(pontoB, pontoE);
let arestaEB = arestaBE;

let arestaCD = new Aresta(pontoC, pontoD);
let arestaDC = arestaCD;

let arestaCE = new Aresta(pontoC, pontoE);
let arestaEC = arestaCE;

let arestaDE = new Aresta(pontoD, pontoE);
let arestaED = arestaDE;

// face ABCD foi quebrada em duas: ABC e ACD
let arestaAC = new Aresta(pontoA, pontoC);
let arestaCA = arestaAC;

// FACES
let faceABC = new Face(arestaAB, arestaBC, arestaAC);
faceABC.Vincula;
let faceACB, faceBAC, faceBCA, faceCAB, faceCBA;
faceACB = faceBAC = faceBCA = faceCAB = faceCBA = faceABC;

let faceACD = new Face(arestaAC, arestaCD, arestaDA);
faceACD.Vincula;
let faceADC, faceCAD, faceCDA, faceDAC, faceDCA;
faceADC = faceCAD = faceCDA = faceDAC = faceDCA = faceACD;

let faceADE = new Face(arestaAE, arestaED, arestaDA);
faceADE.Vincula;
let faceAED, faceDAE, faceDEA, faceEAD, faceEDA;
faceAED = faceDAE = faceDEA = faceEAD = faceEDA = faceADE;

let faceABE = new Face(arestaAB, arestaBE, arestaEA);
faceABE.Vincula;
let faceAEB, faceBAE, faceBEA, faceEAB, faceEBA;
faceAEB = faceBAE = faceBEA = faceEAB = faceEBA = faceABE;

let faceBCE = new Face(arestaBC, arestaCE, arestaEB);
let faceBEC, faceCBE, faceCEB, faceEBC, faceECB;
faceBEC = faceCBE = faceCEB = faceEBC = faceECB = faceBCE;

let faceCDE = new Face(arestaCD, arestaDE, arestaEC);
let faceCED, faceDCE, faceDEC, faceECD, faceEDC;
faceCED = faceDCE = faceDEC = faceECD = faceEDC = faceCDE;

let teste = new Face(arestaAB, arestaBC, arestaAC);

// pontoA.Imprime();
// for (let i = 0; i < pontoA.facesComum.length; ++i)
// {
//     console.log("Face " + i + ":");
//     pontoA.facesComum[i].Imprime();
//     console.log();
// }

let a = faceABC.Pontos;

// console.log (faceABC.Centroide);

// a[0].x = 12; // X do primeiro ponto da face (aresta A)
// a[2].z = 7; // Z do ultimo ponto da face (aresta C)

// for (let i = 0; i < a.length; ++i)
// console.log (a[i]);

// console.log (faceABC.Centroide);

// let v = new VRP(99, 36, 108, new Ponto(3, 6, 8));
// v.ImprimiNVU();

// Retorna uma matriz com valores de 0 a 255 q simbolizam a altura e luminancia do pixel:
export function RandomizaHeightMap (x, y)
{
    let mat = [];

    for (let i = 0; i < x; i++)
    {
        let line = [];

        for (let j = 0; j < y; j++)
        {
            let value = Math.floor (Math.random() * 256);

            line.push (value);
        }

        mat.push (line);
    }

    return mat;
}

// Retorna uma matriz com pontos onde:
// X e Y simbolizam a posicao no loop
// Z a altura do ponto
export function HeigthmapParaMatrizPontos (matriz)
{
    let pontos = [];

    for (let i = 0; i < matriz.length; i++)
    {
        let linha = [];

        for (let j = 0; j < matriz[i].length; j++)
            linha.push (new Ponto (i*5, j*5, matriz[i][j]));

        pontos.push (linha);
    }

    return pontos;
}

export function MatrizPontosParaVetorFaces (matrizPontos)
{
    let vetorFaces = [];

    for (let i = 0; i < matrizPontos.length-1; ++i)
    {
        for (let j = 0; j < matrizPontos[i].length; ++j)
        {
            // Arestas
            let a;
            let b;
            let c;

            if (j < matrizPontos[i].length-1)
            {
                a = new Aresta (matrizPontos[i][j], matrizPontos[i][j+1]);
                b = new Aresta (matrizPontos[i][j+1], matrizPontos[i+1][j]);
                c = new Aresta (matrizPontos[i+1][j], matrizPontos[i][j]);

                let f = new Face (a, b, c);
                f.Vincula;
                vetorFaces.push (f);
            }

            if (j != 0)
            {
                a = new Aresta (matrizPontos[i][j], matrizPontos[i+1][j]);
                b = new Aresta (matrizPontos[i+1][j], matrizPontos[i+1][j-1]);
                c = new Aresta (matrizPontos[i+1][j-1], matrizPontos[i][j]);

                let f = new Face (a, b, c);
                f.Vincula;
                vetorFaces.push (f);
            }
        }
    }

    return vetorFaces;
}

function OcultaFaces (arrayFaces)
{

}

let matH = RandomizaHeightMap (3, 3);
let matP = HeigthmapParaMatrizPontos (matH);

let f = MatrizPontosParaVetorFaces (matP);


f.forEach((p) => console.log(p));

let pt = f[0].Pontos[0];
console.log ("PONTO 0:");
console.log (pt);

for (let i = 0; i < pt.facesComum.length; ++i)
{
    console.log("Face " + i + ":");
    pt.facesComum[i].Imprime();
    console.log();
}

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

export class SRT {

     MatrizSRC(n, vrp) {

       console.log(vrp);
        n = vrp.CalculaN();

        let v = new Ponto();
        v = vrp.CalculaV();


        let u = new Ponto();
        u = vrp.CalculaU();

        let matriz = [
            [u.x, u.y, u.z, ((-vrp.x * u.x) + (-vrp.y * u.y) + (-vrp.z * u.z))],
            [v.x, v.y, v.z, ((-vrp.x * v.x) + (-vrp.y * v.y) + (-vrp.z * v.z))],
            [n.x, n.y, n.z, ((-vrp.x * n.x) + (-vrp.y * n.y) + (-vrp.z * n.z))],
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

     MatrizSRTAxo(n, vrp, xmax, xmin, ymax, ymin, umax, umin, vmax, vmin) {

        let MSRC = this.MatrizSRC(n, vrp);
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
//let a = new Aresta(pa, qa);

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
