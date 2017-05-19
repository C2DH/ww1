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
  Masonry,
  AutoSizer,
} from 'react-virtualized'


console.log(1)

class Collection extends Component {

  constructor(props){
    console.log("jy")
    super(props)
    this.cache = new CellMeasurerCache({
      defaultHeight: 250,
      defaultWidth: 200,
      fixedWidth: true,
      fixedHeight: false,
    })



    this._onResize = this._onResize.bind(this)
    this._columnCount = 5
    this._columnWidh = 0
    this._gutterSize = 10



    this._setMasonryRef = this._setMasonryRef.bind(this)
    this._renderMasonry = this._renderMasonry.bind(this)

  }

  componentDidMount() {
    this.props.loadDocuments()
  }

  loadMore = () => {
    this.props.loadMoreDocuments()
  }

  _resetCellPositioner () {

    this.cellPositioner.reset({
      columnCount: this._columnCount,
      columnWidth: this._columnWidh,
      spacer: this._gutterSize
    })
  }

  _calculateColumnCount (width) {
    this._columnCount = width > 1000 ? 5 : 3
    this._columnWidh = (width - ((this._columnCount - 1) * this._gutterSize)) / this._columnCount
  }

  _onResize ({ height, width }) {
    console.log(1, width)
    this._width = width
    this._columnHeights = {}
    this._calculateColumnCount(width)
    this._resetCellPositioner()
    this._masonry.recomputeCellPositions()
  }

  cellRenderer = ({ index, key, parent, style }) => {
    const datum = this.props.documents[index]
    console.log(style)
    return (
      <CellMeasurer
        cache={this.cache}
        index={index}
        key={key}
        parent={parent}
      >
      {({measure}) => (
        <div style={style}>
          <CollectionDoc doc={datum} measure={measure}/>
        </div>
      ) }
      </CellMeasurer>
    )

  }

  _setMasonryRef (ref) {
    this._masonry = ref
  }

  _initCellPositioner () {
    if (typeof this.cellPositioner === 'undefined') {
      this.cellPositioner = createMasonryCellPositioner({
        cellMeasurerCache: this.cache,
        columnCount: 4,
        columnWidth: 200,
        spacer: 10
      })
    }
  }

  _renderMasonry ({ width, height }) {
    this._width = width
    console.log("_renderMasonry", width)
    this._calculateColumnCount(width)
    this._initCellPositioner()


    return (
      <Masonry
        ref={this._setMasonryRef}
        cellCount={this.props.documents.length}
        cellMeasurerCache={this.cache}
        cellPositioner={this.cellPositioner}
        cellRenderer={this.cellRenderer}
        height={height}
        width={width}
        ref={this._setMasonryRef}
      />
    )
  }

  render() {
    console.log(1, "render")

    const {
      documents,
      loading,
      count,
      canLoadMore,
      loadMoreDocuments,
    } = this.props

    return (
      <Container fluid style={{height:'100vh'}}>

        {(!isNull(documents) && documents.length > 0) && (
          <AutoSizer
            onResize={this._onResize}>
            { this._renderMasonry }

          </AutoSizer>
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
