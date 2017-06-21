import React, { Component } from 'react'
import CollectionItem from '../../components/CollectionItem'
import { connect } from 'react-redux'

const modalStyle = {
  position: 'absolute',
  top: 0,
  left: 50,
  bottom: 0,
  right: 0,
  zIndex: 10000
}



class CollectionDetailModal extends Component {

  //

  render(){
    const { doc } = this.props
    return(
      <div style={modalStyle}>
        <div
          onClick={()=>this.props.history.goBack()}
          style={{position:'fixed', zIndex:"10000000", width:50, height:'100vh', right:0, backgroundColor:'red'}}>
          ciao
        </div>
        <CollectionItem doc={doc}/>
      </div>
    )

  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    doc : state.documents.data[ownProps.match.params.id]
  }
}

export default connect(mapStateToProps)(CollectionDetailModal)
