import React from 'react';
import JSONTree from 'react-json-tree'
import { Player, ControlBar, BigPlayButton } from 'video-react';
import CollectionItemDownload from '../CollectionItemDownload'

export default class CollectionItemPreviewVideo extends React.PureComponent {
  render() {
    const { doc } = this.props
    let attachment = doc.attachment
    // #TODO: FIXME SERVERS SIDE (OR HANDLE WITH PROXY)
    if (attachment.indexOf("http://178.62.220.183/media/http") == 0){
      attachment = decodeURIComponent(attachment.replace("http://178.62.220.183/media/", ""))
    }

    return (
    <div className="CollectionItemPreview__doc_preview">
      <div className="CollectionItemPreview__video_wrapper">
        <Player fluid>
          <source src={attachment} />
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
