import React from 'react'
import { Container, Row } from 'reactstrap';
// import ThemesCard from '../../components/ThemesCard'
import './Themes.css'

const Themes = () => (
  <Container fluid className="padding-r-l-0 Themes__container">
    <Row className="Themes__TitleRow">
      <h1>Themes</h1>
    </Row>
    <Row>
      {/* <ThemesCard title="the occupation" /> */}
      <div className="Themes__theme_title_container">
        <hr />
        <h2 className="Themes__theme_title">The Occupation</h2>
        <hr />
        <h2 className="Themes__theme_title">Death on the home front</h2>
        <hr />
        <h2 className="Themes__theme_title">The food crisis</h2>
        <hr />
        <h2 className="Themes__theme_title">Death on the home front</h2>
        <hr />
        <h2 className="Themes__theme_title">The food crisis</h2>
        <hr />
      </div>
    </Row>
  </Container>
)

export default Themes
