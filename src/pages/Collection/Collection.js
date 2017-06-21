import React, { Component } from 'react'
import { isNull, get } from 'lodash'
import qs from 'query-string'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  loadDocuments,
  loadMoreDocuments,
  unloadDocuments,
} from '../../state/actions'
import {
  getDocuments,
  canLoadMoreDocuments,
  getDocumentsCount,
  getDocumentsLoading,
} from '../../state/selectors'

import {
  CellMeasurer,
  CellMeasurerCache,
  createMasonryCellPositioner,
  Masonry,
  AutoSizer,
  WindowScroller,
} from 'react-virtualized'

import CollectionDoc from '../../components/CollectionDoc'
import "./Collection.css"

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

    this.state = {
      sidebarOpen: true
    }

    this._setMasonryRef = this._setMasonryRef.bind(this)
    this._renderMasonry = this._renderMasonry.bind(this)
    this._renderAutoSizer = this._renderAutoSizer.bind(this)

  }

  componentDidMount() {
    this.props.loadDocuments({q:this.props.searchString})
  }

  componentWillUnmount() {
    this.props.unloadDocuments()
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.searchString !== this.props.searchString) {
      this.props.unloadDocuments()
      this.props.loadDocuments({q:nextProps.searchString})
    }
  }

  loadMore = () => {
    this.props.loadMoreDocuments({q:this.props.searchString})
  }

  _resetCellPositioner = () => {

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
    if(!this.props.documents){
      return null
    }
    const item = this.props.documents[index]
    if( typeof(item) == 'undefined'){
      return null
    }
    let imageHeight;

    if (item.snapshot && item.data.thumbnail_height) {
      imageHeight = item.data.thumbnail_height
    } else {

    }


    //const image = randomImage(index)
    //const ratio = image.height / image.width
    //const imageHeight = ratio * this._columnWidth

    const divStyle = { ...style, width:this._columnWidth, left:(style.left||0) + this.horizontalPadding, height:imageHeight,  border:'solid white 10px' }
    return (
      <CellMeasurer
        cache={this.cache}
        index={index}
        key={key}
        parent={parent}
      >
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

    //this._width = width
    this._calculateColumnCount(width)
    this._initCellPositioner()

    return (
      <Masonry
        style={{paddingTop:120, paddingBottom: 20}}
        ref={this._setMasonryRef}
        cellCount={this.props.documents ? this.props.documents.length : 0}
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
        documents={this.props.documents}
        disableHeight={true}
        scrollTop={this.scrollTop}
        onResize={this._onResize}>
        { this._renderMasonry }
      </AutoSizer>
    )

  }

  toggleOpen = () => {
    this.setState({
      sidebarOpen : !this.state.sidebarOpen
    })
  }

  handleSearchStringChange = (e) => {
    const searchString = e.target.value
    this.props.history.replace(`/collection?q=${searchString}` )
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
    <div className={this.state.sidebarOpen ? "Collection__List--sidebar-open" : ''}>
      <div className={`list-heading ${this.state.sidebarOpen ? 'list-heading-closed' : '' }`}>
        <h1>Collection</h1>
        <button onClick={this.toggleOpen}>o</button>
      </div>

      {this.state.sidebarOpen && (
        <div style={{position:"fixed", width:"20%", top:0, bottom:0, left:"80%", backgroundColor:"red"}}>
          <div>
            <input onChange={this.handleSearchStringChange} value={this.props.searchString}/>
          </div>
        </div>
      )}


      <div>
          <WindowScroller documents={this.props.documents}>
          {this._renderAutoSizer}
          </WindowScroller>

      </div>
    </div>



    </div>
    )
  }
}

const parseSearchString = location => {
  const params = qs.parse(qs.extract(location.search))
  return get(params, "q")
}

const mapStateToProps = (state, ownProps) => ({
  documents: getDocuments(state),
  canLoadMore: canLoadMoreDocuments(state),
  count: getDocumentsCount(state),
  loading: getDocumentsLoading(state),
  searchString : parseSearchString(ownProps.location),
})

export default connect(mapStateToProps, {
  loadDocuments,
  loadMoreDocuments,
  unloadDocuments,
})(Collection)
