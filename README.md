/// DUVIDAS e TODO:
// * Para casos como "OcultaFaces (arrayFaces)", altero as faces do proprio array ou as cria um array novo de faces?
// R: Uma superclasse de faces que carrega informacoes de multiplos momentos da face

// * Processo de ocultacao de linhas??
// POR ENQUANTO SOMENTE POR OCULTACAO DAS FACES NO PRE FILTRO

// * Escolher os pontos em que é importante salvar as faces.
//  * Salvar um modelo no SRU como "constante"
//  * SUGERIR: a SUPERFACE trabalhe com as faces visiseis, já que caso as visiveis mudem TDO precisa ser recalculado
//  * Salvar um conjunto de faces no SRT

// * Colocar um variavel de DIRTY na SUPERFACE

// * Projecao axonometrica
// * Projecao paralela axonometrica
// * Projecao perspectiva

// * Heightmap com COR????

/*********** FASE 1 ************/

# REQUISITO 1

    /*
        Converter um heightmap para uma matriz de pontos (MALHA RETANGULAR TRIANGULAR)
        Input: Arquivo com extensao .jorjinho que vem do front
        Output: Matriz de pontos
        Erro:
            * Imagem com extensao errada
            * imagem com tamanho nulo
    */
    function ImagemParaMatriz (imagem) {} // vulgo CARREGAR
    
    /*
        Randomizar pontos para criar o heightmap
        Input:  x -> quantidade de pixels em x
                y -> quantidade de pixels em y
        Output: Matriz de pontos
        Erro:
            * X ou Y igual a 0
            * X * Y superior a N (a gente calcula um limite para o tamanho da imagem)
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
        Erros: 
            * Matriz vazia
    */
    function Salvar (matrizPontos) {}

# OUTROS 
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

    OUUUU

    function SRU_SRT (arrayFaces, projecao_Mproj, janela_Mjp) {}
    function ProjecaoParalelaAxonometrica (arrayFaces) {}
    function ProjecaoPerspectiva (arrayFaces) {}
    function JanelaEixoInvertido (arrayFaces) {}
    function JanelaEixoNormal (arrayFaces) {}s

# REQUISITO 3

    /*
        Oculta as faces (pre-filtro) não visiveis
        Input: Matriz de pontos
        Output: nulo
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
