import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Converter } from 'showdown'
import {
  loadStaticStory,
  unloadStaticStory,
} from '../../state/actions'

import {
  getStaticStory,
} from '../../state/selectors'
import './StaticStory.css'

const converter = new Converter()

class StaticStory extends PureComponent {
  componentDidMount() {
    this.props.loadStaticStory(this.props.slug)
  }

  componentWillReciveProps(nextProps) {
    if (nextProps.slug !== this.props.slug) {
      this.props.unloadStaticStory()
      this.props.loadStaticStory(nextProps.slug)
    }
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
      <div>
        {content && <div className="Static__intro" dangerouslySetInnerHTML={{ __html: content }} />}
      </div>
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
