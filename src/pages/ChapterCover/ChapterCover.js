import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { get } from 'lodash'
import Background from '../../components/Background'
import { Container } from 'reactstrap';

import {
  getChapter,
  getChapterIndex,
} from '../../state/selectors'

import './ChapterCover.css'

class ChapterCover extends PureComponent  {
  render() {
    const { chapter, index } = this.props

    if (!chapter) {
      return null
    }

    return (
      <Container fluid className="ChapterCover__container">
         <Background
           image={get(chapter, 'covers[0].attachment')}
           overlay={get(chapter, 'data.background.overlay')}
           color={get(chapter, 'data.background.backgroundColor')}
         />
         <div  className="ChapterCover__inner_container">
           <div>
            <div className="ChapterCover__label_container">
              <label>CHAPTER {index + 1}</label>
            </div>
            <h1>{chapter.translated.title}</h1>
            <div className="ChapterCover__text_container">
              <p>{chapter.translated.abstract}</p>
            </div>
            <div className="ChapterCover__bottom_text_container">
              <p>Use your mouse, keyboard or the<br/>arrows to read the story</p>
            </div>
          </div>
         </div>
      </Container>
    )
  }
}



const mapStateToProps = state => ({
  chapter: getChapter(state),
  index: getChapterIndex(state),
})

export default connect(mapStateToProps)(ChapterCover)
