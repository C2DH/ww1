import React, { PureComponent } from 'react'
import {
  CellMeasurer,
  CellMeasurerCache,
  createMasonryCellPositioner,
  Masonry,
  AutoSizer,
  WindowScroller,
} from 'react-virtualized'
import { isMobileScreen } from '../../breakpoints'
import CollectionDoc from '../CollectionDoc'

const DEFAULT_COLUMN_WIDTH = 260
const MOBILE_HORIZONTAL_PADDING = 10
const MOBILE_COLUMN_COUNT = 3

class CollectionMasonry extends PureComponent {
  constructor(props) {
    super(props)

    this.columnWidth = this.props.dynamicWidth?this.props.dynamicWidth:DEFAULT_COLUMN_WIDTH
    this.gutterSize = 10
    this.horizontalPadding = 0
    this.columnCount = 4

    this.cache = new CellMeasurerCache({
      defaultHeight: 250,
      defaultWidth: this.columnWidth,
      fixedWidth: true,
      fixedHeight: false,
    })
    this.cellPositioner = createMasonryCellPositioner({
      cellMeasurerCache: this.cache,
      columnCount: this.columnCount,
      columnWidth: this.columnWidth,
      spacer: this.gutterSize
    })
  }

  setMasonryRef = ref => {
    this.masonry = ref
  }

  calculateColumnCountAndWidth = (width) => {
    if (isMobileScreen()) {
      this.columnCount = MOBILE_COLUMN_COUNT
      this.horizontalPadding = MOBILE_HORIZONTAL_PADDING
      this.columnWidth = Math.floor((((width - this.horizontalPadding * 2) + this.gutterSize) / this.columnCount) - this.gutterSize)
    } else {
      this.columnWidth = this.props.dynamicWidth?this.props.dynamicWidth:DEFAULT_COLUMN_WIDTH
      this.columnCount = Math.floor(( width + this.gutterSize ) / ( this.columnWidth + this.gutterSize ))
      this.horizontalPadding = (width - (this.columnCount * this.columnWidth + (this.columnCount-1) * + this.gutterSize)) / 2
    }
  }

  resetCellPositioner = () => {
    this.cellPositioner.reset({
      columnCount: this.columnCount,
      columnWidth: this.columnWidth,
      spacer: this.gutterSize
    })
  }

  onResize = ({ height, width }) => {
    this.calculateColumnCountAndWidth(width)
    this.resetCellPositioner()
    this.masonry.recomputeCellPositions()
  }

  onCellsRendered = ({ startIndex, stopIndex }) => {
    const { canLoadMore, documents, loadMore } = this.props
    if (canLoadMore && stopIndex >= documents.length - 10) {
      loadMore()
    }
  }

  cellRenderer = ({ index, key, parent, style }) => {
    if (!this.props.documents) {
      return null
    }
    const item = this.props.documents[index]
    const { showDocLink=false } = this.props

    if (typeof item === 'undefined') {
      return null
    }

    let imageHeight
    let hasImage

    if (item.snapshot && item.data.thumbnail_height) {
      const delta = (this.columnWidth / (this.props.dynamicWidth?this.props.dynamicWidth:DEFAULT_COLUMN_WIDTH))
      imageHeight = ((this.props.dynamicWidth?this.props.dynamicWidth:DEFAULT_COLUMN_WIDTH)/item.data.thumbnail_width * item.data.thumbnail_height) * (delta > 1 ? 1 : delta)
      hasImage = true
    } else {
      imageHeight = 200
      hasImage = false
    }

    const divStyle = {
      ...style,
      width: this.columnWidth,
      left: (style.left || 0) + this.horizontalPadding,
      height: imageHeight,
    }

    return (
      <CellMeasurer
        cache={this.cache}
        index={index}
        key={key}
        parent={parent}
      >
        <div>
          <div style={divStyle}>
            <CollectionDoc doc={item} hasImage={hasImage} showDocLink={showDocLink} index={index}/>
          </div>
        </div>
      </CellMeasurer>
    )
  }

  render() {
    const { documents, masonryStyle } = this.props
    return (
      <div style={{ height: '100%', display: 'flex' }}>
      <WindowScroller documents={documents}>
        {({ scrollTop }) => (
        <div style={{ flex: '1 1 auto' }}>
          <AutoSizer
            disableHeight={true}
            scrollTop={scrollTop}
            onResize={this.onResize}>
            {({ height, width }) => (
              <Masonry
                style={masonryStyle}
                ref={this.setMasonryRef}
                cellCount={documents ? documents.length : 0}
                cellMeasurerCache={this.cache}
                cellPositioner={this.cellPositioner}
                cellRenderer={this.cellRenderer}
                onCellsRendered={this.onCellsRendered}
                height={height}
                width={width || window.innerWidth}
                scrollTop={100}
                overscanByPixels={200}
              />
            )}
          </AutoSizer>
        </div>
        )}
      </WindowScroller>
    </div>
    )
  }
}

export default CollectionMasonry
