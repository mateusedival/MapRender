import Point from './src/Point';

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
var height = canvas.height;
var width = canvas.width;

let p1 = new Point();


function main(){
    ctx.fillRect(p1.x,p1.y,1,1)
    p1.translate(1,1);
}
setInterval(main, 100);
