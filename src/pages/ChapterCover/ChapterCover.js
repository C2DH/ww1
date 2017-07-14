import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { get } from 'lodash'
import Background from '../../components/Background'
import { Container } from 'reactstrap';

import {
  getChapter,
} from '../../state/selectors'

import './ChapterCover.css'

class ChapterCover extends PureComponent  {
  render() {
    const { chapter } = this.props

    console.log(chapter)

    return (
      <Container fluid className="padding-r-l-0 ChapterCover__container">
         <Background
           image={get(chapter, 'covers[0].attachment')}
           overlay={get(chapter, 'metadata.background.overlay')}
           color={get(chapter, 'metadata.background.backgroundColor')}
         />
         <div  className="ChapterCover__inner_container">
           <div>
            <div className="ChapterCover__label_container">
              <label>CHAPTER {get(chapter, 'id')}</label>
            </div>
            <h1>{get(chapter, 'title')}</h1>
            <div className="ChapterCover__text_container">
              <p>{get(chapter, 'abstract')}</p>
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
})

export default connect(mapStateToProps)(ChapterCover)
