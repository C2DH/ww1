import React, { PureComponent } from 'react'
import Wavesurfer from 'react-wavesurfer';

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
    const { source } = this.props
    const { volume, playing } = this.state
    return (
      <div style={{ width: '100%' }}>
        <button onClick={this.handleTogglePlay}>
          {this.state.playing && <i className="material-icons">stop</i>}
          {!this.state.playing && <i className="material-icons">play_arrow</i>}
        </button>
        <Wavesurfer
          options={{barHeight:4, barWidth:2, waveColor:linGrad, cursorColor: '#F56350', progressColor:'#F56350' }}
          audioFile={source}
          playing={playing}
          volume={volume}
        />
        <div style={{display:'flex', justifyContent:'center'}}>
          <div style={{width:'50%', display:'flex', justifyContent:'center'}}>
            <input type="range" min="0" max="1" step="0.01" value={volume} onChange={this.handleVolumeChange}/>
          </div>
        </div>
      </div>
    )
  }
}

export default AudioPlayer
