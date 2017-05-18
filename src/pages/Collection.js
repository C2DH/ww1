import React, { Component } from 'react'
import { isNull } from 'lodash'
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

class Collection extends Component {
  componentDidMount() {
    this.props.loadDocuments()
  }

  loadMore = () => {
    this.props.loadMoreDocuments()
  }

  render() {
    const {
      documents,
      loading,
      count,
      canLoadMore,
      loadMoreDocuments,
    } = this.props

    return (
      <div>

        {loading && isNull(documents) && <div>Loading...</div>}

        {(!isNull(documents) && documents.length > 0) && (
          <div>
            {documents.map(doc => (
              <div key={doc.id}>
                <h2>{doc.title}</h2>
                <p>{doc.transData.description}</p>
              </div>
            ))}
          </div>
        )}

        {loading && !isNull(documents) && documents.length > 0 && <div>Loading more...</div>}

        {!loading &&
          !isNull(documents) &&
          documents.length > 0 &&
          canLoadMore &&
          <Button onClick={this.loadMore}>Load More</Button>}

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
})(Collection)
