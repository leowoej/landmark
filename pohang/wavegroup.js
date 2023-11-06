import{
    Wave
} from './wave.js';

export class WaveGroup{
    constructor(){
        this.totalWaves = 1;
        this.totalPoints = 6;

        this.color = [
            'rgba(0, 199, 235)', 
            'rgba(0, 146, 199, 0.4)', 
            'rgba(0, 87, 158, 0.4)'
        ];

        this.waves = [];

        //waves 만큼 wave를 생성
        for (let i = 0; i < this.totalWaves; i++){
            const wave = new Wave(
                i,
                this.totalPoints,
                this.color[i],
            );
            this.waves[i] = wave;   // 한개의 wave를 정의
        }
    }

    resize(stageWidth, stageHeight){
        for (let i = 0; i <this.totalWaves; i++){
            const wave = this.waves[i];
            wave.resize(stageWidth, stageHeight);
        }

    }

    draw(ctx){
        for (let i = 0; i <this.totalWaves; i++){
            const wave = this.waves[i];
            wave.draw(ctx);
        }
        
    }
}