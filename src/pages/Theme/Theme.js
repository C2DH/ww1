import React, { PureComponent } from 'react'
import { get, forEach } from 'lodash'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import { connect } from 'react-redux'
import { Container } from 'reactstrap';
import './Theme.css'

import {
  getTheme,
} from '../../state/selectors'

import {
  getThemeCover,
} from '../../utils'

import Background from '../../components/Background'

// TODO: Fkin theme has also metadata.chapters but not really synked ...now
// so use stories check this behaviour...
const getFirstChapterSlug = theme => get(theme, 'stories[0].slug')

class Theme extends PureComponent {
   state = {
     open: false
   }

   toggleChapters = () => {
     this.setState({
       open: !this.state.open
     })
   }

  jumpToFirstChapter = () => {
    const { theme } = this.props
    const firstChapterSlug = getFirstChapterSlug(theme)
    this.props.history.push(`/themes/${theme.slug}/chapters/${firstChapterSlug}`)
  }

  render() {
    const { theme } = this.props
    console.log(theme)
    const firstChapterSlug = getFirstChapterSlug(theme)
    const containerStyle = { backgroundImage: `url(${getThemeCover(theme)})` }


    return (
      <Container fluid className="padding-r-l-0 Theme__container" style={containerStyle}>
        <Background
          image={get(theme, 'covers[0].attachment')}
          overlay={get(theme, 'data.background.overlay')}
          color={get(theme, 'data.background.backgroundColor')}/>

        <div className="Theme__inner_container">
          <div>
            <div className="Theme__chapters_btn_container">
              <span>Chapters</span>
              <button className="Theme__chapters_btn" onClick={this.toggleChapters}><i className="material-icons md-24">{this.state.open ? 'close' : 'list'}</i></button>
            </div>
            <label>THEME</label>
            <h1>{theme.translated.title}</h1>
            <div className="Theme__text_container">
              <p>{theme.translated.abstract}</p>
            </div>
            {firstChapterSlug && <button onClick={this.jumpToFirstChapter} className="Theme__start_btn">START</button>}
          </div>
        </div>
        <CSSTransitionGroup component="div"
          transitionName="chapter"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
           {this.state.open &&
            <div className="Theme__chapters_container">
              <div className="Theme__chapters__inner_container">
                <div className="Theme__chapters_top"></div>
                  <div className="Theme__chapter_scroll_container">
                    {get(theme, 'stories').map((chapter, i) => (
                      <div key={chapter.id} className="Theme__chapter">
                        <div className="Theme__chapter_title"><h4>{chapter.translated.title}</h4></div>
                        <div className="Theme__chapter_num"><h2>{i + 1}</h2></div>
                      </div>
                    ))}
                </div>
              </div>
            </div>}
        </CSSTransitionGroup>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  theme: getTheme(state),
})

export default connect(mapStateToProps)(Theme)
