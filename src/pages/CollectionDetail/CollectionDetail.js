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

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.id !== nextProps.match.params.id) {
      this.props.unloadDocument()
      this.props.loadDocument(nextProps.match.params.id)
    }
  }

  componentWillUnmount() {
    this.props.unloadDocument()
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
