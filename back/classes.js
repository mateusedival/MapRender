class Ponto {
    constructor(x, y, z) {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;

        let Ox = this.x;
        let Oy = this.y;
        let Oz = this.z;

        this.Desloca = function(Tx, Ty, Tz) {
            x += Tx;
            y += Ty;
            z += Tz;
        };

        this.Imprime = function() {
            console.log("x: " + x + "\ny: " + y + "\nz: " + z);
        };
    }
}

class Aresta {
    constructor(p, q) {
        this.p = p || new Ponto();
        this.q = q || new Ponto();

        this.Imprime = function() {
            console.log("Ponto p:");
            p.Imprime();

            console.log("Ponto q:");
            q.Imprime();

            console.log("");
        }
    }
}

class Face {
    constructor(a, b, c) {
        this.a = a || new Aresta();
        this.b = b || new Aresta();
        this.c = c || new Aresta();

        this.Imprime = function() {
            console.log("Aresta A-B");
            a.Imprime();

            console.log("Aresta B-C");
            b.Imprime();

            console.log("Aresta C-A");
            c.Imprime();
        }
    }
}


class SuperFace {
    constructor() {
        this.faces = new Map();

        this.AddConjuntoFaces = function(nomeConjunto, conjunto) {
            this.faces.set(nomeConjunto, conjunto);
        }

        this.Imprime = function(nomeConjunto) {
            let arrayFaces;

            if (arrayFaces = this.faces.get(nomeConjunto)) {
                arrayFaces.forEach((f) => f.Imprime());
            }
        }
    }
}

function ProdutoEscalar(aresta1, aresta2) {
    let v1 = aresta1.CalculoVetor();
    let v2 = aresta2.CalculoVetor();

    let produto = new Ponto();
    produto.x = (v1.y * v2.z) - (v1.z * v2.y);
    produto.y = (v1.z * v2.x) - (v1.x * v2.z);
    produto.z = (v1.x * v2.y) - (v1.y * v2.z);

    return produto;

}

function CalculoVetor(p, q) {
    let vetor = new Ponto();
    vetor.x = q.x - p.x;
    vetor.y = q.y - p.y;
    vetor.z = q.z - p.z;

    return vetor;
}

function CalculaNormal(v1) {
    let norma;
    let vetor = new Ponto();

    norma = Math.pow(v1.x, 2) + Math.pow(v1.y, 2) + Math.pow(v1.z, 2);
    norma = Math.sqrt(norma);

    vetor.x = v1.x / norma;
    vetor.y = v1.y / norma;
    vetor.z = v1.z / norma;

    return vetor;
}

function CalculaV(Nnormalizado) {
    let v = new Ponto();

    v.x = Nnormalizado.y * Nnormalizado.x;
    v.y = Nnormalizado.y * Nnormalizado.y;
    v.z = Nnormalizado.y * Nnormalizado.z;

    v.x = 0 - v.x;
    v.y = 1 - v.y;
    v.z = 0 - v.z;
    return CalculaNormal(v);

}

function CalculaU(N, V) {
    let produto = new Ponto();
    produto.x = (V.y * N.z) - (V.z * N.y);
    produto.y = (V.z * N.x) - (V.x * N.z);
    produto.z = (V.x * N.y) - (V.y * N.x);

    return CalculaNormal(produto);
}

function MultiplicaMatriz(MatrizA, MatrizB) {
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

    return MatrizR;
}

function Visibilidade(N) {

}

function MatrizSRC(n, VRP) {

    let v = new Ponto();
    v = CalculaV(n);


    let u = new Ponto();
    u = CalculaU(n, v);

    let matriz = [
        [u.x, u.y, u.z, ((-VRP.x * u.x) + (-VRP.x * u.y) + (-VRP.x * u.z))],
        [v.x, v.y, v.z, ((-VRP.y * v.x) + (-VRP.y * v.y) + (-VRP.y * v.z))],
        [n.x, n.y, n.z, ((-VRP.z * n.x) + (-VRP.z * n.y) + (-VRP.z * n.z))],
        [0, 0, 0, 1]
    ]

    console.log(matriz);
    return matriz;
}

function MatrizPerspep(d) {
    let matriz = [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, -1 / d, 0]
    ]

    return matriz;
}

function MatrizJP(xmax, xmin, ymax, ymin, umax, umin, vmax, vmin) {
    let matriz = [
        [(umax - umin) / (xmax - xmin), 0, 0, (-xmin * ((umax - umin) / (xmax - xmin)) + umin)],
        [0, (vmin - vmax) / (ymax - ymin), 0, (ymin * ((vmax - vmin) / (ymax - ymin)) + vmax)],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
    ]
    return matriz;
}

function MatrizSRT(n, VRP, d, xmax, xmin, ymax, ymin, umax, umin, vmax, vmin) {

    let MSRC = MatrizSRC(n, VRP);
    let MP = MatrizPerspep(d);
    let Mjp = MatrizJP(xmax, xmin, ymax, ymin, umax, umin, vmax, vmin);

    let MSRT = MultiplicaMatriz(Mjp, MP);
    MSRT = MultiplicaMatriz(MSRT, MSRC);
    //console.log(MSRC);

}

const VRP = new Ponto(50, 15, 30);
const P = new Ponto(20, 6, 15);
const dp = 17;
const xmin = -8,
    xmax = 8,
    ymin = -5,
    ymax = 5;
const umin = 0,
    umax = 320,
    vmin = 0;
vmax = 240;

let vrpp = new Ponto();
vrpp = CalculoVetor(P, VRP);
vrpp = CalculaNormal(vrpp);

MatrizSRT(vrpp, VRP, dp, xmax, xmin, ymax, ymin, umax, umin, vmax, vmin);

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

sf = new SuperFace();
sf.AddConjuntoFaces("sru", arrayFaces);

sf.Imprime("sru");




// pa = new Ponto (1, 2, 3);
// qa = new Ponto (3, 2, 1);
// a = new Aresta (pa, qa);

// pb = new Ponto (4, 5, 6);
// qb = new Ponto (1, 2, 4);
// b = new Aresta (pb, qb);

// pc = new Ponto (9, 8, 4);
// qc = new Ponto (1, 0, 3);
// c = new Aresta (pc, qc);

// face = new Face (a, b, c);

// arrayFaces.pop();
// arrayFaces.push (face);

// sf.AddConjuntoFaces ("sru", arrayFaces);

// sf.Imprime("sru");