import React, { Component } from 'react'
import Item from '../components/Item'
import { connect } from 'react-redux'

const modalStyle = {
  position: 'absolute',
  top: 0,
  left: 50,
  bottom: 0,
  right: 0,
  
}
class CollectionItemModal extends Component {

  render(){
    const { doc } = this.props
    return(
      <div style={modalStyle} onClick={()=>this.props.history.goBack()}>
        <Item doc={doc}/>
      </div>
    )

  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    doc : state.documents.data[ownProps.match.params.id]
  }
}

export default connect(mapStateToProps)(CollectionItemModal)
