import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import Theme from '../Theme'
import Chapter from '../Chapter'

import {
  getTheme,
} from '../../state/selectors'

import {
  loadTheme,
  unloadTheme,
} from '../../state/actions'

class ThemeExplorer extends PureComponent  {
  componentDidMount() {
    this.props.loadTheme(this.props.match.params.themeSlug)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.themeSlug !== this.props.match.params.themeSlug) {
      this.props.unloadTheme()
      this.props.loadTheme(nextProps.match.params.themeSlug)
    }
  }

  componentWillUnmount() {
    this.props.unloadTheme()
  }

  render() {
    const { theme, match } = this.props

    return (
      <div>

        {theme && (
          <Switch>
            <Route path={`${match.path}`} exact component={Theme} />
            <Route path={`${match.path}/chapters/:chapterSlug`} component={Chapter} />
          </Switch>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  theme: getTheme(state),
})

export default connect(mapStateToProps, {
  loadTheme,
  unloadTheme,
})(ThemeExplorer)
