export class Mic {
  constructor(fftSize, index) {
    this.init = false;
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        this.audioCtx = new AudioContext();
        this.mic = this.audioCtx.createMediaStreamSource(stream);
        this.analyser = this.audioCtx.createAnalyser();
        this.analyser.fftSize = fftSize;
        const bufferLength = this.analyser.frequencyBinCount;
        this.dataArray = new Uint8Array(bufferLength);
        this.mic.connect(this.analyser);
        this.init = true;
      })
      .bind(this)
      .catch(alert);
  }
}
