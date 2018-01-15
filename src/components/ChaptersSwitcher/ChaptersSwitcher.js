import React from 'react'
import { connect } from 'react-redux'
import { getMakeLangUrl } from '../../state/selectors'
import { get } from 'lodash'
import { Link } from 'react-router-dom'
import './ChaptersSwitcher.css'

const ChaptersSwitcher = ({ theme, makeUrl }) => (
  <div className="ChaptersSwitcher__chapters_container">
    <div className="ChaptersSwitcher__chapters__inner_container">
      <div className="ChaptersSwitcher__chapters_top">
      </div>
        <div className="ChaptersSwitcher__chapter_scroll_container">
          {get(theme, 'stories').map((chapter, i) => (
            <div key={chapter.id} className="ChaptersSwitcher__chapter">
              <div className="ChaptersSwitcher__chapter_title">
                <Link to={makeUrl(`/themes/${theme.slug}/chapters/${chapter.slug}`)}><h3>{chapter.translated.title}</h3></Link>
              </div>
              <div className="ChaptersSwitcher__chapter_num">
                <div>
                  <h2>{i + 1}</h2>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  </div>
)

export default connect(state => ({
  makeUrl: getMakeLangUrl(state),
}))(ChaptersSwitcher)
