export class WaveTransition{
  constructor(){
    this.processor = {
      computeFrame: function(video, ctx1, ctx2) {
        this.video = video;
        this.ctx1 = ctx1;
        this.ctx2 = ctx2;
        if (video.paused || video.ended) {
          return;
        }
        console.log("computeFrame", ctx1, ctx2)

        this.ctx1.drawImage(this.video, 0, 0);
        let frame = this.ctx1.getImageData(0, 0, document.body.clientWidth, document.body.clientHeight);
            let l = frame.data.length / 4;
    
        for (let i = 0; i < l; i++) {
          let r = frame.data[i * 4 + 0];
          let g = frame.data[i * 4 + 1];
          let b = frame.data[i * 4 + 2];
          if (r < 100 && g > 100 && b < 100
            || 200<r && 210<b && r<220 && g<200 && b<250
            )
            frame.data[i * 4 + 3] = 0;
        }
        this.ctx2.putImageData(frame, 0, 0);
        return;
      }
    
    };
  }
}
