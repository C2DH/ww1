import React, { Component } from 'react'
import { isNull } from 'lodash'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
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
  WindowScroller,
} from 'react-virtualized'

import CollectionDoc from '../components/CollectionDoc'

class Collection extends Component {

  constructor(props){
    super(props)
    this._onResize = this._onResize.bind(this)
    this._columnCount = 0
    this.horizontalPadding = 0
    this.height = 0;
    this.scrollTop = 0;

    this._columnWidth = 234
    this._gutterSize = 10

    this.cache = new CellMeasurerCache({
      defaultHeight: 250,
      defaultWidth: this._columnWidth,
      fixedWidth: true,
      fixedHeight: false,
    })

    this._setMasonryRef = this._setMasonryRef.bind(this)
    this._renderMasonry = this._renderMasonry.bind(this)
    this._renderAutoSizer = this._renderAutoSizer.bind(this)

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
      columnWidth: this._columnWidth,
      spacer: this._gutterSize
    })
  }

  _calculateColumnCount (width) {
    this._columnCount = Math.floor(( width + this._gutterSize ) / ( this._columnWidth + this._gutterSize ))
    this.horizontalPadding = (width - (this._columnCount * this._columnWidth + (this._columnCount-1) * + this._gutterSize)) / 2

  }

  _onResize ({ height, width }) {
    this._width = width
    this._columnHeights = {}
    this._calculateColumnCount(width)
    this._resetCellPositioner()
    this._masonry.recomputeCellPositions()
  }

  onCellsRendered = ({ startIndex, stopIndex }) => {
    const { canLoadMore, loading, documents } = this.props
    if (canLoadMore && !loading && stopIndex >= documents.length - 10) {
      this.props.loadMoreDocuments()
    }
  }

  cellRenderer = ({ index, key, parent, style }) => {
    const item = this.props.documents[index]
    let imageHeight;

    if (item.snapshot && item.data.thumbnail_height) {
      imageHeight = item.data.thumbnail_height
    } else {

    }


    //const image = randomImage(index)
    //const ratio = image.height / image.width
    //const imageHeight = ratio * this._columnWidth
    console.log(style.left)
    const divStyle = { ...style, width:this._columnWidth, left:style.left + this.horizontalPadding, height:imageHeight,  border:'solid white 10px' }
    return (
      <CellMeasurer
        cache={this.cache}
        index={index}
        key={key}
        parent={parent}
      >
      {/*
      {({measure}) => (
        <div style={style}>

        </div>
      ) }
      */}
      <div>
        <div  style={divStyle}>
          <CollectionDoc doc={item} hasImage={!!imageHeight}/>
        </div>
      </div>



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

  _renderMasonry ({ width }) {
    this._width = width
    this._calculateColumnCount(width)
    this._initCellPositioner()

    return (
      <Masonry
        ref={this._setMasonryRef}
        cellCount={this.props.documents.length}
        cellMeasurerCache={this.cache}
        cellPositioner={this.cellPositioner}
        cellRenderer={this.cellRenderer}
        onCellsRendered={this.onCellsRendered}
        height={this.height}
        width={width}
        scrollTop={this.scrollTop}
        overscanByPixels={500}
      />
    )
  }

  _renderAutoSizer({ scrollTop, height }) {
    this.height = height
    this.scrollTop = scrollTop

    return (
      <AutoSizer
        cellCount={this.props.documents.length}
        disableHeight={true}
        scrollTop={this.scrollTop}
        onResize={this._onResize}>
        { this._renderMasonry }
      </AutoSizer>
    )

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
      <div style={{paddingTop:100}}>

        {(!isNull(documents) && documents.length > 0) && (
          <WindowScroller cellCount={this.props.documents.length}>
          {this._renderAutoSizer}
          </WindowScroller>
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
})(Collection)
