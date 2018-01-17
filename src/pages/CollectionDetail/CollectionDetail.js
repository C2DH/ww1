import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { get } from 'lodash'
import CollectionItem from '../../components/CollectionItem'
import NotFound from '../../components/NotFound'
import {
  loadDocument,
  unloadDocument,
} from '../../state/actions'
import {
  getDocument,
  getDocumentError,
  getDocumentLoading,
} from '../../state/selectors'


class CollectionDetail extends PureComponent {

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

  close = () => {
    this.props.history.push('/collection')
  }

  render(){
    const { doc, error } = this.props

    // Doc not found
    if (get(error, 'response.status') === 404) {
      return <NotFound />
    }

    return(
      <div>
        {doc && <CollectionItem doc={doc} onCloseClick={this.close} />}
      </div>
    )
  }

}



const mapStateToProps = state => ({
  doc: getDocument(state),
  loading: getDocumentLoading(state),
  error: getDocumentError(state),
})

export default connect(mapStateToProps, {
  loadDocument,
  unloadDocument,
})(CollectionDetail)
