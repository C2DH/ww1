import React, { PureComponent } from 'react'
import { CSSTransitionGroup } from 'react-transition-group'
import { connect } from 'react-redux'
import { Link, Switch, Route, withRouter } from 'react-router-dom'
import { get } from 'lodash'
import ChapterCover from '../ChapterCover'
import Module from '../Module'
import ChaptersControl from '../../components/ChaptersControl'
import ChaptersSwitcher from '../../components/ChaptersSwitcher'
import './Chapter.css'

import {
  getTheme,
  getChapter,
  getTotalChapterModules,
  getTotalThemeChapters,
  getChapterIndex,
} from '../../state/selectors'

import {
  loadChapter,
  unloadChapter,
} from '../../state/actions'

class Chapter extends PureComponent  {
  state = {
    open: false,
  }

  componentDidMount() {
    this.props.loadChapter(this.props.match.params.chapterSlug)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.chapterSlug !== this.props.match.params.chapterSlug) {
      this.props.unloadChapter()
      this.toggleChapters()
      this.props.loadChapter(nextProps.match.params.chapterSlug)
    }
  }

  componentWillUnmount() {
    this.props.unloadChapter()
  }

  toggleChapters = () => {
    this.setState({
      open: !this.state.open
    })
  }

  render() {
    const {
      theme,
      location,
      chapter,
      totalChapterModules,
      totalChapters,
      chapterIndex,
      match,
      history
    } = this.props

    return (
      <div>

        {chapter && (
          <Route path={`${match.path}/modules/:moduleIndex`}>
            {({ match }) => {
              const index = match ? +match.params.moduleIndex : 0
              const themeUrl = `/themes/${theme.slug}`
              const chapterUrl = `${themeUrl}/chapters/${chapter.slug}`
              const nextChapterSlug = get(theme, `stories[${chapterIndex + 1}].slug`)
              return (
                <ChaptersControl
                  title={theme.translated.title}
                  hasPrev={index > 0}
                  hasNext={index < totalChapterModules || chapterIndex + 1 < totalChapters}
                  onClickChapters={() => {
                    this.toggleChapters()
                  }}
                  onClickTheme={() => {
                    history.push(themeUrl)
                  }}
                  onClickNext={() => {
                    if (index < totalChapterModules) {
                      history.push(`${chapterUrl}/modules/${index + 1}`)
                    } else {
                      // Go to cover of next chapter
                      history.push(`${themeUrl}/chapters/${nextChapterSlug}`)
                    }
                  }}
                  onClickPrev={() => {
                    if (index > 1) {
                      history.push(`${chapterUrl}/modules/${index - 1}`)
                    } else {
                      history.push(`${chapterUrl}`)
                    }
                  }}
                  currentIndex={chapterIndex + 1}
                  count={totalChapters}
                />
              )
            }}
          </Route>
        )}
        <CSSTransitionGroup component="div"
          transitionName="chapter"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
           {this.state.open &&
             <ChaptersSwitcher theme={theme} />
            }
        </CSSTransitionGroup>

        {chapter && (
         <CSSTransitionGroup
            transitionName="SwitchModule"
            component="div"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
          >
            <Switch key={location.key} location={location}>
              <Route path={`${match.path}`} exact component={ChapterCover} />
              <Route path={`${match.path}/modules/:moduleIndex`} exact component={Module} />
            </Switch>
          </CSSTransitionGroup>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  theme: getTheme(state),
  chapter: getChapter(state),
  chapterIndex: getChapterIndex(state),
  totalChapters: getTotalThemeChapters(state),
  totalChapterModules: getTotalChapterModules(state),
})

export default withRouter(connect(mapStateToProps, {
  loadChapter,
  unloadChapter,
})(Chapter))
