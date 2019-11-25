import "core-js/stable";
import "regenerator-runtime/runtime";
import api from './api.js';
import { saveAs } from 'file-saver';

//Busca os Botões da Tela
const salvar = document.querySelector("button[name=salvar]");


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


async function getPoints() {
    const response = await  api.get(`/points`);
    return response.data;
}

function draw(points,ctx){
  points.map((point) =>{
    ctx.fillRect(point.x,point.y,1,1)
  });
}

async function main(){
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext("2d");
  const height = canvas.height;
  const width = canvas.width;

  const points = await getPoints();

  draw(points,ctx);
}

main();
