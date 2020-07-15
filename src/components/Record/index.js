import React, { Component } from "react";
import { Button } from "antd";
import Recorder from "libs/js/recorder/index.js";
import "./recorder.scss";
// import Recorder from "js-audio-recorder";

export default class Record extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      recorder: null,    
      recording: false, //是否正在录音      
    };
  }

  render() {
    let { audioSrc } = this.state;

    return (
      <div>
        <Button onClick={this._startRecord}>start</Button>
        <Button onClick={this._stopRecord}>stop</Button>

        <canvas ref={el => this.canvasRef= el} id="canvas" width="300" height="60">
          Your browser does not support Canvas tag.
        </canvas>

        {audioSrc && (
          <audio
            id="audio"
            src={audioSrc}
            controls
            ref={(el) => (this.audioRef = el)}
            onEnded={() => this.setState({isPlayEnd: true})}
          ></audio>
        )}
      </div>
    );
  }

  componentDidMount() {
    this.initRecorder();
  }

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

  listenDeviceChange() {
    let { recorder } = this.state;
    recorder.on("devicechange", () => {
      // 检测到音频设备发生了变化，需要重新初始化音频环境
      let newRecorder = recorder.destroy();
      this.setState({ recorder: newRecorder }, this.initRecorder);
    });
  }

  // 开始录音
  _startRecord = () => {
    let { recorder, ready } = this.state;
    if (!recorder || !ready) return null;
    recorder.startRecord();
    this.setState({ recording: true });
    recorder.on("audioprocess", (arr) => {
      this.drawWaves({ waves: arr });
    });
  };

  // 停止录音
  _stopRecord = () => {
    let { recorder } = this.state;
    let { setRecordFile }= this.props
    recorder.stopRecord();
    this.setState({ recording: false });
    recorder.on("save", (blob) => {
      // 录音结束后，mp3文件
      setRecordFile(blob)
    });
  };

  // 画声纹
  drawWaves = ({ waves = [] }) => {
    let canvas = this.canvasRef;
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 2;
    let het = 0;
    
    for (let i = 0; i < 100; i++) {
      let value = waves[i]/ 20;
      ctx.fillStyle = '#fff';
      ctx.fillRect(i * 5, 30, 2, -value);
      // ctx.fillRect(i * 5, 30 - value, 2, het);
      ctx.fillRect(i * 5, 30, 2, value);
      // ctx.fillRect(i * 5, 30 + value, 2, het);
    }
  };
}
