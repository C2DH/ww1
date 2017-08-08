import React from 'react';
import JSONTree from 'react-json-tree'
import AudioPlayer from '../AudioPlayer'
import CollectionItemDownload from '../CollectionItemDownload'

export default class CollectionItemPreviewAudio extends React.PureComponent {

  render() {
    const { doc } = this.props

    return (
      <div className="CollectionItemPreview__doc_preview">
        {/* <JSONTree data={doc} /> */}
        <div className="CollectionItemPreview__audio_wrapper">
            <AudioPlayer source={`https://cors-anywhere.herokuapp.com/${doc.attachment}`} title={doc.title}/>
        </div>
      <div className="CollectionItem__doc_controls">
        <CollectionItemDownload doc={doc} className="CollectionItem__btn_download"/>
      </div>
    </div>
  );
  }
}
