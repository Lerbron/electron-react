import React, { Component, PureComponent } from "react";

export default class AudioWrap extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hasAudioContext: false, // 是否已创建audioContext对象
      isPlayEnd: false, // 是否已经播放结束
    };
    this.audioContext = null; // audioContext实例
    this.audioSource = null; // 播放时创建的媒体流对象
  }

  render() {
    let { audioSrc } = this.props;
    return (
      <div className="audio-wrap">
        <audio
          src={audioSrc}
          ref={(el) => (this.audioRef = el)}
          onEnded={() => this.setState({ isPlayEnd: true })}
          className='audio-content'
        />
        <span className='large-btn audio-btn' onClick={this.play}>play</span>
        <div className='canvas-wrap'>

          <canvas
            ref={(el) => (this.canvasRef = el)}
            id="canvas"
            width="300"
            height="60"
          >
            Your browser does not support Canvas tag.
          </canvas>
        </div>
        <span className='mini-btn audio-btn'>transform</span>
      </div>
    );
  }

  play = () => {
    let { hasAudioContext } = this.state;
    let analyser = null;
    let waves = [];

    if (!hasAudioContext) {
      let AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioContext = new AudioContext();
    }
    analyser = this.audioContext.createAnalyser();
    analyser.fftSize = 256;
    analyser = this.audioContext.createAnalyser();
    if (!hasAudioContext) {
      this.audioSource = this.audioContext.createMediaElementSource(
        this.audioRef
      );
    }
    this.audioSource.connect(analyser);
    analyser.connect(this.audioContext.destination);
    this.globalID = requestAnimationFrame(() =>
      this.drawWaves({ waves, analyser })
    );
    this.audioRef.play();
    this.setState({ hasAudioContext: true, isPlayEnd: false });
  };

  initRecorder = () => {
    let { recorder } = this.state;
    if (recorder) return;
    recorder = new Recorder();
    this.setState({ recorder }, () => {
      recorder.on("ready", () => {
        let ready = recorder.supported;
        this.setState({ ready });
        if (ready) {
          this.listenDeviceChange();
        }
      });
    });
  };

  // 画声纹
  drawWaves = ({ waves = [], analyser }) => {
    let { isPlayEnd } = this.state;
    let canvas = this.canvasRef;
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 2;
    let het = 0;
    waves = new Uint8Array(100);
    analyser.getByteFrequencyData(waves);
    for (let i = 0; i < 100; i++) {
      let value = waves[i] / 10;
      ctx.fillStyle = '#fff';
      ctx.fillRect(i * 5, 30, 2, -value);
      // ctx.fillRect(i * 5, 30 - value, 2, het);
      ctx.fillRect(i * 5, 30, 2, value);
      // ctx.fillRect(i * 5, 30 + value, 2, het);
    }

    if (!isPlayEnd) {
      this.globalID = requestAnimationFrame(() =>
        this.drawWaves({ waves, analyser })
      );
    }
  };
}
