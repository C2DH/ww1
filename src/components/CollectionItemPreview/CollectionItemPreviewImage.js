import React from 'react';
import ZoomControl from '../../components/ZoomControl'


export default class CollectionItemPreviewImage extends React.PureComponent {
  render() {
    const { doc } = this.props
    return (
    <div className="CollectionItem__doc_container">
      <div className="CollectionItem__doc_preview">
        <img src={doc.src} alt={doc.title} className="img-fluid" style={{maxHeight:'70vh'}}/>
      </div>
      <div className="CollectionItem__doc_controls">
        <ZoomControl />
        <button className="CollectionItem__btn_download"><i className="fa fa-download" /></button>
      </div>
    </div>
  );
  }
}
