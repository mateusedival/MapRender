// Retorna uma matriz com valores de 0 a 255 q simbolizam a altura e luminancia do pixel:
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

// Retorna uma matriz com pontos onde:
// X e Y simbolizam a posicao no loop
// Z a altura do ponto
function HeigthmapParaMatrizPontos (matriz)
{
    let pontos = [];

    for (let i = 0; i < matriz.length; i++)
    {
        let linha = [];

        for (let j = 0; j < matriz[i].length; j++) 
            linha.push (new Ponto (i, j, matriz[i][j]));

        pontos.push (linha);
    }

    return pontos;
}

function MatrizPontosParaFaces (matrizPontos) 
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

                vetorFaces.push (new Face (a, b, c));
            }

            if (j != 0)
            {
                a = new Aresta (matrizPontos[i][j], matrizPontos[i+1][j]);
                b = new Aresta (matrizPontos[i+1][j], matrizPontos[i+1][j-1]);
                c = new Aresta (matrizPontos[i+1][j-1], matrizPontos[i][j]);
                
                vetorFaces.push (new Face (a, b, c));
            }
        }
    }

    return vetorFaces;
}
