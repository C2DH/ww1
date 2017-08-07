import React, { PureComponent } from 'react'
import { Container } from 'reactstrap';
import StaticStory from '../../components/StaticStory'
import './StaticStory.css'

import {
  getStaticStory,
} from '../../state/selectors'

class StaticStoryPage extends PureComponent {
  render() {
    const { slug } = this.props

    return (
      <Container fluid>
        <StaticStory slug={slug} />
      </Container>
    )
  }
}

export default StaticStoryPage
