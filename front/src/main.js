import "core-js/stable";
import "regenerator-runtime/runtime";
import {Ponto, SuperFace, MatrizPontosParaVetorFaces} from "./classes.js";
import {download} from "./utils.js";
import Handler from "./handlers.js";
import {RandomizaHeightMap, MatrizPontosParaFaces} from "./utilities.js";



//Variáveis de controle
let state = 0;
let superFace = new SuperFace();
let ka,kd,ks,n,il,ila;

//handlers
const {keyDown, input_number} = Handler;

//Canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");
const height = canvas.height;
const width = canvas.width;

//Busca os Elementos do DOM
//buttons
const salvar = document.querySelector("button[name=salvar]");
const wire = document.querySelector("button[name=wire]");
const flat = document.querySelector("button[name=flat]");
const gouraud = document.querySelector("button[name=gouraud]");
const carregar = document.querySelector("button[name=carregar]");
const random = document.querySelector("button[name=random]");
//inputs
const imagefile = document.querySelector('input[type="file"]');
const ka_input = document.querySelector('input[name="ka"]');
const kd_input = document.querySelector('input[name="kd"]');
const ks_input = document.querySelector('input[name="ks"]');
const n_input = document.querySelector('input[name="n"]');
const il_input = document.querySelector('input[name="il"]');
const ila_input = document.querySelector('input[name="ila"]');


//Atribui funções a elementos do canvas
salvar.onclick = () => {
  download("heightmap.jorginho",JSON.stringify(getPoints()));
};

wire.onclick = () => {
  if(state != 0) {
    state = 0;
    main();
  }
}

flat.onclick = () => {
  if(state <= 0) {
    state = 1;
    main();
  }
}

gouraud.onclick = () => {
  if(state >= 0) {
    state = -1;
    main();
  }
}

random.onclick = () =>{
  superFace.AddConjuntoFaces("s",  MatrizPontosParaVetorFaces(MatrizPontosParaFaces(RandomizaHeightMap(width,height))));
  main();
};

carregar.onclick = () => {

  let reader = new FileReader();

  // Read file into memory as UTF-16
  reader.readAsText(imagefile.files[0], "UTF-8");
  reader.onload = function(event) {
        let o = JSON.parse(event.target.result)
        console.log(o);
  };
  reader.onerror = function(evt) {
    if(evt.target.error.name == "NotReadableError") {
      // The file could not be read
    }
  }
}

window.onchange = ilu_update;

//===========
function getPoints() {
  if(state < 0) {
    return superFace["s"];
  }
  if(state > 0)
    return [new Ponto(), new Ponto(10,30,40),new Ponto(100,40)];
    return [new Ponto(400,400), new Ponto(100,20,40),new Ponto(500,400)];
}

function draw(faces){
  ctx.clearRect(0,0,width,height);
  faces.map((face) =>{
    face.Pontos.map((point) => {
      ctx.fillRect(point.x, point.y,1,1)
    })
  });
}

function ilu_update(){
  ka = ka_input.value;
  kd = kd_input.value;
  ks = ks_input.value;
  n  = n_input.value;
  il = il_input.value;
  ila = ila_input.value;
}

function main(){
  ilu_update();

  const points =  getPoints();

  draw(points);
}

main();
