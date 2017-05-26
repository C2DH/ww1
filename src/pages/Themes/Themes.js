import React from 'react'
import { Container, Row, Col } from 'reactstrap';
import ThemesCard from '../../components/ThemesCard'
import './Themes.css'

const Themes = () => (
  <Container>
    <Row className="Themes__TitleRow">
      <h1>Themes</h1>
    </Row>
    <Row>
      <ThemesCard />
    </Row>
  </Container>
)

export default Themes
