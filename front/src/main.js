import "core-js/stable";
import "regenerator-runtime/runtime";

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
salvar.onclick = async () => {

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

}

async function getPoints() {

}



function draw(points){
  ctx.clearRect(0,0,width,height);
  points.map((point) =>{
    ctx.fillRect(point.x,point.y,10,10)
  });
}

async function main(){

  const points = await getPoints();

  draw(points);
}

main();
