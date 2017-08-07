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
      <Container fluid className="padding-r-l-0">
        <BigTitle title="Resources" />
        <div className="Resources__whiteBackground">
          <StaticStory slug='resources' />
        </div>
        <div className="Resources__cards_container">
          {documents && documents.map(doc => (
            <ResourceCard
              key={doc.id}
              image={doc.snapshot || 'https://via.placeholder.com/250x250'}
              pubDate="12 April 2017"
              title={doc.translated.title}
              author="John Doe"
            />
          ))}
        </div>
      </Container>
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
