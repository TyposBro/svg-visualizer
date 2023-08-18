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
  getSamples = () => {
    if (!this.init) return;
    this.analyser.getByteTimeDomainData(this.dataArray);
    return [...this.dataArray].map((e) => e / 128 - 1);
  };
  getVolume = () => {
    if (!this.init) return;
    this.analyser.getByteTimeDomainData(this.dataArray);
    const normalizedSamples = [...this.dataArray].map((e) => e / 128 - 1);
    let sum = 0;
    normalizedSamples.forEach((e) => (sum += e * e));
    return Math.sqrt(sum / normalizedSamples.length);
  };
}
