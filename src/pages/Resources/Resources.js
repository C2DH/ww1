import React, { PureComponent } from 'react'
import qs from 'query-string'
import { withRouter } from 'react-router-dom'
import { get, debounce } from 'lodash'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'reactstrap'
import BigTitle from '../../components/BigTitle'
import ResourceCard from '../../components/ResourceCard'
import StaticStory from '../../components/StaticStory'
import {Helmet} from 'react-helmet';
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
        <Helmet>
                <title>{this.context.t('resources')}</title>
        </Helmet>
        {
          documents && <div className="animated fadeIn">
          <div className="Resources__top_wrapper">
            <Container>
              <BigTitle title={this.context.t('resources')} />
              <Row>
                <Col>
                    <StaticStory slug='resources' />
                </Col>
              </Row>
            </Container>
          </div>

          <div className="Resources__search_wrapper">
            <Container>
              <Row>
                <Col>
                  <div className="input-group">
                    <div className="input-group-prepend d-flex align-items-center">
                      <div className="input-group-text d-flex">
                        <i className="material-icons">search</i>
                      </div>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      value={searchString}
                      onChange={this.handleSearchChange}
                      placeholder={this.context.t('search here')}/>
                  </div>
                </Col>
            </Row>
            </Container>
          </div>

          <Container>
            <Row>
              <Col>
                {documents && documents.map(doc => (
                  <ResourceCard
                    key={doc.id}
                    image={doc.snapshot}
                    date={doc.data.year}
                    startDate={doc.translated.start_date}
                    title={doc.translated.title}
                    author={doc.data.creator}
                    description={doc.translated.description}
                    attachment={doc.attachment}
                  />
                ))}
              </Col>
            </Row>
          </Container>
        </div>
        }
      </div>

    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  searchString: parseQsValue(ownProps.location, 'q', ''),
  documents: getResourceDocuments(state),
})

Resources.contextTypes = {
  t: React.PropTypes.func.isRequired
}

export default withRouter(connect(mapStateToProps, {
  loadResourceDocuments,
  unloadResourceDocuments,
})(Resources))
