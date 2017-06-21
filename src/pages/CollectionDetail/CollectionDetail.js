import React, { Component } from 'react'
import { connect } from 'react-redux'
import CollectionItem from '../../components/CollectionItem'

import {
  loadDocument,
  unloadDocument,
} from '../../state/actions'
import {
  getDocument,
  getDocumentLoading,
} from '../../state/selectors'


class CollectionDetail extends Component {

  componentDidMount(){
    this.props.loadDocument(this.props.match.params.id)
  }

  render(){
    const { doc } = this.props
    return(
      <div>
        {doc && <CollectionItem doc={doc}/>}
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
})(CollectionDetail)
