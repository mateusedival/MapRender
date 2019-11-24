class Ponto
{
    constructor(x, y, z) 
    {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;

        let Ox = this.x;
        let Oy = this.y;
        let Oz = this.z;

        this.desloca = function (Tx, Ty, Tz) 
        {
            x += Tx;
            y += Ty;
            z += Tz;
        };

        this.Imprime = function () 
        {
            console.log ("x: " + x + "\ny: " + y + "\nz: " + z);
        };
    }
}

class Aresta 
{
    constructor(p, q) 
    {
        this.p = p || new Point();
        this.q = q || new Point();

        this.Imprime = function ()
        {
            console.log ("Ponto p:");
            p.Imprime();

            console.log ("Ponto q:");
            q.Imprime();

            console.log ("");
        }
    }
}

class Face 
{
    constructor(a, b, c) 
    {
        this.a = a || new Aresta();
        this.b = b || new Aresta();
        this.c = c || new Aresta();

        this.Imprime = function ()
        {
            console.log ("Aresta A-B");
            a.Imprime();

            console.log ("Aresta B-C");
            b.Imprime();
            
            console.log ("Aresta C-A");
            c.Imprime();
        }
    }
}

class SuperFace
{
    constructor ()
    {
        this.faces = new Map();
        
        this.AddConjuntoFaces = function (nomeConjunto, conjunto)
        {
            this.faces.set (nomeConjunto, conjunto);
        }

        this.Imprime = function (nomeConjunto)
        {
            let arrayFaces;

            if (arrayFaces = this.faces.get(nomeConjunto))
            {
                arrayFaces.forEach ((f) => f.Imprime());
            }
        }
    }
}


let pa = new Ponto (1, 2, 3);
let qa = new Ponto (3, 2, 1);
let a = new Aresta (pa, qa);

let pb = new Ponto (4, 5, 6);
let qb = new Ponto (1, 2, 4);
let b = new Aresta (pb, qb);

let pc = new Ponto (9, 8, 4);
let qc = new Ponto (1, 7, 3);
let c = new Aresta (pc, qc);

let face = new Face (a, b, c);

let arrayFaces = [];
arrayFaces.push (face);

sf = new SuperFace();
sf.AddConjuntoFaces ("sru", arrayFaces);

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
