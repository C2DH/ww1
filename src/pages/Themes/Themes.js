import React, { PureComponent } from 'react'
import { get } from 'lodash'
import MediaQuery from 'react-responsive'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'reactstrap'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import './Themes.css'
import {
  loadThemes,
  unloadThemes,
} from '../../state/actions'
import {
  getThemes,
  getThemesLoading,
  getThemesError,
} from '../../state/selectors'
import {
  getThemeCover,
} from '../../utils'

class ThemeContainer extends PureComponent {
  handleOnMouseEnter = () => {
    this.props.onEnterTheme(this.props.theme)
  }
  handleOnMouseLeave = () => {
    this.props.onLeaveTheme(this.props.theme)
  }

  render() {
    const { theme, hover, responsiveBackground } = this.props
    return (
       <div className="Themes__theme_container">
         <MediaQuery minWidth={768}>
           <hr></hr>
           <h2 className="Themes__theme_title">
             <Link
               className="Themes__theme_title_link"
               to={`/themes/${theme.slug}`}
             onMouseEnter={this.handleOnMouseEnter}
             onMouseLeave={this.handleOnMouseLeave}>
               {hover ? <i className="icon-hand Themes__hand_pointer_left" /> : null}{theme.translated.title}{hover ? <i className="icon-hand-reverse Themes__hand_pointer_right" /> : null}</Link></h2>
        </MediaQuery>
        <MediaQuery maxWidth={767} style={{backgroundImage: `url(${responsiveBackground})`}}>
          <hr />
          <h2 className="Themes__theme_title">{theme.translated.title}</h2>
          <hr className="hidden-md-up" />
       </MediaQuery>

       </div>
    )

  }
}

class Themes extends PureComponent {
  state = {
    hoverTheme: null,
  }

  componentDidMount() {
    this.props.loadThemes()
  }

  componentWillUnmount() {
    this.props.unloadThemes()
  }

  handleOnEnterTheme = (theme) => {
    this.setState({ hoverTheme: theme })
  }

  handleOnLeaveTheme = (theme) => {
    this.setState({ hoverTheme: null })
  }

  render () {
    const { hoverTheme } = this.state
    const { themes } = this.props

    return (
      <Container fluid className="Themes__container d-flex flex-column justify-content-center">
        {/* style={{ backgroundImage: hoverTheme ? `url(${hoverTheme.cover})` : undefined }}> */}
        <CSSTransitionGroup component="div"
        transitionName="backgroundTheme"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}>
        {hoverTheme && (
          <div key="background" style={{
            position:'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            filter:'grayscale(1)',
            backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${getThemeCover(hoverTheme)})`
          }}
          className="Themes__backgroundTheme">
          </div>
        )}
        </CSSTransitionGroup>
        <Row className="Themes__TitleRow" style={{zIndex: 1001}}>
          <Col>
            <h1>Themes</h1>
          </Col>
        </Row>
        <Row>

          {themes && <Col className="Themes__theme_title_container" style={{zIndex: 1001}}>
            {themes.map(theme =>(
              <ThemeContainer
                key={theme.id}
                theme={theme}
                hover={hoverTheme && theme.id === hoverTheme.id}
                onEnterTheme={this.handleOnEnterTheme}
                onLeaveTheme={this.handleOnLeaveTheme}
                responsiveBackground={getThemeCover(theme)}
              />
            ))}
            <hr></hr>
          </Col>}
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  themes: getThemes(state),
  loading: getThemesLoading(state),
  error: getThemesError(state),
})

export default connect(mapStateToProps, {
  loadThemes,
  unloadThemes,
})(Themes)
