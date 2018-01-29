import React from 'react';
import ReactDOM from 'react-dom'
import PDF from 'react-pdf-js';
import CollectionItemDownload from '../CollectionItemDownload'
import './CollectionItemPreview.css'


export default class CollectionItemPreviewPDF extends React.PureComponent {

  state = {
    total : null,
    pages: 0,
    page: undefined,
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
          />
        </div>
      </div>
      <div className="CollectionItem__doc_controls">
      <div className="CollectionItemPreviewPDF__controls">
          <div style={{padding:8}}>Page <span className="CollectionItemPreviewPDF__controls_current_page">{this.state.page}</span> of {this.state.pages}</div>
          <div className="CollectionItemPreviewPDF__controls_page_arrows">
            <button  onClick={(evt)=>{this.prevPage()}}>
              <i className="material-icons pointer">arrow_upward</i>
            </button>
            <span>{' | '}</span>
            <button onClick={(evt)=>{this.nextPage()}}>
              <i className="material-icons pointer">arrow_downward</i>
            </button>
          </div>
          <div className="CollectionItemPreviewPDF__controls_zoom">
            <button onClick={(evt)=>{this.zoomIn()}}>
              <i className="icon-zoom_in pointer" />
            </button><span>{' | '}</span>
            <button  onClick={(evt)=>{this.zoomOut()}}>
              <i className="icon-zoom_out pointer" />
            </button><span>{' | '}</span>
            <button  onClick={(evt)=>{this.fitHeight()}} className={this.state.fitHeight ? 'active' : ''}>
              <i className="material-icons pointer">view_day</i>
            </button><span>{' | '}</span>
            <button onClick={(evt)=>{this.fitWidth()}} className={this.state.fitWidth ? 'active' : ''}>
              <i className="material-icons pointer">view_array</i>
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
