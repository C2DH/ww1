import React from 'react'
import { get } from 'lodash'
import { Link } from 'react-router-dom'
import './ChaptersSwitcher.css'

const ChaptersSwitcher = ({ theme }) => (
  <div className="ChaptersSwitcher__chapters_container">
    <div className="ChaptersSwitcher__chapters__inner_container">
      <div className="ChaptersSwitcher__chapters_top">
      </div>
        <div className="ChaptersSwitcher__chapter_scroll_container">
          {get(theme, 'stories').map((chapter, i) => (
            <div key={chapter.id} className="ChaptersSwitcher__chapter">
              <div className="ChaptersSwitcher__chapter_title">
                <Link to={`/themes/${theme.slug}/chapters/${chapter.slug}`}><h3>{chapter.translated.title}</h3></Link>
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

export default ChaptersSwitcher
