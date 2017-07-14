import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import ChapterCover from '../ChapterCover'
import Module from '../Module'
import ChaptersControl from '../../components/ChaptersControl'

import {
  getTheme,
  getChapter,
  getTotalChapterModules,
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
    const { theme, chapter, totalChapterModules, match, history } = this.props

    return (
      <div>

        {chapter && (
          <Route path={`${match.path}/modules/:moduleIndex`}>
            {({ match }) => {
              const index = match ? +match.params.moduleIndex : 0
              const baseUrl = `/themes/${theme.slug}/chapters/${chapter.slug}`
              return (
                <ChaptersControl
                  title={chapter.title}
                  hasPrev={index > 0}
                  hasNext={index < totalChapterModules}
                  onClickNext={() => {
                    history.push(`${baseUrl}/modules/${index + 1}`)
                  }}
                  onClickPrev={() => {
                    if (index > 1) {
                      history.push(`${baseUrl}/modules/${index - 1}`)
                    } else {
                      history.push(`${baseUrl}`)
                    }
                  }}
                  currentIndex={index}
                  count={totalChapterModules}
                />
              )
            }}
          </Route>
        )}

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
  theme: getTheme(state),
  chapter: getChapter(state),
  totalChapterModules: getTotalChapterModules(state),
})

export default connect(mapStateToProps, {
  loadChapter,
  unloadChapter,
})(Chapter)
