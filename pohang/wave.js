import {
    Point
} from './point.js'

export class Wave{
    constructor(index, totalPoints, color){
        this.index = index;
        this.totalPoints = totalPoints;
        this.color = color;
        this.points = [];
    }

    resize(stageWidth, stageHeight){
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        // 화면의 중간에 그려질 것이기 때문에 스테이지 넓이의 반, 높이의 반
        this.centerX = stageWidth / 2;
        this.centerY = stageHeight / 2;

        //Point의 간격은 스테이지 넓이에서 totalPoints만큼을 나눈 값
        this.pointGap = this.stageWidth / (this.totalPoints - 1);

        this.init();
    }

    init(){
        this.points = [];

        //PointGap 간격에 맞춰서 포인트를 화면에 그려줌
        for(let i = 0; i < this.totalPoints; i++){
            const point = new Point(
                this.index + i,
                this.pointGap * i - document.body.clientWidth/2,
                this.centerY*1.25,
            );
            this.points[i] = point;
        }

    }

    //실제 캔버스에 그려주는 함수
    draw(ctx){
        ctx.beginPath();
        ctx.fillStyle = this.color;

        let prevX = this.points[0].x;
        let prevY = this.points[0].y;

        ctx.moveTo(prevX, prevY);

        //첫번째 마지막 Point 제외
        for(let i = 1; i < this.totalPoints; i++){
            if (i < this.totalPoints - 1) {
                this.points[i].update();
            }

            // 곡선 연결을 위한 중간 값
            const cx = (prevX + this.points[i].x) / 2;
            const cy = (prevY + this.points[i].y) / 2;

            //직선 연결
            // ctx.lineTo(cx, cy);  

            //곡선 연결
            ctx.quadraticCurveTo(prevX, prevY, cx, cy);

            prevX = this.points[i].x;
            prevY = this.points[i].y;
        }

        ctx.lineTo(prevX, prevY);
        ctx.lineTo(this.stageWidth, this.stageHeight);
        ctx.lineTo(this.points[0].x, this.stageHeight);
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.closePath();
    }
}
