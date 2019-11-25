// PONTOS
let pontoA = new Ponto (30, 2, 25);
let pontoB = new Ponto (35, 2, 25);
let pontoC = new Ponto (25, 3, 18);
let pontoD = new Ponto (20, 1, 23);
let pontoE = new Ponto (30, 10, 22.5);

// ARESTAS
let arestaAB = new Aresta (pontoA, pontoB);
let arestaBA = arestaAB;

let arestaAE = new Aresta (pontoA, pontoE);
let arestaEA = arestaAE;

let arestaAD = new Aresta (pontoA, pontoD);
let arestaDA = arestaAD;

let arestaBC = new Aresta (pontoB, pontoC);
let arestaCB = arestaBC;

let arestaBE = new Aresta (pontoB, pontoE);
let arestaEB = arestaBE;

let arestaCD = new Aresta (pontoC, pontoD);
let arestaDC = arestaCD;

let arestaCE = new Aresta (pontoC, pontoE);
let arestaEC = arestaCE;

let arestaDE = new Aresta (pontoD, pontoE);
let arestaED = arestaDE;

// face ABCD foi quebrada em duas: ABC e ACD
let arestaAC = new Aresta (pontoA, pontoC);
let arestaCA = arestaAC;

// FACES
let faceABC = new Face (arestaAB, arestaBC, arestaAC);
let faceACB, faceBAC, faceBCA, faceCAB, faceCBA;
faceACB = faceBAC = faceBCA = faceCAB = faceCBA = faceABC;

let faceACD = new Face (arestaAC, arestaCD, arestaDA);
let faceADC, faceCAD, faceCDA, faceDAC, faceDCA;
faceADC = faceCAD = faceCDA = faceDAC = faceDCA = faceACD;

let faceADE = new Face (arestaAE, arestaED, arestaDA);
let faceAED, faceDAE, faceDEA, faceEAD, faceEDA;
faceAED = faceDAE = faceDEA = faceEAD = faceEDA = faceADE;

let faceABE = new Face (arestaAB, arestaBE, arestaEA);
let faceAEB, faceBAE, faceBEA, faceEAB, faceEBA;
faceAEB = faceBAE = faceBEA = faceEAB = faceEBA = faceABE;

let faceBCE = new Face (arestaBC, arestaCE, arestaEB);
let faceBEC, faceCBE, faceCEB, faceEBC, faceECB;
faceBEC = faceCBE = faceCEB = faceEBC = faceECB = faceBCE;

let faceCDE = new Face (arestaCD, arestaDE, arestaEC);
let faceCED, faceDCE, faceDEC, faceECD, faceEDC;
faceCED = faceDCE = faceDEC = faceECD = faceEDC = faceCDE;
