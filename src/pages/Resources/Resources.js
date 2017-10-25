import React, { PureComponent } from 'react'
import qs from 'query-string'
import { withRouter } from 'react-router-dom'
import { debounce } from 'lodash'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'reactstrap'
import BigTitle from '../../components/BigTitle'
import ResourceCard from '../../components/ResourceCard'
import StaticStory from '../../components/StaticStory'
import {
  getResourceDocuments,
} from '../../state/selectors'
import {
  parseQsValue,
} from '../../utils'
import {
  loadResourceDocuments,
  unloadResourceDocuments,
} from '../../state/actions'
import './Resources.css'

class Resources extends PureComponent {
  componentDidMount() {
    this.props.loadResourceDocuments({
      q: this.props.searchString,
    })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.searchString !== nextProps.searchString) {
      this.search(nextProps.searchString)
    }
  }

  componentWillUnmount() {
    this.props.unloadResourceDocuments()
  }

  handleSearchChange = e => {
    const searchString = e.target.value
    const { location, history } = this.props
    history.push(`${location.pathname}?${qs.stringify({ q: searchString })}`)
  }

  search = debounce(searchString => {
    // this.props.unloadResourceDocuments()
    this.props.loadResourceDocuments({
      q: `${searchString}*`,
    })
  }, 200)

  render() {
    const { documents, searchString } = this.props
    return (
      <div className="Resources__wrapper">
        <div className="Resources__top_wrapper">
          <Container>
            <BigTitle title="Resources" />
            <Row>
              <Col>
                  <StaticStory slug='resources' />
              </Col>
            </Row>
          </Container>
        </div>
        <Container>
          <div>
            <input
              type='text'
              value={searchString}
              onChange={this.handleSearchChange}
            />
          </div>
          <Row>
            <Col>
              {documents && documents.map(doc => (
                <ResourceCard
                  key={doc.id}
                  image={doc.snapshot || 'https://via.placeholder.com/250x250'}
                  pubDate="12 April 2017"
                  title={doc.translated.title}
                  author="John Doe"
                />
              ))}
            </Col>
          </Row>
        </Container>
      </div>

    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  searchString: parseQsValue(ownProps.location, 'q', ''),
  documents: getResourceDocuments(state),
})

export default withRouter(connect(mapStateToProps, {
  loadResourceDocuments,
  unloadResourceDocuments,
})(Resources))
