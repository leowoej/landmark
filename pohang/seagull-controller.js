import {
    Seagull
} from './seagull.js';

export class SeagullController{
    constructor(){
        this.img = new Image();
        this.img.onload = () => {
            this.loaded();
        };
        this.img.src = 'seagull.png';

        this.items = [];

        this.cur = 0;
        this.isLoaded = false;
    }
    
    resize(stageWidth, stageHeight){
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
    }

    loaded(){   // load가 완료되면 양을 추가
        this.isLoaded = true;
        this.addSeagull();
    }

    addSeagull(){
        this.items.push(
            new Seagull(this.img, this.stageWidth),
        );
    }

    draw(ctx, t, dots){
        if (this.isLoaded) {
            this.cur += 1;
            if (this.cur > 200){
                this.cur = 0;
                this.addSeagull();
            }
   
            for ( let i = this.items.length - 1; i >= 0; i--){
                const item = this.items[i];
                if (item.x < -item.width){
                    this.items.splice(i, 1);
                }else{
                    item.draw(ctx, t, dots);
                }
            }
        }
    }
}