import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Container } from 'reactstrap';

import {
  getChapter,
} from '../../state/selectors'

import './ChapterCover.css'

const cover = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Fordi-2.jpg/520px-Fordi-2.jpg"
const containerStyle = { backgroundImage: `url(${cover})` }

class ChapterCover extends PureComponent  {
  render() {
    const { chapter, cover ,  title="Titolo", abstract="bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla"} = this.props

    console.log(chapter)

    return (
      <Container fluid className="padding-r-l-0 ChapterCover__container" style={containerStyle}>
         <div className="ChapterCover__inner_container">
          <div className="ChapterCover__chapters_num_container">
            <span>Chapter Name</span>
            <button className="ChapterCover__chapters_btn">1/6</button>
          </div>
          <div className="ChapterCover__label_container">
            <label>CHAPTER 1</label>
          </div>
          <h1>{title}</h1>
          <div className="ChapterCover__text_container">
            <p>{abstract}</p>
          </div>
          <div className="ChapterCover__controls_container">
            <button className="ChapterCover__chapters_btn ChapterCover__chapters_btn_control"><i className="material-icons md-26">keyboard_arrow_up</i></button>
            <button className="ChapterCover__chapters_btn ChapterCover__chapters_btn_control"><i className="material-icons md-26">keyboard_arrow_down</i></button>
          </div>
          <div className="ChapterCover__bottom_text_container">
            <p>Use your mouse, keyboard or the<br/>arrows to read the story</p>
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
