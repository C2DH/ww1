import React, { Component } from 'react'
import CollectionItem from '../../components/CollectionItem'
import { connect } from 'react-redux'
import './CollectionDetailModal.css'


class CollectionDetailModal extends Component {

  //

  render(){
    const { doc } = this.props
    return(
      <div className="CollectionDetailModal__container">
        <div
          className="CollectionDetailModal__close_btn_container"
          >
            <button
              type="button"
              className="CollectionDetailModal__close_btn"
              aria-label="Close"
              onClick={()=>this.props.history.goBack()}
              >
              <span aria-hidden="true">&times;</span>
            </button>
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
