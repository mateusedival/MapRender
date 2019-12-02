function RandomizaHeightMap (x, y) 
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

function MatrizPontosParaFaces (matrizPontos) 
{
    let vetorFaces = [];

    for (let i = 0; i < matrizPontos.length-1; ++i)
    {
        for (let j = 0; j < matrizPontos[i].length-1; ++j)
        {
            // Arestas
            let a;
            let b;
            let c;

            if (j%2 == 0)
            {
                a = new Aresta (new Ponto(matrizPontos[i][j], matrizPontos[i][j+1]));
                b = new Aresta (new Ponto(matrizPontos[i][j+1], matrizPontos[i+1][j]));
                b = new Aresta (new Ponto(matrizPontos[i+1][j], matrizPontos[i][j]));
            }
            else
            {
                a = new Aresta (new Ponto(matrizPontos[i][j], matrizPontos[i+1][j]));
                b = new Aresta (new Ponto(matrizPontos[i+1][j], matrizPontos[i][j-1]));
                b = new Aresta (new Ponto(matrizPontos[i][j-1], matrizPontos[i][j]));
            }

            console.log (a, b, c);
            vetorFaces.push (new Face (a, b, c));
        }
    }
}

MatrizPontosParaFaces (RandomizaHeightMap (3, 3));
