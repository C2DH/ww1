import React from 'react';
import ReactPDF from 'react-pdf';
import PDF from 'react-pdf-js';
import CollectionItemDownload from '../CollectionItemDownload'
import './CollectionItemPreview.css'


export default class CollectionItemPreviewPDF extends React.PureComponent {

  state = {
    total : null,
    pages: 0,
    page: undefined,
    scale: 1,
  }


  onDocumentComplete = (pages) => {
    console.log(1, pages)
    this.setState({ page:1, pages });
  }

  onPageComplete = (page) => {
    this.setState({ page });
  }

  nextPage = () => {
    if(this.state.page < this.state.pages - 1){
      this.setState({page:this.state.page + 1})
    }
  }

  prevPage = () => {
    if(this.state.page > 1){
      this.setState({page:this.state.page - 1})
    }
  }

  zoomIn = () => {
    if(this.state.scale < 2){
      this.setState({scale:this.state.scale + 0.2 })
    }
  }

  zoomOut = () => {
    if(this.state.scale > 1){
      this.setState({scale:this.state.scale - 0.2})
    }
  }

  render() {
    const { doc } = this.props
    return (
      <div className="CollectionItemPreview__doc_preview">
        <div className="CollectionItemPreview__pdf_wrapper">
          <div className="CollectionItemPreview__pdf_scale">
            <PDF
              file={`${doc.src}`}
              onDocumentComplete={this.onDocumentComplete}
              onPageComplete={this.onPageComplete}
              page={this.state.page}
              ref={(ref)=>{this.pdf=ref}}
              scale={this.state.scale}
            />
          </div>
        </div>
      <div className="CollectionItem__doc_controls">
      <div className="CollectionItemPreviewPDF__controls">
          <div style={{padding:8}}>Page <span className="CollectionItemPreviewPDF__controls_current_page">{this.state.page}</span> of {this.state.pages}</div>
          <div className="CollectionItemPreviewPDF__controls_page_arrows">
            <button onClick={(evt)=>{this.prevPage()}}>
              <i className="material-icons pointer">arrow_downward</i>
            </button><span>{' | '}</span>
            <button  onClick={(evt)=>{this.nextPage()}}>
              <i className="material-icons pointer">arrow_upward</i>
            </button>
          </div>
          <div className="CollectionItemPreviewPDF__controls_zoom">
            <button onClick={(evt)=>{this.zoomIn()}}>
              <i className="icon-zoom_in pointer" />
            </button><span>{' | '}</span>
            <button  onClick={(evt)=>{this.zoomOut()}}>
              <i className="icon-zoom_out pointer" />
            </button>
          </div>
          {/* fit to page is not easy to implement, given existing pdf modules */}
          {/* <div className="CollectionItemPreviewPDF__controls_fit_to_page">
            <select>
              <option>Fit to page</option>
            </select>
          </div> */}
          {/* <button className="CollectionItemPreviewPDF__download_btn"><i className="icon-file_download" /></button> */}
          <CollectionItemDownload className="CollectionItemPreviewPDF__download_btn" doc={doc}/>
        </div>
      </div>
    </div>
  );
  }
}
