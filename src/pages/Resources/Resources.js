import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'reactstrap'
import BigTitle from '../../components/BigTitle'
import ResourceCard from '../../components/ResourceCard'
import StaticStory from '../../components/StaticStory'
import {
  getResourceDocuments,
} from '../../state/selectors'
import {
  loadResourceDocuments,
  unloadResourceDocuments,
} from '../../state/actions'
import './Resources.css'

class Resources extends PureComponent {
  componentDidMount() {
    this.props.loadResourceDocuments()
  }

  componentWillUnmount() {
    this.props.unloadResourceDocuments()
  }

  render() {
    const { documents } = this.props
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

const mapStateToProps = state => ({
  documents: getResourceDocuments(state),
})

export default connect(mapStateToProps, {
  loadResourceDocuments,
  unloadResourceDocuments,
})(Resources)
