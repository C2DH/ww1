import React, { PureComponent } from 'react'
import Wavesurfer from 'react-wavesurfer';
import './AudioPlayer.css'

const ctx = document.createElement('canvas').getContext('2d');
const linGrad = ctx.createLinearGradient(0, 64, 0, 200)
linGrad.addColorStop(0.5, 'white')
linGrad.addColorStop(0.5, 'crimson')

class AudioPlayer extends PureComponent {
  state = {
    playing: false,
    volume: 0.5,
  }

  handleTogglePlay = () => {
    this.setState({
      playing: !this.state.playing
    })
  }

  handleVolumeChange = (e) => this.setState({ volume: e.target.value })

  render() {
    const { source, title  } = this.props
    const { volume, playing } = this.state
    return (
      <div style={{ width: '100%' }}>
        <div className="AudioPlayer__top">
          <button className="AudioPlayer__btn" onClick={this.handleTogglePlay}>
            {this.state.playing && <i className="material-icons">stop</i>}
            {!this.state.playing && <i className="material-icons">play_arrow</i>}
          </button>
          <h4 className="AudioPlayer__title">{title}</h4>
        </div>
        <Wavesurfer
          options={{barHeight:4, barWidth:2, waveColor:linGrad, cursorColor: '#F56350', progressColor:'#F56350' }}
          audioFile={source}
          playing={playing}
          volume={volume}
        />
        <div className="AudioPlayer__volume_container">
          <i className="material-icons AudioPlayer__volume_icon">volume_mute</i>
          <input type="range" min="0" max="1" step="0.01" value={volume} onChange={this.handleVolumeChange}/>
          <i className="material-icons AudioPlayer__volume_icon">volume_up</i>
        </div>
      </div>
    )
  }
}

export default AudioPlayer