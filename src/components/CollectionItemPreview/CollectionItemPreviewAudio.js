import React from 'react';
import JSONTree from 'react-json-tree'
import AudioPlayer from '../AudioPlayer'

export default class CollectionItemPreviewAudio extends React.PureComponent {

  render() {
    const { doc } = this.props

    return (
    <div>
      <div className="CollectionItemPreview__doc_preview">
        {/* <JSONTree data={doc} /> */}
        <div style={{height:'auto'}}>
          <AudioPlayer source={`https://cors-anywhere.herokuapp.com/${doc.attachment}`} />
        </div>
      </div>
      <div className="CollectionItem__doc_controls">
        <button className="CollectionItem__btn_download"><i className="icon-file_download" /></button>
      </div>
    </div>
  );
  }
}
