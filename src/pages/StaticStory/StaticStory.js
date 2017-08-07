import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Container } from 'reactstrap';
import { Converter } from 'showdown'
import {
  loadStaticStory,
  unloadStaticStory,
} from '../../state/actions'
import './StaticStory.css'

import {
  getStaticStory,
} from '../../state/selectors'

const converter = new Converter()

class StaticStory extends PureComponent {
  componentDidMount() {
    this.props.loadStaticStory(this.props.slug)
  }

  componentWillUnmount() {
    this.props.unloadStaticStory()
  }

  render() {
    const { staticStory } = this.props
    let content = null
    if (staticStory && staticStory.data.content) {
      content = converter.makeHtml(staticStory.data.content)
    }

    return (
      <Container fluid>
        {content && <div  dangerouslySetInnerHTML={{ __html: content }} />}
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  staticStory: getStaticStory(state),
})

export default connect(mapStateToProps, {
  loadStaticStory,
  unloadStaticStory,
})(StaticStory)
