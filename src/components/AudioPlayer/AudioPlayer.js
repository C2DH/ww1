import React, { PureComponent } from 'react'
import Wavesurfer from 'react-wavesurfer';
import './AudioPlayer.css'

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

  handleVolumeChange = (e) => this.setState({ volume: parseFloat(e.target.value) })

  render() {
    const { source, title  } = this.props
    const { volume, playing } = this.state
    return (
      <div className="AudioPlayer__wrapper">
        <div className="AudioPlayer__top">
          <button className="btn btn-secondary AudioPlayer__btn" onClick={this.handleTogglePlay}>
            {this.state.playing && <i className="material-icons">pause</i>}
            {!this.state.playing && <i className="material-icons">play_arrow</i>}
          </button>
          <h4 className="AudioPlayer__title">{title}</h4>
        </div>
        <div className="AudioPlayer__wave-gradient">
          <Wavesurfer
            options={{barHeight:4, barWidth:2, waveColor:'#ffffff', cursorColor: '#F56350', progressColor:'#F06354' }}
            audioFile={source}
            playing={playing}
            volume={volume}
          />
        </div>
        <div className="AudioPlayer__volume_container hidden-md-down">
          <i className="material-icons AudioPlayer__volume_icon">volume_mute</i>
          <input type="range" min="0" max="1" step="0.01" value={volume} onChange={this.handleVolumeChange}/>
          <i className="material-icons AudioPlayer__volume_icon">volume_up</i>
        </div>
      </div>
    )
  }
}

export default AudioPlayer
