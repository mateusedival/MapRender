import "core-js/stable";
import "regenerator-runtime/runtime";
import {Ponto} from "./classes.js"
import {download} from "./utils.js"

import { saveAs } from 'file-saver';

//Variáveis de controle
let isWire = false;
const formData = new FormData();

//Canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");
const height = canvas.height;
const width = canvas.width;

//Busca os Elementos do DOM
const salvar = document.querySelector("button[name=salvar]");
const wire = document.querySelector("button[name=wire]");
const persp = document.querySelector("button[name=persp]");
const imagefile = document.querySelector('input[type="file"]');
const carregar = document.querySelector("button[name=carregar]")

//Atribui funções a botões
salvar.onclick = () => {
  download("heightmap.txt",JSON.stringify(getPoints()));
};

wire.onclick = () => {
  if(isWire === true)
    return;
  isWire = !isWire;
  main();
}

persp.onclick = () => {
  if(isWire === false)
    return;
  isWire = !isWire;
  main();
}

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

function getPoints() {
  if(isWire)
    return [new Ponto(596), new Ponto(100,300,40),new Ponto(300,200)];
  return [new Ponto(), new Ponto(10,30,40),new Ponto(100,40)];
}




function draw(points){
  ctx.clearRect(0,0,width,height);
  points.map((point) =>{
    ctx.fillRect(point.x,point.y,10,10)
  });
}

function main(){

  const points =  getPoints();

  draw(points);
}

main();
