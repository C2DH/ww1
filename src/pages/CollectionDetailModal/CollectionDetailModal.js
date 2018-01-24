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
  state = {
    cloosing: false,
  }

  componentDidMount() {
    this.mounted = true
    this.props.loadDocument(this.props.match.params.id)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.id !== nextProps.match.params.id) {
      this.props.unloadDocument()
      this.props.loadDocument(nextProps.match.params.id)
    }
  }

  componentWillUnmount() {
    this.mounted = false
    this.props.unloadDocument()
  }

  close = () => {
    this.setState({
      cloosing: true,
    }, () => {
      setTimeout(() => {
        if (this.mounted) {
          this.props.history.goBack()
        }
      }, 900)
    })
  }

  render(){
    const { doc, loading } = this.props
    const { cloosing } = this.state
    return (
      <div className={`CollectionDetailModal__container d-flex ${cloosing ? 'fadeOut' : 'fadeIn'}`}>
        {doc && <CollectionItem doc={doc} onCloseClick={this.close} />}
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
