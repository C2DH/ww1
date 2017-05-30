import React, { Component } from 'react'
import { connect } from 'react-redux'
import Item from '../components/Item'

import {
  loadDocument,
  unloadDocument,
} from '../state/actions'
import {
  getDocument,
  getDocumentLoading,
} from '../state/selectors'


class CollectionItem extends Component {

  componentDidMount(){
    this.props.loadDocument(this.props.match.params.id)
  }

  render(){
    const { doc } = this.props
    return(
      <div>
        {doc && <Item doc={doc}/>}
      </div>
    )
  }

}



const mapStateToProps = state => ({
  doc: getDocument(state),
  loading: getDocumentLoading(state),
})

export default connect(mapStateToProps, {
  loadDocument,
  unloadDocument,
})(CollectionItem)
