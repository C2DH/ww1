import React from 'react';
import ReactPDF from 'react-pdf';
import './CollectionItemPreview.css'

export default class CollectionItemPreviewPDF extends React.PureComponent {

  state = {
    total : null,
    pageIndex: null,
    pageNumber: null,
    scale: 1.0,
  }


  onDocumentLoad = ({ total }) => {
    this.setState({ total });
  }

  onPageLoad = ({ pageIndex, pageNumber }) => {
    this.setState({ pageIndex, pageNumber });
  }

  nextPage = () => {
    if(this.state.pageIndex < this.state.total - 1){
      this.setState({pageIndex:this.state.pageIndex + 1})
    }
  }

  prevPage = () => {
    if(this.state.pageIndex > 0){
      this.setState({pageIndex:this.state.pageIndex - 1})
    }
  }

  zoomIn = () => {
    if(this.state.scale < 16){
      this.setState({scale:this.state.scale * 2})
    }
  }

  zoomOut = () => {
    if(this.state.scale > 1){
      this.setState({scale:this.state.scale / 2})
    }
  }

  render() {
    const { doc } = this.props
    return (
    <div>
      <div className="CollectionItemPreview__doc_preview">
        <ReactPDF
          scale={this.state.scale}
          pageIndex={this.state.pageIndex}
          onDocumentLoad={this.onDocumentLoad}
          onPageLoad={this.onPageLoad}
          file={`https://cors-anywhere.herokuapp.com/${doc.src}`} />
      </div>
      <div className="CollectionItem__doc_controls">

        <div className="CollectionItemPreviewPDF__controls">
          <div style={{padding:'8'}}>Page <span className="CollectionItemPreviewPDF__controls_current_page">{this.state.pageNumber}</span> of {this.state.total}</div>
          <div className="CollectionItemPreviewPDF__controls_page_arrows"><button onClick={(evt)=>{this.prevPage()}}><i className="material-icons">arrow_downward</i></button><span>{' | '}</span><button  onClick={(evt)=>{this.nextPage()}}><i className="material-icons">arrow_upward</i></button></div>
          <div className="CollectionItemPreviewPDF__controls_zoom"><button onClick={(evt)=>{this.zoomIn()}}><i className="icon-zoom_in" /></button><span>{' | '}</span><button  onClick={(evt)=>{this.zoomOut()}}><i className="icon-zoom_out" /></button></div>
          <div className="CollectionItemPreviewPDF__controls_fit_to_page">
            <select>
              <option>Fit to page</option>
            </select>
          </div>
          <button className="CollectionItemPreviewPDF__download_btn"><i className="icon-file_download" /></button>
        </div>
      </div>
    </div>
  );
  }
}
