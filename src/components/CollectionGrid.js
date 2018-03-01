import React, { PureComponent } from 'react'
import { Grid, WindowScroller, AutoSizer } from 'react-virtualized'
import CollectionDoc from './CollectionDoc'

const COLUMN_COUNT = 3

class CollectionGrid extends PureComponent {

  side = 100

  cellRenderer = ({ columnIndex, key, rowIndex, style }) => {
    const i = rowIndex * COLUMN_COUNT + columnIndex
    const doc = this.props.documents[i]

    if (!doc) {
      return null
    }

    let hasImage
    if (doc.data.resolutions && doc.data.resolutions.thumbnail && doc.data.resolutions.thumbnail.height) {
      hasImage = true
    } else {
      hasImage = false
    }

    return (
      <div
         key={key}
         style={{
           ...style,
         }}
       >
        <div style={{ padding: 5, height: '100%' }}>
          <CollectionDoc doc={doc} hasImage={hasImage} showDocLink={false} squared />
        </div>
     </div>
    )
  }

  onSectionRendered = ({ columnOverscanStartIndex, columnOverscanStopIndex, columnStartIndex, columnStopIndex, rowOverscanStartIndex, rowOverscanStopIndex, rowStartIndex, rowStopIndex }) => {
    const i = rowStopIndex * COLUMN_COUNT + columnStopIndex
    const { canLoadMore, documents, loadMore } = this.props
    if (canLoadMore && i >= documents.length - 10) {
      loadMore()
    }
  }

  onResize = ({ height, width }) => {
    this.side = Math.floor(width / COLUMN_COUNT)
  }

  render() {
    const { documents, gridStyle } = this.props
    return (
      <div>
      <WindowScroller documents={documents}>
        {({ scrollTop, height }) => (
          <AutoSizer
            disableHeight={true}
            scrollTop={scrollTop}
            onResize={this.onResize}>
            {({ width }) => (
              <Grid
                onSectionRendered={this.onSectionRendered}
                style={gridStyle}
                cellRenderer={this.cellRenderer}
                columnCount={COLUMN_COUNT}
                columnWidth={this.side}
                height={height}
                rowCount={Math.ceil(documents.length / COLUMN_COUNT)}
                rowHeight={this.side}
                width={width}
              />
            )}
          </AutoSizer>
        )}
      </WindowScroller>
    </div>
    )
  }
}

export default CollectionGrid
