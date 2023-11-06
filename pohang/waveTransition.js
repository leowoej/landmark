export class WaveTransition{
  constructor(){
    this.processor = {
      timerCallback: function(video, ctx1, ctx2) {
        console.log("timerCallback", ctx1, ctx2)
        if (video.paused || video.ended) {
          return;
        }
        this.computeFrame(video, ctx1, ctx2);
        let self = this;
        setTimeout(function () {
            self.timerCallback(video, ctx1);
          }, 0);
      },
    
      doLoad: function(video, c1, c2) {
        
        this.video = video;
        this.c1 = c1;
        this.c2 = c2;
        // this.video = document.getElementById("video");
        // this.c1 = document.getElementById("c1");
        this.ctx1 = c1.getContext("2d");
        // this.c2 = document.getElementById("c2");
        this.ctx2 = c2.getContext("2d");

        let ctx1 = c1.getContext("2d");
        let ctx2 = c2.getContext("2d");

        let self = this;
        console.log("self: ", self)
        console.log("doLoad", c1, c2, this.ctx1, this.ctx2)
        this.video.addEventListener("play", function() {
            self.width = self.video.videoWidth ;
            self.height = self.video.videoHeight / 2;
            self.timerCallback(video, ctx1, ctx2);
          }, false);
      },
    
      computeFrame: function(video, ctx1, ctx2) {
        console.log("computeFrame", video, ctx1)
        if (video.paused || video.ended) {
          return;
        }
        ctx1.drawImage(this.video, 0, 0, this.width, this.height);
        let frame = this.ctx1.getImageData(0, 0, this.width, this.height);
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
