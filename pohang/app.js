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

        this.ctx1 = c1.getContext("2d");

        var mainCanvas = document.getElementById("mainCanvas");
        this.waveTransition.processor.doLoad(this.video, this.c1, mainCanvas);
        
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
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeigth);    //canvas를 clear하는 함수 추가
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

        // this.waveTransition.processor.timerCallback()
this.waveTransition.processor.computeFrame(this.video, this.ctx1, this.ctx)
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
}

// window가 로드되면 App2를 생성
window.onload = () => {
    new App();
}