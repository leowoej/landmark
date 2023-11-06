export class Sheep {
    constructor(img, stageWidth){
        this.img = img;

        this.totalFrame = 8;
        this.curFrame =0;

        this.imgWidth = 360;
        this.imgHeight = 300;

        this.sheepWidth =180;
        this.sheepHeight =150;

        this.sheepWidthHalf = this.sheepWidth / 2;
        this.x = stageWidth + this.sheepWidth;
        this.y = 0;
        this.speed = Math.random() * 2 + 1;

        this.fps = 24;
        this.fpsTime = 1000 / this.fps;
    }
    
    draw(ctx, t, dots){
        if (!this.time){
            this.time = t;
        }
        const now = t - this.time;
        if (now > this.fpsTime){    // 프레임을 fps의 시간과 비교해서 그 시간에 도달하면 증가 시킴. 프레임 증가 속도를 시간에 맞춤
            this.time = t;
            this.curFrame += 1;
            if (this.curFrame == this.totalFrame){
                this.curFrame = 0;
            }
        }

        // this.curFrame += 1;
        // if(this.curFrame == this.totalFrame){
        //     this.curFrame = 0;
        // }

        this.animate(ctx, dots);
    }

    animate(ctx, dots){
        this.x -= this.speed;   // 왼쪽으로 이동
        const closest = this.getY(this.x, dots);
        this.y = closest.y;              // 언덕의 좌표

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(closest.rotation);
        ctx.drawImage(  // 양 이미지 그려주는 함수
            this.img,
            this.imgWidth * this.curFrame,
            0,
            this.imgWidth,
            this.imgHeight,
            -this.sheepWidthHalf, 
            -this.sheepHeight +20,
            this.sheepWidth,
            this.sheepHeight
        );
        ctx.restore();  //저장했던 캔버스 복귀 시켜줌
    }

    getY(x, dots){  //어떤 곡선이 x에 해당하는지 확인
        for (let i = 1; i < dots.length; i++){
            if (x >= dots[i].x1 && x <=dots[i].x3){
                return this.getY2(x, dots[i]);
            }
        }

        return {
            y:0,
            rotation:0
        };
    }

    getY2(x, dot){  //양의 x값에 해당하는 y 값
        const total =200;
        let pt = this.getPointOnQuad(dot.x1, dot.y1, dot.x2, dot.y2, dot.x3, dot.y3, 0);
        let prevX = pt.x;
        for (let i =1; i < total; i++){
            const t = i / total;
            pt = this.getPointOnQuad(dot.x1, dot.y1, dot.x2, dot.y2, dot.x3, dot.y3, t);

            if (x >=prevX && x <=pt.x){
                return pt;
            }
            prevX = pt.x;
        }
        return pt;
    }

    getQuadValue(p0, p1, p2, t){
        return (1 - t) * (1 - t) * p0 + 2 * (1 - t) * t * p1 + t * t * p2;
    }

    getPointOnQuad(x1, y1, x2, y2, x3, y3, t){
        const tx = this.quadTangent(x1, x2, x3, t);
        const ty = this.quadTangent(y1, y2, y3, t);
        const rotation = -Math.atan2(tx, ty) + (90 * Math.PI / 180);    //atan2() 수직의 각도를 구함, 수평으로 하려면 90도를 더해줌 라디안으로 변환해서
        return {
            x: this.getQuadValue(x1, x2, x3, t),
            y: this.getQuadValue(y1, y2, y3, t),
            rotation: rotation,
        };
    }

    quadTangent(a, b, c, t){
        return 2 * (1 - t) * (b - a) + 2 * (c - b) * t;
    }
}