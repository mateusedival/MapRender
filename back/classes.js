function Point(x, y, z) {
    //um ponto é formado pelas suas três coordenadas no espaço
    this.x = x;
    this.y = y;
    this.z = z;

    var Ox = this.x;
    var Oy = this.y;
    var Oz = this.z;

    this.desloca = function(Tx, Ty, Tz) {
        x = x + Tx;
        y = y + Ty;
        z = z + Tz;

    }

    this.imprime = function() {
        console.log(x, y, z)
    }
}


function Aresta(P, Q) {
    //Uma aresta é formada por dois pontos
    this.P = P;
    this.Q = Q;

}

function Face(A, B, C) {
    //Uma face em um triangulo é composta por três arestas
    this.A = A;
    this.B = B;
    this.C = C;

}

function Camera() {
    this.calculoN = function(VRP, P) {
        var N = new Vector(VRP, P);
        N.calculoNormalizado();
        return N;
    }

    this.calculoV = function(N, Y) {
        var V = new Point((Y.x * N.x), (Y.y * N.y), (Y.z * N.z));
        V.x = Y.x - (V.x * N.x);
        V.y = Y.y - (V.y * N.y);
        V.z = Y.z - (V.z * N.z);

        var norma = Math.sqrt((Math.pow(V.x, 2)) + (Math.pow(V.y, 2)) + (Math.pow(V.z, 2)));
        var VetorVNorm = new Point((V.x / norma), (V.y / norma), (V.z / norma));
        return VetorVNorm;
    }
}

function Vector(P, Q) {

    this.P = P;
    this.Q = Q;

    this.calculoValue = function() {
        var Coord = new Point((P.x - Q.x), (P.y - Q.y), (P.z - Q.z));
        return Coord;
    }

    this.calculoNormalizado = function() {
        var Vetor = new Point((P.x - Q.x), (P.y - Q.y), (P.z - Q.z));
        var Norm = Math.sqrt((Math.pow(Vetor.x, 2)) + (Math.pow(Vetor.y, 2)) + (Math.pow(Vetor.z, 2)));
        var VetorNorm = new Point((Vetor.x / Norm), (Vetor.y / Norm), (Vetor.z / Norm));
        return VetorNorm;
    }
}