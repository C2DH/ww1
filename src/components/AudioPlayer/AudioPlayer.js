import React, { PureComponent } from 'react'
import Wavesurfer from 'react-wavesurfer';
import MdTitle from '../../components/MdTitle'
import './AudioPlayer.css'

class AudioPlayer extends PureComponent {
  state = {
    playing: false,
    volume: 0.5,
    ready: false
  }

  handleTogglePlay = () => {
    this.setState({
      playing: !this.state.playing
    })
  }

  handleVolumeChange = (e) => this.setState({ volume: parseFloat(e.target.value) })

  handleOnReady = () => {
    this.setState({ready:true})
  }

  render() {
    const { source, title  } = this.props
    const { volume, playing } = this.state
    return (
      <div className="AudioPlayer__wrapper">
        <div className="AudioPlayer__top">
          <button className="btn btn-secondary AudioPlayer__btn" onClick={this.handleTogglePlay} style={{opacity: this.state.ready?1:0}}>
            {this.state.playing && <i className="material-icons">pause</i>}
            {!this.state.playing && <i className="material-icons">play_arrow</i>}
          </button>
          <h4 className="AudioPlayer__title animated fadeInUp">
            <MdTitle title={title}></MdTitle>
          </h4>
        </div>
        <div className="AudioPlayer__wave-gradient" style={{opacity: this.state.ready?1:0}}>
          <Wavesurfer
            options={{barHeight:4, barWidth:2, waveColor:'#fff', cursorColor: '#F56350', progressColor:'#F06354' }}
            audioFile={source}
            playing={playing}
            volume={volume}
            onReady={this.handleOnReady}
          />
        </div>
        <div className="AudioPlayer__volume_container hidden-md-down" style={{opacity: this.state.ready?1:0}}>
          <i className="material-icons AudioPlayer__volume_icon">volume_mute</i>
          <input type="range" min="0" max="1" step="0.01" value={volume} onChange={this.handleVolumeChange}/>
          <i className="material-icons AudioPlayer__volume_icon">volume_up</i>
        </div>
      </div>
    )
  }
}

export default AudioPlayer
