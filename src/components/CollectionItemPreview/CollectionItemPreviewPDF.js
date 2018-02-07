import React from 'react';
import ReactDOM from 'react-dom'
import PDF from 'react-pdf-js';
import CollectionItemDownload from '../CollectionItemDownload'
import './CollectionItemPreview.css'


export default class CollectionItemPreviewPDF extends React.PureComponent {

  state = {
    total : null,
    pages: 0,
    page: 0,
    scale: 1,
    fitHeight: true,
    fitWidth: false,
  }

  view = null


  onDocumentComplete = (pages) => {
    if(!this.state.page){
      this.setState({ page:1, pages });
    }
  }

  onPageComplete = (page) => {
    this.setState({ page });
    const view = this.pdf.state.page.view
    this.view = view
    if(this.state.fitHeight){
      this.fitHeight()
    }
    if(this.state.fitWidth){
      this.fitWidth()
    }
  }


  getContainerSize = () => {
    const node = ReactDOM.findDOMNode(this.pdfContainer)
    const rect = node.getBoundingClientRect()
    return rect
  }

  nextPage = () => {
    if(this.state.page <= this.state.pages - 1){
      this.setState({page:this.state.page + 1})
    }
  }

  prevPage = () => {
    if(this.state.page > 1){
      this.setState({page:this.state.page - 1})
    }
  }

  pageChange = (event) => {
    let page = parseInt(event.target.value);
    if(page > 0 && page <= this.state.pages){
      this.setState({page:page})
    }
  }

  zoomIn = () => {
    if(this.state.scale < 2){
      this.setState({scale:this.state.scale + 0.2, fitHeight: false, fitWidth: false })
    }
  }

  zoomOut = () => {
    if(this.state.scale >= 1){
      this.setState({scale:this.state.scale - 0.2, fitHeight: false, fitWidth: false})
    }
  }

  fitHeight = () => {
    if(!this.view){
      return
    }
    const rect = this.getContainerSize()
    const h = (this.view[3] - this.view[1])
    const scale = rect.height / h
    this.setState({ scale: scale, fitHeight: true, fitWidth: false })
  }

  fitWidth = () => {
    if(!this.view){
      return
    }
    const rect = this.getContainerSize()
    const w = (this.view[2] - this.view[0])
    const scale = rect.width / w
    this.setState({ scale: scale, fitWidth: true, fitHeight: false })
  }

  render() {
    const { doc } = this.props

    return (
      <div className="CollectionItemPreview__doc_preview">
        <div className="CollectionItemPreview__pdf_wrapper">
          <div className="CollectionItemPreview__pdf_scale" ref={ref => this.pdfContainer=ref}>
          <PDF
            file={`${doc.src}`}
            onDocumentComplete={this.onDocumentComplete}
            onPageComplete={this.onPageComplete}
            page={this.state.page}
            ref={(ref)=>{this.pdf=ref}}
            scale={this.state.scale}
            className="CollectionItemPreview__pdf_canvas"
          />
        </div>
      </div>
      <div className="CollectionItem__doc_controls">
      <div className="CollectionItemPreviewPDF__controls">
          <div className="px-3 d-none d-sm-none d-md-flex">
            Page
            <input
              name="numberOfPage"
              type="number"
              className="form-control form-control-sm CollectionItemPreviewPDF__controls_current_page"
              value={this.state.page}
              onChange={this.pageChange} />
            of {this.state.pages}
          </div>
          <div className="px-3 CollectionItemPreviewPDF__controls_page_arrows">
            <button onClick={(evt)=>{this.prevPage()}}>
              <i className="material-icons">arrow_upward</i>
            </button>
             |
            <button onClick={(evt)=>{this.nextPage()}}>
              <i className="material-icons">arrow_downward</i>
            </button>
          </div>
          <div className="px-3 CollectionItemPreviewPDF__controls_zoom">
            <button onClick={(evt)=>{this.zoomIn()}} className="d-none d-sm-none d-md-flex">
              <i className="material-icons">zoom_in</i>
            </button>
            <span className="d-none d-sm-none d-md-flex">|</span>
            <button onClick={(evt)=>{this.zoomOut()}} className="d-none d-sm-none d-md-flex">
              <i className="material-icons">zoom_out</i>
            </button>
             <span className="d-none d-sm-none d-md-flex">|</span>
            <button onClick={(evt)=>{this.fitHeight()}} className={this.state.fitHeight ? 'active' : ''}>
              <i className="material-icons">view_day</i>
            </button>
             |
            <button onClick={(evt)=>{this.fitWidth()}} className={this.state.fitWidth ? 'active' : ''}>
              <i className="material-icons">view_array</i>
            </button>
          </div>
          <CollectionItemDownload className="CollectionItemPreviewPDF__download_btn" doc={doc}/>
        </div>
      </div>
    </div>
  );
  }
}
