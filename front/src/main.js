import "core-js/stable";
import "regenerator-runtime/runtime";
import api from './api.js';

async function getPoints() {
    const response = await  api.get(`/points`);
    console.log(response.data);
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
