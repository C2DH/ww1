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

import CollectionMasonry from '../../components/CollectionMasonry'
import "./Collection.css"

class Collection extends Component {

  constructor(props){
    super(props)
    this.state = {
      sidebarOpen: true
    }

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
        {documents && <CollectionMasonry
          documents={documents}
          canLoadMore={canLoadMore && !loading}
          loadMore={this.loadMore}
          masonryStyle={{ paddingTop:120, paddingBottom: 20 }}
        />}
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
