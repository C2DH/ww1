import React, { PureComponent } from 'react'
import { CSSTransitionGroup } from 'react-transition-group'
import { connect } from 'react-redux'
import { Link, Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { get } from 'lodash'
import ChapterCover from '../ChapterCover'
import Module from '../Module'
import NotFound from '../../components/NotFound'
import ChaptersControl from '../../components/ChaptersControl'
import ChaptersSwitcher from '../../components/ChaptersSwitcher'
import {Helmet} from 'react-helmet';
import './Chapter.css'

import {
  getTheme,
  getChapter,
  getTotalChapterModules,
  getTotalThemeChapters,
  getChapterIndex,
  getMakeLangUrl,
  getChapterError,
} from '../../state/selectors'

import {
  loadChapter,
  unloadChapter,
  lockScroll,
  unlockScroll,
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
      this.setState({ open: false })
      this.props.unlockScroll()
      this.props.loadChapter(nextProps.match.params.chapterSlug)
    }
  }

  componentWillUnmount() {
    this.props.unloadChapter()
    this.props.unlockScroll()
  }

  toggleChapters = () => {
    this.setState({
      open: !this.state.open
    }, () => {
      if (this.state.open) {
        this.props.lockScroll()
      } else {
        this.props.unlockScroll()
      }
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
      history,
      makeUrl,
      error,
    } = this.props

    if (get(error, 'response.status') === 404) {
      return <NotFound />
    }

    return (
      <div>
        {
          chapter &&
          <Helmet>
                <title>{chapter.translated.title}</title>
          </Helmet>
        }
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
                  hasPrev={(index > 0 || chapterIndex > 0)}
                  moduleIndex={index}
                  moduleTot={totalChapterModules}
                  hasNext={index < totalChapterModules || chapterIndex + 1 < totalChapters}
                  onClickChapters={() => {
                    this.toggleChapters()
                  }}
                  onClickTheme={() => {
                    history.push(makeUrl(themeUrl))
                  }}
                  onClickNext={() => {
                    if (index < totalChapterModules) {
                      history.push(makeUrl(`${chapterUrl}/modules/${index + 1}`))
                    } else {
                      // Go to cover of next chapter
                      history.push(makeUrl(`${themeUrl}/chapters/${nextChapterSlug}`))
                    }
                  }}
                  onClickPrev={() => {
                    if (index === 0) {
                      // To prev chapter
                      const prevChapter = get(theme, `stories[${Number(chapterIndex) - 1}]`)
                      const prevChapterSlug = get(prevChapter, 'slug')
                      const lastModule = get(prevChapter, 'data.count_modules', 0)
                      history.push(makeUrl(`${themeUrl}/chapters/${prevChapterSlug}/modules/${lastModule}`))
                    } else if (index > 1) {
                      history.push(makeUrl(`${chapterUrl}/modules/${index - 1}`))
                    } else {
                      history.push(makeUrl(`${chapterUrl}`))
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
  error: getChapterError(state),
  chapterIndex: getChapterIndex(state),
  totalChapters: getTotalThemeChapters(state),
  totalChapterModules: getTotalChapterModules(state),
  makeUrl: getMakeLangUrl(state),
})

export default withRouter(connect(mapStateToProps, {
  loadChapter,
  unloadChapter,
  lockScroll,
  unlockScroll,
})(Chapter))
