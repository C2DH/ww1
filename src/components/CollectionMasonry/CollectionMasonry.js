import React, { PureComponent } from 'react'
import {
  CellMeasurer,
  CellMeasurerCache,
  createMasonryCellPositioner,
  Masonry,
  AutoSizer,
  WindowScroller,
} from 'react-virtualized'
import CollectionDoc from '../CollectionDoc'

class CollectionMasonry extends PureComponent {
  constructor(props) {
    super(props)

    this.columnWidth = 234
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

  calculateColumnCount = (width) => {
    this.columnCount = Math.floor(( width + this.gutterSize ) / ( this.columnWidth + this.gutterSize ))
    this.horizontalPadding = (width - (this.columnCount * this.columnWidth + (this.columnCount-1) * + this.gutterSize)) / 2
  }

  resetCellPositioner = () => {
    this.cellPositioner.reset({
      columnCount: this.columnCount,
      columnWidth: this.columnWidth,
      spacer: this.gutterSize
    })
  }

  onResize = ({ height, width }) => {
    this.calculateColumnCount(width)
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

    if (typeof item === 'undefined') {
      return null
    }

    let imageHeight
    let hasImage

    if (item.snapshot && item.data.thumbnail_height) {
      imageHeight = item.data.thumbnail_height
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
            <CollectionDoc doc={item} hasImage={hasImage} />
          </div>
        </div>
      </CellMeasurer>
    )
  }

  render() {
    const { documents, masonryStyle } = this.props

    return (
      <div>
      <WindowScroller documents={documents}>
        {({ scrollTop, height }) => (
          <AutoSizer
            disableHeight={true}
            scrollTop={scrollTop}
            onResize={this.onResize}>
            {({ width }) => (
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
        )}
      </WindowScroller>
    </div>
    )
  }
}

export default CollectionMasonry
