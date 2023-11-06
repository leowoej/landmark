export class Point{
    constructor(index, x, y){
        this.x = x;
        this.y = y;
        this.fixedY = y;
        this.speed = 0.03;
        this.cur = index;   //현재 Point가 몇번째 Point인지 정의
        this.max = Math.random() *100 + 150;
    }

    //update를 실행하면 sin그래프를 따라 아래 위로 움직인다.
    update(){
        this.cur += this.speed;
        this.y = this.fixedY + (Math.sin(this.cur) * this.max);
    }
}