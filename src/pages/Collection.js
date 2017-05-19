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
  getDocuments,
  canLoadMoreDocuments,
  getDocumentsCount,
  getDocumentsLoading,
} from '../state/selectors'

import {
  CellMeasurer,
  CellMeasurerCache,
  createMasonryCellPositioner,
  Masonry
} from 'react-virtualized'

const cache = new CellMeasurerCache({
  defaultHeight: 250,
  defaultWidth: 200,
  fixedWidth: true
})

const cellPositioner = createMasonryCellPositioner({
  cellMeasurerCache: cache,
  columnCount: 3,
  columnWidth: 200,
  spacer: 10
})

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

        {(!isNull(documents) && documents.length > 0) && (
          <Masonry
            cellCount={documents.length}
            cellMeasurerCache={cache}
            cellPositioner={cellPositioner}
            cellRenderer={cellRenderer}
            height={600}
            width={800}
          />
        )}

        {/* <Row>
          <Col md={10} sm={12} xs={12}>
            {loading && isNull(documents) && <div>Loading...</div>}

            {(!isNull(documents) && documents.length > 0) && (
              <Container fluid>
                <Row>
                  {documents.map(doc => (
                    <Col key={doc.id} md={3} sm={12} xs={12}>
                      <CollectionDoc doc={doc} />
                    </Col>
                  ))}
                </Row>
              </Container>
            )}

            {loading && !isNull(documents) && documents.length > 0 && <div>Loading more...</div>}

            {!loading &&
              !isNull(documents) &&
              documents.length > 0 &&
              canLoadMore &&
              <Button onClick={this.loadMore}>Load More</Button>}
          </Col>
          <Col sm={2} className='hidden-md-down'>
            <div className="Collection__SideBarRight">
              Ciao
            </div>
          </Col>
        </Row> */}

      </Container>
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
