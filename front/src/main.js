import "core-js/stable";
import "regenerator-runtime/runtime";
import {Ponto,SRT, SuperFace,VRP, MatrizPontosParaVetorFaces, RandomizaHeightMap,HeigthmapParaMatrizPontos} from "./classes.js";
import {download} from "./utils.js";




//Variáveis de controle
let state = 0;
let rng = false;
let superFace = new SuperFace();
let ka,kd,ks,n,il,ila;
let vrp = new VRP(0,0,0,new Ponto(10,10,10));
let srt = new SRT();

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
  console.log(superFace);
  download("heightmap.jorginho",JSON.stringify(superFace.faces));
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
  let a = MatrizPontosParaVetorFaces(HeigthmapParaMatrizPontos(RandomizaHeightMap(width,height)));
  superFace.AddConjuntoFaces("sru", a );
  let b = SRU_SRT(a);
  superFace.AddConjuntoFaces("srt",b);
  rng = true;
  main();
};

carregar.onclick = () => {

  let reader = new FileReader();

  // Read file into memory as UTF-16
  reader.readAsText(imagefile.files[0], "UTF-8");
  reader.onload = function(event) {
        let o = JSON.parse(event.target.result);
        console.log(o);
        superFace = o;
        main();
  };
  reader.onerror = function(evt) {
    if(evt.target.error.name == "NotReadableError") {
      // The file could not be read
    }
  }
}

window.onchange = ilu_update;

window.onkeydown = keyDown;

//===========
function getPoints() {
  if(rng)
    return superFace.faces.get("srt");
}

function draw(faces){
  ctx.clearRect(0,0,width,height);
  faces.forEach((face) =>{
    face.Pontos.forEach((point) => {
      ctx.fillStyle = `rgb(${point.z}, ${point.z}, ${point.z})`;
      ctx.fillRect(point.x, point.y,50,50)
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

  const faces =  getPoints();

  draw(faces);
}

main();


function keyDown() {
      const cod = window.event.code;

      if(cod == "KeyA")
      {
        vrp.desloca(-1,0,0);
        vrp.deslocaVRP(-1,0,0);
      }
      else if(cod == "KeyS")
      {
        vrp.desloca(1,0,0);
        vrp.deslocaVRP(1,0,0);
      }
      else if(cod == "KeyQ")
      {
        vrp.desloca(0,1,0);
        vrp.deslocaVRP(0,1,0);
      }
      else if(cod == "KeyW")
      {
        vrp.desloca(0,-1,0);
        vrp.deslocaVRP(0,-1,0);

      }
      else if(cod == "KeyZ")
      {

      }
      else if(cod == "KeyX")
      {

      }
      else if(cod == "KeyD")
      {
        vrp.deslocaVRP(-1,0,0);
      }
      else if(cod == "KeyF")
      {
        vrp.deslocaVRP(1,0,0);
      }
      else if(cod == "KeyE")
      {
        vrp.deslocaVRP(0,1,0);
      }
      else if(cod == "KeyR")
      {
        vrp.deslocaVRP(0,-1,0);
      }
      else if(cod == "KeyG")
      {
          vrp.desloca(-1,0,0);
      }
      else if(cod == "KeyH")
      {
          vrp.desloca(1,0,0);
      }
      else if(cod == "KeyT")
      {
          vrp.desloca(0,1,0);
      }
      else if(cod == "KeyY")
      {
        vrp.desloca(0,-1,0);
      }
      main();
}

function SRU_SRT(faces){
  let M = srt.MatrizSRTAxo(VRP.n,VRP,width,0,height,0,width,0,height,0);
  srt.Converte(M,faces);
}
