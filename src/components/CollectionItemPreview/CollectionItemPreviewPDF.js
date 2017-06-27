import React from 'react';
import ReactPDF from 'react-pdf';

export default class CollectionItemPreviewPDF extends React.PureComponent {
  render() {
    const { doc } = this.props
    console.log(doc)
    return (
    <div className="CollectionItem__doc_container">
      <div className="CollectionItem__doc_preview">
        <ReactPDF file={`https://cors-anywhere.herokuapp.com/${doc.src}`} />
      </div>
      <div className="CollectionItem__doc_controls">
        <button className="CollectionItem__btn_download"><i className="fa fa-download" /></button>
      </div>
    </div>
  );
  }
}
