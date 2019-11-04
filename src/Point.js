export default class Point {
  constructor(a = 0,b = 0,c = 0){
    this.x = a;
    this.y = b;
    this.z = c;
  }
  translate(a = 0, b = 0, c = 0){
    this.x +=a;
    this.y +=b;
    this.z +=c;
  }

  print(){
    console.table(this)
  }
}
