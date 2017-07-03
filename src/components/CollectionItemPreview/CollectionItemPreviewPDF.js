import React from 'react';
import ReactPDF from 'react-pdf';

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
    <div className="CollectionItem__doc_container">
      <div className="CollectionItem__doc_preview">
        <ReactPDF
          scale={this.state.scale}
          pageIndex={this.state.pageIndex}
          onDocumentLoad={this.onDocumentLoad}
          onPageLoad={this.onPageLoad}
          file={`https://cors-anywhere.herokuapp.com/${doc.src}`} />
      </div>
      <div className="CollectionItem__doc_controls" style={{backgroundColor:'#222', color:'#fff'}}>

        {/* <button className="CollectionItem__btn_download"><i className="fa fa-download" /></button> */}
        <div style={{display:'flex'}}>
          <div style={{padding:'8'}}>Page: {this.state.pageNumber} of {this.state.total}</div>
          <div style={{padding:'8'}}><a href="#" onClick={(evt)=>{this.prevPage()}}>prev</a> | <a href="#" onClick={(evt)=>{this.nextPage()}}>next</a></div>
          <div style={{padding:'8'}}><a href="#" onClick={(evt)=>{this.zoomIn()}}>zoomin</a> | <a href="#" onClick={(evt)=>{this.zoomOut()}}>zoomout</a></div>
          <div style={{padding:'8'}}>
            <select>
              <option>Fit to page</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
  }
}
