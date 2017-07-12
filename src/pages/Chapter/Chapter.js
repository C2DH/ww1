import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import ChapterCover from '../ChapterCover'
import Module from '../Module'

import {
  getChapter,
} from '../../state/selectors'

import {
  loadChapter,
  unloadChapter,
} from '../../state/actions'

class Chapter extends PureComponent  {
  componentDidMount() {
    this.props.loadChapter(this.props.match.params.chapterSlug)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.chapterSlug !== this.props.match.params.chapterSlug) {
      this.props.unloadChapter()
      this.props.loadChapter(nextProps.match.params.chapterSlug)
    }
  }

  componentWillUnmount() {
    this.props.unloadChapter()
  }

  render() {
    const { chapter, match } = this.props

    return (
      <div>

        {chapter && (
          <Switch>
            <Route path={`${match.path}`} exact component={ChapterCover} />
            <Route path={`${match.path}/modules/:moduleIndex`} exact component={Module} />
          </Switch>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  chapter: getChapter(state),
})

export default connect(mapStateToProps, {
  loadChapter,
  unloadChapter,
})(Chapter)
