import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { get } from 'lodash'
import Background from '../../components/Background'
import { Container,Row,Col } from 'reactstrap';
import ScrollLock from 'react-scrolllock'
import { ScrollHelperTop, ScrollHelperBottom, BASE_SCROLL_HELPER_HEIGHT, scrollScale } from '../../components/ScrollHelpers'

import {
  getTheme,
  getChapter,
  getChapterIndex,
  getTotalChapterModules,
  getMakeLangUrl,
} from '../../state/selectors'

import {
  lockScroll,
} from '../../state/actions'

import './ChapterCover.css'

class ChapterCover extends PureComponent  {

  state = {
    stopScroll : true,
    scrolling: 0,
  }

  canScrollToFirstModule = () => {
    return
  }

  toFirstModule = () => {
    const { totalChapterModules, history, theme, chapter, makeUrl } = this.props
    if(totalChapterModules < 1) { return }
    const themeUrl = `/themes/${theme.slug}`
    history.push(makeUrl(`${themeUrl}/chapters/${chapter.slug}/modules/1`))
  }

  toPrevModule = () => {
    const { chapterIndex, history, theme, makeUrl } = this.props
    const themeUrl = `/themes/${theme.slug}`
    if(chapterIndex > 0){
      //to last chapter of prev
      const prevChapterSlug = get(theme, `stories[${Number(chapterIndex) - 1}].slug`)//to prev chapter
      console.log("prevChapterSlug", prevChapterSlug, chapterIndex, theme)
      history.push(makeUrl(`${themeUrl}/chapters/${prevChapterSlug}/modules/last`))
    }
    if(chapterIndex === 0){
      //to theme cover
      history.push(makeUrl(`${themeUrl}`))
    }
  }

  componentWillReceiveProps (nextProps){
    if (this.props.totalChapterModules > 0 && this.props.scroll !== nextProps.scroll && !nextProps.scrollLock){
      if(nextProps.scroll === BASE_SCROLL_HELPER_HEIGHT){
        // this.setState({scrolling:-1})
        this.toFirstModule()
      }
    }

    if (this.props.scroll !== nextProps.scroll && !nextProps.scrollLock){
      if(nextProps.scroll === -BASE_SCROLL_HELPER_HEIGHT){
        // this.setState({scrolling:1})
        this.toPrevModule()
      }
    }
  }

  componentDidMount() {
    window.scrollTo(0, BASE_SCROLL_HELPER_HEIGHT)
    this.props.lockScroll(1200)
  }

  render() {
    const { chapter, index } = this.props

    if (!chapter) {
      return null
    }

    const backgroundColor = get(chapter, 'data.background.backgroundColor')
    const overlay = get(chapter, 'data.background.overlay')
    console.log(overlay + '-----' +backgroundColor)
    const bbox = get(chapter, 'data.background.bbox', []);
    let backgroundImage = get(chapter, 'covers[0].attachment')
    backgroundImage = !backgroundImage?'':(bbox.length)?backgroundImage:get(chapter, 'covers[0].data.resolutions.medium.url','')

    return (
      <div>
        <ScrollHelperTop background={overlay ? overlay : backgroundColor}/>
        {/* This was this.state.scrolling * 150 */}
        <div className="ChapterCover__container" style={{ marginTop: 0 * 150,
            opacity: scrollScale(this.props.scroll)}}>
          <Background
            image={backgroundImage}
            overlay={get(chapter, 'data.background.overlay')}
            bbox={bbox}
            color={get(chapter, 'data.background.backgroundColor')}
          />
          <Container fluid>
            <Row>
              <Col>
                <div className="ChapterCover__inner_container animated fadeIn">
                  <div className="ChapterCover__inner_container_center">
                   <div className="ChapterCover__label_container d-none d-md-block">
                     <h6>{this.context.t('chapter')} {index + 1}</h6>
                   </div>
                   <h1>{chapter.translated.title}</h1>
                   <div className="ChapterCover__text_container">
                     <p>{chapter.translated.abstract}</p>
                   </div>
                 </div>
                 <div className="ChapterCover__bottom_text_container">
                   <p>{this.context.t('use your mouse or the arrows to read the story')}</p>
                 </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <ScrollHelperBottom background={overlay ? overlay : backgroundColor}/>
        {/* {this.state.stopScroll && <ScrollLock/> } */}
      </div>

    )
  }
}

ChapterCover.contextTypes = {
  t: React.PropTypes.func.isRequired
}


const mapStateToProps = state => ({
  makeUrl: getMakeLangUrl(state),
  scrollLock: state.scrollLock,
  theme: getTheme(state),
  chapter: getChapter(state),
  chapterIndex: getChapterIndex(state),
  totalChapterModules: getTotalChapterModules(state),
  index: getChapterIndex(state),
  scroll: state.scroll,
})

export default connect(mapStateToProps, {
  lockScroll,
})(ChapterCover)
