import React, { Component } from 'react'
import { isNull } from 'lodash'
import { connect } from 'react-redux'
import { Button, Container, Row, Col } from 'reactstrap'
import CollectionDoc from '../components/CollectionDoc'
import {
  loadDocuments,
  loadMoreDocuments,
  unloadDocuments,
} from '../state/actions'
import {
  getDocumentsGrid,
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
      <Container fluid>

        <Row>
          <Col sm={10}>
            {loading && isNull(documents) && <div>Loading...</div>}

            {(!isNull(documents) && documents.length > 0) && (
              <Container fluid>
                {documents.map(row => (
                  <Row key={row.key}>
                    {row.docs.map(doc => (
                      <Col key={doc.id}>
                        <CollectionDoc doc={doc} />
                      </Col>
                    ))}
                  </Row>
                ))}
              </Container>
            )}

            {loading && !isNull(documents) && documents.length > 0 && <div>Loading more...</div>}

            {!loading &&
              !isNull(documents) &&
              documents.length > 0 &&
              canLoadMore &&
              <Button onClick={this.loadMore}>Load More</Button>}
          </Col>
          <Col sm={2}>
            <div className="Collection__SideBarRight">
              Ciao
            </div>
          </Col>
        </Row>

      </Container>
    )
  }
}

const mapStateToProps = state => ({
  documents: getDocumentsGrid(state),
  canLoadMore: canLoadMoreDocuments(state),
  count: getDocumentsCount(state),
  loading: getDocumentsLoading(state),
})

export default connect(mapStateToProps, {
  loadDocuments,
  loadMoreDocuments,
  unloadDocuments,
})(Collection)