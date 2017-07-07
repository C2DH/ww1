import React from 'react';
import ZoomControl from '../../components/ZoomControl'
import WhiteTooltip from '../../components/WhiteTooltip'


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
        <WhiteTooltip target="CollectionItem__btn_download" tooltipText={<span>Download image and data<br/>Download image</span>} />
        <button className="CollectionItem__btn_download" id="CollectionItem__btn_download"><i className="icon-file_download" /></button>
      </div>
    </div>
  );
  }
}
