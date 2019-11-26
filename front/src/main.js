import "core-js/stable";
import "regenerator-runtime/runtime";
import api from './api.js';
import { saveAs } from 'file-saver';

//Variáveis de controle
let isWire = false;

//Busca canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");
const height = canvas.height;
const width = canvas.width;

//Busca os Botões da Tela
const salvar = document.querySelector("button[name=salvar]");
const wire = document.querySelector("button[name=wire]");
const persp = document.querySelector("button[name=persp]");


//Atribui funções a botões
salvar.onclick = async () => {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:8081/file");
  xhr.responseType = "blob";

  xhr.onload = function () {
      saveAs(this.response, 'index.html'); // saveAs is a part of FileSaver.js
  };
  xhr.send();
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

async function getPoints() {
    let w = "";
    if(isWire)
        w ="w"
    const response = await api.get(`/points${w}`)

    return response.data;
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
