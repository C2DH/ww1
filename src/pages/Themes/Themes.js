import React from 'react'
import { Container, Row } from 'reactstrap';
import './Themes.css'

const ThemesTitles = ["The Occupation", "Death on the home front", "The food crisis", "Migrations", "The aftermath"]

const ThemeContainer = (props) => (
  <div className="Themes__theme_container">
    <hr />
    <h2 className="Themes__theme_title">{props.title}</h2>
    <hr className="hidden-md-up" />
  </div>
)

const Themes = () => (
  <Container fluid className="padding-r-l-0 Themes__container">
    <Row className="Themes__TitleRow">
      <h1>Themes</h1>
    </Row>
    <Row>

      <div className="Themes__theme_title_container">
        {ThemesTitles.map(themetitle =>(
          <ThemeContainer key={themetitle.id} title={themetitle} />
        ))}
        <hr className="hidden-md-down" />
      </div>
    </Row>
  </Container>
)

export default Themes
