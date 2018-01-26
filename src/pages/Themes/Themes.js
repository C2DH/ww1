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
       <div className="Themes__theme_container animated fadeInUp">
         <MediaQuery minWidth={768}>
           <h2 className="Themes__theme_title">
             <Link
               className="Themes__theme_title_link"
               to={`/themes/${theme.slug}`}
             onMouseEnter={this.handleOnMouseEnter}
             onMouseLeave={this.handleOnMouseLeave}>
               {hover ? <i className="icon-hand Themes__hand_pointer_left" /> : null}{theme.translated.title}{hover ? <i className="icon-hand-reverse Themes__hand_pointer_right" /> : null}</Link>
           </h2>
        </MediaQuery>
        <MediaQuery maxWidth={767}>
          <div className="Themes__theme_title_mobile_cont d-flex align-items-center justify-content-center" style={{backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${responsiveBackground})`}}>
            <h2 className="Themes__theme_title">
              <Link
                className="Themes__theme_title_link"
                to={`/themes/${theme.slug}`}>
                {theme.translated.title}
              </Link>
            </h2>
          </div>
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
      <Container fluid className="animated fadeIn Themes__container d-flex flex-column justify-content-center">
        <div className="Themes__backgroundThemeStart d-none d-md-block">
        </div>

        <div className="Themes__title d-md-none d-flex align-items-center justify-content-center">
          <h2 className="m-0">Themes</h2>
        </div>

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
          <Row className="Themes__TitleRow d-none d-md-block animated fadeInUp" style={{zIndex: 1001}}>
            <Col>
              <h1>Themes</h1>
            </Col>
          </Row>

        <Row className="Themes__TitlesRow mt-md-0">
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
