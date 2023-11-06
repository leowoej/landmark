import {
    WaveGroup
} from './wavegroup.js';

import {
    Hill
} from './hill.js';

import {
    SheepController
} from './sheep-controller.js';

import {
    SeagullController
} from './seagull-controller.js';

import {
    Sun
} from './sun.js';

import {
    WaveTransition
} from './waveTransition.js';

class App {
    constructor() {
        //canvas 생성,  body에 추가
        this.canvas = document.createElement('canvas');
        this.canvas.setAttribute("id", "mainCanvas")
        this.ctx = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);

        this.sun = new Sun();
        this.waveGroup = new WaveGroup();
        this.hills = [
            // new Hill('#fd6bea', 0.2, 12),
            new Hill('#ff59c200', 0.5, 8),
            new Hill('#ff467400', 1.4, 6)
        ];
        // this.sheepController = new SheepController();
        this.seagullController = new SeagullController();

        this.waveTransition = new WaveTransition();
        this.video = document.getElementById("video");
        this.c1 = document.getElementById("c1");
        this.c2 = document.getElementById("c2");
        this.ctx1 = c1.getContext("2d", {willReadFrequently: true});
        this.ctx2 = c2.getContext("2d");

        // this.resize를 인스턴스에 바인딩하고, 이벤트 캡쳐링 차단.
        // false를 사용하면 이벤트 캡처링(capturing) 모드가 아닌 버블링 모드로 이벤트가 처리됩니다.
        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();
        requestAnimationFrame(this.animate.bind(this)); //애니메이션을 지정해줌
    }

    //canvas size를 더블 사이즈로 지정해서 레티나 디스플레이에서도 잘 보일 수 있게 만들어 줍니다
    resize(){
        this.stageWidth = document.body.clientWidth;
        this.stageHeigth = document.body.clientHeight;

        this.canvas.width = this.stageWidth * 2;
        this.canvas.height = this.stageHeigth * 2;
        this.ctx.scale(2, 2);       
        
        this.sun.resize(this.stageWidth, this.stageHeigth);
        this.waveGroup.resize(this.stageWidth *2, this.stageHeigth);
    
        for (let i =0; i < this.hills.length; i++){
            this.hills[i].resize(this.stageWidth, this.stageHeigth / 2);    // 언덕 그려지는 좌표
        }
        // this.sheepController.resize(this.stageWidth, this.stageHeigth);
        this.seagullController.resize(this.stageWidth, this.stageHeigth);
    }

    animate(t){
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeigth);
        this.ctx1.clearRect(0, 0, this.stageWidth, this.stageHeigth);    //canvas를 clear하는 함수 추가

        requestAnimationFrame(this.animate.bind(this));


        
        this.sun.draw(this.ctx, t);
        this.waveGroup.draw(this.ctx);
        // this.randomSpeed(this.waveGroup.waves[0]);
        
        let dots1, dots2;

        for (let i = 0; i < this.hills.length; i++){
            dots1 = this.hills[0].draw(this.ctx);
            dots2 = this.hills[1].draw(this.ctx);
        }

        // this.sheepController.draw(this.ctx, t, dots);   // 언덕의 dots을 받아서 양을 그려줌
        this.seagullController.draw(this.ctx, t, dots1);   // 언덕의 dots을 받아서 양을 그려줌
        // this.seagullController.draw(this.ctx, t, dots2);   // 언덕의 dots을 받아서 양을 그려줌
        // console.log('seagull: ', this.seagullController.items.length)

        // 파도 트랜지션
        this.computeFrame(this.ctx)
    }

    randomSpeed(where){
        var random  = Math.random() * (0.1 - 0.03) + 0.03;

        // for(var i = 1; i <where.points.length; i++){
        //     where.points[i].speed = random
        // }
        var ranP = Math.floor(Math.random() * where.points.length);
        where.points[ranP].speed = random;
        // console.log("S",ranP)
    }

    computeFrame(ctx) {
        if (this.video.paused || this.video.ended) {
          return;
        }

        this.ctx1.drawImage(this.video, 0, 0);
        let frame = this.ctx1.getImageData(0, 0, 1920, 1080);
            let l = frame.data.length / 4;
    
        for (let i = 0; i < l; i++) {
          let r = frame.data[i * 4 + 0];
          let g = frame.data[i * 4 + 1];
          let b = frame.data[i * 4 + 2];
          if (r < 100 && g > 100 && b < 100
            || 200<r && 210<b && r<220 && g<200 && b<250)
                frame.data[i * 4 + 3] = 0;
        }

        this.ctx2.putImageData(frame, 0, 0);
        return;
    }

    
}

// window가 로드되면 App2를 생성
window.onload = () => {
    new App();
}