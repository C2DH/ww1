import React from 'react';
import JSONTree from 'react-json-tree'
import { Player, ControlBar, BigPlayButton } from 'video-react';
import CollectionItemDownload from '../CollectionItemDownload'

export default class CollectionItemPreviewVideo extends React.PureComponent {
  render() {
    const { doc } = this.props
    console.log(doc)
    return (
    <div className="CollectionItemPreview__doc_preview">
      <div className="CollectionItemPreview__video_wrapper">
        <Player fluid>
          <source src={doc.attachment} />
          <BigPlayButton position="center" />
          <ControlBar autoHide={false} />
        </Player>

      </div>
      <div className="CollectionItem__doc_controls">
        <CollectionItemDownload doc={doc} className="CollectionItem__btn_download"/>
      </div>
    </div>
  );
  }
}
