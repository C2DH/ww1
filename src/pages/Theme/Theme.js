import React, { PureComponent } from 'react'
import { Container } from 'reactstrap';
import './Theme.css'


class Theme extends PureComponent  {
  render() {
  const { cover="https://polishpress.files.wordpress.com/2008/01/old_town_warsaw_waf-2012-1501-311945.jpg",
          title="Titolo",
          text="Sometimes there are variables within a pathname that we want to capture. For example, with our player profile route, we want to capture the player’s number. We can do this by adding path params to our route’s path string." } = this.props
    return (
      <Container fluid className="padding-r-l-0 Theme__container" style={{backgroundImage: `url(${cover})`}}>
        <div className="Theme__inner_container">
          {/* <button className="Theme__chapters_btn"></button> */}
          <label>THEME</label>
          <h1>{title}</h1>
          <div className="Theme__text_container">
            <p>{text}</p>
          </div>
          <button className="Theme__start_btn">START</button>
        </div>
      </Container>
    )
  }
}

export default Theme
