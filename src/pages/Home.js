import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'reactstrap'
import {
  loadDocuments,
  loadMoreDocuments,
  unloadDocuments,
} from '../state/actions'
import {
  getDocuments,
  canLoadMoreDocuments,
  getDocumentsCount,
  getDocumentsLoading,
} from '../state/selectors'

class Home extends Component {
  componentDidMount() {
    this.props.loadDocuments()
  }

  render() {
    const {
      documents,
      count,
      canLoadMore,
    } = this.props

    return (
      <div>

        {documents && (
          <div>
            {documents.map(doc => (
              <div key={doc.id}>
                <h2>{doc.title}</h2>
                <p>{doc.transData.description}</p>
              </div>
            ))}
          </div>
        )}

      </div>
    )
  }
}

const mapStateToProps = state => ({
  documents: getDocuments(state),
  canLoadMore: canLoadMoreDocuments(state),
  count: getDocumentsCount(state),
  loading: getDocumentsLoading(state),
})

export default connect(mapStateToProps, {
  loadDocuments,
  loadMoreDocuments,
  unloadDocuments,
})(Home)
