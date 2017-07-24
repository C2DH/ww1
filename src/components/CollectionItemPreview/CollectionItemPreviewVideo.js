import React from 'react';
import JSONTree from 'react-json-tree'
import { Player, ControlBar, BigPlayButton } from 'video-react';

export default class CollectionItemPreviewVideo extends React.PureComponent {
  render() {
    const { doc } = this.props
    console.log(doc)
    return (
    <div>
      <div className="CollectionItemPreview__doc_preview">
        <Player fluid>
          <source src={doc.attachment} />
          <BigPlayButton position="center" />
          <ControlBar autoHide={false} />
        </Player>

      </div>
      <div className="CollectionItem__doc_controls">
        <button className="CollectionItem__btn_download"><i className="icon-file_download" /></button>
      </div>
    </div>
  );
  }
}
