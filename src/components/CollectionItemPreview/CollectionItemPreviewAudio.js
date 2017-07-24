import React from 'react';
import JSONTree from 'react-json-tree'
import Wavesurfer from 'react-wavesurfer';

var ctx = document.createElement('canvas').getContext('2d');
var linGrad = ctx.createLinearGradient(0, 64, 0, 200);
linGrad.addColorStop(0.5, 'white');
linGrad.addColorStop(0.5, 'crimson');

export default class CollectionItemPreviewAudio extends React.PureComponent {

  state = {
      playing: false,
      pos: 0,
      volume: 0.5,
    }

  handleTogglePlay = () => {
    this.setState({
      playing: !this.state.playing
    });
  }

  handleVolumeChange = (e) => { console.log(e); this.setState({volume: e.target.value})}

  render() {
    const { doc } = this.props
    const { volume } = this.state

    return (
    <div>
      <div className="CollectionItemPreview__doc_preview">
        {/* <JSONTree data={doc} /> */}
        <div style={{height:'auto'}}>
        <button onClick={this.handleTogglePlay}>
          {this.state.playing && <i className="material-icons">stop</i>}
          {!this.state.playing && <i className="material-icons">play_arrow</i>}
        </button>
        <Wavesurfer
          options={{barHeight:4, barWidth:2, waveColor:linGrad }}
          // audioFile={'http://api.soundcloud.com/tracks/325499815/stream?client_id=2t9loNQH90kzJcsFCODdigxfp325aq4z&secret_token=s-m4avW'}
          audioFile={`https://cors-anywhere.herokuapp.com/${doc.attachment}`}
          pos={this.state.pos}
          // onPosChange={this.handlePosChange}
          playing={this.state.playing}
          volume={volume}
        />
        <div style={{display:'flex', justifyContent:'center'}}>
          <div style={{width:'50%', display:'flex', justifyContent:'center'}}>
            <input type="range" min="0" max="1" step="0.01" value={volume} onChange={this.handleVolumeChange}/>
          </div>
        </div>

        </div>
      </div>
      <div className="CollectionItem__doc_controls">
        <button className="CollectionItem__btn_download"><i className="icon-file_download" /></button>
      </div>
    </div>
  );
  }
}
