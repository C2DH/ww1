import React, { PureComponent } from 'react'
import CollectionItem from '../../components/CollectionItem'
import { connect } from 'react-redux'
import './CollectionDetailModal.css'
import {
  loadDocument,
  unloadDocument,
} from '../../state/actions'
import {
  getDocument,
  getDocumentLoading,
} from '../../state/selectors'

class CollectionDetailModal extends PureComponent {
  componentDidMount() {
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
    const { doc, loading } = this.props
    return (
      <div className="CollectionDetailModal__container d-flex">
        {doc && <CollectionItem doc={doc}/>}
        <div className="CollectionDetailModal__close_btn_container">
            <button
              type="button"
              className="CollectionDetailModal__close_btn btn btn-secondary"
              aria-label="Close"
              onClick={() => this.props.history.goBack()}
              >
              <i aria-hidden="true" className="material-icons">close</i>
            </button>
        </div>
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
})(CollectionDetailModal)
