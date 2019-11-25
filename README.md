# Trabalho de Computação Gráfica

![]( https://drive.google.com/uc?export=view&id=1nPhI1KINbArF_cTdJWRvmQapi0p7nqiI)

## Diagrama
![]( https://drive.google.com/uc?export=view&id=1HRiYhzkI1L5ObAVb9yjIYrA6eEc0f_IY)



## TO-DO LIST

- [ ] ImagemParaMatriz (imagem)
- [ ] FiltroMedia (matrizPontos)
- [ ] RandomizaHeightMap (x, y)
- [ ] Salvar (matrizPontos)
- [ ] MatrizPontosParaFaces (matrizPontos)
- [ ] SRU_SRT (arrayFaces)
- [ ] OcultarFaces (arrayFaces)
- [ ] ProjecaoAxonometrica (arrayFaces) 
- [ ] ProjecaoPerspectiva (arrayFaces)
- [ ] VisualizarWireframe (arrayFaces)

# Funções 

* Converter um heightmap para uma matriz de pontos (MALHA RETANGULAR TRIANGULAR)

  ​	_function ImagemParaMatriz (imagem) {}_ 

  > Input: Arquivo com extensio _.jorginho_ que vem do front
  >
  > Output: Matriz de pontos

  

* Procedimento que efetua algum filtro de media para suavizar os pontos do terreno randomizado

  ​	_function FiltroMedia (matrizPontos) {}_ 

  > Input: Matriz de pontos
  >
  > Output: void

* Randomizar pontos para criar o heightmap

  _function RandomizaHeightMap (x, y) {}_ 

  > Input: (x, y) -> quantidade de pixels em X e em Y
  >
  > Output: Matriz de pontos

* Salvar os pontos em um heightmap com extensão _.jorginho_ 

  _function Salvar (matrizPontos) {}_ 

  > Input: Matriz de pontos
  >
  > Output: Valor booleano para indicar sucesso ou falha na gravação

* Converte uma matriz de pontos par um array de faces

  _function MatrizPontosParaFaces (matrizPontos) {}_ 

  > Input: Matriz de pontos
  >
  > Output: Um array de faces com suas respectivas arestas

* Converte os pontos das faces de SRU para SRT

  _function SRU_SRT (arrayFaces) {}_ 

  > Input: Vetor de faces
  >
  > Output:  Vetor de faces (distinto da entrada)

* Oculta as Faces (pré-filtro) não visiveis

  _function OcultarFaces (arrayFaces) {}_ 

  > Input: Vetor de faces
  >
  > Output: Vetor de faces (distinto da entrada)

* Cria um novo vetor de faces em projeção AXONOMÉTRICA 

  _function ProjecaoAxonometrica (arrayFaces) {}_ 

  > Input: Vetor de faces
  >
  > Output: Vetor de faces (distinto da entrada)

* Cria um novo vetor de faces em projeção PERSPECTIVA

  _function ProjecaoPerspectiva (arrayFaces) {}

  > Input: Vetor de faces
  >
  > Output: Vetor de faces (distinto da entrada)

* Plotar as faces no modelo wireframe

  _function VisualizarWireframe (arrayFaces) {}_ 

  > Input: Vetor de faces
  >
  > Output: Matriz de pontos

