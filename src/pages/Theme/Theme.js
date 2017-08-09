import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { get, forEach } from 'lodash'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'reactstrap';
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
    const firstChapterSlug = getFirstChapterSlug(theme)
    const containerStyle = { backgroundImage: `url(${getThemeCover(theme)})` }

    return (
      <div className="Theme__wrapper">

      <Background
        image={get(theme, 'covers[0].attachment')}
        overlay={get(theme, 'data.background.overlay')}
        color={get(theme, 'data.background.backgroundColor')}/>
      <Container className="Theme__container">
        <div className="Theme__info_wrapper">
          <Row>
            <Col>
              <h6>THEME</h6>
              <h1>{theme.translated.title}</h1>
              <div className="Theme__text_container">
                <p>{theme.translated.abstract}</p>
              </div>
              {firstChapterSlug && <button onClick={this.jumpToFirstChapter} className="Theme__start_btn">START</button>}
            </Col>
          </Row>
        </div>
      </Container>
      <div className="Theme__chapters_btn_container">
        <h6>Chapters</h6>
        <button className="Theme__chapters_btn" onClick={this.toggleChapters}><i className="material-icons md-24">{this.state.open ? 'close' : 'list'}</i></button>
      </div>
      <CSSTransitionGroup component="div"
        transitionName="chapter"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}>
         {this.state.open &&
          <div className="Theme__chapters_container">
            <div className="Theme__chapters__inner_container">
              <div className="Theme__chapters_top">
                <button className="btn btn-secondary Theme__chapters_back_btn AtlasGrotesk-Medium-Web">
                  {theme.translated.title}
                </button>
              </div>
                <div className="Theme__chapter_scroll_container">
                  {get(theme, 'stories').map((chapter, i) => (
                    <div key={chapter.id} className="Theme__chapter">
                      <div className="Theme__chapter_title">
                        <Link to={`/themes/${theme.slug}/chapters/${chapter.slug}`}><h3>{chapter.translated.title}</h3></Link>
                      </div>
                      <div className="Theme__chapter_num">
                        <div>
                          <h2>{i + 1}</h2>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>}
      </CSSTransitionGroup>
    </div>
    )
  }
}

const mapStateToProps = state => ({
  theme: getTheme(state),
})

export default connect(mapStateToProps)(Theme)
