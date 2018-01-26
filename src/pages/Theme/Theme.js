import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { get } from 'lodash'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'reactstrap';
import ChaptersSwitcher from '../../components/ChaptersSwitcher'
import './Theme.css'

import {
  getTheme,
  getMakeLangUrl,
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
    const { theme, makeUrl } = this.props
    const firstChapterSlug = getFirstChapterSlug(theme)
    this.props.history.push(makeUrl(`/themes/${theme.slug}/chapters/${firstChapterSlug}`))
  }

  render() {
    const { theme } = this.props
    const firstChapterSlug = getFirstChapterSlug(theme)
    const containerStyle = { backgroundImage: `url(${getThemeCover(theme)})` }

    return (
      <div className="Theme__wrapper animated fadeIn">
      <Background
        image={get(theme, 'covers[0].attachment')}
        bbox={get(theme, 'data.background.bbox', [])}
        overlay={get(theme, 'data.background.overlay')}
        color={get(theme, 'data.background.backgroundColor')}/>

      <div className="Theme__title d-md-none d-flex align-items-center justify-content-center">
        <h2 className="m-0">{this.context.t('theme')}</h2>
      </div>

      <Container className="Theme__container d-flex align-items-end align-items-md-center text-center text-md-left">
        <div className="Theme__info_wrapper my-4">
          <Row>
            <Col>
              <h6 className="animated fadeIn d-none d-md-block">{this.context.t('theme')}</h6>
              <h1 className="animated fadeIn">{theme.translated.title}</h1>
            </Col>
          </Row>
          <Row>
            <Col md="7">
              <p className="animated fadeIn mb-5 mb-md-4">{theme.translated.abstract}</p>
              {firstChapterSlug && <a onClick={this.jumpToFirstChapter} role="button" className="btn btn-secondary Theme__start_btn animated fadeIn AtlasGrotesk-Medium-Web">{this.context.t('start')}</a>}
            </Col>
          </Row>
        </div>
      </Container>
      <div className="Theme__chapters_btn_container">
        <h6 className="d-none d-md-block">Chapters</h6>
        <button className="Theme__chapters_btn" onClick={this.toggleChapters}><i className="material-icons md-24">{this.state.open ? 'close' : 'list'}</i></button>
      </div>
      <CSSTransitionGroup component="div"
        transitionName="chapter"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}>
         {this.state.open &&
           <ChaptersSwitcher theme={theme} />
        }
      </CSSTransitionGroup>
    </div>
    )
  }
}

Theme.contextTypes = {
  t: React.PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  makeUrl: getMakeLangUrl(state),
  theme: getTheme(state),
})

export default connect(mapStateToProps)(Theme)
