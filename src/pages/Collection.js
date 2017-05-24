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
  WindowScroller,
} from 'react-virtualized'

import { memoize, random, sample } from 'lodash'

const images = [
  { src:"1.jpg", width:330, height:207},
  { src:"2.jpg", width:554, height:700},
  { src:"3.jpg", width:1180, height:1180},
]

const randomHeight = memoize((idx) => random(100, 500))
const randomImage = memoize((idx) => sample(images))

class Collection extends Component {

  constructor(props){
    console.log("jy")
    super(props)


    this._onResize = this._onResize.bind(this)
    this._columnCount = 0
    this.horizontalPadding = 0
    this.height = 0;
    this.scrollTop = 0;

    this._columnWidth = 300
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
    console.log(width, this._columnCount)

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

    const image = randomImage(index)
    const ratio = image.height / image.width
    const imageHeight = ratio * this._columnWidth

    const divStyle = { ...style, width:this._columnWidth, left:style.left + this.horizontalPadding, height:imageHeight, backgroundColor:'crimson', border:'solid green 2px' }
    console.log(divStyle)
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
          <CollectionDoc doc={datum} measure={measure}/>
        </div>
      ) }
      */}
      <div>
        <div style={divStyle}>
          <img src={image.src} style={{height:'100%', width:'100%'}}/>
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
        height={this.height}
        width={width}
        ref={this._setMasonryRef}
        scrollTop={this.scrollTop}
      />
    )
  }

  _renderAutoSizer({ scrollTop, height }) {
    this.height = height
    this.scrollTop = scrollTop

    return (
      <AutoSizer
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
      <div>

        {(!isNull(documents) && documents.length > 0) && (
          <WindowScroller>
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
