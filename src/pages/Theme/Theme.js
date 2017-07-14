import React, { PureComponent } from 'react'
import { get } from 'lodash'
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
              <button className="Theme__chapters_btn"><i className="material-icons md-24">list</i></button>
            </div>
            <label>THEME</label>
            <h1>{theme.translated.title}</h1>
            <div className="Theme__text_container">
              <p>{theme.translated.abstract}</p>
            </div>
            {firstChapterSlug && <button onClick={this.jumpToFirstChapter} className="Theme__start_btn">START</button>}
          </div>
        </div>

      </Container>
    )
  }
}

const mapStateToProps = state => ({
  theme: getTheme(state),
})

export default connect(mapStateToProps)(Theme)
