import React from 'react';
import JSONTree from 'react-json-tree'
import { Player, ControlBar, BigPlayButton } from 'video-react';
import CollectionItemDownload from '../CollectionItemDownload'

export default class CollectionItemPreviewVideo extends React.PureComponent {
  render() {
    const { doc } = this.props
    const videoSource = doc.url || doc.attachment

    return (
    <div className="CollectionItemPreview__doc_preview">
      <div className="CollectionItemPreview__video_wrapper">
        <Player
          fluid={false}
          >
          <source src={videoSource} />
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
