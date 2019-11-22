/// DUVIDAS:
// * Para casos como "OcultaFaces (arrayFaces)", altero as faces do proprio array ou as cria um array novo de faces?

/*********** FASE 1 ************/

/// REQUISITO 1

    /*
        Converter um heightmap para uma matriz de pontos (MALHA RETANGULAR TRIANGULAR)
        Input: Arquivo com extensao .jorjinho que vem do front
        Output: Matriz de pontos
    */
    function ImagemParaMatriz (imagem) {}

    /*
        Converte uma matriz de pontos para um array de faces
            (acho q qual face esta conectada com qual nao é importate)
        Input: Matriz de pontos
        Output: Um array de Faces() com suas respectivas Areasta()
    */
    function MatrizPontosParaFaces (matrizPontos) {}

    /*
        Converte os pontos das faces de SRU para SRT
        Input: Matriz de pontos
        Output: 
    */
    function SRU_SRT (arrayFaces) {}

/// REQUISITO 3

    /*
        Oculta as faces (pre-filtro) não visiveis
        Input: Matriz de pontos
        Output: Matriz de pontos
    */
    function OcultaFaces (arrayFaces) {}

    /*
        Alterar as faces para uma PROJECAO PARALELA AXONOMETRICA
        Input: Matriz de pontos
        Output: Matriz de pontos
    */
    function ProjecaoParalelaAxonometrica (arrayFaces) {}

    /*
        Plotar as faces no modelo de wireframe com ocultação de faces em projeção paralela axonometrica
        Input: Matriz de pontos
        Output: Matriz de pontos
    */
    function VisualizarWireframe (arrayFaces) {}

/*********** UTILITARIAS ************/

/// REQUISITO 1

    /*
        Randomizar pontos para criar o heightmap
        Input:  x -> quantidade de pixels em x
                y -> quantidade de pixels em y
        Output: Matriz de pontos
    */
    function RandomizaHeightMap (x, y) {}

    /*
        Procedimento que efetua algum filtro de media para suaviar os pontos do terreno randomizado
        (Nao intendi se o usuario escolhe se esse procedimento vai ser aplicado ou se ele SEMPRE é aplicado)
        Input: Matriz de pontos
        Output: Vazio
    */
    function FiltroMedia (matrizPontos) {}

    /*
        Salvar os pontos em um heightmap com extensao .jorjinho
        Input: Matriz de pontos
        Output: Valor booleano para indicar sucesso ou falha na gravacao
    */
    function Salvar (matrizPontos) {}
